import React from 'react';
import Link from 'next/link';

const MeetAndGreet = () => {
	return (
		<div className="Email text-center max-w-xl mx-auto mt-40 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111 mb-7">
				Meet & Greet
			</h2>

			<div className='space-y-9'>
				<p className='text-xl'>interact with your followers in a personal and interactive way</p>
				<input
					type="text"
					className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-[#C1C1C1]-500 block w-full py-4 px-4 "
					placeholder="Enter Your Number"
					required
				/>
				<input
					type="text"
					className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-[#C1C1C1]-500 block w-full py-4 px-4 "
					placeholder="Instagram Url"
					required
				/>
			</div>
		</div>
	);
};

export default MeetAndGreet;
