import {useUsersQuery} from "src/api-hooks/user/useUsersQuery";
import {UsersQueryResponseDataItem} from "src/_requests/Maja";

type useIsAvailableUserReturnType = {
  userFound: boolean;
  isLoading: boolean;
  user: UsersQueryResponseDataItem | undefined;
}

export default function useIsAvailableUser(userId?: string): useIsAvailableUserReturnType {
  const {data: usersDataResult, isLoading} = useUsersQuery({
    id: Number(userId),
    filters: {},
    sorts: {}
  }, {enabled: !!userId});
  const userFound = ((usersDataResult?.data?.items?.length || 0) > 0) && !isLoading && !!userId
  const user = usersDataResult?.data?.items?.[0]

  return {
    userFound,
    isLoading,
    user
  }
}
