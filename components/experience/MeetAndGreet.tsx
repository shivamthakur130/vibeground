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
			<div className="flex flex-col md:flex-row">
				<div className="relative rounded-md overflow-hidden md:mr-16">
					<Image src={MeetGreet} className="h-[626px] w-[401px]" alt="#" />
				</div>
				<div className='space-y-5 md:space-y-10 mt-10'>
					<div className='flex md:block md:flex-col md:space-y-10'>
						<h3 className="text-2xl md:text-4xl font-PoppinsSemiBold mr-4">
							Jessica, 24{' '}
						</h3>
						<button className='md:hidden btn px-6 py-2 bg-[#c5c5c5]/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular'>Asian</button>
						<button className='hidden btn px-6 py-2 bg-2f2f2f text-white text-base rounded font-PoppinsRegular'>Asian</button>
					</div>
					<hr className='md:hidden'></hr>
					<div className='flex items-center space-x-6'>
						<Image src={Calendar} className="h-6 w-6 md:h-10 md:w-10" alt="#" />
						<span className='text-base md:text-[32px] text-656565'>20th June 2024 at 8:00 Pm</span>
					</div>
					<div className='flex items-center space-x-6'>
						<Image src={Location} className="h-5 w-4 md:h-[50px] md:w-[33px] " alt="#" />
						<span className='text-base md:text-[32px] text-656565'>Berlin, Germany</span>
					</div>
					<hr className='md:hidden'></hr>
					<div>
						<h3 className=" mt-6  flex items-center justify-between text-base md:text-xl text-[#090F24] font-PoppinsMedium">
							Terms & Conditions{' '}
							<span className="flex items-center justify-center md:h-11 md:w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
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
