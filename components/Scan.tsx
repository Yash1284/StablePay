"use client";
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'

type Props = {}

const Scan = (props: Props) => {
    const [receiverAddress,setReceiverAddress]=useState("");
  return (
    <div>
        {receiverAddress===""? (
        <div className='h-screen w-screen md:w-1/2 bg-white-400'>
            <QrReader 
                onResult={(result, error) => {
                    if (!!result) {
                    setReceiverAddress(result?.getText());
                    }
        
                    if (!!error) {
                    console.info(error);
                    }
                }}
                constraints={
                    {
                        // width:'100px',

                        facingMode:'environment'
                    }
                }
                
            />
        </div>
        ):(
            <div className='w-3/4 overflow-auto flex-center heading2 text-gradient_pink-orange'>
                {receiverAddress}
            </div>
        )}
    </div>
  )
}

export default Scan