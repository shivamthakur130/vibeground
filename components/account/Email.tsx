'use client';

import React from 'react';
import * as Yup from 'yup';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { fanEmail } from '@/services/user.service';
import Loading from '@/components/layout/Loading';

import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const Email = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

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
		dispatch(updateUser({ ...user, email: formField.email }));
		try {
			const response = await fanEmail({
				email: formField.email,
				type: user.type,
				userId: user?.userId ?? '',
			});
			if (response.status === 201) {
				const userId = response.data.data._id;
				dispatch(updateUser({ ...user, email: formField.email, userId: userId }));
				SuccessMessage('User Registration', 'Email changes saved successfully');
				push('/account/user-details');
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
		<div className="Email max-w-2xl mx-auto mt-24 mb-40 relative">
			<h2 className="text-5xl font-PoppinsBold text-111">Enter Your E-Mail</h2>
			<p className="text-xl text-888 mt-3 mb-12">
				You will receive a verification code to confirm your e-mail address.
			</p>
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
				<input
					type="email"
					id="email"
					{...register('email', {
						value: user.email,
						onChange: (e) => {
							setValue('email', e.target.value);
							clearErrors('email');
						},
					})}
					className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
					placeholder="Enter E-Mail Address"
				/>
				{errors.email?.message && (
					<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
						{errors.email?.message}
					</div>
				)}
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

export default Email;
