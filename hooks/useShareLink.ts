import { Share } from '@capacitor/share'
import { ShareOptions } from '@capacitor/share/dist/esm/definitions'
import { toast } from 'react-toastify'

export type ShareLinkOptions = ShareOptions

export const useShareLink = (opts: ShareLinkOptions = {}) => {
  const canShare = !(typeof navigator?.share === 'undefined')
  const canCopy = !(typeof navigator?.clipboard === 'undefined')

  const share = async () => {
    const urlWithParams = window.location.href.split('?')[0]

    if (canShare) {
      await Share.share({
        url: urlWithParams,
        dialogTitle: 'Share Link',
        ...opts,
      })
    } else {
      navigator?.clipboard
        ?.writeText(opts.url || urlWithParams)
        .then(() => toast.info('Copied'))
    }
  }

  return {
    canShare,
    canCopy,
    share,
  }
}
