import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import fprofile1 from '../../assets/images/fprofile1.png'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux'
import { activeChat } from '../../slices/ActiveChatSlice';

const Friends = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    console.log(data);
    const db = getDatabase();
    const dispatch = useDispatch();

    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid == item.val().receiverid || data.uid == item.val().senderid) {
                    arr.push({ ...item.val(), key: item.key });
                }
            })
            setFriendList(arr)
        });
    }, [])

    const handleBlock = (item) => {
        console.log(item);
        if (data.uid == item.senderid) {
            set(push(ref(db, 'block/')), {
                block: item.receivername,
                blockid: item.receiverid,
                blockby: item.sendername,
                blockbyid: item.senderid
            }).then(() => {
                remove(ref(db, 'friend/' + item.key))
            })
        } else {
            set(push(ref(db, 'block/')), {
                block: item.sendername,
                blockid: item.senderid,
                blockby: item.receivername,
                blockbyid: item.receiverid
            }).then(() => {
                remove(ref(db, 'friend/' + item.key))
            })
        }
    }

    const handleActiveChat = (item) =>{
        // console.log('ok', item);
        if(data.uid == item.senderid){
            dispatch(activeChat({
                status: 'single',
                id: item.receiverid,
                name: item.receivername
            }))
        }else{
            dispatch(activeChat({
                status: 'single',
                id: item.senderid,
                name: item.sendername
            }))
        }
    }

    return (
        <div className='h-[451px] shadow rounded-[20px] p-[15px] ml-[22px] mb-[43px] overflow-hidden overflow-y-scroll'>
            <div className='flex justify-between'>
                <h2 className='font-pops font-semibold text-[20px] text-[#000]'>Friends</h2>
                <BsThreeDotsVertical className='font-pops font-semibold text-[20px] text-primary' />
            </div>
            <div className='mt-[35px]'>
                {
                    friendList.map((item) => (
                        <div onClick={()=> handleActiveChat(item)} className='flex items-center justify-between border-b-2 mb-[17px]'>
                            <div className='flex items-center'>
                                <img src={fprofile1} alt="" className='mb-[10px] mr-[6px]' />
                                <div>
                                    <p className='font-pops font-semibold text-[14px] text-[#000]'>
                                        {
                                            item.receiverid == data.uid ? item.sendername : item.receivername
                                        }
                                    </p>
                                    <p className='font-pops font-medium text-[12px] text-[#000]'>Hi guys, wassup!</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => handleBlock(item)} className='font-pops font-medium text-[20px] text-[#fff] bg-primary rounded px-[6px]'>Block</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Friends