import React from 'react'
import { useRouter } from 'next/router'
import { PageHeaderMobile } from '@components/PageHeader'
import SpotoLogo from '@assets/icons/logos/spoto-logo-blue.svg'
import Facebook from '@assets/icons/socials/facebook.svg'
import Twitter from '@assets/icons/socials/twitter.svg'
import Linkedin from '@assets/icons/socials/linkedin.svg'
import { ROUTES } from '@constants/routes'

const Help: React.FC = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile showBackButton={true} title={'Help'} />
      <div className="mt-[25px] mx-[45px] mb-[15px] flex flex-col justify-center items-center flex-1">
        <SpotoLogo />
        <div className="text-blue-1 text-[10px] mt-[10px]">
          SPOTO.CO is a unique web-based software platform that integrates with
          our proprietary hardware (Spollard) to convert your parking spot into
          a functional piece of real estate.
        </div>
        <div className="mt-[50px] px-[18px] text-center">
          <span className="text-[14px] font-semibold">Contact us:</span>
          <div className="mt-[10px] flex flex-col items-center">
            <a className="text-primary text-[16px]" href="tel:+610749395550">
              <span className="font-semibold">+61</span> (07) 4939 5550
            </a>
            <a className="text-primary text-[16px]" href="tel:+610883969440">
              <span className="font-semibold">+61</span> (08) 8396 9440{' '}
            </a>
            <a
              className="text-primary text-[16px] underline underline-offset-1"
              href="mailto:ernstanixzigenyn@poeticise.ml"
            >
              ernstanixzigenyn@poeticise.ml
            </a>
          </div>
        </div>
        <div className="mt-[50px] px-[18px] text-center w-full">
          <span className="text-[14px] font-semibold ">Social Media:</span>
          <div className="mt-[15px] flex justify-between">
            <Facebook />
            <Twitter />
            <Linkedin />
          </div>
        </div>
        <div className="mt-auto flex flex-col items-center">
          <a
            onClick={() => router.push({ pathname: ROUTES.HELP_TERMS })}
            className="text-primary text-[14px] underline underline-offset-1 mb-[10px]"
          >
            Terms of Service
          </a>
          <a
            onClick={() => router.push({ pathname: ROUTES.HELP_POLICY })}
            className="text-primary text-[14px] underline underline-offset-1"
          >
            Privacy Policy
          </a>
        </div>
        <div className="mt-[35px] flex flex-col items-center">
          <span className="text-blue-1 text-[12px]">Version: V1.0</span>
          <span className="text-blue-1 text-[12px]">2022 Spoto.</span>
        </div>
      </div>
    </div>
  )
}

export default Help
