import moment from 'moment'
import * as R from 'ramda'
import { isFile } from './createProcess/SourceInformation/useFileColumns'
import { getNotNullValues, selectTargetSchemaColumns, systemLabel } from './selector'

const boolToChar = (bool) => bool ? 'Y' : 'N'
const numberOrNull = num => num ? R.defaultTo(null, Number(num)) : null

function getIds (content) {
  return getNotNullValues({
    id: numberOrNull(content.id),
    processId: numberOrNull(content.processId)
  })
}

export const formatSchedule = schedule => ({
  sch_interval: schedule.sch_interval,
  sch_time: moment.utc(schedule.sch_time).format('YYYY-MM-DD HH:mm:ss.S')
})

const objectListToSourceInfo = (objectList) => {
  const table = []
  const fileInputs = []
  const targetItems = {}

  objectList.forEach(item => {
    const header = R.equals(item.isHeader, 'Y')
    table.push(item.sourceObjectName)

    if (item.sourceFilePath) {
      fileInputs.push({
        localId: `local_${item.id}`,
        objectListId: item.id,
        filePath: item.sourceObjectName,
        generatedFileName: item.sourceFilePath,
        fileMask: item.sourceFileMask,
        header,
        schemaFile: item.schemaFilePath,
        delimiter: item.sourceFileDelimiter,
        extractedColumns: item.fileColumns,
        schemaColumns: item.objectSchemaDefs.map(schema => {
          return {
            id: schema.id,
            processId: schema.processId,
            dataType: schema.srcFieldDatatype,
            column: schema.srcFieldName,
            size: schema.fieldSize,
            isPrimaryKey: R.equals('Y', schema.fieldPrimaryKeyInd)
          }
        })
      })
    }

    targetItems[item.sourceFilePath ? `local_${item.id}` : item.sourceObjectName] = {
      id: item.id,
      processId: item.processId,
      name: item.sourceObjectName,
      targetTable: item.targetObjectName,
      ingestionType: item.ingestIndicator,
      cdcColumns: item.cdcTsField,
      scdColumns: item.scdKeyFields,
      scdType: item.scdType,
      targetFileType: item.targetFileType,
      targetFilePath: item.targetFilePath,
      targetDelimiter: item.targetDelimiter
    }
  })

  return {
    table,
    fileInputs,
    targetItems
  }
}

export const mountReceivedProcess = (data) => {
  const basicInfo = R.pick(['processName', 'processDescription'], data)
  basicInfo.active = R.equals('Y', data.activeFlag)

  const { fileInputs, targetItems, table } = objectListToSourceInfo(data.objectList)
  const sourceInfo = {
    type: data.sourceType,
    system: data.sourceConnectionId === 0 ? 'localSystem' : data.sourceConnectionId,
    database: data.sourceDatabaseName,
    cloudType: data.cloudType,
    cloudBucket: data.cloudBucket,
    systemName: data.sourceName,
    schema: data.sourceSchemaName,
    table,
    fileInputs
  }

  const targetInfo = {
    type: data.targetType,
    system: data.targetConnectionId === 0 ? 'localSystem' : data.targetConnectionId,
    database: data.targetDatabaseName,
    systemName: data.targetName,
    schema: data.targetSchemaName,
    rawSchema: data.targetRawSchema,
    stageSchema: data.targetStageSchema,
    createTargetTables: data.dbOverrideNameInd === 'Y',
    targetItems
  }

  const schedules = data.schedules?.map(R.pick(['sch_interval', 'sch_time']))

  return {
    basicInfo,
    sourceInfo,
    targetInfo,
    schedules
  }
}

const getObjectSchemaDefs = (currentSourceItem, currentTargetItem) => {
  const { schemaColumns } = currentSourceItem
  const primaryKeyFields = []
  const objectSchemaDefs = schemaColumns?.map((schema, index) => {
    if (schema.isPrimaryKey) primaryKeyFields.push(schema.column)
    const ids = getIds(schema)
    return {
      ...ids,
      fieldPrimaryKeyInd: boolToChar(schema.isPrimaryKey),
      fieldSize: numberOrNull(schema.fieldSize),
      srcObjectName: currentSourceItem.filePath,
      trgtObjectName: currentTargetItem?.targetTable,
      srcFieldName: schema.column,
      trgtFieldName: schema.column,
      srcFieldDatatype: schema.dataType,
      trgtFieldDatatype: schema.dataType,
      srcFieldOrdinalPosition: R.inc(index),
      trgtFieldOrdinalPosition: R.inc(index),
      fieldPrecision: schema.precision,
      fieldScale: schema.scale,
      fieldFormat: schema.format
    }
  })

  return { objectSchemaDefs, primaryKeyFields }
}

const isFileType = R.equals('fileSystem')

const formatObjectListToSend = (targetValues, sourceValues) => {
  const { schema, columns } = selectTargetSchemaColumns(targetValues)
  const sourceItems = isFileType(sourceValues.type) ? sourceValues.fileInputs : sourceValues.table
  return sourceItems.map((currentSourceItem, index) => {
    const itemName = sourceValues.isFileSystem ? currentSourceItem.filePath : currentSourceItem
    const currentTargetItem = columns[index]

    const targetObjectName = R.and(targetValues.createTargetTables, !sourceValues.isFileSystem)
      ? currentSourceItem : currentTargetItem?.targetTable

    const ids = getIds(currentTargetItem)
    const { objectSchemaDefs, primaryKeyFields } = getObjectSchemaDefs(currentSourceItem, currentTargetItem)

    return {
      ...ids,
      sourceSchemaName: R.defaultTo(sourceValues.database, sourceValues.schema),
      sourceObjectName: itemName,
      targetSchemaName: R.defaultTo(sourceValues.database, schema),
      targetObjectName,
      scdKeyFields: currentTargetItem?.scdColumns,
      scdType: currentTargetItem?.scdType,
      ingestIndicator: currentTargetItem?.ingestionType,
      cdcTsField: currentTargetItem?.cdcColumns,
      sourceFilePath: currentSourceItem?.generatedFileName,
      targetFilePath: currentTargetItem?.targetFilePath,
      targetFileType: currentTargetItem?.targetFileType,
      targetDelimiter: currentTargetItem?.targetDelimiter,
      sourceFileType: currentSourceItem?.filePath?.split?.('.')?.pop(),
      sourceFileMask: currentSourceItem?.fileMask,
      sourceFileDelimiter: currentSourceItem?.delimiter,
      schemaFilePath: currentSourceItem?.schemaFile,
      isHeader: boolToChar(currentSourceItem?.header),
      primaryKeyFields,
      fileColumns: currentSourceItem.extractedColumns,
      objectSchemaDefs
    }
  })
}

const formatProcessBase = (content) => {
  const {
    processName, processDescription, sourceValues,
    targetValues, processConnections
  } = content
  return {
    processName: processName,
    processDescription,
    cloudType: sourceValues.cloudType,
    cloudBucket: sourceValues.cloudBucket,
    sourceName: systemLabel(sourceValues.system, processConnections),
    sourceType: sourceValues.type,
    sourceDatabaseName: sourceValues.database,
    sourceSchemaName: sourceValues.schema,
    targetName: systemLabel(targetValues.system, processConnections),
    targetType: targetValues.type,
    targetDatabaseName: targetValues.database,
    targetSchemaName: targetValues.schema,
    targetRawSchema: targetValues.rawSchema,
    targetStageSchema: targetValues.stageSchema,
    sourceConnectionId: sourceValues.system,
    targetConnectionId: targetValues.system,
    dbOverrideNameInd: boolToChar(targetValues.createTargetTables)
  }
}

export const parseProcessToSend = (content) => {
  const formattedSchedules = content?.schedules?.map(formatSchedule)
  const base = formatProcessBase(content)
  const objectList = formatObjectListToSend(content.targetValues, content.sourceValues, content.fileColumns)

  return {
    base,
    schedules: formattedSchedules,
    objectList
  }
}

export const parseFileToSend = async (content, userProcessIndexDb) => {
  const formData = new window.FormData()
  if (isFileType(content?.sourceValues.type)) {
    await Promise.all(content.sourceValues?.fileInputs.map(async (fileItem, index) => {
      const dbItem = await userProcessIndexDb.getFileByLocalId(fileItem.localId)
      if (isFile(dbItem?.file)) {
        dbItem.file.namee = dbItem?.name
        formData.append('name[]', dbItem?.name)
        formData.append('filePath[]', dbItem?.file)
      }
    }))
  }
  return formData
}
