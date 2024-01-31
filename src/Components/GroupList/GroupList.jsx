import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import gprofile1 from '../../assets/images/gprofile1.png'
import { FiSearch } from 'react-icons/fi'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const GroupList = () => {

    const [groupList, setGroupList] = useState([]);

    const [searchData, setSearchData] = useState('')

    const [groupNameerror, setGroupNameerror] = useState('')
    const [groupTagLineerror, setGroupTagLineerror] = useState('')

    const data = useSelector(state => state.userLoginInfo.userInfo);
    console.log(data);
    const db = getDatabase();

    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState('')
    const [groupTagLine, setGroupTagLine] = useState('')

    const handleCreateGroupPopup = () => {
        setShow(!show)
    }

    const handleCreateGroup = () => {
        if (!groupName) {
            setGroupNameerror('Group Name is Required');
        }
        if (!groupTagLine) {
            setGroupTagLineerror('Group Tag Line is Required');
        }
        set(push(ref(db, 'mygroup/')), {
            groupName: groupName,
            groupTagLine: groupTagLine,
            adminName: data.displayName,
            adminId: data.uid
        }).then(() => {
            toast.success('Group Create Done');
            setGroupName('');
            setGroupTagLine('');
            setTimeout(() => {
                navigate('/home')
            }, 3000)
        })
    }

    const handleCancelGroupPopup = () => {
        console.log('groupppppppppp');
        setShow(false)
    }

    const handleGroupName = (e) => {
        setGroupName(e.target.value);
        setGroupNameerror('')
    }

    const handleGroupTagLine = (e) => {
        setGroupTagLine(e.target.value);
        setGroupTagLineerror('')
    }

    useEffect(() => {
        const userRef = ref(db, 'mygroup/');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid != item.val().adminId) {
                    arr.push(item.val());
                }
            })
            setGroupList(arr)
        });
    }, [])

    const handleSearchData = (e) => {
        console.log(e.target.value);
    }

    return (
        <div className='bg-white ml-[43px] mb-[43px]'>
            <div className='shadow p-[15px] rounded-[20px] h-[451px]'>
                <div className='fixed top-[50px] mb-[30px]'>
                <div className='flex justify-between items-center mb-[20px]'>
                    <h2 className='font-pops font-semibold text-[20px] text-[#000]'>Group List</h2>
                    {
                        show ?
                            <button onClick={handleCreateGroupPopup} className='font-pops font-semibold text-[20px] text-white bg-red-500 px-[32px] py-[10px] rounded'>Go Back</button>
                            :
                            <button onClick={handleCreateGroupPopup} className='font-pops font-semibold text-[20px] text-white bg-primary px-[10px] py-[10px] rounded'>Create Group</button>
                    }
                    {/* <BsThreeDotsVertical className='font-pops font-semibold text-[20px] text-primary'/> */}
                </div>
                <div className=''>
                    <input onChange={handleSearchData} type="search" placeholder='Search User' className='w-[340px] outline-none bg-white rounded-[20px] shadow border-2 py-[12px] px-[10px] placeholder:font-pops placeholder:font-medium placeholder:text-[16px] placeholder:text-[#rgba(61, 61, 61, 0.35)]' />
                </div>
                </div>
                <div className='h-[287px] mt-[150px] overflow-y-scroll overflow-hidden'>
                    {
                        show ?
                            <div className='w-full h-screen bg-green-500 absolute top-0 left-0 z-[1] flex justify-center items-center'>
                                <div className='bg-white rounded-lg p-[100px]'>
                                    <input onClick={handleGroupName} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder='Group Name' className='w-full py-[27px] border-2 rounded-lg p-[20px] outline-none placeholder:font-sans placeholder:font-bold placeholder:text-[20px] placeholder:text-[#03014C]' />
                                    {
                                        groupNameerror &&
                                        <p className='font-nunito font-semibold text-[13px] text-white bg-red-500 p-2 rounded mt-[5px]'>{groupNameerror}</p>
                                    }

                                    <input onChange={(e) => setGroupTagLine(e.target.value)} type="text" placeholder='Group Tag Line' className='w-full py-[27px] border-2 rounded-lg p-[20px] outline-none mt-[20px] placeholder:font-sans placeholder:font-bold placeholder:text-[20px] placeholder:text-[#03014C]' />
                                    {
                                        groupTagLineerror &&
                                        <p className='font-nunito font-semibold text-[13px] text-white bg-red-500 p-2 rounded mt-[5px]'>{groupTagLineerror}</p>
                                    }

                                    <div className='flex'>
                                        <button onClick={handleCreateGroup} className='w-[290px] mt-[20px] font-pops font-bold text-[25px] text-white bg-green-500 rounded-lg py-[14px] px-[5px]'>Create Group</button>

                                        <ToastContainer
                                            position="top-center"
                                            autoClose={2000}
                                            hideProgressBar={false}
                                            newestOnTop={false}
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            theme="light"
                                        />

                                        <button onClick={handleCancelGroupPopup} className='w-[290px] mt-[20px] font-pops font-bold text-[25px] text-white bg-red-500 rounded-lg py-[14px] px-[5px] ml-[30px]'>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                {
                                    groupList.map((item) => (
                                        <div className='flex items-center justify-between border-b-2 mb-[14px]'>
                                            <div className='flex items-center'>
                                                <img src={gprofile1} alt="" className='mb-[10px] mr-[8px]' />
                                                <div>
                                                    <p className='font-pops font-semibold text-[18px] text-[#000]'>{item.adminName}</p>
                                                    <p className='font-pops font-semibold text-[18px] text-[#000]'>{item.groupName}</p>
                                                    <p className='font-pops font-medium text-[14px] text-[#000]'>{item.groupTagLine}</p>
                                                </div>
                                            </div>
                                            {/* <div className='bg-primary py-[2px] px-[22px] rounded'>
                    <button className='font-pops font-semibold text-[20px] text-[#fff]'>Join</button>
                </div> */}
                                        </div>
                                    ))
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupList