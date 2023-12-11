import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/Sammy.png';
import Back from '@/assets/images/svg/A-arrow.svg';
import Close from '@/assets/images/svg/A-Close.svg';
import Heart from '@/assets/images/svg/A-heart.svg';

const TinderAbout = () => {
	return (
		<div className="TinderAbout max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">

				<div className="relative rounded-2xl overflow-hidden bg-white">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute flex bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-black/5 min-h-[50%]">
						<div className="mt-auto self-end w-full">
							<h3 className="text-4xl text-white font-PoppinsSemiBold">
								Sammy, {' '}
							</h3>
							<div className="flex mt-3 text-white text-xl">
								25,Califonria
							</div>
						</div>
					</div>

				</div>


				<div className='col-span-2'>
					<div className='text-2xl font-PoppinsSemiBold mb-10'>
						About Me
					</div>
					<p>Beyond her stunning appearance, [Her Name] possesses a fiery spirit that sets her apart. Her vivacious personality shines through in everything she does, from her infectious laughter to her bold and adventurous nature. She embraces life with gusto, fearlessly exploring new horizons and embracing every opportunity that comes her way.</p>
					<h3 className='font-PoppinsBold text-xl my-6'>Interests</h3>
					<ul className='flex space-x-4'>
						<li className='border border-[#a3a3a3] rounded-[20px] px-7 py-2'>Fun</li>
						<li className='border border-[#a3a3a3] rounded-[20px] px-7 py-2'>Entertainment</li>
						<li className='border border-[#a3a3a3] rounded-[20px] px-7 py-2'>Fun</li>
						<li className='border border-[#a3a3a3] rounded-[20px] px-7 py-2'>Entertainment</li>
						<li className='border border-[#a3a3a3] rounded-[20px] px-7 py-2'>Fun</li>
						<li className='border border-[#a3a3a3] rounded-[20px] px-7 py-2'>Fun</li>
					</ul>
					<div className='flex item-center space-x-4 py-7 mt-10'>
						<ul className='flex space-x-4'>
							<li className='bg-d9d9d9 rounded-full shadow-xl cursor-pointer flex items-center justify-center h-20 w-20'><Image src={Back} className="" alt="#" /></li>
							<li className='bg-d9d9d9 rounded-full shadow-xl cursor-pointer flex items-center justify-center h-20 w-20'><Image src={Close} className="" alt="#" /></li>
							<li className='bg-[#FF3900] rounded-full shadow-xl cursor-pointer flex items-center justify-center h-20 w-20'><Image src={Heart} className="" alt="#" /></li>

						</ul>

					</div>
				</div>

			</div>
		</div>
	);
};

export default TinderAbout;
