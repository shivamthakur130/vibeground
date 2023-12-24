'use client';
import Image from 'next/image';
import UpArrow from '@/assets/images/svg/upArrow.svg';
import Location from '@/assets/images/svg/location.svg';
import React, { useState, useEffect } from 'react';
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
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
// import Tic from '../../../assets/images/svg/tic.svg'
import Croun from '@/assets/images/croun.png';
import Star from '@/assets/images/star.png';
import Tic from '@/assets/images/tic.png';

const ModelProfile = () => {
	const [loading, setLoading] = useState(false);
	const [modelDetails, setModelDetails] = useState<any | null>(null);
	const dispatch = useAppDispatch();
	const { replace } = useRouter();
	const user = useSelector((state: any) => state.userReducer.user);
	const messageTitle = 'Profile View';
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
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
		if (error.response?.status === 358) {
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
						{/* <li>
							<div className="bg-[#FF3900] p-2 rounded-2xl cursor-pointer border border-gray-50">
								<Image src={Heart} className="" alt="#" height={24} width={24} />
							</div>
						</li> */}
					</ul>
				</div>
			</h2>
			{modelDetails && (
				<div className="flex md:flex-row flex-col">
					<div className="relative rounded-3xl w-full md:mr-16 sm:w-[325px] px-1.5">
						<Slider {...settings}>
							{modelDetails?.photos?.map((picture: any, index: number) => (
								<Image
									key={index}
									src={picture}
									className="h-[281px] w-[358px] rounded-3xl  shadow-md border"
									alt="#"
									width={358}
									height={281}
									priority
									quality={70}
								/>
							))}
							{modelDetails?.videos?.map((video: any, index: number) => (
								<video
									key={index}
									className="h-[281px] w-[358px] rounded-3xl  shadow-md border"
									width={358}
									height={281}
									controls>
									<source src={video} type="video/mp4" />
								</video>
							))}
						</Slider>
					</div>
					<div className="sm:mt-0 mt-10">
						<div className="flex flex-col md:block md:flex-col md:space-y-2">
							<h3 className="text-2xl md:text-4xl font-PoppinsSemiBold mr-4 flex items-center">
								{modelDetails?.userName}{' '}
								<button className="ml-3 btn px-6 py-2 bg-black/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular">
									Asian
								</button>
							</h3>
						</div>
						<div className="flex items-center">
							<Image src={Location} alt="#" />
							<span className="ml-2 text-656565">Germany</span>
						</div>

						<div className=" flex flex-wrap content-evenly my-5 bg-[#f9f9f9] rounded-md p-3 text-[#656565] italic">
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
						<button type="button" onClick={openModal} className="text-black">
							Apply Filters
						</button>
					</div>
				</div>
			)}
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10 p-0" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed bg-black/20 inset-0" />
					</Transition.Child>

					<div className="fixed  bottom-0 overflow-y-auto mx-auto sm:w-96 w-full left-0 right-0">
						<div className="flex min-h-full items-center justify-center  text-center ">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="bg-white space-y-5  w-full max-w-4xl transform overflow-hidden rounded-2xl px-4 py-10 text-left align-middle shadow-xl transition-all">
									<div className="grid grid-cols-2 gap-5">
										<div className="text-left  px-5 cursor-pointer pt-5 pb-5 rounded-xl relative hover:border-2 hover:border-[#F4BE55] space-y-2 shadow-lg">
											<div className="h-9 w-9 rounded bg-[#DFE9DF] flex items-center justify-center">
												<Image src={Star} alt="#" />
											</div>
											<h2 className="font-PoppinsBold text-15px mt-1.5">
												Premium<span className="text-[10px]"> (1 Month)</span>
											</h2>
											<h2 className="font-PoppinsBold text-2xl text-2f2f2f">
												7.99
												<span className="text-sm font-PoppinsMedium text-[#B5B5B5]">
													€/ 1 Month
												</span>
											</h2>

											<input
												id="plan-653519dc4baa5669ea0aeff1"
												className="hidden"
												type="radio"
												value="653519dc4baa5669ea0aeff1"
												name="plan"
											/>
										</div>
										<div className="text-left  px-5 cursor-pointer pt-5 pb-5 rounded-xl relative hover:border-2 hover:border-[#F4BE55] space-y-2 shadow-lg border-2 border-[#F4BE55]">
											<div className="absolute -top-4 left-0 right-0 flex items-center">
												<span className="px-5 py-2 bg-[#F4BE55] rounded text-xs mx-auto text-center text-white">
													Recommended
												</span>{' '}
											</div>
											<div className="h-9 w-9 rounded bg-[#DFE9DF] flex items-center justify-center">
												<Image src={Croun} alt="#" />
											</div>
											<h2 className="font-PoppinsBold text-15px mt-1.5">
												Exclusive<span className="text-[10px]"> (1 Month)</span>
											</h2>
											<h2 className="font-PoppinsBold text-2xl text-2f2f2f">
												10.99
												<span className="text-sm font-PoppinsMedium text-[#B5B5B5]">
													€/ 1 Month
												</span>
											</h2>

											<input
												id="plan-65351a124baa5669ea0aeff4"
												className="hidden"
												type="radio"
												value="65351a124baa5669ea0aeff4"
												name="plan"
											/>
										</div>
									</div>
									<div className="text-[15px]">Choose your subscription</div>
									<div>
										<table className="w-full">
											<thead>
												<tr className="text-[15px]">
													<td className="font-semibold">Features</td>
													<td className="font-semibold text-center">Pro</td>
													<td className="font-semibold text-center">Premium</td>
												</tr>
											</thead>
											<tbody className="text-sm">
												<tr>
													<td className="py-3">Videos</td>
													<td className="text-[#558F71] text-center">--</td>
													<td className="text-center flex justify-center py-3">
														<Image src={Tic} alt="#" />
													</td>
												</tr>
												<tr>
													<td className="py-3">Images</td>
													<td className="text-[#558F71] text-center">--</td>
													<td className="text-center flex justify-center py-3">
														<Image src={Tic} alt="#" />
													</td>
												</tr>
												<tr>
													<td className="py-3">Swipe Models</td>
													<td className="text-[#558F71]">Limited</td>
													<td className="text-center flex justify-center py-3">
														<Image src={Tic} alt="#" />
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="flex items-center w-full">
										<button className="bg-2f2f2f text-base px-16 py-3 rounded-md mt-7 text-white hover:opacity-70 mx-auto flex">
											Start Membership
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default ModelProfile;
