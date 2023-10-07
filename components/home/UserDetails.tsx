import React from 'react';
import Link from 'next/link';

const UserDetails = () => {
	return (
		<div className="Email text-center max-w-4xl mx-auto mt-40 mb-40">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Enter your Username Details
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
					placeholder="Select your Username "
					required
				/>
				<input
					type="text"
					className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
					placeholder="Enter Your Last Name"
					required
				/>
				<input
					type="text"
					className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
					placeholder="only fans aacount"
					required
				/>
			</div>

			<textarea
				id="message"
				className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4"
				placeholder="About You"></textarea>

			<Link href="/account/password">
				<button className="btn btn-default px-24 py-6 mt-20 text-xl bg-2f2f2f text-white rounded-lg">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default UserDetails;
