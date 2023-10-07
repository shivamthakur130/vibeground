import React from 'react';
import Link from 'next/link';

const DOB = () => {
	return (
		<div className="Email text-center max-w-xl mx-auto mt-40 mb-40">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Enter Your Date of Birth
			</h2>
			<div className="grid   grid-cols-3 gap-6 my-6 ">
				<input
					type="text"
					className="text-center border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
					placeholder="DD"
					required
				/>
				<input
					type="text"
					className="text-center border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
					placeholder="MM "
					required
				/>
				<input
					type="text"
					className="text-center border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
					placeholder="YY"
					required
				/>
			</div>
			<Link href="/account/gender">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default DOB;
