'use client';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { forgotPassword } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	LoadingMgs,
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import Link from 'next/link';

const ForgotPassword = () => {
	const [loading, setLoading] = useState(false);
	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required'),
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
		const prepareRequest = {
			email: formField.email,
		};
		operation(prepareRequest);
	}

	const operation = async (prepareRequest: any) => {
		LoadingMgs('Forgot password Operation', 'Forgot password...');
		setLoading(true);
		const { data, error } = await forgotPassword({ ...prepareRequest });

		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		if (typeof data === 'object' && data !== null && 'data' in data) {
			reset();
			if (data.status) {
				SuccessMessage(
					'Forgot password Operation',
					Array.isArray(data.message) ? data.message.join(', ') : data.message
				);
			} else {
				ErrorMessage(
					'Forgot password Operation',
					Array.isArray(data.message) ? data.message.join(', ') : data.message
				);
			}
		} else {
			ErrorMessage('Forgot password Operation', 'Something went wrong');
		}
		setLoading(false);
	};

	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response?.data.message;
			ErrorMessage('Forgot password Operation', message);
		} else if (error.request) {
			ErrorMessage(
				'Forgot password Operation',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'Forgot password Operation',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	return (
		<div className="Forgot password max-w-3xl mx-auto mt-24 mb-40 px-10 relative">
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
						type="email"
						id="email"
						className="border mt-4 border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-5 "
						placeholder="Enter email address"
						{...register('email', {
							onChange: (e) => {},
						})}
					/>
					{errors.email?.message && (
						<div className="text-red-600 h-5 mt-2 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.email?.message}
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
					<div className="pt-3 mt-4 ">
						<Link href="/login">
							<button
								type="button"
								className="btn btn-default px-10 hover:bg-151515 hover:text-white py-1 text-xl text-303030 border rounded-[8px] transition-all duration-300 active:bg-303030 border-black">
								Login
							</button>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ForgotPassword;
