import React, { FC } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import Dialog from '@components/Dialog/Dialog'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import Close from '@assets/icons/close-24.svg'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

type CardProps = {
  clientSecret: string
  isOpen: boolean
  closeModal: () => void
}

// TODO take this key from env variables
const stripePromise = loadStripe('pk_test_krRHS2hTTfNYIMSSbK2v4qeT')

const PaymentDialog: FC<CardProps> = ({ clientSecret, isOpen, closeModal }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDialogContent
        clientSecret={clientSecret}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Elements>
  )
}

const PaymentDialogContent: FC<CardProps> = ({
  clientSecret,
  isOpen,
  closeModal,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('click')

    if (!stripe || !elements) {
      console.log('Stripe.js has not yet loaded.')
      return
    }

    const stripeCardElement = elements.getElement(CardElement)
    if (stripeCardElement) {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: stripeCardElement,
          },
        })
      console.log('paymentIntent', paymentIntent)
      if (stripeError) {
        toast.error(stripeError.message || 'Insufficient funds.')
        console.log(stripeError.message)
      } else {
        toast.success('Success.')
        closeModal()
      }
    }
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} className="w-[343px] !p-4">
      <div className="absolute right-1 top-1" onClick={closeModal}>
        <Close className="fill-blue-3" />
      </div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card">Card</label>
        <CardElement id="card" className="mb-[16px] mt-[8px]" />
        <Button mode={ButtonMode.FULL_PRIMARY} type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
    </Dialog>
  )
}

export default PaymentDialog
