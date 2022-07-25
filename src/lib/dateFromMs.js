export default function dateFromMs(timeInMs) {
  const res = new Date()
  res.setTime(timeInMs)
  return res
}
