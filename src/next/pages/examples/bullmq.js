import { useState, useEffect } from 'react'
import axios from 'axios'

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
      <div className="form-group mb-6">
        <input type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="text" aria-describedby="textHelp" placeholder="text" defaultValue='' />
      </div>
      <div className="form-group mb-6">
        <input type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="delay" aria-describedby="textHelp" placeholder="delay (ms)" defaultValue='3000' />
      </div>
      <button type="submit" className="
        px-6
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
        ease-in-out">Update text after delay</button>
    </form>
    <p>Res: {JSON.stringify(schedRes)}</p>
  </>

}
