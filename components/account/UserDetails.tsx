'use client';
import React from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { fanDetails } from '@/services/user.service';
import Loading from '@/components/layout/Loading';

import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const UserDetails = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		userName: Yup.string().required('UserName is required'),
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
		dispatch(updateUser({ ...user, email: formField.email }));

		try {
			const prepareData = {
				userId: user.userId,
				firstName: formField.firstName,
				lastName: formField.lastName,
				userName: formField.userName,
			};
			const response = await fanDetails(prepareData);
			if (response.status === 201) {
				dispatch(updateUser({ ...user, ...prepareData }));
				SuccessMessage('User Registration', 'Details changes saved successfully');
				push('/account/password');
			} else {
				ErrorMessage('User Registration', 'Something went wrong');
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
			ErrorMessage('User Registration', message);
		} else if (error.request) {
			ErrorMessage(
				'User Registration',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'User Registration',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};
	return (
		<div className="Email max-w-2xl text-center mx-auto mt-16 mb-40 relative">
			<p className="text-xl text-888 mb-5">Let`s complete your profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Enter your details
			</h2>
			{loading && (
				<Loading
					width={50}
					height={50}
					className="flex absolute justify-center w-96
					z-50 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				/>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${loading ? 'opacity-25' : ''}`}>
				<div className="grid   grid-cols-2 gap-6 my-6">
					<div>
						<input
							type="text"
							className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							placeholder="Enter Your First Name"
							{...register('firstName', {
								value: user.firstName,
								onChange: (e) => {
									setValue('firstName', e.target.value);
									clearErrors('firstName');
								},
							})}
						/>
						{errors.firstName?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.firstName?.message}
							</div>
						)}
					</div>

					<div>
						<input
							type="text"
							className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							placeholder="Enter Your Last Name"
							{...register('lastName', {
								value: user.lastName,
								onChange: (e) => {
									setValue('lastName', e.target.value);
									clearErrors('lastName');
								},
							})}
						/>
						{errors.lastName?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.lastName?.message}
							</div>
						)}
					</div>
				</div>
				<div>
					<input
						type="text"
						className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
						placeholder="Select your Username "
						{...register('userName', {
							value: user.userName,
							onChange: (e) => {
								setValue('userName', e.target.value);
								clearErrors('userName');
							},
						})}
					/>
					{errors.userName?.message && (
						<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.userName?.message}
						</div>
					)}
				</div>
				<button
					className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
					type="submit"
					disabled={loading}>
					Continue
				</button>
			</form>
		</div>
	);
};

export default UserDetails;
