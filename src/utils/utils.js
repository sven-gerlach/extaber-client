import moment from 'moment'

export const getFormattedDateTime = datePublished => {
  const nowInMilliSeconds = Date.now()
  const datePublishedInMilliSeconds = Date.parse(datePublished)
  const elapsedTime = nowInMilliSeconds - datePublishedInMilliSeconds
  const milliSecondsPerDay = 24 * 60 * 60 * 1000

  if (elapsedTime < milliSecondsPerDay) return moment(datePublished).format('hh:mm')
  if (elapsedTime < 7 * milliSecondsPerDay) return moment(datePublished).format('dddd')
  return moment(datePublished).format('Do MMM YY')
}
