import { HttpUtils } from "@utils/appUtils"
import { useCallback, useMemo } from "react"

const useQuery = () => useCallback(HttpUtils.createQueryString, []);
export default useQuery;