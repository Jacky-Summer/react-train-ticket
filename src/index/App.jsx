import React, { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './App.css'
import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Submit from './Submit'
import CitySelector from '../common/CitySelector'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
} from './actions'

function App(props) {
  const { from, to, dispatch, isCitySelectorVisible, isLoadingCityData, cityData } = props
  const onBack = () => {
    window.history.back()
  }

  const cbs = useMemo(() => {
    return bindActionCreators({ exchangeFromTo, showCitySelector }, dispatch)
  }, []) // eslint-disable-line

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({ onBack: hideCitySelector, fetchCityData }, dispatch)
  }, []) // eslint-disable-line

  return (
    <div>
      <div className='header-wrapper'>
        <Header title='火车票' onBack={onBack} />
      </div>
      <form className='form'>
        <Journey from={from} to={to} {...cbs} />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
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
