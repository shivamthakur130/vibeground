import React from 'react';
import Link from 'next/link';

const Password = () => {
	return (
		<div className="Password text-center max-w-2xl mx-auto mt-40 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111">Entern your Password</h2>
			<p className="text-xl text-888 mt-3 mb-16">
				Set your strong password, Upper case Letter, Digit numbers and special
				characters @,$,%,*,#
			</p>
			<input
				type="password"
				id="password"
				className="max-w-[460px] mx-auto bg-white border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
				placeholder="Password"
				required
			/>
			<Link href="/account/dob">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default Password;
