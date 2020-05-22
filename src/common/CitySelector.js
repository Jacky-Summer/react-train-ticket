import React, { useState, useMemo, useEffect } from 'react'
import classNames from 'classnames'
import './CitySelector.css'

export default function CitySelector(props) {
  const { show, cityData, isLoading, onBack, fetchCityData } = props
  const [searchKey, setSearchKey] = useState('')
  const key = useMemo(() => searchKey.trim(), [searchKey])

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return
    }

    fetchCityData()
  }, [show, cityData, isLoading]) // eslint-disable-line

  return (
    <div
      className={classNames('city-selector', {
        hidden: !show,
      })}
    >
      <div className='city-search'>
        <div className='search-back' onClick={() => onBack()}>
          <svg width='42' height='42'>
            <polyline
              points='25,13 16,21 25,29'
              stroke='#fff'
              strokeWidth='2'
              fill='none'
            />
          </svg>
        </div>
        <div className='search-input-wrapper'>
          <input
            type='text'
            className='search-input'
            placeholder='城市、车站的中文或拼音'
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          onClick={() => setSearchKey('')}
          className={classNames('search-clean', {
            hidden: key.length === 0,
          })}
        >
          &#xf063;
        </i>
      </div>
    </div>
  )
}
