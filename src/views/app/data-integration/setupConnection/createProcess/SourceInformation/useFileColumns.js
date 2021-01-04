import { TxtReader } from 'txt-reader'

export const isFile = (file) => file instanceof window.File

export const getColumnsFromFile = async (file, delimiter) => {
  const reader = new TxtReader()
  const res = await reader.sniffLines(file, 1)
  return res.result[0]?.split(delimiter)
}

export const getColumnsFromJsonFile = async (file) => {
  const result = await new Response(file).text()
  const data = JSON.parse(result)
  return Object.keys(data[0])
}

export const getColumnsFromParquetFile = async (file) => {
  const result = await new Response(file).text()
  console.log(result)
  // const data = JSON.parse(result)
  // return Object.keys(data[0])
}
