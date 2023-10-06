import React from 'react';
import Image from 'next/image';
import FaceBook from 'assets/images/fb.png';
import Google from 'assets/images/google.png';
import Phone from 'assets/images/phone.png';
const Registration = () => {


	return (
		<div className="registration text-center mt-40 mb-40">
			<h2 className='text-5xl font-PoppinsBold text-111'>Create account</h2>
			<p className='text-xl text-888 mt-3 mb-16'>By Clicking Login, you agreeing our Terms and Policis</p>
			<ul className='max-w-[375px] mx-auto space-y-3'>
				<li className='flex border border-black rounded-lg p-4 text-lg justify-between items-center'>Continue with Google <Image src={Google} alt='#' /></li>
				<li className='flex border border-black rounded-lg p-4 text-lg justify-between items-center'>Continue with Facebook <Image src={FaceBook} alt='#' /></li>
				<li className='flex border border-black rounded-lg p-4 text-lg justify-between items-center'>Continue with Phone number <Image src={Phone} alt='#' /></li>
			</ul>
			<button className='btn btn-default px-24 py-6 mt-20 text-xl bg-2f2f2f text-white rounded-lg'>Already have account?</button>
		</div>
	);
};

export default Registration;