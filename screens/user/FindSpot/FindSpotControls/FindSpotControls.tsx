import _noop from 'lodash/noop'
import React, { FC } from 'react'
import FindSpotFilter from '@screens/user/FindSpot/FindSpotFilter'
import { TFindSpotControls } from '@screens/user/FindSpot/FindSpotControls/FindSpotControls.model'
import { PageHeaderMobile } from '@components/PageHeader'
import { PageHeaderView } from '@components/PageHeader/PageHeader.model'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { FindSpotFormValues } from '@screens/user/FindSpot/FindSpot.model'
import { ButtonMode } from '@components/Button/Button.model'
import useFindSpot from '@screens/user/FindSpot/useFindSpot'
import { Button } from '@components/index'
import { useDateUtil } from '@hooks/useDateUtil'
import { dateFormats } from '@constants/global'
import FilterImg from '@assets/icons/filter.svg'
import Search from '@assets/icons/search-15.svg'
import useDetectClickOutside from '@hooks/useDetectClickOutside/useDetectClickOutside'

const FindSpotControls: FC<TFindSpotControls> = ({ openModal }) => {
  const { values, setFieldValue } = useTypedFormikContext<FindSpotFormValues>()
  const { goToChangeSearch } = useFindSpot()
  const dateUtil = useDateUtil()
  const { isFocused: isOpenFilter, setIsFocused: setIsOpenFilter } =
    useDetectClickOutside({
      Component: FindSpotFilter,
    })

  return (
    <>
      <PageHeaderMobile
        view={PageHeaderView.white}
        className="pt-[8px]"
        rightContent={
          <div className="flex justify-between flex-1 item-center">
            <div className="relative flex flex-col mx-[6px] w-[calc(100%-6px)]">
              {values.markers ? (
                <div className="absolute top-0 flex flex-col w-full bg-white shadow-[0px_-3px_28px_rgba(42,43,46,0.15)] h-[178px]  p-[16px_6px] rounded-[5px] ">
                  <div
                    onClick={() => {
                      setFieldValue('selectIsOpen', false)
                      setFieldValue('modalIsOpen', true)
                      setFieldValue('prevAddress', values.address)
                    }}
                    className="flex items-center w-full font-semibold capitalize h-[46px] px-[10px] py-[10xp] rounded-md text-blue-1 text-s-sm bg-blue-4 placeholder-blue-1"
                  >
                    <Search className="fill-blue-1 mr-[10px]" />
                    <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {values.address}
                    </p>
                  </div>
                  <hr className="my-2 -mx-[6px]" />
                  <div className="flex flex-col items-center w-full">
                    <div className="flex items-center justify-between w-full mb-[16px]">
                      <div className="flex items-center justify-center w-full h-10 mr-[3px] bg-blue-4 rounded-[5px]">
                        <p className="mb-0 font-semibold text-s-sm text-blue-1">
                          {dateUtil(values.startDate || dateUtil()).format(
                            dateFormats.display2
                          )}
                        </p>
                      </div>
                      {values.timeFrom && values.timeTo && (
                        <div className="flex items-center justify-center w-full h-10 ml-[3px] bg-blue-4 rounded-[5px]">
                          <p className="mb-0 font-semibold text-s-sm text-blue-1">
                            {dateUtil(values.timeFrom)
                              .utc()
                              .format(dateFormats.timeDisplay0)}{' '}
                            -
                            {dateUtil(values.timeTo)
                              .utc()
                              .format(dateFormats.timeDisplay0)}
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      className="h-10 font-semibold !text-s-sm"
                      mode={ButtonMode.FULL_PRIMARY}
                      onClick={goToChangeSearch}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Search className="absolute fill-blue-1 z-[1] left-4 top-3" />
                  <input
                    type="text"
                    data-testid="findSpotControlsAddress"
                    className="relative flex-auto w-full pr-4 font-semibold h-[41px] text-s-sm pl-[45.52px] rounded-md text-blue-1 placeholder-blue-1"
                    value={values.address}
                    onChange={_noop}
                    onClick={openModal}
                    placeholder="Where do you want to park?"
                  />
                </>
              )}
            </div>
            <button
              className="flex flex-col items-center justify-center bg-white border-0 shadow-lg w-[41px] px-[10px] h-[41px] group rounded-md"
              onClick={(e) => {
                e.stopPropagation()
                if (isOpenFilter) {
                  setFieldValue('vehicleHeight', null)
                  setFieldValue('vehicleType1', false)
                  setFieldValue('vehicleType2', false)
                  setFieldValue('charger', false)
                  setFieldValue('sliderHeight', 1.4)
                  setFieldValue('height', false)
                }
                setIsOpenFilter(!isOpenFilter)
              }}
            >
              <FilterImg className="fill-blue-1" />
            </button>
          </div>
        }
      />
      {isOpenFilter && <FindSpotFilter />}
    </>
  )
}

export default FindSpotControls
