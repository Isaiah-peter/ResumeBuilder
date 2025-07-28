import React from 'react';
import AuthHeader from './AuthHeader';
import Logo from '../UI/Logo';
import Input from "../UI/input"
import { POpen, PClose, Github, Google } from '../../assets/auth';

const Register = () => {
    return (
        <div className="flex min-h-screen  bg-[var(--white)]">
            <div className="md:flex-1 min-h-screen bg-size-[100%_100%] bg-center md:flex hidden items-center justify-center bg-[url(/src/assets/auth/image.png)]">
                <div className='bg-[var(--red-primary)]/80 rounded-lg py-20 px-6'>
                    <Logo width="200px" height="50px" />
                </div>
            </div>
            <div className="flex-1 relative">
                <a href='/' className="absolute top-2 left-2">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5625 14.0625H25.3125C25.5611 14.0625 25.7996 14.1613 25.9754 14.3371C26.1512 14.5129 26.25 14.7514 26.25 15C26.25 15.2486 26.1512 15.4871 25.9754 15.6629C25.7996 15.8387 25.5611 15.9375 25.3125 15.9375H6.5625C6.31386 15.9375 6.0754 15.8387 5.89959 15.6629C5.72377 15.4871 5.625 15.2486 5.625 15C5.625 14.7514 5.72377 14.5129 5.89959 14.3371C6.0754 14.1613 6.31386 14.0625 6.5625 14.0625Z" fill="var(--black)"/>
                        <path d="M6.95062 15L14.7262 22.7737C14.9023 22.9498 15.0012 23.1885 15.0012 23.4375C15.0012 23.6864 14.9023 23.9252 14.7262 24.1012C14.5502 24.2773 14.3115 24.3761 14.0625 24.3761C13.8135 24.3761 13.5748 24.2773 13.3987 24.1012L4.96125 15.6637C4.87394 15.5766 4.80467 15.4732 4.75741 15.3593C4.71015 15.2454 4.68582 15.1233 4.68582 15C4.68582 14.8766 4.71015 14.7545 4.75741 14.6407C4.80467 14.5268 4.87394 14.4233 4.96125 14.3362L13.3987 5.89871C13.5748 5.72268 13.8135 5.62378 14.0625 5.62378C14.3115 5.62378 14.5502 5.72268 14.7262 5.89871C14.9023 6.07475 15.0012 6.31351 15.0012 6.56246C15.0012 6.81142 14.9023 7.05018 14.7262 7.22621L6.95062 15Z" fill="var(--black)"/>
                    </svg>
                </a>

                <div className="pt-20 md:px-20 px-5">
                    <AuthHeader reglog={"register"} />

                    <form className="mt-5">
                        <fieldset>
                            <div className="flex flex-col gap-2">
                                <label className='text-md font-normal' for="email">Email Address</label>
                                <Input placeholder={"Johndoe@gmail.com"} type={"email"} />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <label className='text-md font-normal' for="email">Password</label>
                                <Input placeholder={"**********"} type={"password"} />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <label className='text-md font-normal' for="email">Confirm Password</label>
                                <Input placeholder={"**********"} type={"password"} />
                            </div>

                            <div className='w-full block mt-5'>
                                <button type="submit" className='w-full px-4 cursor-pointer py-2 bg-[var(--red-primary)] rounded text-[var(--white)]'>Create account</button>
                            </div>
                        </fieldset>
                    </form>

                    <a className='flex items-center justify-center rounded mt-4 text-md font-normal text-[var(--black)] border border-gray-300 p-3' href="/">
                        <img src={Google} alt="github" className='w-6 h-6' />
                        <span className='ml-2 text-md font-normal'>Sign up with Google</span>
                    </a>
                    <a className='flex items-center justify-center rounded mt-4 text-md font-normal text-[var(--black)] border border-gray-300 p-3' href="/">
                        <img src={Github} alt="github" className='w-6 h-6' />
                        <span className='ml-2 text-md font-normal'>Sign up with Github</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Register;