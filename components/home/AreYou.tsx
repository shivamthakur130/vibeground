import React from 'react';
import Image from 'next/image';
import Fan from 'assets/images/fan.png';
import Modal from 'assets/images/model.png';
import Link from 'next/link';

const AreYou = () => {
	return (
		<div className="AreYou text-center max-w-[430px] mx-auto mt-40 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111">Are you</h2>
			<p className="text-xl text-888 mt-3 mb-16">
				Choose who you are going to be{' '}
			</p>
			<div className="mx-auto grid grid-flow-col gap-4">
				<div className="flex items-center  rounded-xl h-52 w-52 relative">
					<Image src={Fan} alt="#" />
					<input
						id="bordered-radio-1"
						type="radio"
						value=""
						name="bordered-radio"
						className="w-8 h-8 absolute top-5 left-5  bg-white border-0 ring-0 focus:ring-0  "
					/>
					<label
						htmlFor="bordered-radio-1"
						className="absolute bottom-4 left-0 right-0 text-white text-2xl">
						Fan
					</label>
				</div>
				<div className="flex items-center  rounded-xl h-52 w-52 relative">
					<Image src={Modal} alt="#" />
					<input
						checked
						id="bordered-radio-2"
						type="radio"
						value=""
						name="bordered-radio"
						className="w-8 h-8 absolute top-5 left-5  bg-white border-0 ring-0 focus:ring-0  "
					/>
					<label
						htmlFor="bordered-radio-2"
						className="absolute bottom-4 left-0 right-0 text-white text-2xl">
						Model
					</label>
				</div>
			</div>
			<Link href="/account/email">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default AreYou;
