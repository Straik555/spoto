import { useEffect, useState } from 'react'

export const useFileReader = (file?: File | null): string => {
  const [fileSrc, setFileSrc] = useState('')

  useEffect(() => {
    if (!file) return

    const reader = new FileReader()

    reader.onload = function (event) {
      setFileSrc(event.target?.result?.toString() || '')
    }

    reader.readAsDataURL(file)
  }, [file])

  return fileSrc
}
