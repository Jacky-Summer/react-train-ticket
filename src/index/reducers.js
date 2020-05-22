import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_CITY_DATA,
  ACTION_SET_IS_LOADING_CITY_DATA,
  ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_DEPART_DATE,
} from './actions'

const defaultState = {
  from: '深圳',
  to: '上海',
  isCitySelectorVisible: false,
  currentSelectingLeftCity: false,
  cityData: null,
  isLoadingCityData: false,
  isDateSelectorVisible: false,
  departDate: Date.now(),
  highSpeed: false,
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  console.log(action)
  switch (type) {
    case ACTION_SET_FROM: // 设置出发地
      return { ...state, from: payload }
    case ACTION_SET_TO: // 设置目的地
      return { ...state, to: payload }
    case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
      return { ...state, isCitySelectorVisible: payload }
    case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
      return { ...state, payload }
    case ACTION_SET_CITY_DATA:
      return { ...state, cityData: payload }
    case ACTION_SET_IS_LOADING_CITY_DATA:
      return { ...state, isLoadingCityData: payload }
    case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
      return { ...state, payload }
    case ACTION_SET_HIGH_SPEED:
      return { ...state, payload }
    case ACTION_SET_DEPART_DATE:
      return { ...state, payload }
    default:
      return state
  }
}
