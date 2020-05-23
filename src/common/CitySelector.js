import React, { useState, useMemo, useEffect, useCallback, memo } from 'react'
import classNames from 'classnames'
import PropsTypes from 'prop-types'
import './CitySelector.css'

const CityItem = memo(function CityItem(props) {
  const { name, onSelect } = props
  return (
    <li className='city-li' onClick={() => onSelect(name)}>
      {name}
    </li>
  )
})

CityItem.propsTypes = {
  name: PropsTypes.string.isRequired,
  onSelect: PropsTypes.func.isRequired,
}

const SuggestItem = memo(function SuggestItem(props) {
  const { name, onClick } = props
  return (
    <li className='city-suggest-li' onClick={() => onClick(name)}>
      {name}
    </li>
  )
})

SuggestItem.propsTypes = {
  name: PropsTypes.string.isRequired,
  onClick: PropsTypes.func.isRequired,
}

const Suggest = memo(function Suggest(props) {
  const { searchKey, onSelect } = props
  const [result, setResult] = useState([])

  useEffect(() => {
    fetch('/rest/search?key=' + searchKey)
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data
        if (sKey === searchKey) {
          setResult(result)
        }
      })
  }, [searchKey])

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [
        {
          display: searchKey,
        },
      ]
    }

    return result
  }, [result, searchKey])

  return (
    <div className='city-suggest'>
      <div className='city-suggest-ul'>
        {fallBackResult.map(item => {
          return <SuggestItem key={item.display} name={item.display} onClick={onSelect} />
        })}
      </div>
    </div>
  )
})

Suggest.propsTypes = {
  searchKey: PropsTypes.string.isRequired,
  onSelect: PropsTypes.func.isRequired,
}

const CitySection = memo(function CitySection(props) {
  const { title, onSelect, cities } = props
  if (typeof cities === 'undefined') {
    return (
      <ul className='city-ul'>
        <li className='city-li' key={title} data-cate={title}>
          {title}
        </li>
      </ul>
    )
  } else {
    return (
      <ul className='city-ul'>
        <li className='city-li' key={title} data-cate={title}>
          {title}
        </li>
        {cities.map(city => {
          return <CityItem key={city.name} name={city.name} onSelect={onSelect} />
        })}
      </ul>
    )
  }
})

CitySection.propsTypes = {
  title: PropsTypes.string.isRequired,
  onSelect: PropsTypes.func.isRequired,
  cities: PropsTypes.array.isRequired,
}

const AlphaIndex = memo(function AlphaIndex(props) {
  const { alpha, onClick } = props
  return (
    <i className='city-index-item' onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  )
})

// 输出26个英文字母
const alphabet = Array.from(new Array(26)).map((ele, index) => {
  return String.fromCharCode(65 + index)
})

const CityList = memo(function CityList(props) {
  const { sections, onSelect, toAlpha } = props

  return (
    <div className='city-list'>
      <div>
        {sections.map(section => {
          return (
            <CitySection
              onSelect={onSelect}
              key={section.title}
              title={section.title}
              cities={section.citys}
            />
          )
        })}
      </div>
      <div className='city-index'>
        {alphabet.map(alpha => {
          return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />
        })}
      </div>
    </div>
  )
})

CityList.propsTypes = {
  sections: PropsTypes.array.isRequired,
  onSelect: PropsTypes.func.isRequired,
}

const CitySelector = memo(function CitySelector(props) {
  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props
  const [searchKey, setSearchKey] = useState('')
  const key = useMemo(() => searchKey.trim(), [searchKey])

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return
    }

    fetchCityData()
  }, [show, cityData, isLoading]) // eslint-disable-line

  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView({
      behavior: 'smooth',
    })
  }, [])

  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading...</div>
    }
    if (cityData) {
      return (
        <CityList sections={cityData.cityList} onSelect={onSelect} toAlpha={toAlpha} />
      )
    }
    return <div>error</div>
  }

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
      {Boolean(key) && <Suggest searchKey={key} onSelect={key => onSelect(key)} />}
      {outputCitySections()}
    </div>
  )
})

CitySelector.propsTypes = {
  show: PropsTypes.bool.isRequired,
  cityData: PropsTypes.array.isRequired,
  isLoading: PropsTypes.bool.isRequired,
  fetchCityData: PropsTypes.func.isRequired,
  onSelect: PropsTypes.func.isRequired,
}

export default CitySelector
