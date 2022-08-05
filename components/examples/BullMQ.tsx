import React, { useState } from 'react'
import axios from 'axios'
import { SubmitButton, TextInput } from './misc'

export default function BullMQ() {
  let [schedRes, setSchedRes] = useState()

  const saveText = async (event: React.FormEvent) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    const res = await axios.post('/express/examples/saveTextAfterDelay', {
      text: formData.get('text') as string,
      delay: parseInt(formData.get('delay') as string),
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
