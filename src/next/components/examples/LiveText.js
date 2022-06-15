import { useState, useEffect } from 'react'
import axios from 'axios'

export default function LiveText({ source }) {
  let [text, setText] = useState('loading...')

  useEffect(() => {

    const updateText = async () => {
      let url;
      if (source == 'mongo') {
        url = '/express/examples/getText';
      } else if (source == 'redis') {
        url = '/express/examples/redis/getText';
      }
      const res = await axios.get(url)
      setText(res.data.text)
    }

    updateText()

    const interval = setInterval(updateText, 250)
    return () => { clearInterval(interval) }
  }, [])

  return <>
    <p>Text: {text}</p>
  </>

}
