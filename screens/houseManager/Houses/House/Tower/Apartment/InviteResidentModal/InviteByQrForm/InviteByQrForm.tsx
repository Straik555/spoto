import React from 'react'
import QRCode from 'react-qr-code'

import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import { useDateUtil } from '@hooks/useDateUtil'
import { dateFormats } from '@constants/global'
import Loader from '@components/Loader/Loader'
import { useShareLink } from '@hooks/useShareLink'

import BottomButtons from '../BottomButtons'
import { InviteByQrFormProps } from './InviteByQrForm.model'
import useInviteByQrForm from './useInviteByQrForm'

const InviteByQrForm: React.FC<InviteByQrFormProps> = (props) => {
  const { closeModal } = props
  const dateUtil = useDateUtil()
  const [state, actions] = useInviteByQrForm()
  const { expires, loading, isExpired, qrCodeLink } = state
  const { handlePerformQrCode, handleRenewQrCode } = actions
  const { share, canShare } = useShareLink({ url: qrCodeLink })

  return (
    <Loader loading={loading}>
      <div className="flex mt-[20px] mb-[14px]">
        <QRCode size={121} value={qrCodeLink} />
        <div className="flex flex-col ml-[15px]">
          <div className="mb-1 text-blue-1 text-s-sm">Expires on:</div>
          <div className="mb-[16px] font-semibold w-[175px]">
            {isExpired ? (
              <span className="text-red">Code Expired</span>
            ) : (
              dateUtil(expires).format(dateFormats.display6)
            )}
          </div>
          <Button
            onClick={() => share()}
            mode={ButtonMode.FULL_PRIMARY}
            disabled={isExpired}
          >
            {canShare ? 'Share' : 'Copy'}
          </Button>
          <Button
            className="text-s-sm !font-semibold text-primary mt-[11px]"
            disabled={!isExpired}
            mode={ButtonMode.BASE}
            onClick={handleRenewQrCode}
          >
            Generate New Code
          </Button>
        </div>
      </div>
      <BottomButtons
        closeModal={closeModal}
        handleSubmit={handlePerformQrCode}
        submitDisabled={false}
        submitButtonText="Print"
      />
    </Loader>
  )
}

export default InviteByQrForm
