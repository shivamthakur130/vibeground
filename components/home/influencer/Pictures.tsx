import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Upload from '@/assets/images/svg/upload.svg';
const Pictures = () => {
	return (
		<div className="Email text-center max-w-3xl mx-auto mt-40 mb-40">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Upload Your  Pictures
			</h2>
			<div className="grid grid-cols-4 gap-6 my-6">
				<div className='w-full min-w-full'>
					<label htmlFor="dropzone-file2" className="flex flex-col items-center justify-center w-full h-40 rounded-xl cursor-pointer bg-[#f9f9f9]">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Image src={Upload} alt='#' />
						</div>
						<input id="dropzone-file2" type="file" className="hidden" />
					</label>
				</div>
				<div className='w-full min-w-full'>
					<label htmlFor="dropzone-file3" className="flex flex-col items-center justify-center w-full h-40 rounded-xl cursor-pointer bg-[#f9f9f9]">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Image src={Upload} alt='#' />
						</div>
						<input id="dropzone-file3" type="file" className="hidden" />
					</label>
				</div>
				<div className='w-full min-w-full'>
					<label htmlFor="dropzone-file4" className="flex flex-col items-center justify-center w-full h-40 rounded-xl cursor-pointer bg-[#f9f9f9]">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Image src={Upload} alt='#' />
						</div>
						<input id="dropzone-file4" type="file" className="hidden" />
					</label>
				</div>
				<div className='w-full min-w-full'>
					<label htmlFor="dropzone-file5" className="flex flex-col items-center justify-center w-full h-40 rounded-xl cursor-pointer bg-[#f9f9f9]">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Image src={Upload} alt='#' />
						</div>
						<input id="dropzone-file5" type="file" className="hidden" />
					</label>
				</div>
			</div>

			<div className="flex items-center justify-center w-full">
				<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 rounded-xl cursor-pointer bg-[#f9f9f9]">
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<Image src={Upload} alt='#' />
					</div>
					<input id="dropzone-file" type="file" className="hidden" />
				</label>
			</div>
			<Link href="/influencer/videos">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default Pictures;
