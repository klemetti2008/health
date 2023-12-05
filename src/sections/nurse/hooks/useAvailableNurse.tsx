import {useNursesQuery} from "src/api-hooks/nurse/useNursesQuery";

type useIsAvailableNurseReturnType = {
  nurseFound: boolean;
  isLoading: boolean;
}

export default function useIsAvailableNurse(nurseId?: string): useIsAvailableNurseReturnType {
  const {data: nursesDataResult, isLoading} = useNursesQuery({
    id: Number(nurseId),
    filters: {},
    sorts: {}
  }, {enabled: !!nurseId});
  const nurseFound = ((nursesDataResult?.data?.items?.length || 0) > 0) && !isLoading && !!nurseId

  return {
    nurseFound,
    isLoading,
  }
}
