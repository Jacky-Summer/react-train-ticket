import { useCallback } from 'react'

import { h0 } from '../common/fp'

export default function useNav(departDate, dispatch, prevDate, nextDate) {
  const isPrevDisabled = h0() >= departDate
  const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000 // 只允许购买20天内的火车票

  const prev = useCallback(() => {
    if (isPrevDisabled) {
      return
    }
    dispatch(prevDate())
  }, [isPrevDisabled]) // eslint-disable-line

  const next = useCallback(() => {
    if (isNextDisabled) {
      return
    }
    dispatch(nextDate())
  }, [isNextDisabled]) // eslint-disable-line

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  }
}
