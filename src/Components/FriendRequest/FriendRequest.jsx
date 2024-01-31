import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import fprofile1 from '../../assets/images/fprofile1.png'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux'

const FriendRequest = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    console.log(data);
    const db = getDatabase();
    const [friendRequestList, setFriendRequestList] = useState([]);

    useEffect(() => {
        const friendRequestRef = ref(db, 'friendRequest/');
        onValue(friendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if(item.val().receiverid == data.uid){
                    arr.push({...item.val(), id:item.key})
                }
            })
            setFriendRequestList(arr)
        });
    }, [])

    const handleFriend = (item) =>{
        console.log(item);
        set(push(ref(db, 'friend/')), {
            ...item
        }).then(()=>{
            remove((ref(db, 'friendRequest/' + item.id)))
        })
    }

    return (
        <div className='h-[451px] shadow rounded-[20px] p-[15px] ml-[43px] overflow-hidden overflow-y-scroll transition'>
            <div className='flex justify-between'>
                <h2 className='font-pops font-semibold text-[20px] text-[#000]'>Friend Request</h2>
                <BsThreeDotsVertical className='font-pops font-semibold text-[20px] text-primary' />
            </div>
            <div className='mt-[35px]'>
                {
                    friendRequestList.length == 0 ?
                    <p className='font-pops font-semibold text-[14px] text-[#000] text-center'>No Data Found....</p>
                    :
                    friendRequestList.map((item) => (
                        <div className='flex items-center justify-between border-b-2 mb-[17px]'>
                            <div className='flex items-center'>
                                <img src={fprofile1} alt="" className='mb-[10px] mr-[6px]' />
                                <div>
                                    <p className='font-pops font-semibold text-[14px] text-[#000]'>{item.sendername}</p>
                                    <p className='font-pops font-medium text-[12px] text-[#000]'>{item.email}</p>
                                </div>
                            </div>
                            <div className='bg-primary py-[1px] px-[8px] rounded-[5px] ml-[20px]'>
                                <button onClick={()=>handleFriend(item)} className='font-pops font-semibold text-[20px] text-[#fff]'>Accept</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FriendRequest