import React, { useCallback, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import URI from 'urijs'
import dayjs from 'dayjs'

import Header from '../common/Header'
import Detail from '../common/Detail'
import Ticket from './Ticket'
import Passengers from './Passengers'
import Menu from './Menu'
import Account from './Account.jsx'

import './App.css'

import {
  setTrainNumber,
  setDepartStation,
  setArriveStation,
  setSeatType,
  setDepartDate,
  setSearchParsed,
  fetchInitial,
  createAdult,
  createChild,
  updatePassenger,
  removePassenger,
  hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
} from './action'

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch,
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, []) // eslint-disable-lint

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)

    const { trainNumber, dStation, aStation, type, date } = queries

    dispatch(setTrainNumber(trainNumber))
    dispatch(setDepartStation(dStation))
    dispatch(setArriveStation(aStation))
    dispatch(setSeatType(type))
    dispatch(setDepartDate(dayjs(date).valueOf()))
    dispatch(setSearchParsed(true))
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!searchParsed) {
      return
    }

    const url = new URI('/rest/order')
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()
    dispatch(fetchInitial(url))
  }, [searchParsed, departStation, arriveStation, seatType, departDate, dispatch])

  const passengerCbs = useMemo(() => {
    return bindActionCreators(
      {
        createAdult,
        createChild,
        updatePassenger,
        removePassenger,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu,
      },
      dispatch
    )
  }, []) // eslint-disable-line

  const menuCbs = useMemo(() => {
    return bindActionCreators({ hideMenu }, dispatch)
  }, []) // eslint-disable-line

  if (!searchParsed) {
    return null
  }

  return (
    <div>
      <div className='header-wrapper'>
        <Header title='订单列表' onBack={onBack} />
      </div>
      <div className='detail-wrapper'>
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        >
          <span style={{ display: 'block' }} className='train-icon'></span>
        </Detail>
      </div>
      <Ticket price={price} type={seatType} />
      <Passengers passengers={passengers} {...passengerCbs} />
      <Account length={passengers.length} price={price} />
      <Menu show={isMenuVisible} {...menu} {...menuCbs} />
    </div>
  )
}

const mapStateToProps = state => {
  return state
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
