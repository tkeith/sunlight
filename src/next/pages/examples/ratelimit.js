import { useState } from 'react'
import axios from 'axios'

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
    <button onClick={triggerEvent}
      className="px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out"
    >Trigger Event</button>
    <p>Result: {result}</p>
  </>
}
