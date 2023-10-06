import React from 'react';
import Image from 'next/image';
import Croun from '../assets/images/croun.png';
import Star from '../assets/images/star.png';
import Tic from '../assets/images/tic.png';
const Billing = () => {


	return (
		<div className="Billing max-w-[480px] mx-auto mt-40 mb-40">
			<p className='text-xl text-888 mb-5 text-center'>Let’s Complete your Profile</p>
			<h2 className='text-5xl font-PoppinsBold text-111 mb-16 text-center'>Choose you plan</h2>
			<div className='mx-auto grid grid-flow-col gap-4'>

				<div className="px-5 pt-8 pb-5 rounded-xl relative shadow-lg min-w-[230px]">
					<div className='h-9 w-9 rounded bg-[#DFE9DF] flex items-center justify-center'>
						<Image src={Star} alt='#' />
					</div>
					<h2 className='font-bold text-15px mt-1.5'>Premium <span className='text-[10px]'> (3 Months)</span> </h2>
					<h2 className='font-bold text-2xl text-2f2f2f'>30<span className='text-sm font-medium text-[#B5B5B5]'> CHF/3 Months</span></h2>
					<div className='font-medium py-3'>(8 CHF/month)</div>
					<ul className='space-y-4'>
						<li className='flex justify-between'>Videos <span>--</span></li>
						<li className='flex justify-between'>Images <span>--</span></li>
						<li className='flex justify-between'>Swipe Models <span className='text-[#558F71]'>Limited</span></li>
					</ul>
				</div>
				<div className="px-5 pt-8 pb-5 rounded-xl relative shadow-lg min-w-[230px]">
					<div className='h-9 w-9 rounded bg-[#FEFAEC] flex items-center justify-center'>
						<Image src={Croun} alt='#' />
					</div>
					<h2 className='font-bold text-15px mt-1.5'>Premium  <span className='text-[10px]'> (1 Year) </span> </h2>
					<h2 className='font-bold text-2xl text-2f2f2f'>120<span className='text-sm font-medium text-[#B5B5B5]'> CHF/Year</span></h2>
					<div className='font-medium py-3'>(8 CHF/month)</div>
					<ul className='space-y-4'>
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

export default Billing;