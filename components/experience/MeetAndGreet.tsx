import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MeetGreet from '@/assets/images/meetandgreet.png';
import Location from '@/assets/images/svg/mapmarkar.svg';
import Calendar from '@/assets/images/svg/calendar.svg';
import Arrow from '@/assets/images/svg/arrow-right.svg';
import Heart from '@/assets/images/heart.png';


const MeetAndGreet = () => {
	return (
		<div className="Experience max-w-7xl px-5 mx-auto mt-24 mb-24">
			<h2 className="text-5xl font-PoppinsBold text-111 flex items-center mb-10">
				Meet & Greet
			</h2>
			<div className="flex">
				<div className="relative rounded-md overflow-hidden mr-16">
					<Image src={MeetGreet} className="h-[626px] w-[401px]" alt="#" />
				</div>
				<div className='space-y-10'>
					<h3 className="text-4xl font-PoppinsSemiBold">
						Jessica, 24{' '}
					</h3>
					<button className='btn px-6 py-2 bg-2f2f2f text-white text-base rounded font-PoppinsRegular'>Asian</button>
					<div className='flex items-center space-x-6'>
						<Image src={Calendar} className="h-10 w-10" alt="#" />
						<span className='text-[32px] text-656565'>20th June 2024 at 8:00 Pm</span>
					</div>
					<div className='flex items-center space-x-6'>
						<Image src={Location} className="h-[50px] w-[33px] " alt="#" />
						<span className='text-[32px] text-656565'>Berlin, Germany</span>
					</div>
					<div>
						<h3 className=" mt-6  flex items-center justify-between text-xl text-[#090F24] font-PoppinsMedium">
							Terms & Conditions{' '}
							<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
								<Image src={Arrow} height={14} width={7} alt="#" />
							</span>
						</h3>

					</div>
				</div>



			</div>
		</div>
	);
};

export default MeetAndGreet;
