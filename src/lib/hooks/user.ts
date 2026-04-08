import { getEncryptedItem } from '../utils/storage'

export interface IUser {
  companyName: string
  id: string
  userId: string
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

export const useCurrentUser = () => {
  return getEncryptedItem('user') as IUser
}
