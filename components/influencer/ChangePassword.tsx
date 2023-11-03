'use client';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { changePassword } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { Country, City } from 'country-state-city';

const ChangePassword = ({ user }: any) => {
	const messageTitle = user.type === 'fan' ? 'User details' : 'Model details';
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const [showHideSection, setShowHideSection] = useState(false);
	// form validation rules
	const validationSchema = Yup.object().shape({
		oldPassword: Yup.string().required('Old Password is required'),
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

		try {
			const { data, error } = await changePassword(formField);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				if (data.data.status) {
					reset();
					dispatch(updateUser({ ...user, ...formField }));
					SuccessMessage(messageTitle, data.message as string);
				} else {
					ErrorMessage(messageTitle, 'Something went wrong');
				}
			} else {
				ErrorMessage(messageTitle, 'Something went wrong');
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
			ErrorMessage(messageTitle, message);
		} else if (error.request) {
			ErrorMessage(
				messageTitle,
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				messageTitle,
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	return (
		<div className=" max-w-7xl px-5 mx-auto mt-10 mb-10 relative border-b border-gray-200 pb-5">
			<div className="flex justify-between">
				<h2 className="text-2xl font-PoppinsSemiBold text-111 mb-7">
					Change Password
				</h2>
				<div className="flex space-x-2">
					<div>
						<button
							className="btn btn-default px-4 py-1 mt-0 text-lg border border-black text-151515 bg-transparent rounded-md hover:border-gray-800 hover:text-gray-200 hover:bg-gray-800 transition-all duration-300 active:border-black flex"
							type="submit"
							form="ChangePasswordForm"
							disabled={loading}>
							{loading && <Loading width={50} height={50} className="w-6" />}
							Save
						</button>
					</div>
					<div>
						<button
							className="btn btn-default px-4 py-2 mt-0 text-lg border border-black text-151515 bg-transparent rounded-md hover:border-151515 hover:text-gray-200 hover:bg-151515 transition-all duration-300 active:border-black flex"
							onClick={() => {
								setShowHideSection(!showHideSection);
							}}>
							{showHideSection ? (
								<AiOutlineDown className="text-lg hover:text-gray-50 " />
							) : (
								<AiOutlineUp className="text-lg hover:text-gray-50 font-PoppinsBold" />
							)}
						</button>
					</div>
				</div>
			</div>
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
					id="ChangePasswordForm"
					name="ChangePasswordForm"
					onSubmit={handleSubmit(onSubmit)}
					className={`${loading ? 'opacity-25' : ''}`}>
					<div className="w-full space-y-4 pt-4">
						<div className="w-full">
							<label>
								Old Password <span className="text-red-500">*</span>
							</label>
							<input
								type="password"
								id="oldPassword"
								className=" bg-white border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 mt-2"
								placeholder="Enter Your Old Password"
								{...register('oldPassword')}
							/>
							{errors.oldPassword?.message && (
								<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
									{errors.oldPassword?.message}
								</div>
							)}
						</div>
						<div className="w-full">
							<label>
								New Password <span className="text-red-500">*</span>
							</label>
							<input
								type="password"
								id="password"
								className=" bg-white border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 mt-2"
								placeholder="Enter Your New Password"
								{...register('password')}
							/>
							{errors.password?.message && (
								<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
									{errors.password?.message}
								</div>
							)}
						</div>
						<div className="w-full">
							<label>
								Confirm Password <span className="text-red-500">*</span>
							</label>
							<input
								type="password"
								id="confirmPassword"
								className=" bg-white border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 mt-2"
								placeholder="Enter Your Confirm Password"
								{...register('confirmPassword')}
							/>
							{errors.confirmPassword?.message && (
								<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
									{errors.confirmPassword?.message}
								</div>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;
