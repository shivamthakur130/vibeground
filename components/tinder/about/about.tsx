import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/Jessica.png';
import Back from '@/assets/images/svg/backa.svg';
import Close from '@/assets/images/svg/close-x.svg';
import Heart from '@/assets/images/svg/heart-wbg.svg';

const TinderAbout = () => {
	return (
		<div className="TinderAbout max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">

				<div className="relative rounded-2xl overflow-hidden bg-white">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
						<div className="mt-auto self-end w-full">
							<h3 className="text-2xl text-white font-PoppinsSemiBold">
								Jessica, 24{' '}
							</h3>
							<div className="flex justify-between mt-3">
								<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
									Asian
								</button>

							</div>
						</div>
					</div>

				</div>


				<div className='col-span-2'>
					dgdjgkdfjkghkjdh
					<div className='flex item-center space-x-4 justify-center py-7'>
						<a href='#'><Image src={Back} className="" alt="#" /></a>
						<a href='#'><Image src={Close} className="" alt="#" /></a>
						<a href='#'><Image src={Heart} className="" alt="#" /></a>
					</div>
				</div>

			</div>
		</div>
	);
};

export default TinderAbout;
