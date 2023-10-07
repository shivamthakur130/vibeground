import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import CenterLogo from '@/assets/images/center-logo.png';

const Start = () => {
	return (
		<div className="start text-center mt-60 mb-80">
			{/* <h1 className="text-75px font-black font-PoppinsBold">
				Start Something Epic
			</h1> */}
			<p className="text-21px max-w-2xl mx-auto mt-7 mb-10">
				<Image src={CenterLogo} alt="#" />
			</p>
			<Link href="account">
				<button
					className="mt-2 
				rounded-[8px]  btn btn-default  py-4 px-6 bg-white hover:bg-gray-300   text-151515 cursor-pointer text-xl text-center transition-all duration-300 active:bg-gray-50 ">
					Join Today!
				</button>
			</Link>
		</div>
	);
};

export default Start;
