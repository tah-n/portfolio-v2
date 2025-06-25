'use client'
import React, { useEffect, useState } from 'react'
import Button from './Button';
import useProps from '../lib/useStore';

type PropsType = {
    text: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    length: number;
    pattern?: string;
}

const InputPlaceHolder = ({text,type,value,onChange,length,pattern}: PropsType) => {
    const [movePlaceHolder,setMovePlaceHolder] = useState(false);


    useEffect(() => {
        window.addEventListener('focusout', () => setMovePlaceHolder(false));

        return () => window.removeEventListener('focusout', () => setMovePlaceHolder(false));
    },[])

  return (
    <Button className='!p-1 !relative' borderClassName='!opacity-10'>
        <input pattern={pattern} value={value} onChange={onChange} type={type} className='outline-none z-10 bg-white/10  w-[300px] md:w-[300px] h-10 p-3' onFocus={() => setMovePlaceHolder(true)} onBlur={() => setMovePlaceHolder(true)}   />
        <div className={`absolute top-4  ${movePlaceHolder || length > 0 ? '-translate-y-7 left-7 text-white/70 text-xs' : 'left-3 -translate-y-0 text-white/40 text-sm'} transition-all duration-300 ease-in-out`}>
            {text}
        </div>
    </Button>
  )
}

export default InputPlaceHolder;
