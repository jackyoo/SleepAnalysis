import { useCallback } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUserId } from "../data/sleepSessionSlice"
import { useLazyFetchSleepIntervalByUserIdQuery } from "../useCases/fetchSleepSessionUseCase"
import moment from "moment"

interface ISleepIntervalProp {
    userId: string
}

const useSleepIntervalViewModel = ({userId}: ISleepIntervalProp) => {
    const dispatch = useDispatch()
    const [fetchSleepIntervalByUserId, { data, error, isLoading }] = useLazyFetchSleepIntervalByUserIdQuery();
    
    const fetchSleepIterval = useCallback(() => {
        fetchSleepIntervalByUserId(userId)
        dispatch(setCurrentUserId(userId))
        return {
            data, error, isLoading
        }
    }, [dispatch, fetchSleepIntervalByUserId]);
    
    return {
        fetchSleepIterval,
        transformedData: data?.intervals?.map((interval) => {
            return {
              id: interval.id,
              time: moment(interval.ts).format("MM/DD/YYYY"),
              stages: interval.stages,
              score: interval.score,
              tnt: interval.timeseries.tnt,
              tempRoomC: interval.timeseries.tempRoomC,
              tempBedC: interval.timeseries.tempBedC,
              respiratoryRate: interval.timeseries.respiratoryRate,
              heartRate: interval.timeseries.heartRate,
              heating: interval.timeseries.heating,
            };
          }),
        error,
        isLoading
    }
}

export default useSleepIntervalViewModel