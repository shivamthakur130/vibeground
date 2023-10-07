import React from 'react';
const OTP = () => {
	return (
		<div className="Welcome max-w-6xl mx-auto mt-40 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111">OTP Verification </h2>
			<p className="text-xl text-[#455154] mt-9 mb-6">
				We have sent a Verification Code toDominik@applaunch.io
			</p>
			<div className="input-group flex space-x-5">
				<input
					type="text"
					className="text-center border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block py-4 px-5 w-16"
					maxLength={1}
				/>
				<input
					type="text"
					className="text-center border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block py-4 px-5 w-16"
					maxLength={1}
				/>
				<input
					type="text"
					className="text-center border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block py-4 px-5 w-16"
					maxLength={1}
				/>
				<input
					type="text"
					className="text-center border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block py-4 px-5 w-16"
					maxLength={1}
				/>
			</div>
			<button className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
				Sign In
			</button>
		</div>
	);
};

export default OTP;
