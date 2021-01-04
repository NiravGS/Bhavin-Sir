import XLSX from 'xlsx'
import * as R from 'ramda'

const renameObjectKeys = (schema, rowObject) => {
  const replaceObjectKey = (currText, schemaKey) => currText.replaceAll(`"${schemaKey}":`, `"${schema[schemaKey]}":`)
  return JSON.parse(R.keys(schema).reduce(replaceObjectKey, JSON.stringify(rowObject)))
}

export const xlsToJsonAsync = (file, schema) => new Promise((resolve, reject) => {
  const fileReader = new window.FileReader()
  fileReader.onload = function (event) {
    const workbook = XLSX.read(event.target.result, {
      type: 'buffer',
      sheetStubs: true,
      cellDates: true
    })

    const rowObject = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    )

    resolve(renameObjectKeys(schema, rowObject))
  }
  fileReader.readAsArrayBuffer(file)
})
