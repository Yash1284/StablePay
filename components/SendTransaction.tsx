"use client";

import { userStore } from '@/store/UserStore';
import { User } from '@privy-io/react-auth'
import { ethers } from 'ethers';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import {toast} from "react-toastify";

type Props = {
    user:any,
    sendTransaction:any
}

const Popup=() => {
    const [receiverAddress,setReceiverAddress]=useState("");
    return (
        <div className='h-screen w-screen'>
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
                        // facingMode:'user'
                    }
                  }
                //   style={{ width: '100%' }}
            />
            {receiverAddress!=="" && <p>{receiverAddress}</p>}
        </div>

    )
}

const SendTransaction = ({user,sendTransaction}: Props) => {
    const [txHash,setTxHash]=useState("");
    const [popupOpen,setPopupOpen]=useState<boolean>(false);
    const [smartContractAddress]=userStore(state => [state.smartContractAddress]);
    const handleSubmit = async () => {
        // setPopupOpen(true);
        const ethAmount="0.001";
        const weiValue =ethers.utils.parseEther(ethAmount);
        const hexValue= ethers.utils.hexlify(weiValue);
        const unsignedTx={
            to: smartContractAddress,
            chainId:80001,
            value:hexValue,
        }
        // const txUiConfig={
        //     header:"Send Transaction",
        //     description:"Send 0.001 eth to yourself",
        //     buttonText:"Send",
        // }

        if (user.wallet) {
            // Show the loading toast
            const loadingToastId = toast.loading('Sending transaction....', {
                toastId: 'sendTransaction',
                position: toast.POSITION.TOP_RIGHT,
                autoClose: false, // Set autoClose to false to keep the toast open until manually dismissed
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            try {
                const tempHash = await sendTransaction(unsignedTx);
                setTxHash(tempHash);
                // Dismiss the loading toast when the transaction is successful
                toast.dismiss(loadingToastId);

                // Show the success toast
                toast.success('Transaction Successful✅', {
                toastId: 'sendTransaction',
                });
            } catch (error) {
                // Handle errors if the transaction fails
                console.error(error);
                // You may want to show an error toast here as well
            }
        }

    }

  return (
    <div>
        {popupOpen && <Popup />}
        <button
            disabled={!user?.wallet}
            className='mt-4 py-2 px-4 bg-green-500 hover:bg-green-600 rounded text-white'
            onClick={handleSubmit}
        >
            Send 0.001 eth to yourself!!!
        </button>
        {txHash && <p>{txHash}</p>}
    </div>  
  )
}

export default SendTransaction