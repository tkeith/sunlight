import axios from 'axios'
import React from 'react';
import { SubmitButton, TextInput } from './misc'

function Form({ source }: {source: 'mongo' | 'redis'}) {
  const saveText = async (event: React.FormEvent) => {
    event.preventDefault()

    let url: string;
    if (source == 'mongo') {
      url = '/express/examples/saveText';
    } else if (source == 'redis') {
      url = '/express/examples/redis/saveText';
    } else {
      throw Error('invalid source')
    }

    const formData = new FormData(event.target as HTMLFormElement)

    await axios.post(url, {
      text: formData.get('text') as string,
    })

  }

  return (
    <form onSubmit={saveText}>
      <TextInput name='text' placeholder='enter text' />
      <SubmitButton>Save</SubmitButton>
    </form>
  )
}

export default function SaveText({ source }: {source: 'mongo' | 'redis'}) {
  return (
    <>
      <Form source={source} />
    </>
  )
}
