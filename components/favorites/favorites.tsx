'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/Jessica1.png';
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { getFavorites } from '@/services/favorite.service';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import { removeUser } from '@/redux/slice/user';
import { useDispatch } from 'react-redux';
import Loading from '../layout/Loading';
import { Transition } from '@headlessui/react';

const Favorites = () => {
	const messageTitle = 'Profile View';
	const dispatch = useDispatch();
	const { replace } = useRouter();
	const [modelDetails, setModelDetails] = useState<any | null>(null);
	const [loading, setLoading] = useState(false);

	const getAllFavorites = async () => {
		setLoading(true);
		const { data, error } = await getFavorites();
		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		setModelDetails((data as { data: any })['data']);
		setLoading(false);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getAllFavorites();
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
	const getAge = (date: string) => {
		const today = new Date();
		const birthDate = new Date(date);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};
	const openDetails = (id: any) => {
		replace('/experience/tinder/' + id);
	};
	return (
		<div className="Favorites max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">
			<h2 className="md:text-5xl text-2xl font-PoppinsSemiBold text-111 flex items-center mb-10 justify-between">
				Favorites
			</h2>
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

			<div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
				{modelDetails?.map((model: any, index: number) => (
					<div className="rounded-2xl" key={index}>
						<div
							className="relative rounded-2xl overflow-hidden bg-white"
							onClick={() => {
								openDetails(model?.modelId?._id);
							}}>
							{/* <Image src={Post1} className="w-full" alt="#" /> */}
							{model?.modelId?.photos?.length > 0 ? (
								<img
									src={model?.modelId?.photos[0]}
									className="w-full h-[398px] min-w-[200px] sm:h-auto"
									alt="#"
								/>
							) : (
								<Image src={Post1} className="w-full h-[398px]" alt="#" />
							)}
							<div className="flex absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]"></div>
						</div>
						<div className="mt-3 self-end w-full ">
							<h3 className="text-xl text-[#444] font-PoppinsSemiBold">
								{model?.modelId?.userName}, {getAge(model?.modelId?.date_of_birth)}{' '}
							</h3>
							<div className="flex justify-between mt-3">
								<button className="btn px-6 py-2 bg-black/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular">
									{model?.modelId?.city}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;
