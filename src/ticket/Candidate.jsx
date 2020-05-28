import React, { memo, useState, useMemo, useContext, useCallback } from 'react'
import URI from 'urijs'
import dayjs from 'dayjs'
import TrainContext from './context'
import './Candidate.css'

const Channel = memo(function Channel(props) {
  const { name, desc, type } = props

  const { trainNumber, departStation, arriveStation, departDate } = useContext(
    TrainContext
  )

  const src = useMemo(() => {
    return new URI('order.html')
      .setSearch('trainNumber', trainNumber)
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', type)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()
  }, [type, trainNumber, departStation, arriveStation, departDate])

  return (
    <div className='channel'>
      <div className='middle'>
        <div className='name'>{name}</div>
        <div className='desc'>{desc}</div>
      </div>
      <a href={src} className='buy-wrapper'>
        <div className='buy'>买票</div>
      </a>
    </div>
  )
})

const Seat = memo(function Seat(props) {
  const { type, priceMsg, ticketsLeft, channels, expanded, onToggle, idx } = props
  return (
    <li>
      <div className='bar' onClick={() => onToggle(idx)}>
        <span className='seat'>{type}</span>
        <span className='price'>
          <i>￥</i>
          {priceMsg}
        </span>
        <span className='btn'>{expanded ? '收起' : '预订'}</span>
        <span className='num'>{ticketsLeft}</span>
      </div>
      <div
        className='channels'
        style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
      >
        {channels.map(channel => {
          return <Channel key={channel.name} {...channel} type={type} />
        })}
      </div>
    </li>
  )
})

const Candidate = memo(function Candidate(props) {
  const { tickets } = props

  const [expandedIndex, setExpandedIndex] = useState(-1)

  const onToggle = useCallback(
    idx => {
      setExpandedIndex(idx === expandedIndex ? -1 : idx)
    },
    [expandedIndex]
  )

  return (
    <div className='candidate'>
      <ul>
        {tickets.map((ticket, idx) => {
          return (
            <Seat
              key={ticket.type}
              {...ticket}
              idx={idx}
              onToggle={onToggle}
              expanded={expandedIndex === idx}
            />
          )
        })}
      </ul>
    </div>
  )
})
export default Candidate
