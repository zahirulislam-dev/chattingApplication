import React, { useState } from 'react'
import fprofile2 from '../../assets/images/fprofile2.png'
import login from '../../assets/images/login.png'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GrEmoji } from "react-icons/gr";
import { CiCamera } from "react-icons/ci";
import { RiSendPlaneFill } from "react-icons/ri";
import { TbTriangleFilled } from "react-icons/tb";
import ModalImage from "react-modal-image";
import { useSelector } from 'react-redux';
import { getDatabase, push, ref, set } from 'firebase/database';

const ChattingMessages = () => {
    const active = useSelector(state => state.activeChat.active);
    
    const [message, setMessage] = useState('');
    const db = getDatabase();
    const handleSendMessage = () =>{
        if(active.status == 'single'){
            set(push(ref(db, 'singleMessage/')), {
                message: message
            })
        }else{
            console.log('gpm');
        }
        
    }
    return (
        <div className='py-[20px] px-[20px] shadow rounded-[10px]'>
            <div className='flex items-center justify-between border-b-2 mb-[25px]'>
                <div className='flex items-center'>
                    <img src={fprofile2} alt="" className='mb-[10px] mr-[20px]' />
                    <div>
                        <p className='font-pops font-semibold text-[14px] text-[#000]'>{active.name}</p>
                        <p className='font-pops font-medium text-[12px] text-[#000]'>Online</p>
                    </div>
                </div>
                <div>
                    <BsThreeDotsVertical className='font-pops font-semibold text-[20px] text-primary' />
                </div>
            </div>
            <div className='h-[650px] overflow-y-scroll px-[20px]'>
                {/* MESSAGE RECEIVER START
            =========================== */}
                <div className=''>
                    <div className='relative bg-[#F1F1F1] py-[10px] px-[52px] rounded-lg inline-block'>
                        <p className='font-pops font-medium text-[16px] text-[#000]'>Hey There !</p>
                        <TbTriangleFilled className='absolute bottom-[-2px] left-[-6px] text-[#F1F1F1]' />
                    </div>
                    <p className='font-pops font-medium text-[12px] text-overlay2 mt-[5px]'>Today, 2:01pm</p>
                </div>
                {/* MESSAGE RECEIVER END
            =========================== */}

                {/* MESSAGE SENDER START
            =========================== */}
                <div className='text-right'>
                    <div className='relative bg-primary py-[10px] px-[10px] rounded-lg'>
                        <p className='font-pops font-medium text-[16px] text-[#fff]'>Hey There ! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus similique, ratione, repellat quo quaerat eaque eos alias in voluptate sed a? Quae debitis deleniti earum consectetur nihil eligendi non accusamus incidunt aspernatur eum modi quod reiciendis, quam vel enim illum vitae facere saepe. Impedit tempore reiciendis odit, deleniti eveniet aliquid.</p>
                        <TbTriangleFilled className='absolute bottom-[-2px] right-[-7px] text-primary' />
                    </div>
                    <p className='font-pops font-medium text-[12px] text-overlay2 mt-[5px]'>Today, 2:01pm</p>
                </div>
                {/* MESSAGE SENDER END
            =========================== */}


                {/* IMAGE RECEIVER START
            =========================== */}
                <div className=''>
                    <div className='inline-block'>
                        <ModalImage
                            className='w-[350px]'
                            small={login}
                            large={login}
                        />
                    </div>
                    <p className='font-pops font-medium text-[12px] text-overlay2 mt-[5px]'>Today, 2:01pm</p>
                </div>
                {/* IMAGE RECEIVER END
            =========================== */}

                {/* IMAGE SENDER START
            =========================== */}
                <div className='text-right'>
                    <div className='inline-block'>
                        <ModalImage
                            className='w-[350px]'
                            small={login}
                            large={login}
                        />
                    </div>
                    <p className='font-pops font-medium text-[12px] text-overlay2 mt-[5px]'>Today, 2:01pm</p>
                </div>
                {/* IMAGE SENDER END
            =========================== */}
            </div>
            <div className='border-t-2'>
                <div className='mt-[30px] flex items-center'>
                    <div className='flex items-center relative'>
                        <input onChange={(e)=> setMessage(e.target.value)} type="text" className='w-[537px] bg-[#F1F1F1] outline-none rounded-[10px] py-[15px] px-[20px]' />
                        <div className='flex items-center absolute top-[19px] left-[473px]'>
                            <GrEmoji />
                            <CiCamera className='ml-[15px]' />
                        </div>
                    </div>
                    <button onClick={handleSendMessage} className='ml-[35px] bg-primary flex items-center justify-center rounded-[10px] w-[45px] h-[40px]'>
                        <RiSendPlaneFill className='text-white' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChattingMessages