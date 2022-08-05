import React, { useState } from 'react'
import axios from 'axios'
import { TextButton } from './misc'

export default function RateLimit() {
  let [result, setResult] = useState('not yet called')

  const triggerEvent = async (event: React.FormEvent) => {
    event.preventDefault()

    setResult('Loading...')

    const res = await axios.get('/express/examples/ratelimit')
    setResult(res.data.toString())
  }

  return <>
    <h1>Rate limit example</h1>
    <TextButton onClick={triggerEvent}>Trigger Event</TextButton>
    <p>Result: {result}</p>
  </>
}
