import React from 'react';
import Image from 'next/image';
import Hand from '@/assets/images/hand.png';
import Link from 'next/link';

const Login = () => {
	return (
		<div className="Login max-w-xl mx-auto mt-24 mb-40 text-center">
			<h2 className="text-5xl font-PoppinsBold text-111 flex items-center justify-center">
				Welcome to User <Image className="ml-8" src={Hand} alt="#" />
			</h2>
			<p className="text-xl text-[#455154] mt-9 mb-6">
				Enter your E-mail Address
			</p>
			<div className='flex  flex-col space-y-8'>
				<input
					type="email"
					id="email"
					className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-5 "
					placeholder="Email Address"
					required
				/>
				<input
					type="email"
					id="email"
					className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-5 "
					placeholder="Email"
					required
				/>
				<Link href="/account/otp">
					<button className="btn btn-default px-24 py-4 text-xl text-white bg-gray-500 rounded-[8px] hover:bg-151515">
						Sign in
					</button>
				</Link>
				<Link href="/account/otp">
					<button className="btn btn-default px-24 py-4 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
						Are You Model?
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;
