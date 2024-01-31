import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from '../../Components/Sidebar/Sidebar';
import GroupList from '../../Components/GroupList/GroupList';
import Friends from '../../Components/Friends/Friends';
import UserList from '../../Components/UserList/UserList';
import FriendsRequest from '../../Components/FriendRequest/FriendRequest';
import FriendRequest from '../../Components/FriendRequest/FriendRequest';
import MyGroups from '../../Components/MyGroups/MyGroups';
import BlockedUsers from '../../Components/BlockedUsers/BlockedUsers';
import { userLoginInfo } from '../../slices/userSlice';

const Home = () => {
  const auth = getAuth();
  const data = useSelector(state=>state.userLoginInfo.userInfo);
  const dispatch = useDispatch();
  console.log(data);
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])

  onAuthStateChanged(auth, (user) => {
    console.log(user,'kkkkk');
    if(user.emailVerified){
      setVerify(true);
      dispatch(userLoginInfo(user))
      localStorage.setItem('userLoginInfo',JSON.stringify(userLoginInfo(user)))
    }
  });
  
  return (
    <div>
      {
        verify ?
        <div className='flex'>
          <div className='w-[186px]'>
            <Sidebar active='home'/>
          </div>
          <div className='flex mt-[33px]'>
          <div className='w-[427px]'>
            <GroupList/>
            <FriendsRequest/>
          </div>
          <div className='w-[427px]'>
            <Friends/>
            <MyGroups/>
          </div>
          <div className='w-[427px]'>
            <UserList/>
            <BlockedUsers/>
          </div>
          </div>
        </div>
        :
        <div className='w-full h-screen items-center bg-white'>
          <div className='text-center mt-[150px]'>
          <h1 className='font-sans font-bold text-[34px] text-black'>Please Verify Your Email</h1>
          <button className='font-sans font-bold text-[34px] text-white py-[15px] px-[32px] rounded bg-blue-500 mt-[60px]'>
            <Link to='/login'>Back To Login</Link>
          </button>
          </div>
        </div>
      }
    </div>
  )
}

export default Home