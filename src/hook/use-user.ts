import { useQuery } from '@tanstack/react-query'

import request from 'src/api/request'
import { ENDPOINT } from 'src/constants/api'
import { QUERY_KEY } from 'src/constants/queries'
import { VITE_APP_BACKEND_IDENTITY } from 'src/environments/environment'

export interface IUser {
  companyName: string
  id: string
  fullName: string
  image: string
  jobId: string
  job: string
  departmentId: string
  department: string
  positionId: string
  position: string
  ext: string
  phone: string
  managerId: string
  manager: string
  email: string
  startDate: string
  statusId: string
  status: string
  gender: string
  annualLeave: number
  signature: string
  tenant: string
}

export const useUser = (enabled: boolean) => {
  const userQuery = useQuery({
    queryKey: [QUERY_KEY.USER],
    queryFn: () =>
      request<IUser>({
        url: `${VITE_APP_BACKEND_IDENTITY}${ENDPOINT.PROFILE}`,
      }),
    staleTime: 1000,
    select: (data) => data.data,
    enabled,
  })

  return userQuery
}
