'use client'
import React from 'react'
import SkillsSection from './SkillsSection';

const SkillContainer = () => {
  return (
    <div className='absolute top-60 right-2 text-white w-full !h-[340px] mt-32'>
        <div className='relative w-full h-full flex items-center justify-center'>
            <SkillsSection />
        </div>        
    </div>
  )
}

export default SkillContainer;
