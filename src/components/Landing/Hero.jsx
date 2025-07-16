import React from "react";
import LandingNavbar from "./Navbar";
import Button from "../UI/Button";
import userIcon from "../../assets/landingpage/user-icon.svg";
import featureImage from "../../assets/landingpage/feature-image.svg";
import curve1 from "../../assets/landingpage/curve-1.svg";
import curve2 from "../../assets/landingpage/curve-2.svg";
import laptopImage from "../../assets/landingpage/laptop.svg";
import Footer from "./Footer";

const Hero = () => {
    return (
        <div className=" bg-[var(--white)] relative">
            <LandingNavbar />
            <div className="lg:p-12 p-6 text-[var(--black)] w-full">
                <div className=" relative flex flex-wrap items-start justify-between w-full">
                    <div className="lg:sticky top-[134px] left-0 z-20">
                        <h1 className="lg:text-[40px] text-[25px] font-semibold"><span className="text-[var(--red-primary)] lg:text-[60px] text-[40px] block leading-none">Create</span> a career in tech.</h1>
                        <p className="text-[16px] lg:text-[20px] mt-2 mb-9 max-w-[520px] font-light">The template includes carefully structured sections for personal information, summary or objective, work experience, education, skills, projects, certifications, and more. You can easily customize these sections to fit your unique background.</p>
                        <Button children={"Create Resume for free"}/>
                    </div>
                    <div className="mt-20 sm:mt-0">
                        <div className="max-w-[500px] border border-[var(--gray-light)] rounded-lg p-4 mb-4 flex items-start gap-6">
                            <img src={userIcon} />
                            <div className="flex flex-col gap-2">
                                <div className="">
                                    <h2 className="text-[var(--black)] text-[18px] font-medium">John Doe</h2>
                                    <p className="text-[var(--gray-dark)] text-[14px] font-medium">Software Engineer</p>
                                </div>

                                <div>
                                    <h3 className="text-[var(--black)] text-[16px] font-medium">BiO</h3>
                                    <p className="text-[var(--gray-dark)] font-light text-[14px]">I’m a frontend developer with 3years experience in ReactJs and VueJs</p>
                                </div>

                            </div>
                        </div>
                        <div className="lg:w-[500px] max-w-[574px] border border-[var(--gray-light)] rounded-lg p-4">
                            <div className="flex flex-col gap-2">
                                <div className="">
                                    <h2 className="text-[18px] font-medium mb-4">Work History</h2>
                                    <p className="text-[14px] font-medium"><span className="block">Cloud Engineer | Yep!, USA</span> March 2022 - Present</p>
                                </div>

                                <div>
                                    <p className="font-light text-[14px]">I am Christian Chiemela<br/>
                                        A cloud engineer, a Nigerian with the passion for creating stunning and user-friendly websites and applications. With 3years plus experience in the industry, I have honed skills in HTML, CSS, Javascript, as well as modern frontend frameworks such as ReactJs And VueJs.<br/>
                                        I began my career at Esoft response a United Kingdom base company where I quickly develop the interest in frontend development. Years later I moved to YEP! a United States of America base company where I am responsible for the development and maintenance of several high-traffic websites.
                                        I have the ability of turning complex design concepts into highly optimized and accessible user interfaces, which are up to date with the latest trends and technologies in the industry. I am always looking for ways to improve the user experience and performance of my projects.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="feature w-full pt-10">
                    <h1 className="text-[30px] lg:text-[48px] text-center text-[var(--red-primary)] p-10">Features</h1>

                    <div className="flex flex-wrap justify-between items-center gap-10">
                        <div className="max-w-[608px]">
                            <h2 className="text-[18px] lg:text-[24px] font-medium mb-3 lg:ml-4">Templates</h2>
                            <p className="font-light text-[14px] lg:text-[17px] lg:ml-4">A variety of pre-designed and customizable resume templates catering to different industries, roles, and design preferences.</p>
                            <img src={featureImage} className="w-[300px] h-[220px] lg:w-[608px] lg:h-[370px] my-6" alt="template1"/>
                            <h2 className="text-[18px] lg:text-[24px] font-medium mb-3 lg:ml-4">Customization Options</h2>
                            <p className="font-light text-[14px] lg:text-[17px] mb-6 lg:ml-4">Ability to customize templates by changing colors, layouts, and adding personal branding elements, drag-and-drop functionality to rearrange sections and content blocks.</p>
                        </div>

                        <div className="max-w-[520px]">
                            <img src={curve1} className="lg:block mb-12 rotate-10 w-[150px] sm:w-[360px]" alt="curve1"/>
                            <h2 className="text-[18px] lg:text-[24px] font-medium mb-3 lg:ml-4">Free Cover Letter</h2>
                            <p className="font-light text-[14px] lg:text-[17px] lg:ml-4">With each of our professionally designed resume templates, you'll receive a FREE cover letter template that's perfectly matched to your chosen resume style. Our cover letter templates are designed to help you:</p>
                            <img src={curve2} className="hidden lg:block mt-12" alt="curve2"/>
                        </div>
                    </div>
                </div>

                <div className="bg-[linear-gradient(var(--wbgradient))] w-full sm:p-10 rounded-lg flex items-center justify-between flex-wrap gap-6 mt-10 p-4">
                    <div className="">
                        <h1 className="lg:text-[40px] text-[25px] font-medium mb-2"><span className="block leading-none">Join the</span> ceVBuilder family</h1>
                        <img src={laptopImage} alt="press laptop" className="w-[364px] sm:hidden lg:w-[506px] lg:h-[390px]" />
                        <p className="text-[16px] lg:text-[20px] mt-2 mb-9 max-w-[520px] font-light">We're thrilled to welcome you to the ceVBuilder family, where your journey to crafting exceptional resumes begins!</p>
                        <Button children={"Join ceVBuilder"}/>
                    </div>
                    <img src={laptopImage} alt="press laptop" className="hidden w-[364px] h-[267px] sm:block lg:w-[506px] lg:h-[390px]" />
                </div>

                <div className="mt-6 lg:mt-20 lg:px-24 p-6">
                    <h1 className="text-[var(--red-primary)] text-lg lg:text-4xl mb-2 sm:mb-6">About ceVBuilder</h1>
                    <p className="font-light text-base/7 lg:text-2xl/11">
                    Are you ready to take your career journey to the next level? Look no further than our state-of-the-art Resume Builder application! We understand that crafting a compelling resume is your ticket to landing your dream job, and our platform is designed to empower you in this endeavor.
                    </p>
                </div>
            </div>
            <Footer />  
        </div>
    )
}

export default Hero;

