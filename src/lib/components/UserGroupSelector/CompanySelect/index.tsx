import { useQuery } from '@tanstack/react-query'

import { userManagementQueries, ICompanyInfo } from '../../../entities/user-management'
import SelectSearch, { SelectSearchProps } from '../../SelectSearchCustomValue'
import Skeleton from '../../SkeletonBlock'

interface IProps extends SelectSearchProps<ICompanyInfo> {
  ignoreIds?: string[]
  isShare?: boolean
}

const Index = ({ ignoreIds, isShare, ...props }: IProps) => {
  const { data, isLoading } = useQuery(userManagementQueries.getCompanyList(isShare))

  if (isLoading) {
    return <Skeleton active block />
  }

  return (
    <SelectSearch
      fieldNames={{ label: 'company_name', value: 'company_code' }}
      options={data}
      loading={isLoading}
      popupMatchSelectWidth={false}
      {...props}
    />
  )
}

export default Index
