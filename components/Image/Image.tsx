import { ImageProps } from '@components/Image/Image.model'
import { config } from '@config/index'
import { FC } from 'react'

export const Image: FC<ImageProps> = ({
  srcKey,
  downloadUrl = `${config.API_URL}/api/storage/download`,
  alt,
  className,
  src,
  ...restImgProps
}) => {
  const source = srcKey ? `${downloadUrl}?key=${srcKey}` : src

  return <img {...restImgProps} alt={alt} src={source} className={className} />
}

export default Image
