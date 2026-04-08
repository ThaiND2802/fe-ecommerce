import { IStaffInfo, IUserAndGroupInfo, UserGroupType, UserStatus } from './types'

export const convertStaffInfoToUserGroupInfo: (staffInfo: IStaffInfo) => IUserAndGroupInfo = (
  userInfo: IStaffInfo,
) => {
  return {
    id: userInfo.user_id,
    name: userInfo.user_name,
    email: userInfo.email,
    image: userInfo.image,
    job: userInfo.job,
    department_name: userInfo.department_name,
    item_type: UserGroupType.USER,
    user_status: UserStatus.ACTIVE,
    member_count: 0,
    expired_count: 0,
  }
}
