const formMock = {
  schedules: [
    {
      sch_interval: 'daily',
      sch_time: '2020-10-17T15:30:00.000Z'
    }
  ],
  targetValues: {
    type: 'database',
    system: 54,
    database: 'dev',
    systemName: 'redshift_warehouse_target',
    schema: 'public',
    rawSchema: 'pg_internal',
    stageSchema: 'pg_temp_1',
    createTargetTables: true,
    targetItems: {
      used_cars: {
        id: 353,
        processId: 100026,
        name: 'used_cars',
        targetTable: 'used_cars',
        ingestionType: 'F',
        cdcColumns: null,
        scdColumns: null,
        scdType: null,
        targetFileType: null,
        targetFilePath: null,
        targetDelimiter: null
      },
      autos: {
        id: 354,
        processId: 100026,
        name: 'autos',
        targetTable: 'autos',
        ingestionType: 'F',
        cdcColumns: null,
        scdColumns: null,
        scdType: null,
        targetFileType: null,
        targetFilePath: null,
        targetDelimiter: null
      },
      Nutritions_US: {
        id: 355,
        processId: 100026,
        name: 'Nutritions_US',
        targetTable: 'Nutritions_US',
        ingestionType: 'F',
        cdcColumns: null,
        scdColumns: null,
        scdType: null,
        targetFileType: null,
        targetFilePath: null,
        targetDelimiter: null
      }
    }
  },
  sourceValues: {
    cloudType: 'aws',
    cloudBucket: 'aws-databricks-poc-wavicledata',
    type: 'database',
    system: 56,
    database: 'bi_warehouse',
    table: [
      'used_cars',
      'autos',
      'Nutritions_US'
    ],
    systemName: 'khkjhkjh',
    isFileSystem: false
  },
  processName: 'poimnlkj',
  processDescription: 'lkjlkjlkj',
  processConnections: [
    {
      label: 'Metadata_DB',
      value: 3
    },
    {
      label: 'DQ_DB',
      value: 4
    },
    {
      label: 'Aurora Source',
      value: 27
    },
    {
      label: 'Jagan_Redshift',
      value: 28,
      hasSchema: true
    },
    {
      label: 'Ahil_Redshift',
      value: 34,
      hasSchema: true
    },
    {
      label: 'Local Connection',
      value: 40
    },
    {
      label: 'Raj_Redshift',
      value: 41,
      hasSchema: true
    },
    {
      label: 'wavicles3',
      value: 42
    },
    {
      label: 'asdad',
      value: 43
    },
    {
      label: 'aurora_test',
      value: 44,
      hasSchema: true
    },
    {
      label: 'test_aurora',
      value: 45
    },
    {
      label: 'test mysql final',
      value: 46
    },
    {
      label: 'test aurora final',
      value: 47
    },
    {
      label: 'test aurora test',
      value: 48
    },
    {
      label: 'test redshift test',
      value: 49,
      hasSchema: true
    },
    {
      label: 'DI_BOT',
      value: 50
    },
    {
      label: 'conn',
      value: 51
    },
    {
      label: 'test system 123',
      value: 52
    },
    {
      label: 'source_autos',
      value: 53
    },
    {
      label: 'redshift_warehouse_target',
      value: 54,
      hasSchema: true
    },
    {
      label: 'test',
      value: 55
    },
    {
      label: 'khkjhkjh',
      value: 56
    }
  ],
  fileColumns: {}
}

export default formMock
