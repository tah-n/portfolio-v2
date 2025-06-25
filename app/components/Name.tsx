'use client'
import React from 'react'
import Button from './ui/Button';
import { MdCopyright } from 'react-icons/md';

const Name = () => {
  return (
    <div className='absolute bottom-0'>
        <div className='w-full h-full flex gap-1 text-xs text-white/70'>
          <div className='w-4 h-4 overflow-hidden'>
            <img src='assets/c.png' />
          </div>
          <p>TAHERE NAJAFI</p>
        </div>
    </div>
  )
}

export default Name;
