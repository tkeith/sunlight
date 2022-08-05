import React, { useState } from 'react'
import axios from 'axios'
import { TextButton } from './misc'

export default function RedLock() {
  let [result, setResult] = useState('not yet called')

  const acquireLock = async (event: React.FormEvent) => {
    event.preventDefault()

    setResult('loading...')

    const res = await axios.post('/express/examples/redlock')
    setResult(res.data.toString())
  }

  return <>
    <h1>Redlock application-level locking example</h1>
    <TextButton onClick={acquireLock}>Acquire Lock</TextButton>
    <p>Result: {result}</p>
  </>
}
