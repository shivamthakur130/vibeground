import React from 'react';

const Gender = () => {

	return (
		<div className="Email text-center max-w-xl mx-auto mt-40 mb-40">
			<p className='text-xl text-888 mb-5'>Let’s Complete your Profile</p>
			<h2 className='text-5xl font-PoppinsBold text-111 mb-16'>Select Your Gender</h2>


			<div className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4">
				<label htmlFor="default-radio-1" className="ml-2 text-xl text-9e9e9e">Male</label>
				<input id="default-radio-1" type="radio" value="" name="default-radio" className="w-7 h-7 " />
			</div>
			<div className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4">
				<label htmlFor="default-radio-2" className="ml-2 text-xl text-9e9e9e">Female</label>
				<input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-7 h-7 " />
			</div>



			<button className='btn btn-default w-[416px] px-24 py-6 mt-20 text-xl bg-2f2f2f text-white rounded-lg'>Continue</button>
		</div>
	);
};

export default Gender;