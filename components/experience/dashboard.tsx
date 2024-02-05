'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/p01.png';
import Post2 from '@/assets/images/p02.png';
import Post3 from '@/assets/images/p03.png';
import Croun from '@/assets/images/svg/croun2.svg';
import Heart from '@/assets/images/heart.png';
import Arrow from '@/assets/images/svg/arrow-right.svg';
import PageWrapper from '../common/PageWrapper';
import { useRouter } from 'next/navigation';
import { IoChevronBackOutline } from 'react-icons/io5';
const Experience = () => {
	const { replace } = useRouter();
	return (
		<PageWrapper>
			<div className="Experience max-w-7xl px-5 mx-auto sm:mt-24 sm:mb-24 py-5 sm:py-0 ">
				<h2 className="text-3xl sm:text-5xl font-PoppinsBold text-111 flex items-center my-10 justify-between">
					Experience
					{/* <div
						className="cursor-pointer pr-5 btn btn-default px-3 py-2 mt-0 text-lg text-white bg-303030 rounded-md hover:bg-151515 transition-all duration-300 active:bg-303030 flex items-center space-x-1"
						onClick={() => {
							replace('/influencer');
						}}>
						<IoChevronBackOutline className="text-xl" /> <span>Back</span>
					</div> */}
				</h2>
				<div className="grid md:grid-cols-2 gap-5 md:gap-10">
					<div className="relative">
						<Image src={Post1} className="w-full" alt="#" />
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<Image src={Heart} alt="#" />
							<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
								Meet & Greet{' '}
								<Link href="/experience/meet-&-greet">
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
								<Link href="/experience/new-comer-of-month">
									<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
										<Image src={Arrow} alt="#" />
									</span>
								</Link>
							</h3>
						</div>
					</div>
					{/* <div className="relative">
            <Image src={Post3} className="w-full" alt="#" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
                Advertising{" "}
                <span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
                  <Image src={Arrow} alt="#" />
                </span>
              </h3>
            </div>
          </div> */}
					<div className="relative">
						<Image src={Post3} className="w-full" alt="#" />
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<h3 className=" mt-6 text-xl flex items-center justify-between text-[32px] text-white font-PoppinsSemiBold">
								Vibeground TV{' '}
								<Link href="/experience/vibeground-tv">
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

export default Experience;
