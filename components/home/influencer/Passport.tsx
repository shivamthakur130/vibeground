import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Upload from '@/assets/images/svg/upload.svg';

const Passport = () => {
	return (
		<div className="Email text-center max-w-4xl mx-auto mt-40 mb-40">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Upload Your Passport to Verify
			</h2>
			<div className="grid grid-cols-2 gap-6 my-6 max-w-xl mx-auto">
				<label
					htmlFor="dropzone-file"
					className="flex flex-col items-center justify-center max-w-[283px] h-52 rounded-xl bg-[#f9f9f9] cursor-pointer">
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<Image src={Upload} alt="#" />
					</div>
					<input id="dropzone-file" type="file" className="hidden" />
				</label>
				<label
					htmlFor="dropzone-file2"
					className="flex flex-col items-center justify-center max-w-[283px] h-52 rounded-xl bg-[#f9f9f9] cursor-pointer">
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<Image src={Upload} alt="#" />
					</div>
					<input id="dropzone-file2" type="file" className="hidden" />
				</label>
			</div>
			<Link href="/influencer/pictures">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default Passport;
