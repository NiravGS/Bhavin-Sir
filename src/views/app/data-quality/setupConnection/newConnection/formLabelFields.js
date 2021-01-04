import * as R from 'ramda'
import { defaultSelect } from '../existingConnection/selector'
import { formatDefaultOption } from '../../../../../components/Input/Select'

const common = [
  'host',
  'username',
  'password',
  'port'
]

const formDatabaseFields = [
  { name: 'mysql', fields: [...common, 'database', 'additionalInfo'] },
  { name: 'aurora-postgres', fields: [...common, 'database', 'schema', 'additionalInfo'], hasSchema: true },
  { name: 'aurora-mysql', fields: [...common, 'database', 'additionalInfo'] },
  { name: 'mssql', fields: [...common, 'database', 'schema', 'additionalInfo'], hasSchema: true },
  { name: 'redshift', fields: [...common, 'database', 'additionalInfo'], hasSchema: true },
  { name: 'postgres', fields: [...common, 'database', 'additionalInfo'] },
  { name: 'snowflake', fields: [...common, 'database', 'additionalInfo'] },
  { name: 'oracle', fields: [...common, 'serviceName', 'sid', 'additionalInfo'] }
]

const awsRegions = [
  'us-east-2',
  'us-east-1',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-south-1',
  'ap-northeast-3',
  'ap-northeast-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ca-central-1',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-south-1',
  'eu-west-3',
  'eu-north-1',
  'me-south-1',
  'sa-east-1'
]

const hdfsDistributions = [
  'Amazon EMR',
  'Apache'
]

const getSelect = R.map(formatDefaultOption)

const formFileFields = [
  {
    name: 'S3',
    fields: [
      'bucket_name', 'folder_path', 'access_key', 'secret_key', 'iam_role',
      { type: 'select', name: 'regions', options: getSelect(awsRegions) }
    ]
  },
  {
    name: 'HDFS',
    fields: [...common, 'version',
      { type: 'select', name: 'distribution', options: getSelect(hdfsDistributions) }
    ]
  },
  { name: 'GCP', fields: [...common] },
  { name: 'azureBlob', fields: [...common] }
]

export const databaseHasSchemaField = (databaseType) => {
  return R.find(R.propEq('name', databaseType), formDatabaseFields)?.hasSchema
}

export const getFieldsByDb = (db) => {
  const objFound = R.find(R.propEq('name', db))([...formDatabaseFields, ...formFileFields])
  return objFound?.fields
}

const formatOptionTypes = R.map(({ name, fields }) => ({ ...defaultSelect(name), fields }))

export const formDatabaseOptions = formatOptionTypes(formDatabaseFields)
export const formFileOptions = formatOptionTypes(formFileFields)
