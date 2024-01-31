import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import fprofile1 from '../../assets/images/fprofile1.png'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'

const MyGroups = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const db = getDatabase();

    const [myGroup, setMyGroup] = useState([]);

    useEffect(() => {
        const userRef = ref(db, 'mygroup/');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if(data.uid == item.val().adminId){
                    arr.push(item.val());
                }

            })
            setMyGroup(arr)
        });
    }, [])

    return (
        <div className='h-[451px] shadow rounded-[20px] p-[15px] ml-[22px] overflow-hidden overflow-y-scroll'>
            <div className='flex justify-between'>
                <h2 className='font-pops font-semibold text-[20px] text-[#000]'>My Groups</h2>
                <BsThreeDotsVertical className='font-pops font-semibold text-[20px] text-primary' />
            </div>
            <div className='mt-[35px]'>
                {
                    myGroup.map((item) => (
                        <div className='flex items-center justify-between border-b-2 mb-[17px]'>
                            <div className='flex items-center'>
                                <img src={fprofile1} alt="" className='mb-[10px] mr-[6px]' />
                                <div>
                                    <p className='font-pops font-semibold text-[14px] text-[#000]'>{item.adminName}</p>
                                    <p className='font-pops font-semibold text-[14px] text-[#000]'>{item.groupName}</p>
                                    <p className='font-pops font-medium text-[12px] text-[#000]'>{item.groupTagLine}</p>
                                </div>
                            </div>
                            <div className='bg-white'>
                                <p className='font-pops font-medium text-[10px] text-[#000]'>Today, 8:56pm</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyGroups