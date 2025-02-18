'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser, removeUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { fanGender } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import PageWrapper from '../common/PageWrapper';

const Gender = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push, replace } = useRouter();
	const messageTitle =
		user.type === 'fan' ? 'User Registration' : 'Model Registration';
	// form validation rules
	const validationSchema = Yup.object().shape({
		gender: Yup.string().required('Gender is required'),
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
		dispatch(updateUser({ ...user, gender: formField.gender }));
		try {
			const response = await fanGender({
				userId: user.userId,
				gender: formField.gender,
			});
			if (response.status === 201) {
				reset();
				SuccessMessage(messageTitle, 'Gender saved successfully');
				push('/account/selection');
			} else {
				ErrorMessage(messageTitle, 'Something went wrong');
			}
		} catch (error) {
			handleError(error);
		}
		setLoading(false);
	}
	useEffect(() => {
		// redirect to home if already logged in
		if (user.userId == '' || user.userId == null || user.userId == undefined) {
			dispatch(removeUser());
			replace('/login');
		}
	}, [user]);

	const handleError = (error: any) => {
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

	return (
		<PageWrapper>
			<div className="Email text-center max-w-xl mx-auto mt-14 mb-24 relative px-4">
				<p className="md:text-xl text-xs text-888 mb-5">
					Let`s complete your profile
				</p>
				<h2 className="md:text-5xl text-3xl font-PoppinsBold text-111 mb-16">
					Select your gender
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
					<label
						className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4"
						htmlFor="maleRadio">
						<label htmlFor="maleRadio" className="ml-2 text-xl text-9e9e9e">
							Male
						</label>
						<input
							id="maleRadio"
							type="radio"
							value="Male"
							{...register('gender')}
							name="gender"
							className="w-7 h-7 "
						/>
					</label>
					<label
						htmlFor="femaleRadio"
						className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4">
						<label htmlFor="femaleRadio" className="ml-2 text-xl text-9e9e9e">
							Female
						</label>
						<input
							id="femaleRadio"
							type="radio"
							value="Female"
							{...register('gender')}
							name="gender"
							className="w-7 h-7 "
						/>
					</label>
					<label
						htmlFor="otherRadio"
						className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 ">
						<label htmlFor="otherRadio" className="ml-2 text-xl text-9e9e9e">
							Other
						</label>
						<input
							id="otherRadio"
							type="radio"
							value="Other"
							{...register('gender')}
							name="gender"
							className="w-7 h-7 "
						/>
					</label>
					{errors.gender?.message && (
						<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.gender?.message}
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
		</PageWrapper>
	);
};

export default Gender;
