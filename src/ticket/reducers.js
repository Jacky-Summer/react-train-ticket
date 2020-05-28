import {
  ACTION_SET_DEPART_DATE,
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_TRAIN_NUMBER,
  ACTION_SET_DURATION_STR,
  ACTION_SET_TICKETS,
  ACTION_SET_IS_SCHEDULE_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
} from './action'

const defaultState = {
  departDate: Date.now(),
  arriveDate: Date.now(),
  departTimeStr: null,
  arriveTimeStr: null,
  departStation: null,
  arriveStation: null,
  trainNumber: null,
  durationStr: null,
  tickets: [],
  isScheduleVisible: false, // 时刻表弹框是否显示
  searchParsed: false,
}
export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_SET_DEPART_DATE:
      return { ...state, departDate: payload }
    case ACTION_SET_ARRIVE_DATE:
      return { ...state, arriveDate: payload }
    case ACTION_SET_DEPART_TIME_STR:
      return { ...state, departTimeStr: payload }
    case ACTION_SET_ARRIVE_TIME_STR:
      return { ...state, arriveTimeStr: payload }
    case ACTION_SET_DEPART_STATION:
      return { ...state, departStation: payload }
    case ACTION_SET_ARRIVE_STATION:
      return { ...state, arriveStation: payload }
    case ACTION_SET_TRAIN_NUMBER:
      return { ...state, trainNumber: payload }
    case ACTION_SET_DURATION_STR:
      return { ...state, durationStr: payload }
    case ACTION_SET_TICKETS:
      return { ...state, tickets: payload }
    case ACTION_SET_IS_SCHEDULE_VISIBLE:
      return { ...state, isScheduleVisible: payload }
    case ACTION_SET_SEARCH_PARSED:
      return { ...state, searchParsed: payload }
    default:
      return state
  }
}
