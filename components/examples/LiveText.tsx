import { useState, useEffect } from 'react'
import axios from 'axios'

export default function LiveText({ source }: {source: 'mongo' | 'redis'}) {
  let [text, setText] = useState('loading...')

  useEffect(() => {

    const updateText = async () => {
      let url: string;
      if (source == 'mongo') {
        url = '/express/examples/getText';
      } else if (source == 'redis') {
        url = '/express/examples/redis/getText';
      } else {
        throw new Error('invalid source');
      }
      const res = await axios.get(url)
      setText(res.data.text)
    }

    updateText()

    const interval = setInterval(updateText, 250)
    return () => { clearInterval(interval) }
  }, [source])

  return <>
    <p>Text: <span className='liveTextData'>{text}</span></p>
  </>

}
