import React, { useCallback, useEffect, useMemo, lazy, Suspense } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import URI from 'urijs'
import dayjs from 'dayjs'

import { h0 } from '../common/fp'
import useNav from '../common/useNav'
import Header from '../common/Header'
import Nav from '../common/Nav'
import Detail from '../common/Detail'
import Candidate from './Candidate'
import './App.css'

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  prevDate,
  nextDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,
  toggleIsScheduleVisible,
} from './action'

import TrainContext from './context'

const Schedule = lazy(() => import('./Schedule'))

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,

    dispatch,
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, []) // eslint-disable-line

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const { aStation, dStation, date, trainNumber } = queries

    dispatch(setDepartStation(dStation))
    dispatch(setArriveStation(aStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setDepartDate(h0(dayjs(date).valueOf())))

    dispatch(setSearchParsed(true))
  }, []) // eslint-disable-line

  useEffect(() => {
    document.title = trainNumber
  }, [trainNumber])

  useEffect(() => {
    if (!searchParsed) {
      return
    }

    const url = new URI('/rest/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString()

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const { detail, candidates } = result

        const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail

        dispatch(setDepartTimeStr(departTimeStr))
        dispatch(setArriveTimeStr(arriveTimeStr))
        dispatch(setArriveDate(arriveDate))
        dispatch(setDurationStr(durationStr))
        dispatch(setTickets(candidates))
      })
  }, [searchParsed, departDate, trainNumber, dispatch])

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  )

  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible,
      },
      dispatch
    )
  }, []) // eslint-disable-line

  if (!searchParsed) {
    return null
  }

  return (
    <div>
      <div className='header-wrapper'>
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <div className='nav-wrapper'>
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
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
          <span className='left'></span>
          <span className='schedule' onClick={() => detailCbs.toggleIsScheduleVisible()}>
            时刻表
          </span>
          <span className='right'></span>
        </Detail>
      </div>
      <TrainContext.Provider
        value={{ trainNumber, departStation, arriveStation, departDate }}
      >
        <Candidate tickets={tickets} />
      </TrainContext.Provider>

      {isScheduleVisible && (
        <div className='mask' onClick={() => dispatch(toggleIsScheduleVisible())}>
          <Suspense fallback={<div>loading...</div>}>
            <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            />
          </Suspense>
        </div>
      )}
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
