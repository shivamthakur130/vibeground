'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Post1 from '@/assets/images/p01.png';
import Image from 'next/image';
import { getAvailable } from '@/services/meetAndGreet.service';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import ArrowLeft from '@/assets/images/svg/arrow-left.svg';
import PageWrapper from '../common/PageWrapper';

const MeetAndGreet = () => {
	const [loading, setLoading] = useState(false);
	const [checkStatus, setCheckStatus] = useState(false);

	const fetchMeetAndGreet = async () => {
		(async () => {
			setLoading(true);
			const { data, error } = await getAvailable();
			if (error) {
				setLoading(false);
				setCheckStatus(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				if (data?.success && data?.data?.status === 'active') {
					setCheckStatus(true);
				} else {
					setCheckStatus(false);
				}
			}
			setLoading(false);
		})();
	};
	useEffect(() => {
		fetchMeetAndGreet().catch((err) => {
			console.log(err);
			setLoading(false);
			setCheckStatus(false);
		});
	}, []);

	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response.data.message;
			ErrorMessage('Meet & greet', message);
		} else if (error.request) {
			ErrorMessage(
				'Meet & greet',
				'Network Error. Please check your internet connection.'
			);
		} else {
			ErrorMessage(
				'Meet & greet',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	return (
		<PageWrapper>
			<div className="Email text-left px-5 max-w-xl mx-auto mt-0 sm:mt-24 sm:mb-24 py-5 sm:py-0 mb-20">
				<h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex items-center mb-8 mt-10">
					<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50">
						<Link href="/influencer">
							<Image src={ArrowLeft} height={32} width={32} alt="#" />
						</Link>
					</div>
					<div className="ml-10">Meet & Greet</div>
				</h2>
				<div className="bg-gray-950 mx-auto flex items-center justify-center rounded-md">
					<Image src={Post1} width={500} height={500} alt="meet&greet" />
				</div>
				<div className=" ">
					{/* <div className="text-2xl font-PoppinsSemiBold text-111 py-2 pt-10">
					Meet & Greet
				</div> */}
					<p className="text-xl py-4 font-PoppinsRegular text-gray-700">
						{
							// "It's every fan's dream to meet their favorite creator in person once in a lifetime."
							'Welcome to the world of Meet & Greet!'
						}
					</p>

					<ul className="list space-y-2 font-PoppinsRegular text-gray-700">
						<li>
							Welcome to the exclusive world of Meet & Greet! A unique opportunity
							awaits you here to register for unique encounters with your loyal fans.
							Immerse yourself in a world where authenticity, closeness and the
							experience of something special take center stage.
						</li>
						<li>
							Our {'Meet & Greet '} events are much more than just encounters - they
							are experiences that create memories that will last a lifetime. We firmly
							believe that models should take the opportunity to connect with their
							fans on a personal level, which is precisely why we offer these exclusive
							Meet & Greets.
						</li>
						<li>
							By participating in Meet & Greet, you as a creator not only have the
							opportunity to show your passion for your fans, but also to earn money.
							These encounters are not only a chance to meet fans up close, but also an
							opportunity to raise your profile and promote your career through
							Vibeground TV{"'"}s media support.
						</li>
						<li>
							Apply now for Meet & Greet and experience unforgettable moments in an
							inspiring community. Here you will find real closeness to your fans and
							have the opportunity to build a special connection with them.
						</li>
						<li>Sign up to receive more information from us.</li>
					</ul>
					{!checkStatus && !loading && (
						<div className="mx-auto flex items-center justify-center">
							<Link href="/influencer/meet-greet-details">
								<button className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
									Sign me up
								</button>
							</Link>
						</div>
					)}

					{checkStatus && !loading && (
						<div className="text-xl font-PoppinsRegular text-gray-700 py-4">
							{'You’re'} already signed up. we will contact you soon.
						</div>
					)}
				</div>
			</div>
		</PageWrapper>
	);
};

export default MeetAndGreet;
