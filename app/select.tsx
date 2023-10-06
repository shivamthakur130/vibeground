import React from 'react';

const Selection = () => {

	return (
		<div className="Email text-center max-w-xl mx-auto mt-40 mb-40">
			<p className='text-xl text-888 mb-5'>Let’s Complete your Profile</p>
			<h2 className='text-5xl font-PoppinsBold text-111 mb-16'>Select Your Selection</h2>


			<select id="countries" className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4">
				<option selected>Country</option>
				<option value="US">United States</option>
				<option value="CA">Canada</option>
				<option value="FR">France</option>
				<option value="DE">Germany</option>
			</select>

			<select id="countries" className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4">
				<option selected>City</option>
				<option value="US">City</option>
				<option value="CA">Canada</option>
				<option value="FR">France</option>
				<option value="DE">Germany</option>
			</select>
			<button className='btn btn-default w-[416px] px-24 py-6 mt-20 text-xl bg-2f2f2f text-white rounded-lg'>Continue</button>
		</div>
	);
};

export default Selection;