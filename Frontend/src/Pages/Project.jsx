import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';

const project = () => {
    const location = useLocation();
    console.log(location.state.project);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  return (
    <main className='h-screen w-screen flex '>

        <section className="left flex flex-col h-full min-w-72 h-screen relative bg-slate-300">
            <header className='flex justify-end p-2 px-4 w-full bg-slate-100'>
              <button className='p-2' onClick={()=> setIsSidePanelOpen(!isSidePanelOpen)}>
                <i class="ri-group-fill"></i>
              </button>
            </header>

            <div className="conversation-area flex flex-col flex-grow">
              <div className="message-box flex-grow flex flex-col gap-2 p-1">
                <div className="incoming message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                  <small className='opacity-65 text-xs'>example@gmail.com</small>
                  <p className='text-sm'>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </p> 
                </div>
                <div className="message ml-auto max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                  <small className='opacity-65 text-xs'>example@gmail.com</small>
                  <p className='text-sm'>Lorem ipsum dolor sit amet </p> 
                </div>
              </div>

              <div className="input-field w-full flex">
                <input type="text" placeholder='Enter Message' className='p-2 px-4 border-none outline-none bg-white' />
                <button className='flex-grow px-4'><i class="ri-send-plane-fill" ></i></button>
              </div>
            </div>

            <div className={`side-panel w-full h-full bg-red-600 absolute transition-all ${isSidePanelOpen?'translate-x-0':'-translate-x-full'} top-0`}>

              <header className='flex justify-end p-2 px-3 w-full bg-slate-100'> 
                
                <button className='p-2'>
                  <i class="ri-close-fill" onClick={()=> setIsSidePanelOpen(false)}></i>
                </button>
              </header>
            </div>
        </section>

    </main>
  )
}

export default project