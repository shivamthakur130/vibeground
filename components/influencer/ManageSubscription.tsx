'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Croun from '@/assets/images/croun.png';
import CrounGray from '@/assets/images/croungray.png';
import Tic from '@/assets/images/svg/tic.svg';
const ManageSubscription = () => {
	const { replace } = useRouter();

	return (
		<div className="Profile max-w-7xl px-5 mx-auto  mt-16 mb-32">
			<div className="mb-12">
				<h1 className="text-4xl font-PoppinsSemiBold text-111">Manage Subscription</h1>
			</div>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
				<div>
					<span className='text-[#444] text-[32px] font-PoppinsSemiBold mb-12 block'>Active Subscription</span>
					<div className='bg-white'>
						<div className="text-left bg-gradient-to-r from-[#FFE1A8]  to-[#FFE1A8]/50 px-5 cursor-pointer pt-5 pb-5 rounded-xl relative w-full  shadow-shado">
							<div className='flex items-center mb-10'>
								<div className="h-14 w-14 rounded bg-white flex items-center justify-center mr-4">
									<Image src={Croun} alt="#" />
								</div>
								<div className='flex flex-col'>
									<span className='font-PoppinsMedium text-xl text-2f2f2f'>Pro Member</span>
									<span className='font-PoppinsRegular text-sm text-2f2f2f'>Expires at 02/06/23</span>
								</div>

							</div>
							<ul className='space-y-7 pl-3 text-xl text-[#455154] mb-14'>
								<li className='flex items-center'>
									<Image className='mr-6' src={Tic} alt="#" />Videos
								</li>
								<li className='flex items-center'>
									<Image className='mr-6' src={Tic} alt="#" />Images
								</li>
								<li className='flex items-center'>
									<Image className='mr-6' src={Tic} alt="#" />Swipe Models
								</li>
							</ul>
							<div
								className="cursor-pointer mb-3 btn btn-default px-3 py-5 text-xl font-PoppinsSemiBold text-white bg-303030 rounded-md hover:bg-151515 transition-all duration-300 active:bg-303030 text-center">
								<span>Renew Now</span>
							</div>
						</div>
					</div>
				</div>
				<div>
					<span className='text-[#444] text-[32px] font-PoppinsSemiBold mb-12 block'>Inactive Subscription</span>
					<div className='bg-white'>
						<div className="text-left bg-gradient-to-r from-[#CCC]  to-[#CCC] /50 px-5 cursor-pointer pt-5 pb-5 rounded-xl relative w-full">
							<div className='flex items-center'>
								<div className="rounded bg-white flex items-center justify-center mr-4">
									<Image src={CrounGray} alt="#" />
								</div>
								<div className='flex flex-col'>
									<span className='font-PoppinsMedium text-xl text-2f2f2f'>Pro Member</span>
									<span className='font-PoppinsRegular text-sm text-2f2f2f'>Expired at 02/01/23</span>
								</div>

							</div>

						</div>
					</div>
					<div className='bg-white mt-4'>
						<div className="text-left bg-gradient-to-r from-[#CCC]  to-[#CCC] /50 px-5 cursor-pointer pt-5 pb-5 rounded-xl relative w-full">
							<div className='flex items-center'>
								<div className="rounded bg-white flex items-center justify-center mr-4">
									<Image src={CrounGray} alt="#" />
								</div>
								<div className='flex flex-col'>
									<span className='font-PoppinsMedium text-xl text-2f2f2f'>Pro Member</span>
									<span className='font-PoppinsRegular text-sm text-2f2f2f'>Expired at 02/01/22</span>
								</div>

							</div>

						</div>
					</div>
				</div>

			</div>

		</div>
	);
};

export default ManageSubscription;
