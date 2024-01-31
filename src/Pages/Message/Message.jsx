import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ChattingMessages from '../../Components/ChattingMessages/ChattingMessages'
import GroupList from '../../Components/GroupList/GroupList'
import Friends from '../../Components/Friends/Friends'
import MyGroups from '../../Components/MyGroups/MyGroups'

const Message = () => {
  return (
    <div className='flex'>
        <div className='w-[186px]'>
        <Sidebar active='message'/>
        </div>
        <div className=' w-[427px] ml-[20px] mt-[35px]'>
            <GroupList></GroupList>
            <Friends></Friends>
        </div>
        <div className='w-[690px] ml-[30px] mt-[35px]'>
        <ChattingMessages></ChattingMessages>
        </div>
    </div>
  )
}

export default Message