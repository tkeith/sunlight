import Head from 'next/head'
import Image from 'next/image'
import { getText } from '../../../lib/misc.js'
import Router from 'next/router'
import axios from 'axios'

function Form({ startingText }) {
  const saveText = async event => {
    event.preventDefault()

    const res = await axios.post('/express/save', {
      text: event.target.text.value
    })

    Router.reload()
  }

  return (
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="text" aria-describedby="textHelp" placeholder="enter text" defaultValue={startingText} />
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
        ease-in-out">Save</button>
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
