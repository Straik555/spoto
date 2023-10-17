import React, { FC, useEffect, useRef, useState, useMemo } from 'react'
import { TextProps, TextVariant } from '@components/Text/Text.model'
import ArrowsTop from '@assets/icons/arrows/arrow-up.svg'

const Text: FC<TextProps> = ({
  children,
  variant = TextVariant.Text,
  isLimited,
}) => {
  const [isOverflowed, setIsOverflowed] = useState<boolean>(true)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref?.current) {
      setIsOverflowed(
        ref?.current.scrollWidth > ref?.current.offsetWidth ||
          ref?.current.scrollHeight > ref?.current.offsetHeight
      )
    }
  }, [ref?.current])

  const contentText = useMemo(() => {
    return variant === TextVariant.Money
      ? `$${Number(children || 0).toFixed(2)}`
      : children
  }, [children, variant])

  return isLimited ? (
    <div className="relative w-full">
      <div
        ref={ref}
        className="w-full overflow-hidden font-normal text-black peer text-s-base overflow-ellipsis whitespace-nowrap pr-[34px]"
      >
        {contentText}
      </div>
      {isOverflowed && (
        <div className="absolute right-0 invisible bg-transparent peer-hover:visible hover:visible pt-[5px] w-[277px] mt-[-5px]">
          <div className="font-normal break-words rounded-[5px] bg-blue-8 p-[10px] text-s-xs">
            <ArrowsTop className="absolute top-0 left-auto right-[32px] fill-blue-8" />
            {contentText}
          </div>
        </div>
      )}
    </div>
  ) : (
    <>{contentText}</>
  )
}

export default Text
