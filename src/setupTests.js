require('mutationobserver-shim')

// https://github.com/mui-org/material-ui/issues/15726
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
})
