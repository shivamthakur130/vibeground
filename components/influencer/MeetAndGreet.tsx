'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Post1 from '@/assets/images/p01.png';
import Image from 'next/image';
import { getAvailable } from '@/services/meetAndGreet.service';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';

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
		<div className="Email text-left max-w-xl mx-auto mt-0 mb-10 ">
			<div className="bg-gray-950 mx-auto flex items-center justify-center">
				<Image src={Post1} width={500} height={500} alt="meet&greet" />
			</div>
			<div className="px-4">
				<div className="text-2xl font-PoppinsSemiBold text-111 py-2 pt-10">
					Meet & Greet
				</div>
				<p className="text-xl py-4 font-PoppinsRegular text-gray-700">
					Lorem ipsum dolor sit amet. Eos perspiciatis veniam et facere eaque quo
					aliquid nihil. Et molestiae dolore et quam provident ad
				</p>
				<ul className="list space-y-2 font-PoppinsRegular text-gray-700">
					<li>Lorem ipsum dolor sit amet.</li>
					<li>Lorem ipsum dolor sit amet.</li>
					<li>Lorem ipsum dolor sit amet.</li>
					<li>Lorem ipsum dolor sit amet.</li>
					<li>Lorem ipsum dolor sit amet.</li>
					<li>Lorem ipsum dolor sit amet.</li>
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
	);
};

export default MeetAndGreet;
