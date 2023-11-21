'use client';

import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';

const ThankYouMeetGreet = () => {
	const { replace } = useRouter();
	const user = useSelector((state: any) => state.userReducer.user);
	const searchParams = useSearchParams();
	const name = searchParams.get('name');
	console.log(name, 'search');
	return (
		<div className="Experience max-w-2xl px-5 mx-auto sm:mt-24 sm:mb-24 mt-10 mb-20">
			{/* <h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex items-center mb-10">
				<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50">
					<Link href="/experience">
						<Image src={ArrowLeft} height={32} width={32} alt="#" />
					</Link>
				</div>
				<div className="ml-10">Meet & Greet</div>
			</h2> */}
			<div className="flex flex-col md:flex-row">
				<div className="space-y-5 md:space-y-10 mt-10 justify-center text-center">
					<div className="flex md:block md:flex-col ">
						<h3 className="text-2xl  font-PoppinsSemiBold mr-4">
							{user.firstName} you have successfully made a move to meet{' '}
							<span className="font-PoppinsBlack">{name}</span>
						</h3>
					</div>
					{/* <hr className=""></hr> */}
					<div className="text-base md:text-[20px] text-656565">
						We will keep you updated with details
					</div>

					{/* <div className="flex justify-center">
						<Link href="/experience/thank-you-meet-greet">
							<button
								className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
								id="birthdayForm"
								type="submit">
								Buy Ticket
							</button>
						</Link>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default ThankYouMeetGreet;
