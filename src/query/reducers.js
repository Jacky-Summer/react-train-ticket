import { ORDER_DEPART } from './constant'
import { h0 } from '../common/fp'
import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_TRAIN_LIST,
  ACTION_SET_ORDER_TYPE,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_TICKET_TYPES,
  ACTION_SET_CHECKED_TICKET_TYPES,
  ACTION_SET_TRAIN_TYPES,
  ACTION_SET_CHECKED_TRAIN_TYPES,
  ACTION_SET_DEPART_STATIONS,
  ACTION_SET_CHECKED_DEPART_STATIONS,
  ACTION_SET_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_ARRIVE_STATIONS,
  ACTION_SET_DEPART_TIME_START,
  ACTION_SET_DEPART_TIME_END,
  ACTION_SET_ARRIVE_TIME_START,
  ACTION_SET_ARRIVE_TIME_END,
  ACTION_SET_IS_FILTERS_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
} from './action'

const defaultState = {
  from: null,
  to: null,
  departDate: h0(Date.now()),
  highSpeed: false, // 只看高铁动车
  trainList: [],
  orderType: ORDER_DEPART, // 排序，默认是出发时间早到晚排序
  onlyTickets: false, // 只看有票
  ticketTypes: [], // 综合筛选
  checkedTicketTypes: {},
  trainTypes: [], // 坐席类型
  checkedTrainTypes: {},
  departStations: [], // 出发车站
  checkedDepartStations: {},
  arriveStations: [], // 到达车站
  checkedArriveStations: {},
  departTimeStart: 0, // 出发时间
  departTimeEnd: 24,
  arriveTimeStart: 0, // 到达时间
  arriveTimeEnd: 24,
  isFiltersVisible: false, // 综合筛选页面的显示隐藏
  searchParsed: false, // 标识是否解析完成
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_SET_FROM:
      return { ...state, from: payload }
    case ACTION_SET_TO:
      return { ...state, to: payload }
    case ACTION_SET_DEPART_DATE:
      return { ...state, departDate: payload }
    case ACTION_SET_HIGH_SPEED:
      return { ...state, highSpeed: payload }

    case ACTION_SET_TRAIN_LIST:
      return { ...state, trainList: payload }
    case ACTION_SET_ORDER_TYPE:
      return { ...state, orderType: payload }
    case ACTION_SET_ONLY_TICKETS:
      return { ...state, onlyTickets: payload }
    case ACTION_SET_TICKET_TYPES:
      return { ...state, ticketTypes: payload }
    case ACTION_SET_CHECKED_TICKET_TYPES:
      return { ...state, checkedTicketTypes: payload }
    case ACTION_SET_TRAIN_TYPES:
      return { ...state, trainTypes: payload }
    case ACTION_SET_CHECKED_TRAIN_TYPES:
      if (Object.keys(payload).length === 0) {
        return { ...state, checkedTrainTypes: {} }
      } else {
        let oldCheckedTrainTypes = state.checkedTrainTypes
        const newCheckedTrainTypes = Object.assign(oldCheckedTrainTypes, payload)
        return { ...state, checkedTrainTypes: newCheckedTrainTypes }
      }
    case ACTION_SET_DEPART_STATIONS:
      return { ...state, departStations: payload }
    case ACTION_SET_CHECKED_DEPART_STATIONS:
      return { ...state, checkedDepartStations: payload }
    case ACTION_SET_ARRIVE_STATIONS:
      return { ...state, arriveStations: payload }
    case ACTION_SET_CHECKED_ARRIVE_STATIONS:
      return { ...state, checkedArriveStations: payload }
    case ACTION_SET_DEPART_TIME_START:
      return { ...state, departTimeStart: payload }
    case ACTION_SET_DEPART_TIME_END:
      return { ...state, departTimeEnd: payload }
    case ACTION_SET_ARRIVE_TIME_START:
      return { ...state, arriveTimeStart: payload }
    case ACTION_SET_ARRIVE_TIME_END:
      return { ...state, arriveTimeEnd: payload }
    case ACTION_SET_IS_FILTERS_VISIBLE:
      return { ...state, isFiltersVisible: payload }
    case ACTION_SET_SEARCH_PARSED:
      return { ...state, searchParsed: payload }

    default:
      return state
  }
}
