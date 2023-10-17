import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import FileUpload from '@components/FileUpload/FileUpload'
import React, { useState } from 'react'

export default {
  title: 'Reusable Components/FileUpload',
  component: FileUpload,
}

export const DefaultFileUpload = () => {
  const [files, setFile] = useState(null)
  return (
    <div className="">
      <div>
        <FileUpload
          disabled={false}
          FileInputLabel={({ openFileUploadDialog }) => (
            <Button
              mode={ButtonMode.SMALL}
              iconClassName="mr-0"
              onClick={openFileUploadDialog}
            >
              Click to upload
            </Button>
          )}
          updateFilesCb={(formData) => {
            setFile(formData.get('file'))
          }}
        />
      </div>
      {files && <div className="mt-2">Uploaded file</div>}
    </div>
  )
}

export const MultipleFilesUpload = () => {
  const [files, setFiles] = useState(null)
  return (
    <>
      <div>
        <FileUpload
          disabled={false}
          FileInputLabel={({ openFileUploadDialog }) => (
            <Button
              mode={ButtonMode.SMALL}
              iconClassName="mr-0"
              onClick={openFileUploadDialog}
            >
              Click to upload
            </Button>
          )}
          updateFilesCb={(formData) => {
            setFiles(formData.get('file'))
          }}
          multiple
        />
      </div>
      {files && <div className="mt-2">Files uploaded</div>}
    </>
  )
}
