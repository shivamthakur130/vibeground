'use client';

import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { signUp } from '@/services/meetAndGreet.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ArrowLeft from '@/assets/images/svg/arrow-left.svg';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import { useSelector } from 'react-redux';
import PageWrapper from '../common/PageWrapper';

const MeetAndGreetDetails = () => {
	const user = useSelector((state: any) => state.userReducer.user);
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [showHideSection, setShowHideSection] = useState(false);
	// form validation rules
	const validationSchema = Yup.object().shape({
		phoneNumber: Yup.string()
			.required('Phone Number is required')
			.matches(
				/^\+\d{1,4} \(\d{1,4}\) \d{1,}-\d{1,}$|^\+\d{1,4} \d{1,3} \d{1,}-\d{1,}$|^\+\d{1,4} \d{1,}-\d{1,}$|^\+\d{1,4} \d{10,}$|^\+\d{1,11}$/,
				'Invalid phone number'
			),

		emailId: Yup.string().required('Email Id is required').email('Invalid Email'),
		//link validation
		instagramId: Yup.string()
			.required('Instagram Id is required')
			.matches(
				/https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
				'Invalid Instagram link'
			),
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
		const prepareData = {
			phoneNumber: formField.phoneNumber,
			emailId: formField.emailId,
			instagramId: formField.instagramId,
		};
		try {
			const { data, error } = await signUp(prepareData);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				reset();
				if (data?.success) {
					router.replace('/influencer');
					SuccessMessage('Meet & greet', 'Details saved successfully');
				} else {
					ErrorMessage(
						'Meet & greet',
						'An unexpected error occurred. Please try again later.'
					);
				}
			} else {
				ErrorMessage(
					'Meet & greet',
					'An unexpected error occurred. Please try again later.'
				);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			handleError(error);
		}
	}

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
			// Something else happened while setting up the request
			ErrorMessage(
				'Meet & greet',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};
	return (
		<PageWrapper>
			<div className="Email text-left px-5 max-w-xl mx-auto mt-0 mb-10 ">
				<div className="px-4">
					{/* <div className="text-2xl font-PoppinsBold text-[#2F2F2F] py-2 pt-10"></div> */}
					<h2 className="sm:text-3xl text-2xl font-PoppinsBold text-111 flex items-center mb-2 mt-10">
						<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50">
							<Link href="/influencer/meet-&-greet">
								<Image src={ArrowLeft} height={32} width={32} alt="#" />
							</Link>
						</div>
						<div className="ml-10">Enter Details</div>
					</h2>
					{loading && (
						<Loading
							width={50}
							height={50}
							className="flex absolute justify-center w-96
					z-50 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						/>
					)}
					<div
						className={`max-w-2xl ${
							showHideSection
								? 'hidden transition-all duration-300'
								: 'transition-all duration-300'
						}`}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={` ${loading ? 'opacity-25' : ''}`}>
							<div className="input-box">
								<div className="text-[#3D3D3D] text-lg font-PoppinsBold pt-8 pb-1">
									Phone Number{' '}
									<span className="text-sm text-gray-600 font-PoppinsRegular">
										(eg. +91 1234567890)
									</span>
								</div>
								<input
									type="text"
									{...register('phoneNumber')}
									defaultValue={user.phoneNumber}
									className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4"
									placeholder="Enter your phone number including country code"
								/>
								{errors.phoneNumber?.message && (
									<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
										{errors.phoneNumber?.message}
									</div>
								)}
							</div>
							<div className="input-box">
								<div className="text-[#3D3D3D] text-lg font-PoppinsBold pt-8 pb-1">
									Email Id
								</div>
								<input
									type="text"
									{...register('emailId')}
									defaultValue={user.emailId}
									className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4"
									placeholder="Enter your email address"
								/>
								{errors.emailId?.message && (
									<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
										{errors.emailId?.message}
									</div>
								)}
							</div>
							<div className="input-box">
								<div className="text-[#3D3D3D] text-lg font-PoppinsBold pt-8 pb-1">
									Instagram
								</div>
								<input
									type="link"
									{...register('instagramId')}
									defaultValue={user.instagramId}
									className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4"
									placeholder="Enter your Instagram link"
								/>
								{errors.instagramId?.message && (
									<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
										{errors.instagramId?.message}
									</div>
								)}
							</div>
							<div className="mx-auto flex items-center justify-center">
								<button
									type="submit"
									disabled={loading}
									className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
									Done
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default MeetAndGreetDetails;
