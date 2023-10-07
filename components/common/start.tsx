import Link from 'next/link';
import React from 'react';

const Start = () => {
	return (
		<div className="start text-center mt-60 mb-80">
			<h1 className="text-75px font-black font-PoppinsBold">
				Start Something Epic
			</h1>
			<p className="text-21px max-w-2xl mx-auto mt-7 mb-10">
				The Best app for content creators out there that provide a single platform
				to connect with your audience
			</p>
			<Link
				href="account"
				className="btn btn-default px-11 py-6 text-xl bg-303030 text-white rounded-lg">
				Create account
			</Link>
		</div>
	);
};

export default Start;
