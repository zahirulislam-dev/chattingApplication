import React, { useState } from 'react'
import registrations from '../../assets/images/registration.png'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { getDatabase, ref, set } from "firebase/database";



const Registration = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const db = getDatabase();
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')


    const [emailerror, setEmailerror] = useState('')
    const [fullNameerror, setFullNameerror] = useState('')
    const [passworderror, setPassworderror] = useState('')


    const [showPassword, setShowPassword] = useState('')

    const handleclick = () => {
        if (!email) {
            setEmailerror('Email is Required');
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailerror('This Email Address is invalid')
            }
        }
        if (!fullName) {
            setFullNameerror('Full Name is Required');
        }
        if (!password) {
            setPassworderror('Password is Required');
        } else if (!/^(?=.*[a-z])/.test(password)) {
            setPassworderror('Please enter at least 1 lowercase alphabetical character')
        } else if (!/^(?=.*[A-Z])/.test(password)) {
            setPassworderror('Please enter at least 1 uppercase alphabetical character')
        } else if (!/^(?=.*[0-9])/.test(password)) {
            setPassworderror('Please enter at least 1 numeric character')
        } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
            setPassworderror('Please enter at least 1 special character')
        } else if (!/^(?=.{8,})/.test(password)) {
            setPassworderror('The password must be 8 characters or longer')
        }

        if (email && fullName && password && /^(?=.{8,})/.test(password) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    updateProfile(auth.currentUser, {
                        displayName: fullName,
                        photoURL: "./src/assets/profile.png"
                    }).then(() => {
                        sendEmailVerification(auth.currentUser)
                        console.log(user, 'userrrrr');
                        toast.success('Registration Done. Please verify your email');
                        setEmail('');
                        setFullName('');
                        setPassword('');
                        setTimeout(() => {
                            navigate('/login')
                        }, 5000)
                    }).then(() => {
                        set(ref(db, 'users/' + user.user.uid), {
                            username: user.user.displayName,
                            email: user.user.email,
                        });
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    if (errorCode.includes('auth/email-already-in-use')) {
                        setEmailerror('This email is already in used. Pls Enter another email');
                    }
                });

        }

    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailerror('')
    }
    const handleFullName = (e) => {
        setFullName(e.target.value);
        setFullNameerror('')
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPassworderror('')
    }
    return (
        <div className='flex'>
            <div className='w-[50%] flex justify-end'>
                <div className='mr-[69px] mt-[225px]'>
                    <div className='relative'>
                        <h1 className='font-nunito font-bold text-[34px] text-[#11175D] mb-[13px]'>Get started with easily register</h1>
                        {/* {
                    success &&
                    <p className='font-nunito font-bold text-[34px] text-white bg-green-500 p-[200px] rounded-[10px] text-center absolute top-[33px] left-[-10px] z-[1]'>Success</p>
                } */}
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

                        <p className='font-nunito font-regular text-[20px] text-[#7F7F7F]'>Free register <span className='text-[#BFBFBF]'>and</span> you can enjoy it</p>
                    </div>
                    <div className='relative mt-[60px] w-96'>
                        <input type="email" onChange={handleEmail} value={email} className='w-full py-[27px] px-[52px] rounded-[8px] border-2 border-[#11175D]' />
                        <p className='font-nunito font-regular text-[14px] text-[#11175D]tracking-[1px] absolute top-[-11px] left-[32px] px-[18px] bg-white'>Email Address</p>
                        {
                            emailerror &&
                            <p className='font-nunito font-semibold text-[13px] text-white bg-red-500 p-2 rounded mt-[5px]'>{emailerror}</p>
                        }
                    </div>
                    <div className='relative mt-[60px] w-96'>
                        <input type="text" onChange={handleFullName} value={fullName} className='w-full py-[27px] px-[52px] rounded-[8px] border-2 border-[#11175D]' />
                        <p className='font-nunito font-regular text-[14px] text-[#11175D]tracking-[1px] absolute top-[-11px] left-[32px] px-[18px] bg-white'>Full Name</p>
                        {
                            fullNameerror &&
                            <p className='font-nunito font-semibold text-[13px] text-white bg-red-500 p-2 rounded mt-[5px]'>{fullNameerror}</p>
                        }
                    </div>
                    <div className='relative mt-[60px] w-96'>
                        <input type={showPassword ? 'text' : 'password'} onChange={handlePassword} value={password} className='w-full py-[27px] px-[52px] rounded-[8px] border-2 border-[#11175D]' />
                        <p className='font-nunito font-regular text-[14px] text-[#11175D]tracking-[1px] absolute top-[-11px] left-[32px] px-[18px] bg-white'>Password</p>
                        {
                            showPassword ?
                                <AiFillEye onClick={() => setShowPassword(!showPassword)} className='text-[30px] absolute top-[27px] left-[337px]' />
                                :
                                <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} className='text-[30px] absolute top-[27px] left-[337px]' />
                        }

                        {
                            passworderror &&
                            <p className='font-nunito font-semibold text-[13px] text-white bg-red-500 p-2 rounded mt-[5px]'>{passworderror}</p>
                        }
                    </div>
                    <div className='mt-[50px] w-96'>
                        <div onClick={handleclick} className='bg-primary cursor-pointer py-[20px] rounded-full text-center'>
                            <p className='font-nunito font-semibold text-[20px] text-[#fff]'>Sign up</p>
                        </div>
                        <p className=' text-center font-sans font-regular text-[13px] text-[#03014C] mt-[35px]'>Already  have an account ? <span className='text-[#EA6C00] font-bold'><Link to='/login'>Sign In</Link></span></p>
                    </div>
                </div>
            </div>
            <div className='w-[50%]'>
                <img className='w-full h-screen object-cover' src={registrations} alt="registrations" />
            </div>
        </div>
    )
}

export default Registration