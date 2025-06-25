'use client'
import React, { useEffect, useState } from 'react'
import Button from './ui/Button';
import InputPlaceHolder from './ui/InputPlaceHolder';
import useProps from './lib/useStore';
import Notification from './Notification';
import Container from './Container';



const Contact = () => {
    const [message,setMessage] = useState('');
    const name = useProps(state => state.name);
    const setName = useProps(state => state.setName);  
    const {email,setEmail} = useProps();
    const setDisplayContact = useProps(state => state.setDisplayContact);
    const [notifText,setNotifText] = useState('');
    const setShowNotification = useProps(state => state.setShowNotification);



    const handleSubmit= async (e: React.FormEvent) => {
        e.preventDefault();

        if(message !== '' && email !== '') {
            setShowNotification(true);
            setNotifText('sending...');
            const response = await fetch(`/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name,email,message})
            });
            if (!response.ok) {
                setNotifText('failed to send email');
                setTimeout(() => {
                    setShowNotification(false);
                },4000)
                } else {
                setNotifText('email sent');
                setTimeout(() => {
                    setShowNotification(false);
                },4000)
                setEmail('');
                setMessage('');
                setName('');
                }
        } else {
            setShowNotification(true);
            setNotifText('please fill email and message');
            setTimeout(() => {
                setShowNotification(false);
            },4000)
        }

    }



  return (
    <div className='absolute z-10 sm:left-8 top-[6%] h-auto w-[98vw] sm:!w-[95vw] max-w-[600px]'>
            <Container className='relative !m-auto py-8 ' closeButton={() => setDisplayContact(false)}>
                <Button className='m-auto mt-10'>
                    <div className='w-full h-full flex items-center justify-center overflow-hidden'>
                    <div className=' w-full h-full flex items-center justify-center'>
                        <p className='!font-silkscreenB text-3xl !pointer-events-none text-3'>
                            Get in Touch
                        </p>
                    </div>
                    </div>
                </Button>

                {/* inputs here */}
                <div className='w-full flex flex-col items-center justify-center sm:py-5 py-2 pb-20 gap-5 !font-pressstart2p text-sm mt-12'>
                    <form className='flex flex-col items-center justify-center w-full gap-5 p-5' onSubmit={handleSubmit}>
                        <InputPlaceHolder text={'Name'} type='text' value={name} onChange={(e) => setName(e.target.value)} length={name.length} />
                        <InputPlaceHolder text={'Email'} type='email' value={email} pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" onChange={(e) => setEmail(e.target.value)} length={email.length} />
                        <Button className='!p-1 !relative' borderClassName='!opacity-10'>
                            <textarea className='outline-none sm:h-32 h-22 p-3 resize-none md:w-[300px] w-[300px]' placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} />
                        </Button> 
                       
                    </form>
                    <button 
                    type='submit'
                    className='relative w-52 h-10 sm:mt-5 sm:mb-8 cursor-pointer border border-white/40 overflow-hidden hover:border-1 transition-all duration-100 ease-in-out m-auto' onClick={handleSubmit}>
                        <div className='w-full h-full relative flex items-center justify-center group'>
                            <p className='z-10'>
                                Submit
                            </p>
                            <div className='absolute top-full group-hover:top-0 bg-1 w-full h-full transition-all ease-in-out duration-300' />
                        </div>
                    </button>
                </div>
                <Notification text={notifText} />
            </Container>
    </div>
  )
}

export default Contact;
