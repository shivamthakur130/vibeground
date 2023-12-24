'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MeetGreet from '@/assets/images/user-setail.png';
import Location from '@/assets/images/svg/mapmarkar.svg';
import Fb from '@/assets/images/fbb.png';
import Insta from '@/assets/images/instag.png';
import PageWrapper from '../common/PageWrapper';

const NewComerWeekDetail = () => {
	return (
		<PageWrapper>
			<div className="Experience max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">
				<h2 className="md:text-5xl text-2xl font-PoppinsSemiBold text-111 flex items-center mb-10">
					Meet & Greet
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
					<div className="relative rounded-md overflow-hidden">
						<Image src={MeetGreet} className=" " alt="#" />
					</div>
					<div className="space-y-5 md:space-y-8">
						<div className="flex md:block md:flex-col md:space-y-10">
							<h3 className="text-2xl md:text-4xl font-PoppinsSemiBold mr-4">
								Jessica, 24{' '}
							</h3>
							<button className="md:hidden btn px-6 py-2 bg-[#c5c5c5]/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular">
								Asian
							</button>
							<button className="hidden btn px-6 py-2 bg-2f2f2f text-white text-base rounded font-PoppinsRegular">
								Asian
							</button>
						</div>
						<div className="flex items-center space-x-6">
							<Image
								src={Location}
								className="h-5 w-4 md:h-[50px] md:w-[33px] "
								alt="#"
							/>
							<span className="text-base md:text-[32px] text-656565">
								Berlin, Germany
							</span>
						</div>
						<p className="p-3 bg-[#f9f9f9] text-656565 rounded-xl">
							“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
							temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
							veniam,”
						</p>
						<hr className="md:hidden"></hr>
						<div className="">
							<p className="text-[#444] text-sm md:text-xl md:mb-4">Attributes</p>
							<span className="text-base md:text-[32px] text-656565">Asian</span>
						</div>
						<hr className="md:hidden"></hr>
						<div className="">
							<p className="text-[#444] text-sm md:text-xl md:mb-4">Services</p>
							<span className="text-base md:text-[32px] text-656565">
								Toys, Bondage
							</span>
						</div>

						<hr className="md:hidden"></hr>
						<div>
							<p className="text-[#444] text-sm md:text-xl md:mb-4">Links</p>
							<div className="flex space-x-3">
								<Image src={Fb} className=" cursor-pointer h-[38px] w-10" alt="#" />
								<Image src={Insta} className=" cursor-pointer h-[38px] w-10" alt="#" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default NewComerWeekDetail;
