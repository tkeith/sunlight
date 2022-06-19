import LiveText from '../../components/examples/LiveText.js'
import SaveText from '../../components/examples/SaveText.js'
import BullMQ from '../../components/examples/BullMQ.js'
import RedLock from '../../components/examples/RedLock.js'
import RateLimit from '../../components/examples/RateLimit.js'
import { getText } from '../../../lib/examples.js'

function Section({ name, children }) {
  return <div className='p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md items-center my-4'>
    <h1 className='text-2xl mb-2'>{name}</h1>
    {children}
  </div>
}

export default function Page({ text }) {
  return <div className='p-4'>
    <Section name='Server-side rendering'>
      <p>Server-side-rendered text: {text}</p>
    </Section>
    <Section name='Live text from MongoDB'><LiveText source='mongo' /></Section>
    <Section name='Live text from Redis'><LiveText source='redis' /></Section>
    <Section name='Save text to MongoDB'><SaveText source='mongo' /></Section>
    <Section name='Save text to Redis'><SaveText source='redis' /></Section>
    <Section name='BullMQ delayed task'><BullMQ /></Section>
    <Section name='RedLock application-level locking'><RedLock /></Section>
    <Section name='Rate limiting'><RateLimit /></Section>
  </div>
}

export async function getServerSideProps() {
  return {
    props: {
      text: await getText(),
      bodyClasses: 'bg-gray-100',
    }
  }
}
