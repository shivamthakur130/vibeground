'use client';
import Image from 'next/image';
import UpArrow from '@/assets/images/svg/upArrow.svg';
import { useState, useEffect } from 'react';
import { removeUser } from '@/redux/slice/user';
import { getUserProfile } from '@/services/user.service';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import ArrowLeft from '@/assets/images/svg/arrow-left.svg';

const ProfileView = () => {
	const [loading, setLoading] = useState(false);
	const [modelDetails, setModelDetails] = useState<any | null>(null);
	const dispatch = useAppDispatch();
	const { replace } = useRouter();
	const user = useSelector((state: any) => state.userReducer.user);
	const messageTitle = 'Profile View';
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		speed: 500,
		swipeToSlide: true,
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		(async () => {
			setLoading(true);
			const id = user._id;
			const { data, error } = await getUserProfile(id);
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

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				{/* <Image src={Post1} className="" alt="#" /> */}
			</div>
		);
	}
	return (
		<div className="TinderAbout max-w-7xl px-5 mx-auto mt-10 md:mt-10 mb-24">
			<h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex justify-between items-center mb-10">
				<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50">
					<Link href="/influencer/manage-profile">
						<Image src={ArrowLeft} height={32} width={32} alt="#" />
					</Link>
				</div>
				<div className="flex item-center space-x-4 ">
					<ul className="flex space-x-4">
						<li className="p-2 rounded-2xl cursor-pointer border border-gray-50">
							<Image src={UpArrow} className="" alt="#" height={18} width={20} />
						</li>
					</ul>
				</div>
			</h2>
			{modelDetails && (
				<div className="flex md:flex-row flex-col">
					<div className="relative rounded-3xl w-full md:mr-16 sm:w-[325px]">
						<Slider {...settings}>
							{modelDetails?.photos?.map((picture: any, index: number) => (
								<Image
									key={index}
									src={picture}
									className="h-[450px] w-[401px] rounded-3xl  shadow-md border"
									alt="#"
									width={401}
									height={450}
									priority
									quality={70}
								/>
							))}
							{modelDetails?.videos?.map((video: any, index: number) => (
								<video
									key={index}
									className="h-[450px] w-[401px] rounded-3xl  shadow-md border"
									width={401}
									height={450}
									controls>
									<source src={video} type="video/mp4" />
								</video>
							))}
						</Slider>
					</div>
					<div className="sm:mt-0 mt-10">
						<div className="flex flex-col md:block md:flex-col md:space-y-2">
							<h3 className="text-2xl md:text-4xl font-PoppinsSemiBold mr-4">
								{modelDetails?.userName}
							</h3>
						</div>
						<hr className="my-4"></hr>
						<div className="text-2xl font-PoppinsSemiBold my-5">About Me</div>
						<div className=" flex flex-wrap content-evenly my-5 bg-[#f6f6f6] rounded-md p-3">
							{modelDetails['about']}
						</div>
						<hr className="my-4"></hr>
						<h3 className="font-PoppinsRegular text-md my-3">Attributes</h3>
						<ul className="flex gap-2 flex-wrap">
							{modelDetails['categories'].map((category: string) => (
								<li key={category} className="bg-gray-100 rounded-3xl px-4 py-1.5">
									{category}
								</li>
							))}
						</ul>
						<hr className="my-4"></hr>
						<h3 className="font-PoppinsRegular text-md my-3">Links</h3>
						<ul className="flex flex-col overflow-hidden whitespace-pre-wrap space-y-2">
							{modelDetails['links'].map((link: string) => (
								<li
									key={link}
									className="cursor-pointer text-blue-500 hover:text-151515">
									<a href={link} target="_blank">
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileView;
