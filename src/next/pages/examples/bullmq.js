import { useState, useEffect } from 'react'
import axios from 'axios'
import { SubmitButton, TextInput } from '../../components/examples'

export default function Page() {
  let [text, setText] = useState('loading...')
  let [schedRes, setSchedRes] = useState()

  useEffect(() => {

    const updateText = async () => {
      const res = await axios.get('/express/examples/getText')
      setText(res.data.text)
    }

    updateText()

    const interval = setInterval(updateText, 250)
    return () => { clearInterval(interval) }
  }, [])

  const saveText = async event => {
    event.preventDefault()

    const res = await axios.post('/express/examples/saveTextAfterDelay', {
      text: event.target.text.value,
      delay: parseInt(event.target.delay.value)
    })

    setSchedRes(res.data)

  }

  return <>
    <p>Text: {text}</p>
    <form onSubmit={saveText}>
      <TextInput name='text' />
      <TextInput name='delay' placeholder="delay (ms)" defaultValue="3000" />
      <SubmitButton>Update text after delay</SubmitButton>
    </form>
    <p>Res: {JSON.stringify(schedRes)}</p>
  </>

}
