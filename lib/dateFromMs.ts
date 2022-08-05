export default function dateFromMs(timeInMs: number) {
  const res = new Date()
  res.setTime(timeInMs)
  return res
}
