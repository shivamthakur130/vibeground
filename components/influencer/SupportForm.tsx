'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

import { support } from '@/services/common.service';

const SupportForm = () => {
	const [loading, setLoading] = React.useState(false);
	const [messageTitle, setMessageTitle] = React.useState('Support');
	const [user, setUser] = React.useState<any>({});
	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required'),
		reason: Yup.string().required('Reason is required'),
		message: Yup.string().required('Message is required'),
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
		try {
			setLoading(true);
			const { data, error } = await support(formField);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				if (data.status) {
					SuccessMessage(messageTitle, 'Support sent successfully');
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
		<div className="Email text-center max-w-xl mx-auto mt-14 mb-14 px-4">
			<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 mb-10">
				Support
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-4 text-left">
					<div>
						<div className="text-xl font-PoppinsRegular py-2 text-111">Email</div>
						<input
							type="email"
							className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-[#C1C1C1]-500 block w-full py-4 px-4 "
							placeholder="Enter your email"
							{...register('email')}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
						)}
					</div>
					<div>
						<div className="text-xl font-PoppinsRegular py-2 text-111">Reason</div>
						<select
							className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-[#C1C1C1]-500 block w-full py-4 px-4 "
							{...register('reason')}>
							<option>Problem with payment</option>
							<option>Problem with account</option>
							<option>Problem with model</option>
							<option>Problem with subscription</option>
						</select>
						{errors.reason && (
							<p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
						)}
					</div>
					<div>
						<div className="text-xl font-PoppinsRegular py-2 text-111">Message</div>
						<textarea
							className="border border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-[#C1C1C1]-500 block w-full py-4 px-4 "
							placeholder="Write Message"
							{...register('message')}
						/>
						{errors.message && (
							<p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
						)}
					</div>
				</div>
				<button className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
					Send
				</button>
			</form>
		</div>
	);
};

export default SupportForm;
