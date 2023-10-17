import React, { FC } from 'react'
import { PropertySectionProps, TextStyleProps } from './PropertySection.model'
import Title from '@components/Title/Title'
import classNames from 'classnames'
import NumberFormat from 'react-number-format'

const PropertySection: FC<PropertySectionProps> = ({
  title,
  text,
  textStyle,
  textClassName,
  suffix,
}) => {
  const className = () => {
    switch (textStyle) {
      case TextStyleProps.NORMAl:
        return 'text-s-base text-black'
      case TextStyleProps.SEMIBOLD_BLACK:
        return 'text-s-lg text-black font-semibold'
      default:
        return 'text-s-base text-black'
    }
  }

  return (
    <div className="text-s-lg">
      <Title className="text-blue-1 text-s-lg font-normal">{title}</Title>
      <div
        className={classNames(
          `mt-[10px] text-s-base ${className()}`,
          textClassName
        )}
      >
        {suffix && (
          <NumberFormat suffix={suffix} displayType="text" value={text} />
        )}
        {!suffix && text}
      </div>
    </div>
  )
}

export default PropertySection
