'use client'
import React from 'react'
import Button from './ui/Button';
import ButtonContent from './ui/ButtonContent';
import useProps from './lib/useStore';

const Works = () => {

  const handleClick = () => {
    useProps.getState().setDisplayWorks(true);
  }
  
  return (
    <Button className='relative group cursor-pointer hover:!text-white text-white' borderClassName='!border-white cursor-pointer' onClick={handleClick} >
        <ButtonContent text='Works' />
    </Button>
  )
}

export default Works;
