import React, { createRef, useState } from 'react'
import profile from '../../assets/images/profile.png'
import { AiOutlineHome, AiFillMessage } from 'react-icons/ai'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FiSettings } from 'react-icons/fi'
import { IoLogOut } from 'react-icons/io5'
import { BsCloudUploadFill } from 'react-icons/bs'
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useSelector } from 'react-redux'
import { getDatabase, set, ref as dref } from 'firebase/database'


const Sidebar = ({active}) => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  console.log(data, 'dataaaaaa');
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();
  const [imageUploadPopup, setImageUploadPopup] = useState(false)
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('done');
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }).catch((error) => {
      console.log(error.code);
    });
  }

  const handleImageUpload = () => {
    console.log('imgggggg');
    setImageUploadPopup(true)
  }
  const handleCancleImageuploadpopup = () => {
    console.log('imgggggg');
    setImageUploadPopup(false)
  }

  const handleImageChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);

      // Data URL string
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(() => {
            set(dref(db, 'users/' + data.uid), {
              image: downloadURL,

              username: data.displayName,
              email: data.email,
          });
            setImageUploadPopup(false);
            setImage('');
            setCropData('')
          })
        });
      });
    }
  };

  return (
    <div className='bg-primary h-screen rounded py-[38px]'>
      <div className='group relative w-[100px] h-[100px] mx-auto overflow-hidden'>
        <img src={data.photoURL} alt="" className='mx-auto w-full h-full rounded-full' />
        <div onClick={handleImageUpload} className='bg-overlay opacity-0 rounded-full w-full h-full absolute top-0 left-0 flex justify-center items-center group-hover:opacity-100 cursor-pointer transition duration-300 ease-in-out'>
          <BsCloudUploadFill className='text-white text-[25px]'/>
        </div>
      </div>
      <h2 className='font-sans font-semibold text-[20px] text-[#fff] text-center mt-[10px]'>
        {data.displayName}
      </h2>
      <Link to='/'>
      <div className={`mt-[50px] relative after:absolute after:content-[""] after:w-full after:h-full after:top-0 after:left-[25px] ${active == 'home' && 'after:bg-white'} py-[20px] after:z-[-1] z-[1] overflow-hidden after:rounded-l-[20px] before:absolute before:content-[""] before:w-[8px] before:h-full before:top-0 before:right-0 before:bg-primary before:rounded-l-[20px]`}>
        <AiOutlineHome className={`mx-auto text-5xl ${active == 'home' ? 'text-primary' : 'text-white'}`} />
      </div>
      </Link>
      <Link to='/message'>
      <div className={`mt-[50px] relative after:absolute after:content-[""] after:w-full after:h-full after:top-0 after:left-[25px] ${active == 'message' && 'after:bg-white'} py-[20px] after:z-[-1] z-[1] overflow-hidden after:rounded-l-[20px] before:absolute before:content-[""] before:w-[8px] before:h-full before:top-0 before:right-0 before:bg-primary before:rounded-l-[20px]`}>
        <AiFillMessage className={`mx-auto text-5xl ${active == 'home' ? 'text-[#BAD1FF]' : 'text-primary'}`} />
      </div>
      </Link>
      <div className='mt-[30px]'>
        <IoNotificationsOutline className='mx-auto text-5xl text-[#BAD1FF]' />
      </div>
      <div className='mt-[50px]'>
        <FiSettings className='mx-auto text-5xl text-[#BAD1FF]' />
      </div>
      <div className='mt-[100px]'>
        <IoLogOut onClick={handleSignOut} className='mx-auto text-5xl text-[#BAD1FF]' />
      </div>
      {
        imageUploadPopup &&
        <div className='h-screen w-full bg-orange-500 absolute top-0 left-0 z-[1] flex justify-center items-center'>
          <div className='bg-white w-[1000px] p-[50px] rounded-[10px]'>
            <h3 className='font-pops font-bold text-black text-[48px] mb-[30px]'>Please Upload Image</h3>

            {
              image ?
                <div className='w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-[20px]'>
                  <div className='img-preview w-[100px] h-[100px] rounded-full'></div>
                </div>
                :
                <div className='w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-[20px]'>
                  <img src={data.photoURL} alt="" />
                </div>
            }
            {
              image &&
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            }
            <input type="file" onChange={handleImageChange} className='mt-[20px]' />
            <div className='flex mt-[30px]'>
              <button onClick={getCropData} className='font-sans font-semibold text-[20px] text-[#fff] bg-green-500 py-[14px] px-[32px] rounded mr-[30px]'>Save</button>
              <button onClick={handleCancleImageuploadpopup} className='font-sans font-semibold text-[20px] text-[#fff] bg-red-500 py-[14px] px-[32px] rounded'>Cancel</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Sidebar