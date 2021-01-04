
import formMock from '../createProcess/formMock'
import { parseProcessToSend } from '../normalizeSelector'

describe('create process selectors', () => {
  it('should format base info correctly based on form data', () => {
    expect(parseProcessToSend(formMock).base).toEqual({
      processName: 'poimnlkj',
      processDescription: 'lkjlkjlkj',
      cloudType: 'aws',
      cloudBucket: 'aws-databricks-poc-wavicledata',
      sourceName: 'khkjhkjh',
      sourceType: 'database',
      sourceDatabaseName: 'bi_warehouse',
      sourceSchemaName: undefined,
      targetName: 'redshift_warehouse_target',
      targetType: 'database',
      targetDatabaseName: 'dev',
      targetSchemaName: 'public',
      targetRawSchema: 'pg_internal',
      targetStageSchema: 'pg_temp_1',
      sourceConnectionId: 56,
      targetConnectionId: 54,
      dbOverrideNameInd: 'Y'
    })
  })

  it('should contain schedules property', () => {
    expect(parseProcessToSend(formMock)).toHaveProperty('schedules')
  })
  it('should format object list correctly', () => {
    expect(parseProcessToSend(formMock).objectList).toEqual([
      {
        id: 353,
        processId: 100026,
        sourceSchemaName: 'bi_warehouse',
        sourceObjectName: 'used_cars',
        targetSchemaName: 'public',
        targetObjectName: 'used_cars',
        scdKeyFields: null,
        scdType: null,
        ingestIndicator: 'F',
        cdcTsField: null,
        sourceFilePath: undefined,
        targetFilePath: null,
        targetFileType: null,
        targetDelimiter: null,
        sourceFileType: undefined,
        sourceFileMask: undefined,
        sourceFileDelimiter: undefined,
        schemaFilePath: undefined,
        isHeader: 'N',
        primaryKeyFields: [],
        fileColumns: undefined,
        objectSchemaDefs: undefined
      },
      {
        id: 354,
        processId: 100026,
        sourceSchemaName: 'bi_warehouse',
        sourceObjectName: 'autos',
        targetSchemaName: 'public',
        targetObjectName: 'autos',
        scdKeyFields: null,
        scdType: null,
        ingestIndicator: 'F',
        cdcTsField: null,
        sourceFilePath: undefined,
        targetFilePath: null,
        targetFileType: null,
        targetDelimiter: null,
        sourceFileType: undefined,
        sourceFileMask: undefined,
        sourceFileDelimiter: undefined,
        schemaFilePath: undefined,
        isHeader: 'N',
        primaryKeyFields: [],
        fileColumns: undefined,
        objectSchemaDefs: undefined
      },
      {
        id: 355,
        processId: 100026,
        sourceSchemaName: 'bi_warehouse',
        sourceObjectName: 'Nutritions_US',
        targetSchemaName: 'public',
        targetObjectName: 'Nutritions_US',
        scdKeyFields: null,
        scdType: null,
        ingestIndicator: 'F',
        cdcTsField: null,
        sourceFilePath: undefined,
        targetFilePath: null,
        targetFileType: null,
        targetDelimiter: null,
        sourceFileType: undefined,
        sourceFileMask: undefined,
        sourceFileDelimiter: undefined,
        schemaFilePath: undefined,
        isHeader: 'N',
        primaryKeyFields: [],
        fileColumns: undefined,
        objectSchemaDefs: undefined
      }
    ])
  })
})
