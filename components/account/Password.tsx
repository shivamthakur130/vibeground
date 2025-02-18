'use client';

import React from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { fanPassword } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import PageWrapper from '../common/PageWrapper';

const Password = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		// Set your strong password, Upper case Letter, Digit numbers and special characters @,$,%,*,#
		// add password validation
		password: Yup.string()
			.min(8, 'Password must be at least 8 characters')
			.max(20, 'Password must not exceed 20 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])(?=.{8,})/,
				'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
			)
			.required('Password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), undefined, ''], 'Passwords must match')
			.nullable()
			.required('Confirm Password is required'),
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
			const response = await fanPassword({
				userId: user.userId,
				password: formField.password,
			});
			if (response.status === 201) {
				reset();
				dispatch(updateUser({ ...user, token: response.data.data.token }));
				SuccessMessage('User Registration', 'Password changes saved successfully');
				push('/account/dob');
			} else {
				ErrorMessage('User Registration', 'Something went wrong');
			}
		} catch (error) {
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
			ErrorMessage(
				'User Registration',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};
	return (
		<PageWrapper>
			<div className="Password text-center max-w-2xl mx-auto mt-14 mb-24 relative px-5">
				<h2 className="md:text-5xl text-3xl font-PoppinsBold text-111">
					Enter your password
				</h2>
				<p className="text-xl text-888 mt-3 mb-12 max-w-[460px] mx-auto content-stretch">
					Set your strong password, Upper case Letter, Digit numbers and special
					characters @,$,%,*,#
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
						type="password"
						id="password"
						className="max-w-[460px] mx-auto bg-white border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
						placeholder="Enter Your Password"
						{...register('password')}
					/>
					{errors.password?.message && (
						<div className="text-red-600 flex justify-center  text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.password?.message}
						</div>
					)}

					<input
						type="password"
						id="confirmPassword"
						className="max-w-[460px] mx-auto bg-white  border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 mt-6"
						placeholder="Enter Your Confirm Password"
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword?.message && (
						<div className="text-red-600  flex justify-center text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.confirmPassword?.message}
						</div>
					)}

					{/* <Link href="/account/dob"> */}
					<button
						className="btn w-full max-w-[460px] btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
						type="submit"
						disabled={loading}>
						Continue
					</button>
					{/* </Link> */}
				</form>
			</div>
		</PageWrapper>
	);
};

export default Password;
