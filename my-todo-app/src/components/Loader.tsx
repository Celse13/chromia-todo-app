import '@/app/globals.css'
import { LuLoader } from 'react-icons/lu'

type Prop = {
  text?: string
  typeOfLoader?: boolean
}

const Loader = ({ text, typeOfLoader }: Prop) => {
  return (
    <div className='flex items-center'>
      <LuLoader
        className={`${
          typeOfLoader ? 'w-8 h-8 text-blue-500' : 'text-gray-200 w-5 h-5'
        } animate-spin`}
      />
      <span className='ml-2'>{text}</span>
    </div>
  )
}

export default Loader
