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
import ArrowLeft from '@/assets/images/svg/arrow-left.svg';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { addFavorite } from '@/services/favorite.service';
import { SuccessMessage } from '@/components/layout/ToastifyMessages';

const Favorites = () => {
	const messageTitle = 'Profile View';
	const dispatch = useDispatch();
	const { replace } = useRouter();
	const user = useSelector((state: any) => state.userReducer.user);
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

	const removeFavorite = async (id: string, status: string) => {
		setLoading(true);
		const request = {
			userId: user?._id,
			modelId: id,
			status: status,
		};
		const { data, error } = await addFavorite(request);

		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		if (typeof data === 'object' && data !== null && 'data' in data) {
			if (data.status) {
				SuccessMessage(messageTitle, 'Model removed from your favorite list');
				getAllFavorites();
			}
		}
		setLoading(false);
	};
	return (
		<div className="Favorites max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">
			<h2 className="md:text-5xl text-2xl font-PoppinsSemiBold text-111 flex items-center mb-10 ">
				<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50 mr-5">
					<Link href="/experience">
						<Image src={ArrowLeft} height={32} width={32} alt="#" />
					</Link>
				</div>
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
						<div className="relative rounded-2xl overflow-hidden bg-white  aspect-[3/4] bg-gradient-to-t from-black/50 to-white/5">
							<div>
								<RxCross2
									onClick={() => {
										removeFavorite(model?.modelId?._id, 'rejected');
									}}
									className="absolute top-2 right-2 text-red-500 rounded-md bg-gray-100 text-xl"
								/>
							</div>

							{model?.modelId?.photos?.length > 0 ? (
								<img
									onClick={() => {
										openDetails(model?.modelId?._id);
									}}
									src={model?.modelId?.photos[0]}
									className=" object-cover  min-h-[400px]"
									alt="#"
								/>
							) : (
								<Image
									onClick={() => {
										openDetails(model?.modelId?._id);
									}}
									src={Post1}
									className="w-full min-h-[250px]"
									alt="#"
								/>
							)}
							<div className="flex absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[100%]"></div>
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
				{modelDetails?.length === 0 && (
					<div className="flex justify-center items-center col-span-full">
						<h3 className="text-xl text-[#444] font-PoppinsSemiBold">
							No Favorites Found
						</h3>
					</div>
				)}
			</div>
		</div>
	);
};

export default Favorites;
