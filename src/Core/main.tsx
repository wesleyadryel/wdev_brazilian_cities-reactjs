import React, { createContext, useContext, useEffect, useState } from 'react'
window.React = React
import './App.css';

import ReactDOM from 'react-dom/client';
import States from './States'
import { QueryClientProvider } from 'react-query'
import queryClient from './services/queryClient';
import CitiesElement from './Cities';
import { stateProps } from './types';

const UI = () => {
   const [stateData, setState] = useState<stateProps|undefined>(undefined)

   return <>
      <QueryClientProvider client={queryClient}>
         <div className='w-screen h-screen  mt-11  '>

            <div className='w-full h-full flex justify-center items-start relative '>

               <div className='w-5/6  grid grid-cols-1 grid-rows-2  h-5/6 gap-11 '>

                  <div className='w-full h-full row-span-1  '>
                     <States setState={(stateData_: stateProps) => {
                        setState(stateData_)
                     }} />
                  </div>

                  {
                     (stateData && stateData?.state && String(stateData?.state).trim() != '') && <>
                        <div className='w-full  h-full row-span-1     '>
                           <CitiesElement {...stateData } />
                        </div>
                     </>
                  }
               </div>


            </div>

         </div>
      </QueryClientProvider>
   </>
}


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<UI />);


