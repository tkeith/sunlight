import { useState, useEffect } from 'react'
import axios from 'axios'
import { SubmitButton, TextInput } from './misc.js'

export default function BullMQ() {
  let [schedRes, setSchedRes] = useState()

  const saveText = async event => {
    event.preventDefault()

    const res = await axios.post('/express/examples/saveTextAfterDelay', {
      text: event.target.text.value,
      delay: parseInt(event.target.delay.value)
    })

    setSchedRes(res.data)

  }

  return <>
    <form onSubmit={saveText}>
      <TextInput name='text' placeholder='text' />
      <TextInput name='delay' placeholder="delay (ms)" />
      <SubmitButton>Update text after delay</SubmitButton>
    </form>
    <p>Res: {JSON.stringify(schedRes)}</p>
  </>

}
