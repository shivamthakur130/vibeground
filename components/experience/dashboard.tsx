import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/p01.png';
import Post2 from '@/assets/images/p02.png';
import Post3 from '@/assets/images/p03.png';
import Croun from '@/assets/images/svg/croun2.svg';
import Heart from '@/assets/images/heart.png';
import Arrow from '@/assets/images/svg/arrow-right.svg';
const Experience = () => {
	return (
		<div className="Experience max-w-7xl px-5 mx-auto mt-24 mb-24">
			<h2 className="text-5xl font-PoppinsBold text-111 flex items-center mb-10">
				Experience
			</h2>
			<div className="grid md:grid-cols-2 gap-5 md:gap-10">
				<div className="relative">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute bottom-0 left-0 right-0 p-8">
						<Image src={Heart} alt="#" />
						<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
							Meet & Greet{' '}
							<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
								<Image src={Arrow} alt="#" />
							</span>
						</h3>
					</div>
				</div>
				<div className="relative">
					<Image src={Post2} className="w-full" alt="#" />
					<div className="absolute bottom-0 left-0 right-0 p-8">
						<Image src={Croun} alt="#" />
						<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
							Newcomer of week{' '}
							<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
								<Image src={Arrow} alt="#" />
							</span>
						</h3>
					</div>
				</div>
				<div className="relative">
					<Image src={Post3} className="w-full" alt="#" />
					<div className="absolute bottom-0 left-0 right-0 p-8">
						<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
							Collaborate{' '}
							<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
								<Image src={Arrow} alt="#" />
							</span>
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Experience;
