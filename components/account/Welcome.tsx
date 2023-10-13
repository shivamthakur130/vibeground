import React from 'react';
import Image from 'next/image';
import Hand from '@/assets/images/hand.png';
import Link from 'next/link';

const Welcome = () => {
	return (
		<div className="Welcome max-w-3xl mx-auto mt-24 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111 flex items-center">
				Welcome <Image className="ml-8" src={Hand} alt="#" />
			</h2>
			<p className="text-xl text-[#455154] mt-9 mb-6">
				Enter your E-mail Address, and we’ll send an “OTP” so you can continue
			</p>
			<p className="text-xl text-3d3d3d mt-3 mb-8">Your E-mail Address</p>
			<input
				type="email"
				id="email"
				className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-5 "
				placeholder="Email"
				required
			/>
			<Link href="/account/otp">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default Welcome;
