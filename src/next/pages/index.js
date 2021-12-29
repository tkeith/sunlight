import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getText } from '../../lib/misc.js'

export default function Home({ text }) {
  return (
    <p>hello world. text: {text}</p>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      text: await getText()
    }
  }
}
