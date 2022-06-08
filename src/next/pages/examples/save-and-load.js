import Head from 'next/head'
import Image from 'next/image'
import { getText } from '../../../lib/misc.js'
import Router from 'next/router'
import axios from 'axios'
import { SubmitButton, TextInput } from '../../components/examples.js'

function Form({ startingText }) {
  const saveText = async event => {
    event.preventDefault()

    await axios.post('/express/examples/saveText', {
      text: event.target.text.value
    })

    Router.reload()
  }

  return (
    <form onSubmit={saveText}>
      <TextInput name='text' placeholder='enter text' defaultValue={startingText} />
      <SubmitButton>Save</SubmitButton>
    </form>
  )
}

export default function SaveAndLoad({ text }) {
  return (
    <>
      <h1 className='text-xl'>Current text</h1>
      <p>{text}</p>
      <h1 className='mt-8 text-xl'>Update text</h1>
      <Form startingText={text} />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      text: await getText()
    }
  }
}
