'use client';
import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { modelDetails } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const UserInformation = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		userName: Yup.string().required('User Name is required'),
		// about: Yup.string().required('About is required'),
		// onlyFanAccount: Yup.string().required('Only Fan Account is required'),
		email: Yup.string().email('Email is invalid').required('Email is required'),
		confirmEmail: Yup.string()
			.oneOf([Yup.ref('email'), undefined, ''], 'Email must match')
			.email('Email is invalid')
			.required('Email is required'),
		password: Yup.string()
			.min(8, 'Password must be at least 8 characters')
			.max(20, 'Password must not exceed 20 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
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

		const prepareData = {
			firstName: formField.firstName,
			lastName: formField.lastName,
			userName: formField.userName,
			email: formField.email,
			password: formField.password,
			type: 'model',
			userId: user?.userId,
		};
		console.log(prepareData, 'prepareData');

		try {
			const { data, error } = await modelDetails(prepareData);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}

			if (typeof data === 'object' && data !== null && 'data' in data) {
				reset();
				const userId = data.data._id;
				const token = data.data.token;
				dispatch(updateUser({ ...user, ...prepareData, userId: userId, token }));
				SuccessMessage('Model Registration', 'Details saved successfully');
				push('/account/about');
			} else {
				ErrorMessage('Model Registration', 'Something went wrong');
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error, 'error');
			handleError(error);
		}
	}
	console.log(user);
	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response.data.message;
			ErrorMessage('Model Registration', message);
		} else if (error.request) {
			ErrorMessage(
				'Model Registration',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'Model Registration',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	return (
		<div className="Email  max-w-4xl mx-auto mt-16 mb-20 px-5 relative">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Enter Your Details
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
				className={`${loading ? 'opacity-5' : ''}`}>
				<div className="grid grid-cols-2 gap-6 my-6 ">
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
					<div>
						<input
							type="text"
							className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							placeholder="Select Your Username "
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
					<div></div>
					<div>
						<input
							type="text"
							className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							placeholder="Enter Your Email"
							{...register('email', {
								value: user.email,
								onChange: (e) => {
									setValue('email', e.target.value);
									clearErrors('email');
								},
							})}
						/>
						{errors.email?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.email?.message}
							</div>
						)}
					</div>
					<div>
						<input
							type="text"
							className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							placeholder="Enter Confirm Email"
							{...register('confirmEmail', {
								value: user.email,
								onChange: (e) => {
									setValue('confirmEmail', e.target.value);
									clearErrors('confirmEmail');
								},
							})}
						/>
						{errors.confirmEmail?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.confirmEmail?.message}
							</div>
						)}
					</div>
				</div>
				<div className="">
					<p className="text-[17px] text-888 content-stretch">
						Set your strong password, Upper case Letter, Digit numbers and special
						characters @,$,%,*,#
					</p>
				</div>
				<div className="grid grid-cols-2 gap-6 my-6">
					<div>
						<input
							type="password"
							className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							placeholder="Enter Your Password"
							{...register('password', {
								onChange: (e) => {
									setValue('password', e.target.value);
									clearErrors('password');
								},
							})}
						/>
						{errors.password?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.password?.message}
							</div>
						)}
					</div>
					<div>
						<input
							type="password"
							className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							placeholder="Enter Your Confirm Password"
							{...register('confirmPassword', {
								onChange: (e) => {
									setValue('confirmPassword', e.target.value);
									clearErrors('confirmPassword');
								},
							})}
						/>
						{errors.confirmPassword?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.confirmPassword?.message}
							</div>
						)}
					</div>
				</div>
				{/* <Link href="/influencer/passport"></Link> */}
				<button
					className="btn btn-default px-24 py-4 mt-5 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
					type="submit"
					disabled={loading}>
					Continue
				</button>
			</form>
		</div>
	);
};

export default UserInformation;
