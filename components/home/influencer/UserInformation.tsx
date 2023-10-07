import React from 'react';
import Link from 'next/link';

const UserInformation = () => {
	return (
		<div className="Email text-center max-w-4xl mx-auto mt-40 mb-40">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Enter your  Information
			</h2>
			<div className="grid   grid-cols-2 gap-6 my-6">
				<input
					type="text"
					className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
					placeholder="Enter Your First Name"
					required
				/>

				<input
					type="text"
					className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
					placeholder="Verficatrion"
					required
				/>

			</div>
			<input
				type="text"
				className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
				placeholder="Email"
				required
			/>
			<Link href="/influencer/passport">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default UserInformation;
