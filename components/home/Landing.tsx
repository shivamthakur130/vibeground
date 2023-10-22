'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import MainBanner from '@/assets/images/main_banner.jpg';
import banner2 from '@/assets/images/banner2.png';
import banner3 from '@/assets/images/banner3.png';
import Quote from '@/assets/images/quote.png';
import Ico1 from '@/assets/images/ico1.png';
import Ico2 from '@/assets/images/ico2.png';
import Ico3 from '@/assets/images/ico3.png';
import Ico4 from '@/assets/images/ico4.png';
import CenterLogo from '@/assets/images/logo/l_white.png';
import * as Yup from 'yup';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { queryUser } from '@/services/user.service';
import Loading from '@/components/layout/Loading';

import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		zIndex: 1000,
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		width: '60%',
		padding: '0px',
		height: 'auto',
		marginRight: '-50%',
		background: '#0d0d0d',
		transform: 'translate(-50%, -50%)',
	},
};

const Landing = ({ modalIsOpen, setModalIsOpen }: any) => {
	const [loading, setLoading] = useState(false);

	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required('Email is required'),
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
	// get functions to build form with useForm() hook
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		reset,
		formState,
	} = useForm(formOptions);
	const { errors } = formState;

	async function onSubmit(formField: any) {
		setLoading(true);
		try {
			const { data, error } = await queryUser({
				email: formField.email,
			});

			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				reset();
				SuccessMessage('User subscribe', 'User subscribed successfully');
			} else {
				ErrorMessage('User subscribe', 'Something went wrong');
			}
		} catch (error) {
			console.log(error, 'error');
			handleError(error);
		}
		setLoading(false);
	}

	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response.data.message;
			ErrorMessage('User subscribe', message);
		} else if (error.request) {
			ErrorMessage(
				'User subscribe',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'User subscribe',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};
	return (
		<div className="Landing text-center ">
			<div id="root"></div>
			<div className="max-w-full mx-auto ">
				<div className=" bg-black h-fit py-1">
					<div className="max-w-2xl mx-auto text-white my-20 px-2">
						<div className="w-full">
							<h1 className="text-5xl">We are launching soon!</h1>
							<div className="space-x-4 text-center pt-4">
								Sign up for our exclusive waiting list and we will contact you.
								<br />
							</div>
							<div className="space-x-4 w-full pt-8">
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="sm:flex justify-center items-center w-full ">
									<div className="mt-3 sm:mt-0">
										<input
											type="email"
											placeholder="Enter your email"
											className=" p-4  mr-0 border-b  text-gray-800 border-gray-200 bg-white"
											{...register('email')}
										/>
									</div>
									<div className="mt-3 sm:mt-0">
										<button
											type="submit"
											className="px-8  bg-gray-400  text-gray-800 font-bold  p-4 uppercase border-gray-500 border-t border-b border-r">
											Subscribe
										</button>
									</div>
								</form>
								{errors.email && (
									<p className="text-red-500 text-sm py-3 ">{errors.email.message}</p>
								)}
							</div>
						</div>
						<div className="md:mt-10 md:px-8 pb-4 px-1 pt-2 mt-5">
							<video
								controls
								className="w-full h-1/6 min-h-[60px] min-w-[200px]"
								poster="/video/thumbnail.png">
								<source src="/video/intro.mp4" type="video/mp4" />
							</video>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
