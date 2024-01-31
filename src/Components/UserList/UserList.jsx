import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiPlusSm } from 'react-icons/hi'
import { FiSearch } from 'react-icons/fi'
import fprofile1 from '../../assets/images/fprofile1.png'
import fprofile2 from '../../assets/images/fprofile2.png'
import fprofile3 from '../../assets/images/fprofile3.png'
import fprofile4 from '../../assets/images/fprofile4.png'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'

const UserList = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    console.log(data);
    const db = getDatabase();

    const [userList, setUserList] = useState([]);
    const [friendRequestList, setFriendRequestList] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [searchData, setSearchData] = useState('');

    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val(), 'itemmmmm');
                if (data.uid != item.key) {
                    arr.push({ ...item.val(), userid: item.key })
                }
            })
            setUserList(arr)
        });
    }, [])

    const handleFriendRequest = (item) => {
        console.log(item, 'itemmmmmmm');
        set(push(ref(db, 'friendRequest/')), {
            receivername: item.username,
            receiverid: item.userid,
            sendername: data.displayName,
            senderid: data.uid
        });
    }


    useEffect(() => {
        const friendRequestRef = ref(db, 'friendRequest/');
        onValue(friendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid);
            })
            setFriendRequestList(arr)
        });
    }, [])

    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid);
            })
            setFriendList(arr)
        });
    }, [])

    const handleSearchData = (e) => {
        let arr = []
        if (e.target.value.length == 0) {
            setSearchData([])
        } else {
            userList.filter((item) => {
                if (item.username.toLowerCase().includes(e.target.value.toLowerCase())) {
                    arr.push(item)
                    setSearchData(arr)
                }
            })
        }
    }

    return (
        <div className='h-[451px] shadow rounded-[20px] p-[15px] ml-[22px] mb-[43px] overflow-hidden overflow-y-scroll'>
            <div className='flex justify-between mb-[100px]'>
                <h2 className='font-pops font-semibold text-[20px] text-[#000]'>User List</h2>
                <BsThreeDotsVertical className='font-pops font-semibold text-[20px] text-primary' />
            </div>
            <div className='fixed top-[92px]'>
                <input onChange={handleSearchData} type="search" placeholder='Search User' className='w-[340px] outline-none bg-white rounded-[20px] shadow border-2 py-[12px] px-[10px] placeholder:font-pops placeholder:font-medium placeholder:text-[16px] placeholder:text-[#rgba(61, 61, 61, 0.35)]' />
            </div>
            <div className='mt-[35px]'>
                {
                    searchData.length > 0 ?
                        searchData.map((item) => (
                            <div className='flex items-center justify-between border-b-2 mb-[17px]'>
                                <div className='flex items-center'>
                                    <img src={fprofile1} alt="" className='mb-[10px] mr-[6px]' />
                                    <div>
                                        <p className='font-pops font-semibold text-[14px] text-[#000]'>{item.username}</p>
                                        <p className='font-pops font-medium text-[12px] text-[#000]'>{item.email}</p>
                                    </div>
                                </div>
                                {
                                    friendList.includes(item.userid + data.uid) ||
                                        friendList.includes(data.uid + item.userid)
                                        ?
                                        <div>
                                            <button className='bg-primary px-[10px] rounded-[5px] ml-[50px] text-white'>Friend</button>
                                        </div>
                                        :
                                        friendRequestList.includes(item.userid + data.uid) ||
                                            friendRequestList.includes(data.uid + item.userid)
                                            ?
                                            <div>
                                                <button className='bg-primary px-[10px] rounded-[5px] ml-[50px] text-white'>Pending</button>
                                            </div>
                                            :
                                            <div>
                                                <button onClick={() => handleFriendRequest(item)} className='bg-primary px-[10px] rounded-[5px] ml-[50px] text-white text-[28px]'>+</button>
                                            </div>
                                }
                            </div>
                        ))
                        :
                        userList.map((item) => (
                            <div className='flex items-center justify-between border-b-2 mb-[17px]'>
                                <div className='flex items-center'>
                                    <img src={item.image} alt="" className='mb-[10px] mr-[6px] w-[100px] h-[100px] rounded-full' />
                                    <div>
                                        <p className='font-pops font-semibold text-[14px] text-[#000]'>{item.username}</p>
                                        <p className='font-pops font-medium text-[12px] text-[#000]'>{item.email}</p>
                                    </div>
                                </div>
                                {
                                    friendList.includes(item.userid + data.uid) ||
                                        friendList.includes(data.uid + item.userid)
                                        ?
                                        <div>
                                            <button className='bg-primary px-[10px] rounded-[5px] ml-[50px] text-white'>Friend</button>
                                        </div>
                                        :
                                        friendRequestList.includes(item.userid + data.uid) ||
                                            friendRequestList.includes(data.uid + item.userid)
                                            ?
                                            <div>
                                                <button className='bg-primary px-[10px] rounded-[5px] ml-[50px] text-white'>Pending</button>
                                            </div>
                                            :
                                            <div>
                                                <button onClick={() => handleFriendRequest(item)} className='bg-primary px-[10px] rounded-[5px] ml-[50px] text-white text-[28px]'>+</button>
                                            </div>
                                }
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default UserList