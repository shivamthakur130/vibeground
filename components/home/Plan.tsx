import React from 'react';
import Image from 'next/image';
import Croun from '@/assets/images/croun.png';
import Star from '@/assets/images/star.png';
import Tic from '@/assets/images/tic.png';
const Plan = () => {


	return (
		<div className="Plan max-w-[500px] mx-auto mt-40 mb-40">
			<p className='text-xl text-888 mb-5 text-center'>Let’s Complete your Profile</p>
			<h2 className='text-5xl font-PoppinsBold text-111 mb-16 text-center'>Choose you plan</h2>
			<div className='mx-auto grid grid-flow-col gap-8'>

				<div className="px-5 pt-12 pb-5 rounded-xl relative shadow-shado min-w-[230px]">
					<div className='h-9 w-9 rounded bg-[#DFE9DF] flex items-center justify-center'>
						<Image src={Star} alt='#' />
					</div>
					<h2 className='font-PoppinsBold text-15px mt-1.5'>Premium <span className='text-[10px]'> (3 Months)</span> </h2>
					<h2 className='font-PoppinsBold text-2xl text-2f2f2f'>30<span className='text-sm font-PoppinsMedium text-[#B5B5B5]'> CHF/3 Months</span></h2>
					<div className='font-PoppinsMedium py-3'>(8 CHF/month)</div>
					<ul className='space-y-4 text-sm'>
						<li className='flex justify-between'>Videos <span>--</span></li>
						<li className='flex justify-between'>Images <span>--</span></li>
						<li className='flex justify-between'>Swipe Models <span className='text-[#558F71]'>Limited</span></li>
					</ul>
				</div>
				<div className="px-5 pt-12 pb-5 rounded-xl relative shadow-shado min-w-[230px] border-2 border-[#F4BE55]">
					<div className='absolute -top-4 left-0 right-0 flex items-center'><span className='px-5 py-2 bg-[#F4BE55] rounded text-xs mx-auto text-center text-white'>Recommended</span> </div>
					<div className='h-9 w-9 rounded bg-[#FEFAEC] flex items-center justify-center'>
						<Image src={Croun} alt='#' />
					</div>
					<h2 className='font-PoppinsBold text-15px mt-1.5'>Premium  <span className='text-[10px]'> (1 Year) </span> </h2>
					<h2 className='font-PoppinsBold text-2xl text-2f2f2f'>120<span className='text-sm font-PoppinsMedium text-[#B5B5B5]'> CHF/Year</span></h2>
					<div className='font-PoppinsMedium py-3'>(8 CHF/month)</div>
					<ul className='space-y-4 text-sm'>
						<li className='flex justify-between'>Videos <span><Image src={Tic} alt='#' /></span></li>
						<li className='flex justify-between'>Images <span><Image src={Tic} alt='#' /></span></li>
						<li className='flex justify-between'>Swipe Models <span><Image src={Tic} alt='#' /></span></li>
					</ul>

				</div>


			</div>
			<button className='btn btn-default w-full px-24 py-6 mt-20 text-xl bg-2f2f2f text-white rounded-lg self-center'>Continue</button>
		</div>
	);
};

export default Plan;