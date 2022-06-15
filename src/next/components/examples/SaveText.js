import Router from 'next/router'
import axios from 'axios'
import { SubmitButton, TextInput } from './misc.js'

function Form({ source }) {
  const saveText = async event => {
    event.preventDefault()

    let url;
    if (source == 'mongo') {
      url = '/express/examples/saveText';
    } else if (source == 'redis') {
      url = '/express/examples/redis/saveText';
    }

    await axios.post(url, {
      text: event.target.text.value
    })

  }

  return (
    <form onSubmit={saveText}>
      <TextInput name='text' placeholder='enter text' />
      <SubmitButton>Save</SubmitButton>
    </form>
  )
}

export default function SaveText({ source }) {
  return (
    <>
      <Form source={source} />
    </>
  )
}
