'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/p01.png';
import Post2 from '@/assets/images/p02.png';
import Post3 from '@/assets/images/p03.png';
import Post4 from '@/assets/images/p04.png';
import Post5 from '@/assets/images/p05.png';
import Croun from '@/assets/images/svg/croun2.svg';
import Heart from '@/assets/images/heart.png';
import Arrow from '@/assets/images/svg/arrow-right.svg';
import PageWrapper from '../common/PageWrapper';

const Dashboard = () => {
	return (
		<PageWrapper>
			<div className=" max-w-7xl px-5 mx-auto mt-24 mb-24">
				<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 flex items-center mb-10">
					Influencer
				</h2>
				<div className="grid md:grid-cols-2 gap-5 md:gap-10">
					<div className="relative">
						<Image src={Post1} className="w-full" alt="#" />
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<Image src={Heart} alt="#" />
							<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
								Meet & Greet{' '}
								<Link href="/influencer/meet-&-greet">
									<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
										<Image src={Arrow} alt="#" />
									</span>
								</Link>
							</h3>
						</div>
					</div>
					<div className="relative">
						<Image src={Post2} className="w-full" alt="#" />
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<Image src={Croun} alt="#" />
							<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
								Newcomer of the month{' '}
								<Link href="/influencer/newcomer">
									<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
										<Image src={Arrow} alt="#" />
									</span>
								</Link>
							</h3>
						</div>
					</div>
					<div className="relative">
						<Image src={Post3} className="w-full" alt="#" />
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
								Collaborate{' '}
								<Link href="/influencer/collaborate">
									<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
										<Image src={Arrow} alt="#" />
									</span>
								</Link>
							</h3>
						</div>
					</div>
					<div className="relative">
						<Image src={Post4} className="w-full" alt="#" />
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
								Advertising{' '}
								<Link href="/influencer/advertising">
									<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
										<Image src={Arrow} alt="#" />
									</span>
								</Link>
							</h3>
						</div>
					</div>
					<div className="relative">
						<Image src={Post5} className="w-full" alt="#" />
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
								Vibeground TV{' '}
								<Link href="/influencer/vibeground-tv">
									<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
										<Image src={Arrow} alt="#" />
									</span>
								</Link>
							</h3>
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default Dashboard;
