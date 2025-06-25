'use client'
import React from 'react'
import Button from './ui/Button';
import ButtonContent from './ui/ButtonContent';
import useProps from './lib/useStore';

const Profile = () => {

  const handleClick = () => {
    useProps.getState().setDisplayProfile(true);
  }

  return (
    <Button onClick={handleClick} className='relative group cursor-pointer hover:!text-white text-white' borderClassName='!border-white cursor-pointer'>
        <ButtonContent text='Profile' />
    </Button>
  )
}

export default Profile;
