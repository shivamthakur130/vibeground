'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import MeetGreet from '@/assets/images/meetandgreet.png';
import Location from '@/assets/images/svg/mapmarkar.svg';
import Calendar from '@/assets/images/svg/calendar.svg';
import Arrow from '@/assets/images/svg/arrow-right.svg';
import ArrowLeft from '@/assets/images/svg/arrow-left.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { removeUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { getMeetAndGreetModel, buyTicket } from '@/services/user.service';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { User } from '@/types/User';
import Loading from '../layout/Loading';
import moment from 'moment';
import { Transition } from '@headlessui/react';
import PageWrapper from '../common/PageWrapper';

const MeetAndGreet = () => {
	const { replace } = useRouter();
	const [loading, setLoading] = useState(false);
	const [modelDetails, setModelDetails] = useState<User | null>(null);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const messageTitle = 'Meet & Greet';

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		speed: 500,
		swipeToSlide: true,
		arrows: false,
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		(async () => {
			setLoading(true);
			const id = '655a554a09facc7a369559a0';
			const { data, error } = await getMeetAndGreetModel(id);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			setModelDetails((data as { data: any })['data']);
			setLoading(false);
		})();
	}, []);

	const handleError = (error: any) => {
		if (error.response?.status === 401) {
			dispatch(removeUser());
			replace('/login');
		}
		if (error.response) {
			let message = error.response.data.message;
			ErrorMessage(messageTitle, message);
		} else if (error.request) {
			ErrorMessage(
				messageTitle,
				'Network Error. Please check your internet connection.'
			);
		} else {
			ErrorMessage(
				messageTitle,
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	const getAge = (dateString: Date | null | undefined) => {
		if (!dateString) return 0;
		const today = new Date();
		const birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth() - birthDate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};
	const bookedTicket = () => {
		(async () => {
			setLoading(true);
			const request = {
				id: '655a554a09facc7a369559a0',
			};
			const { data, error } = await buyTicket(request);

			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				console.log(data);
				if (data.status) {
					const modelName = modelDetails?.firstName + ' ' + modelDetails?.lastName;
					replace(`/experience/thank-you-meet-greet?name=${modelName}`);
				}
			}
			setLoading(false);
		})();
	};

	return (
		<PageWrapper>
			<div className="Experience max-w-7xl px-5 mx-auto sm:mt-24  sm:mb-24 py-5 sm:py-0 mb-24">
				<h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex items-center mb-10 mt-7">
					<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50 hover:bg-gray-100 active:bg-gray-200">
						<Link href="/experience">
							<Image src={ArrowLeft} height={32} width={32} alt="#" />
						</Link>
					</div>
					<div className="ml-10">Meet & Greet</div>
				</h2>
				<div className="px-4 pb-4">
					<ul className="list space-y-4 font-PoppinsRegular text-lg text-gray-700">
						<li>Welcome to the world of Meet & Greet!</li>
						<li>
							Welcome to the exclusive world of Meet & Greet! A unique opportunity
							awaits you here to register for unique encounters with your loyal fans.
							Immerse yourself in a world where authenticity, closeness and the
							experience of something special take center stage.
						</li>

						<li>
							Our {"'"}Meet & Greet{"'"} events are much more than just encounters -
							they are experiences that create memories that will last a lifetime. We
							firmly believe that models should take the opportunity to connect with
							their fans on a personal level, which is precisely why we offer these
							exclusive Meet & Greets.
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

						{/* <li>
							Have you always dreamed of meeting your favorite creator in person?
						</li>
						<li>Vibeground Meet & Greet allows you to make your dream come true.</li>
						<li>Meet your favourite creator in an exclusive setting.</li>
						<li>
							{
								"We'll cover the cost of travel and accommodation and you'll have a unique experience that you'll never forget."
							}
						</li>
						<li>
							Immerse yourself in the world of Vibeground Meet&Greet and enjoy an
							experience you will never forget.
						</li> */}
					</ul>
				</div>
				<Transition
					appear
					show={loading}
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-99"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-99">
					<div className="fixed inset-0 bg-gray-100/50 z-50">
						<Loading
							width={50}
							height={50}
							className="flex absolute justify-center w-96
					z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
						/>
					</div>
				</Transition>
				<div className="px-4 flex flex-col md:flex-row">
					<div className="relative rounded-3xl  md:mr-16 w-full sm:w-[401px]">
						<Slider {...settings}>
							{modelDetails?.photos?.map((picture: any, index: number) => (
								<Image
									key={index}
									src={picture}
									className="h-[500px] w-[401px] rounded-3xl  shadow-md border"
									alt="#"
									width={401}
									height={500}
								/>
							))}
							{modelDetails?.videos?.map((video: any, index: number) => (
								<video
									key={index}
									className="h-[500px] w-[401px] rounded-3xl  shadow-md border"
									width={401}
									height={500}
									controls>
									<source src={video} type="video/mp4" />
								</video>
							))}
						</Slider>
					</div>
					<div className="space-y-5 md:space-y-10 mt-10">
						<div className="flex md:block md:flex-col md:space-y-10">
							<h3 className="text-2xl md:text-4xl font-PoppinsSemiBold mr-4">
								{modelDetails?.firstName + ' ' + modelDetails?.lastName},{' '}
								{getAge(modelDetails?.date_of_birth)}
							</h3>
							<button className=" btn px-6 py-2 bg-[#c5c5c5]/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular">
								{modelDetails?.country}
							</button>
							<button className="hidden btn px-6 py-2 bg-2f2f2f text-white text-base rounded font-PoppinsRegular">
								{modelDetails?.country}
							</button>
						</div>
						<hr className=""></hr>
						<div className="flex items-center space-x-6">
							<Image src={Calendar} className="h-6 w-6 md:h-10 md:w-10" alt="#" />
							<span className="text-base lg:text-[32px] text-656565">
								{/* 20th June 2024 at 8:00 Pm */}
								{moment(modelDetails?.date_of_birth).format('DD MMMM YYYY')}
							</span>
						</div>
						<div className="flex items-center space-x-6">
							<Image
								src={Location}
								className="h-5 w-4 md:h-[50px] md:w-[33px] "
								alt="#"
							/>
							<span className="text-base lg:text-[32px] text-656565">
								{/* Berlin, Germany */}
								{modelDetails?.city + ', ' + modelDetails?.country}
							</span>
						</div>
						<hr className=""></hr>
						<div>
							<h3 className=" mt-6  flex items-center justify-between text-base md:text-xl text-[#090F24] font-PoppinsMedium">
								Terms & Conditions{' '}
								<span className="flex items-center justify-center md:h-11 md:w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
									<Image src={Arrow} height={14} width={7} alt="#" />
								</span>
							</h3>
						</div>
						<div className="flex justify-center">
							{/* <Link href="/experience/thank-you-meet-greet"> */}
							<button
								className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
								id="birthdayForm"
								disabled={loading}
								onClick={bookedTicket}
								type="submit">
								Buy Ticket
							</button>
							{/* </Link> */}
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default MeetAndGreet;
