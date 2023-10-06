import React from 'react';

const Email = () => {

	return (
		<div className="Email text-center max-w-2xl mx-auto mt-40 mb-40">
			<h2 className='text-5xl font-PoppinsBold text-111'>Entern your  Email</h2>
			<p className='text-xl text-888 mt-3 mb-16'>By Entering your number, you will receive a verification code on your number </p>
			<input type="email" id="email" className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 " placeholder="Enter Your Email" required />
			<button className='btn btn-default px-24 py-6 mt-20 text-xl bg-2f2f2f text-white rounded-lg'>Continue</button>
		</div>
	);
};

export default Email;