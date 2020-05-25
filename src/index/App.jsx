import React, { useMemo, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './App.css'
import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Submit from './Submit'
import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'
import { h0 } from '../common/fp'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed,
} from './actions'

function App(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData,
    departDate,
    isDateSelectorVisible,
    highSpeed,
  } = props
  const onBack = () => {
    window.history.back()
  }

  const cbs = useMemo(() => {
    return bindActionCreators({ exchangeFromTo, showCitySelector }, dispatch)
  }, []) // eslint-disable-line

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      { onBack: hideCitySelector, fetchCityData, onSelect: setSelectedCity },
      dispatch
    )
  }, []) // eslint-disable-line

  const departDateCbs = useMemo(() => {
    return bindActionCreators({ onClick: showDateSelector }, dispatch)
  }, []) // eslint-disable-line

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      { onBack: hideDateSelector, onSelect: setDepartDate },
      dispatch
    )
  }, []) // eslint-disable-line

  const onSelectDate = useCallback(day => {
    if (!day) {
      return
    }

    if (day < h0) {
      return
    }

    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  }, []) // eslint-disable-line

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators({ toggle: toggleHighSpeed }, dispatch)
  }, []) // eslint-disable-line

  return (
    <div>
      <div className='header-wrapper'>
        <Header title='火车票' onBack={onBack} />
      </div>
      <form action='./query.html' className='form'>
        <Journey from={from} to={to} {...cbs} />
        <DepartDate time={departDate} {...departDateCbs} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
        onSelect={onSelectDate}
      ></DateSelector>
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
