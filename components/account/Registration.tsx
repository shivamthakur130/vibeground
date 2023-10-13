import React from 'react';
import Image from 'next/image';
import FaceBook from 'assets/images/fb.png';
import Google from 'assets/images/google.png';
import Phone from 'assets/images/phone.png';
import Link from 'next/link';

const Registration = () => {
	return (
		<div className="registration text-center mt-24 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111">Create account</h2>
			<p className="text-xl text-888 mt-3 mb-16">
				By Clicking Login, you agreeing our Terms and Polices
			</p>
			<ul className="max-w-[375px] mx-auto space-y-3">
				<li className="flex border border-black hover:bg-gray-100 cursor-pointer rounded-lg p-4 text-lg justify-between items-center">
					Continue with Google <Image src={Google} alt="#" />
				</li>
				<li className="flex border border-black  hover:bg-gray-100 cursor-pointer rounded-lg p-4 text-lg justify-between items-center">
					Continue with Facebook <Image src={FaceBook} alt="#" />
				</li>
				<li className="flex border border-black  hover:bg-gray-100 cursor-pointer rounded-lg p-4 text-lg justify-between items-center">
					Continue with Phone number <Image src={Phone} alt="#" />
				</li>
			</ul>
			<Link href="/account/are-you">
				<button className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
					Sign-up
				</button>
			</Link>
		</div>
	);
};

export default Registration;
