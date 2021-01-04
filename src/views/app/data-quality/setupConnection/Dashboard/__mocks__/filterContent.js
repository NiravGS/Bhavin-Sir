const dataChecks = {
  col_regex_not_match: null,
  col_stddev: null,
  col_sum: null,
  col_unique: null,
  column_datatype: 'int',
  column_id: '1',
  column_length: null,
  column_nullable: 'N',
  last_updt_ts: null,
  row_count: null
}

const columns = [
  { label: 'id', value: '1', dataChecks: { ...dataChecks } },
  { label: 'date', value: '2', dataChecks: { ...dataChecks } },
  { label: 'county', value: '3', dataChecks: { ...dataChecks } }
]

export const contentTable = [
  { label: 'covid', value: 1, columns: [...columns] },
  { label: 'test_dq_schema', value: 2, columns: [...columns] }
]
