import React from 'react';
import Logo from '../UI/Logo';
import Input from "../UI/input"
import Button from '../UI/Button';

const Footer = () => {
    return (
        <footer className="border-t-2 border-[var(--gray-light)] text-white py-6 mt-5">
            <div className='flex flex-wrap items-start gap-12 p-4 lg:p-12'>
                <div>
                    <Logo />

                    <div className='mt-12'>
                        <p className='font-light text-[var(--black)] text-lg mb-2'>Updates right to your Inbox</p>
                        <div className='flex items-center gap-4 flex-wrap'>
                            <Input className='max-w-[320px] ' placeholder="Email address" />
                            <Button className='font-semibold' children={"Subscribe"} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;