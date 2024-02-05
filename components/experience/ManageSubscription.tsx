'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Croun from '@/assets/images/croun.png';
import CrounGray from '@/assets/images/croungray.png';
import Tic from '@/assets/images/svg/tic.svg';
import ArrowLeft from '@/assets/images/svg/arrow-left.svg';
import Link from 'next/link';
import moment from 'moment';
import PageWrapper from '../common/PageWrapper';

const ManageSubscription = () => {
	const user = useSelector((state: any) => state.userReducer.user);

	return (
		<PageWrapper>
			<div className="Profile max-w-7xl px-5 mx-auto  sm:mt-24  sm:mb-24 py-5 sm:py-0 mb-32">
				<div className="mb-12">
					<h2 className="sm:text-5xl text-[24px] font-PoppinsBold text-111 flex items-center mb-8 mt-10">
						<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50 hover:bg-gray-50 active:bg-gray-200">
							<Link href="/experience/profile">
								<Image src={ArrowLeft} height={32} width={32} alt="#" />
							</Link>
						</div>
						<div className="ml-10">Manage Subscription</div>
					</h2>
					<h1 className="text-4xl font-PoppinsSemiBold text-111"></h1>
				</div>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
					<div>
						<div className="bg-white">
							<div className="text-left bg-gradient-to-r from-[#FFE1A8]  to-[#FFE1A8]/50 px-5  pt-5 pb-5 rounded-3xl relative w-full  shadow-shado">
								<div className="flex items-center mb-10">
									<div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center mr-4">
										<Image src={Croun} alt="#" width="35" height="35" />
									</div>
									<div className="flex flex-col">
										<span className="font-PoppinsMedium text-xl text-2f2f2f">
											{user?.subscription?.planId?.name} Member
										</span>
										{user?.subscription?.expiry_date != null && (
											<span className="font-PoppinsRegular text-sm text-2f2f2f">
												Expires at{' '}
												{moment(user?.subscription?.expiry_date).format('DD/MM/YY')}
											</span>
										)}
									</div>
								</div>
								{user?.subscription?.planId?.planType !== 'free' && (
									<ul className="space-y-5 pl-2 text-xl text-[#455154] mb-14">
										<li className="flex items-center">
											<Image className="mr-6" src={Tic} alt="#" width="30" height="30" />
											See all videos & images
										</li>
										<li className="flex items-center">
											<Image className="mr-6" src={Tic} alt="#" width="30" height="30" />
											Participate in the experience section
										</li>
									</ul>
								)}
								{/* if plan is expiry than show this button  */}
								{user?.subscription?.planId?.planType !== 'free' &&
									(user?.subscription?.expiry_date == null ||
										user?.subscription?.expiry_date < new Date().toISOString()) && (
										<Link href="/experience/manage-plan">
											<div className="cursor-pointer mb-3 btn btn-default px-3 py-5 text-xl font-PoppinsSemiBold text-white bg-303030 rounded-3xl hover:bg-151515 transition-all duration-300 active:bg-303030 text-center">
												<span>Renew Now</span>
											</div>
										</Link>
									)}
								{user?.subscription?.planId?.planType == 'free' && (
									<Link href="/experience/manage-plan">
										<div className="cursor-pointer mb-3 btn btn-default px-3 py-5 text-xl font-PoppinsSemiBold text-white bg-303030 rounded-3xl hover:bg-151515 transition-all duration-300 active:bg-303030 text-center">
											<span>Change Plan</span>
										</div>
									</Link>
								)}
							</div>
						</div>
					</div>
					{/* <div>
					<span className="text-[#444] text-[20px] font-PoppinsSemiBold mb-8 block">
						Inactive Subscription
					</span>
					<div className="bg-white">
						<div className="text-left bg-gradient-to-r from-[#CCC]  to-[#CCC] /50 px-5 cursor-pointer pt-5 pb-5 rounded-xl relative w-full">
							<div className="flex items-center">
								<div className="rounded bg-white flex items-center justify-center mr-4">
									<Image src={CrounGray} alt="#" />
								</div>
								<div className="flex flex-col">
									<span className="font-PoppinsMedium text-[20px] text-2f2f2f">
										Pro Member
									</span>
									<span className="font-PoppinsRegular text-sm text-2f2f2f">
										Expired at 02/01/23
									</span>
								</div>
							</div>
						</div>
					</div>
				</div> */}
				</div>
			</div>
		</PageWrapper>
	);
};

export default ManageSubscription;
