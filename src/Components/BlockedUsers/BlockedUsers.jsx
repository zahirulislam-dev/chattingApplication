import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import fprofile1 from '../../assets/images/fprofile1.png'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux'

const BlockedUsers = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    console.log(data);
    const db = getDatabase();

    const [blockList, setBlockList] = useState([]);

    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().blockbyid == data.uid) {
                    arr.push({
                        id: item.key,
                        block: item.val().block,
                        blockid: item.val().blockid
                    })
                } else if (item.val().blockid == data.uid) {
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid
                    })
                }
            })
            setBlockList(arr)
        });
    }, [])


    const handleUnblock = (item) => {
        console.log(item);

        set(push(ref(db, 'friend/')), {
            sendername: item.block,
            senderid: item.blockid,
            receivername: data.displayName,
            receiverid: data.uid
        }).then(() => {
            remove(ref(db, 'block/' + item.id))
        })
    }

    return (
        <div className='h-[451px] shadow rounded-[20px] p-[15px] ml-[22px] overflow-hidden overflow-y-scroll'>
            <div className='flex justify-between'>
                <h2 className='font-pops font-semibold text-[20px] text-[#000]'>Blocked Users</h2>
                <BsThreeDotsVertical className='font-pops font-semibold text-[20px] text-primary' />
            </div>
            <div className='mt-[35px]'>
                {
                    blockList.map((item) => (
                        <div className='flex items-center justify-between border-b-2 mb-[17px]'>
                            <div className='flex items-center'>
                                <img src={fprofile1} alt="" className='mb-[10px] mr-[6px]' />
                                <div>
                                    <p className='font-pops font-semibold text-[14px] text-[#000]'>{item.block}</p>
                                    <p className='font-pops font-medium text-[12px] text-[#000]'>{item.blockby}</p>
                                </div>
                            </div>
                            <div>
                                {
                                    !item.blockby &&
                                    <button onClick={() => handleUnblock(item)} className='font-pops font-semibold text-[20px] text-[#fff] bg-primary py-[1px] px-[6px] rounded-[5px]'>Unblock</button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BlockedUsers