import { groupApi } from '@api/group'
import { userApi } from '@api/user'
import { houseApi } from '@api/house'
import { spotApi } from '@api/spot'
import authenticationApi from '@api/authentication'
import { profileApi } from '@api/profile'

type EndpointNames =
  | keyof typeof userApi.endpoints
  | keyof typeof groupApi.endpoints
  | keyof typeof houseApi.endpoints
  | keyof typeof spotApi.endpoints
  | keyof typeof authenticationApi.endpoints
  | keyof typeof profileApi.endpoints

export const getRunningRequest = async <T = any>(
  api,
  endpointName: EndpointNames
): Promise<[Promise<unknown>, T] | []> => {
  await new Promise((r) => setTimeout(r, 0))

  const promise = api.util.getRunningOperationPromises().find(
    (p) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      p.arg?.endpointName === endpointName ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      p.queryCacheKey.includes(endpointName)
  )

  if (!promise) return []

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const args = promise.arg?.originalArgs || promise.arg

  return [promise, args]
}
