import React, {useState} from 'react'
import logins from '/src/assets/images/login.png'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../../slices/userSlice'


const Login = () => {
const auth = getAuth();
const dispatch = useDispatch();
const navigate = useNavigate()
const provider = new GoogleAuthProvider();

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const [emailerror, setEmailerror] = useState('')
const [passworderror, setPassworderror] = useState('')

const [errorlogin, setErrorlogin] = useState('')

const [showPassword, setShowPassword] = useState('')
const [forgetPasswordModal, setForgetPasswordModal] = useState(false)

const handleclick = () =>{
    if(!email){
        setEmailerror('Email is Required');
    }else{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailerror('This Email Address is invalid')
        }
    }
    if(email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            toast.success('Login Successfully Done');
            console.log(user.user);
            dispatch(userLoginInfo(user))
            localStorage.setItem('userLoginInfo',JSON.stringify(userLoginInfo(user)))
            setTimeout(()=>{
                navigate('/')
            },3000)
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if(errorCode.includes('auth/invalid-login-credentials')){
                setErrorlogin('Please give your right email & password');
            }
        });

    }
    
}
const handleEmail = (e) =>{
    setEmail(e.target.value);
    setEmailerror('')
}
const handlePassword = (e) =>{
    setPassword(e.target.value);
    setPassworderror('')
}

const googleSignIn = ()=>{
    signInWithPopup(auth, provider)
  .then(() => {
    setTimeout(()=>{
        navigate('/')
    },3000)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log(errorCode);
  });
}

const handleForgetPassword = ()=>{
    setForgetPasswordModal(true)
}
const handleCancleClick = ()=>{
    setForgetPasswordModal(false)
}

const submitForgetPassword = ()=>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log('Password');
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });   
}
  return (
    <div>
        <div className='flex'>
        <div className='w-[50%] flex justify-end'>
            <div className='mr-[69px] mt-[225px]'>
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
                <h1 className='font-sans font-bold text-[34px] text-[#03014C]'>Login to your account!</h1>
                <div onClick={googleSignIn} className='flex items-center justify-center mt-[32px] w-[220px] py-[23px] border-2 rounded bg-white'>
                    <FcGoogle className='mr-[10px]'/>
                    <p className='font-sans font-semibold text-[13px] text-[#03014C] '>Login with Google</p>
                </div>
                {
                    errorlogin &&
                    <p className='font-sans font-bold text-[20px] bg-red-500 text-white p-2 mt-[10px] rounded'>{errorlogin}</p>
                }
                <div className='relative mt-[60px] w-96'>
                    <input type="email" placeholder='Youraddres@email.com' onChange={handleEmail} className='w-full py-[27px] border-b-2 outline-none placeholder:font-sans placeholder:font-bold placeholder:text-[20px] placeholder:text-[#03014C]'/>
                    <p className='font-sans font-regular text-[14px] text-[#03014C]tracking-[1px] absolute top-[-11px] bg-white'>Email Address</p>
                    {
                        emailerror &&
                        <p className='font-nunito font-semibold text-[13px] text-white bg-red-500 p-2 rounded mt-[5px]'>{emailerror}</p>
                    }
                </div>
                <div className='relative mt-[60px] w-96'>
                    <input type={showPassword ? 'text' : 'password'} onChange={handlePassword} placeholder='Enter your password' className='w-full py-[27px] border-b-2 outline-none placeholder:text[20px]placeholder:font-sans placeholder:font-bold placeholder:text-[20px] placeholder:text-[#03014C]'/>
                    <p className='font-sans font-regular text-[14px] text-[#03014C]tracking-[1px] absolute top-[-11px] bg-white'>Password</p>
                    {
                        showPassword ?
                        <AiFillEye onClick={()=>setShowPassword(!showPassword)} className='text-[30px] absolute top-[27px] left-[337px]'/>
                        :
                        <AiFillEyeInvisible onClick={()=>setShowPassword(!showPassword)} className='text-[30px] absolute top-[27px] left-[337px]'/>
                    }
                    
                    {
                        passworderror &&
                        <p className='font-nunito font-semibold text-[13px] text-white bg-red-500 p-2 rounded mt-[5px]'>{passworderror}</p>
                    }
                </div>
                <div className='mt-[50px] w-96'>
                    <div onClick={handleclick} className='bg-[#5F34F5] cursor-pointer py-[20px] rounded text-center'>
                        <p className='font-sans font-semibold text-[20px] text-[#fff]'>Login to Continue</p>
                    </div>
                    <p className='font-sans font-regular text-[13px] text-[#03014C] mt-[35px]'>Don’t have an account ? <span className='text-[#EA6C00] font-bold'><Link to='/registration'>Sign up</Link></span></p>
                    <p onClick={handleForgetPassword} className='font-sans font-regular text-[13px] text-[#EA6C00] mt-[35px]'>Forgotten Password?</p>
                </div>
            </div>
        </div>
        <div className='w-[50%]'>
            <img className='w-full h-screen object-cover' src={logins} alt="logins" />
        </div>
    </div>
    {
        forgetPasswordModal &&
        <div className='absolute top-0 left-0 w-full h-screen bg-green-500 flex justify-center items-center'>
            <div className='w-[50%] bg-white p-11 rounded'>
                <div className='text-center'>
                <h3 className='font-sans font-bold text-[35px] text-[#03014C]'>Forget Password?</h3>
                <div className='relative mt-[40px] w-[440px] ml-[208px]'>
                    <input type="email" onChange={handleEmail} value={email} className='w-full py-[27px] px-[52px] rounded-[8px] border-2 border-[#11175D]'/>
                    <p className='font-nunito font-regular text-[14px] text-[#11175D]tracking-[1px] absolute top-[-11px] left-[32px] px-[18px] bg-white'>Email Address</p>
                    {
                        emailerror &&
                        <p className='font-nunito font-semibold text-[13px] text-white bg-red-500 p-2 rounded mt-[5px]'>{emailerror}</p>
                    }
                </div>
                <div className='flex mt-[40px] justify-center'>
                    <div onClick={submitForgetPassword} className='bg-[#5F34F5] cursor-pointer py-[15px] px-[32px] rounded text-center mr-[20px]'>
                        <p className='font-sans font-semibold text-[20px] text-[#fff] '>Submit</p>
                    </div>
                    <div onClick={handleCancleClick} className='bg-[#5F34F5] cursor-pointer py-[15px] px-[32px] rounded text-center'>
                        <p className='font-sans font-semibold text-[20px] text-[#fff]'>Cancel</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    }
    </div>
  )
}

export default Login