import { useState } from 'react'
import axios from 'axios'
import { TextButton } from '../../components/examples.js'

export default function Page() {
  let [result, setResult] = useState('not yet called')

  const triggerEvent = async event => {
    event.preventDefault()

    setResult('loading...')

    const res = await axios.get('/express/examples/ratelimit')
    setResult(res.data.toString())
  }

  return <>
    <h1>Rate limit example</h1>
    <TextButton onClick={triggerEvent}>Trigger Event</TextButton>
    <p>Result: {result}</p>
  </>
}
