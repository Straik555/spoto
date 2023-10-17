export const downloadBlobFile = (blob: Blob, name: string) => {
  // Open in browser version
  // const url = window.URL || window.webkitURL
  // const blob = new Blob(blobParts, { type: 'application/pdf' })
  // const link = url.createObjectURL(blob)
  // window.open(link, '_blank')

  // Download version
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', `${name}.pdf`)
  document.body.appendChild(link)
  link.click()
}
