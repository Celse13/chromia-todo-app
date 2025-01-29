import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { Check } from 'lucide-react'
import Link from 'next/link'


export default function Header() {
  const [openModal, setOpenModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const [user] = useState({ image: null })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex justify-between bg-[#F1ECE6] p-3 my-5 rounded-xl'>
      <div>
        <Link href='/' className="flex items-center space-x-2">
          <span className="text-2xl font-bold">TODO</span>
          <Check className="text-orange-500 w-6 h-6" />
        </Link>
      </div>
      <div className='relative' ref={modalRef}>
        {user.image ? (
          <Image
            src={user.image}
            width={35}
            height={35}
            alt='User profile'
            className='cursor-pointer rounded-full'
            onClick={() => setOpenModal(!openModal)}
            priority={true}
          />
        ) : (
          <FaRegUserCircle
            size={35}
            className='text-[#323232] cursor-pointer'
            onClick={() => setOpenModal(!openModal)}
          />
        )}
      </div>
    </div>
  )
}
