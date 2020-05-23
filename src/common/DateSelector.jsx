import React from 'react'
import classnames from 'classnames'

import Header from '../common/Header'
import './DateSelector.css'

export default function DateSelector(props) {
  const { show, onBack } = props
  return (
    <div className={classnames('date-selector', { hidden: !show })}>
      <Header title='日期选择' onBack={onBack} />
      <div className='date-selector-tables'>123</div>
    </div>
  )
}
