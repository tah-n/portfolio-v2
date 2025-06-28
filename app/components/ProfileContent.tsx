'use client'
import React, { useEffect, useRef } from 'react'
import Container from './Container'
import gsap from 'gsap';
import ParagraphAnim from './ui/ParagraphAnim';
import SkillContainer from './SkillContainer';
import { useStore } from '@react-three/fiber';
import useProps from './lib/useStore';

const ProfileContent = () => {
    const text1 = `Hello and Welcome to my portfolio, I'm Tahere, a self-taught front-end developer passionate about creative coding, UI animations, and interactive web experiences.`;
    const words1 = text1.split('');
    const text2 = 'Currently studying computer engineering and trying to build new and interesting things on the web using new technologies.'
    const words2 = text2.split('');
    const setDisplayProfile = useProps(state => state.setDisplayProfile)
    

    const handleClose = () => {
        setDisplayProfile(false);
    }


    return (
    <Container closeButton={handleClose}>
        <div className='relative w-full h-[86vh] p-5 py-9 overflow-hidden no-scrollbar tracking-wider text-3'>
            <div className='w-full h-full'>
                <ParagraphAnim words={words1} delay={0}/>
                <br/>
                <ParagraphAnim words={words2} delay={16} />
                <br/>
                <br/>
            </div>
            
            {/* skills */}
            <SkillContainer />
            
        </div>
    </Container>
  )
}

export default ProfileContent
