'use client';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { resetPassword } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import { useRouter } from 'next/navigation';
import {
	LoadingMgs,
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const ResetPassword = ({ params }: any) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	// form validation rules
	const validationSchema = Yup.object().shape({
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

	if (
		params?.token == undefined ||
		params?.token == null ||
		params?.token == ''
	) {
		router.replace('/login/forgot-password');
	}

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
		const prepareRequest = {
			password: formField.password,
			token: params?.token,
		};
		operation(prepareRequest);
	}

	const operation = async (prepareRequest: any) => {
		LoadingMgs('Reset password Operation', 'Reset password...');
		setLoading(true);
		const { data, error } = await resetPassword({ ...prepareRequest });

		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		if (typeof data === 'object' && data !== null && 'data' in data) {
			reset();
			console.log('data', data);
			if (data.status) {
				SuccessMessage(
					'Reset password Operation',
					Array.isArray(data.message) ? data.message.join(', ') : data.message
				);
				router.replace('/login');
			} else {
				ErrorMessage(
					'Reset password Operation',
					Array.isArray(data.message) ? data.message.join(', ') : data.message
				);
			}
		} else {
			ErrorMessage('Reset password Operation', 'Something went wrong');
		}
		setLoading(false);
	};

	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response?.data.message;
			ErrorMessage('Reset password Operation', message);
		} else if (error.request) {
			ErrorMessage(
				'Reset password Operation',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'Reset password Operation',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};
	return (
		<div className="Reset password max-w-3xl mx-auto mt-24 mb-40 px-10 relative">
			<h2 className="text-5xl font-PoppinsBold text-111 flex items-center justify-center">
				Forgot Password
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
				className={`flex flex-col max-w-md mx-auto space-y-3 mt-5 ${
					loading ? 'opacity-25' : ''
				}`}>
				<div>
					<input
						type="password"
						id="password"
						className="max-w-[460px] mx-auto bg-white border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
						placeholder="Enter Your Password"
						{...register('password')}
					/>
					{errors.password?.message && (
						<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.password?.message}
						</div>
					)}

					<input
						type="password"
						id="confirmPassword"
						className="max-w-[460px] mx-auto bg-white border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 mt-6"
						placeholder="Enter Your Confirm Password"
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword?.message && (
						<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.confirmPassword?.message}
						</div>
					)}
				</div>

				<div className="text-center pt-3">
					<div>
						<button
							className="w-full px-24 py-4 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030"
							type="submit"
							disabled={loading}>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
