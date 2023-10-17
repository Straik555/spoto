import React, { useEffect, useRef, useState } from 'react'

type FileUploadProps = {
  disabled?: boolean
  hidden?: boolean
  multiple?: boolean
  updateFilesCb: any
  FileInputLabel: React.FC<{ openFileUploadDialog: any }>
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const {
    disabled,
    hidden = true,
    multiple,
    updateFilesCb,
    FileInputLabel,
    ...otherProps
  } = props

  const fileInputRef = useRef(null)
  const [files, setFiles] = useState({})

  const handleNewFileUpload = (e) => {
    const {
      files: { length, ...uploadedFiles },
    } = e.target
    if (length) {
      const newFiles: object = Object.values(uploadedFiles).reduce(
        (acc, file) => ({
          ...(acc as object),
          [(file as { name: string })?.name]: file,
        }),
        {}
      ) as object

      setFiles(newFiles)
    }
  }

  useEffect(() => {
    const filesAsArray = Object.values(files)
    const newFiles = multiple ? filesAsArray : filesAsArray[0]
    if (newFiles) {
      const formData = new FormData()
      formData.append('file', newFiles as string | Blob)
      updateFilesCb(formData)
    }
  }, [files])

  const openFileUploadDialog = (event) => {
    event.target.value = '' /** Allows re-uploading files in the input */
    const inputElement = fileInputRef?.current as any
    if (inputElement.click) {
      inputElement.click()
    }
  }

  return (
    <>
      <FileInputLabel openFileUploadDialog={openFileUploadDialog} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleNewFileUpload}
        {...{ disabled, hidden, multiple }}
        {...otherProps}
      />
    </>
  )
}

export default FileUpload
