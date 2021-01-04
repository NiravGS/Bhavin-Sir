import * as R from 'ramda'

const isObjectNotFile = elementItem => {
  return elementItem instanceof Object && !(elementItem instanceof window.FileList)
}

const serializeRecursively = formFields => {
  for (const item in formFields) {
    if (isObjectNotFile(formFields[item])) {
      serializeRecursively(formFields[item])
    }

    if (formFields[item] instanceof window.FileList) {
      const newFiles = formFields[item].length ? [] : undefined
      if (formFields[item].length === 1) {
        formFields[item] = formFields[item][0]?.name
      } else {
        for (const file of formFields[item]) {
          newFiles.push(file.name)
        }
        formFields[item] = newFiles
      }
    }
  }
  return formFields
}

export const serialize = formFields => {
  return serializeRecursively(R.clone(formFields))
}
