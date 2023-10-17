import faker from '@faker-js/faker'

export type TempMailEmailsResponse = {
  count: number
  first_id: number
  last_id: number
  limit: number
  mail_list: MailListItem[]
  more: boolean
  result: boolean
}

export type MailListItem = {
  attachment_count: number
  first_attachment_name: string
  from_mail: string
  from_name: string
  is_new: boolean
  mail_id: number
  subject: string
  time: string
}

export type TempMailEmailContent = {
  attachments: []
  date: string
  from: string
  from_is_local: boolean
  from_mail: string
  from_name: string
  html: string
  is_tls: boolean
  mail_id: number
  message_id: string
  result: boolean
  subject: string
  text: string
  to: string
}

export const getRandomTempMail = () => {
  return faker.internet.userName() + '@mailto.plus'
}

export const getEmails = (email: string, limit = 10) => {
  return cy
    .request<TempMailEmailsResponse>({
      method: 'GET',
      url: `https://tempmail.plus/api/mails?email=${encodeURIComponent(
        email
      )}&limit=${limit}`,
    })
    .then((res) => res.body)
}

// Email is created upon issue of first GET request
export const createEmail = (email: string) => {
  getEmails(email, 1)
}

export const getEmailContent = (
  emailId: MailListItem['mail_id'],
  email: string
) => {
  return cy
    .request<TempMailEmailContent>({
      method: 'GET',
      url: `https://tempmail.plus/api/mails/${emailId}?email=${encodeURIComponent(
        email
      )}`,
    })
    .then((res) => res.body)
}
