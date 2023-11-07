import React from 'react';
import Link from 'next/link';

const SupportForm = () => {
	return (
		<div className="Email text-center max-w-xl mx-auto mt-40 mb-40">
			<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 mb-16">Support Form</h2>
			<div className="space-y-5">
				<select className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-[#C1C1C1]-500 block w-full py-4 px-4 ">
					<option>Problem with payment</option>
					<option>Problem with payment</option>
					<option>Problem with payment</option>
				</select>

				<input
					type="text"
					className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-[#C1C1C1]-500 block w-full py-4 px-4 "
					placeholder="Money not received"
					required
				/>
				<textarea
					className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-[#C1C1C1]-500 block w-full py-4 px-4 "
					placeholder="Write Description"
				/>
			</div>

			<Link href="/influencer">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
					Send
				</button>
			</Link>
		</div>
	);
};

export default SupportForm;
