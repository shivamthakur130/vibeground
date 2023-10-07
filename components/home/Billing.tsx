import React from 'react';
import Image from 'next/image';
import Card from '@/assets/images/card.png';
import PayPal from '@/assets/images/paypal.png';
import Lock from '@/assets/images/lock.png';
import Link from 'next/link';

const Billing = () => {
	return (
		<div className="Billing max-w-5xl mx-auto mt-40 mb-40">

			<div className='mx-auto grid grid-cols-6 grid-flow-col gap-4'>
				<div>
					<div className='h-28 w-32 rounded-[20px] bg-[#282626] flex items-center justify-center mb-3.5'>
						<Image src={Card} alt='#' />

					</div>
					<div className='h-28 w-32 rounded-[20px] bg-[#DBDBDB] flex items-center justify-center'>
						<Image src={PayPal} alt='#' />
					</div>
				</div>

				<div className="col-span-5">
					<h2 className='text-4xl font-PoppinsBold text-111 mb-8'>Enter Your Billing information</h2>
					<input className='rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]' type='text' placeholder='Card Number' />
					<div className='grid grid-flow-col grid-cols-8 gap-6 my-6'>
						<div className='col-span-3'>
							<input className='rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]' type='text' placeholder='Expiry Date' />

						</div>
						<div className='col-span-5'>

							<input className='rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]' type='text' placeholder='CVC/CVV' />
						</div>
					</div>
					<input className='rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]' type='text' placeholder='Name of Card' />
					<div className='mt-6'>
						<div className='flex justify-between'><h3 className='font-PoppinsBold'>25 Boosts</h3><span className='text-111'>$300/each</span></div>
						<div className='flex justify-between mt-2'><h3 className='font-PoppinsBold'>Charged as</h3><span className='text-111'>$300</span></div>
						<div className='flex justify-between mt-10'>
							<button className='btn btn-default px-7 py-3 bg-2f2f2f text-white rounded-lg self-center'>Confirm Purchase</button>
							<span className='text-111 flex items-center font-PoppinsMedium text-sm'><Image className='mr-1.5' src={Lock} alt='#' /> Secure</span>
						</div>
					</div>

				</div>



			</div>
		</div>
	);
};

export default Billing;
