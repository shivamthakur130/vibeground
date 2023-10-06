'use client';
import Image from 'next/image';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Start from '@/components/common/start';
import { useState } from 'react';
import Registration from './registration';
import AreYou from './are-you';
import Email from './email';
import Userdetail from './userDetai';
import Password from './password';
import DOB from './dob';
import Gender from './gender';
import Selection from './select';
import Welcome from './welcome';
import OTP from './otp';
import Plan from './plan';
export default function Home() {


	return (
		// <div id="LoginRoot" className='min-h-screen'>
		<div id="LoginRoot" className='home-screen min-h-screen'>
			<div className='max-w-7xl mx-auto pt-12 '>
				<Header />
			</div>
			<div className='max-w-7xl mx-auto'>
				<Start />
				{/* <Registration />
				<AreYou />
				<Email />
				<Userdetail />
				<Password />
				<DOB />
				<Gender />
				<Selection />
				<Welcome />
				<OTP />
				<Plan /> */}
			</div>
			<div className='w-full bg-[#151515]'>
				<div className='max-w-7xl mx-auto py-20'>
					<Footer />
				</div>
			</div>
		</div>
	);
}