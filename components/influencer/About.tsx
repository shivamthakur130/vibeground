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
import { modelAbout } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const AboutInfo = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		about: Yup.string()
			.required('About is required')
			.min(80, 'About must be at least 80 characters')
			.max(1024, 'About must not exceed 1024 characters'),
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
			about: formField.about,
			userId: user.userId,
		};
		dispatch(updateUser({ ...user, ...prepareData }));
		try {
			const { data, error } = await modelAbout(prepareData);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				reset();
				SuccessMessage('Model Registration', 'About details saved successfully');
				push('/account/dob');
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
		<div className="Email  max-w-4xl mx-auto mt-16 mb-20 px-5 relative ">
			<p className="md:text-xl text-xs text-888 mb-5">Let`s complete your profile</p>
			<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 mb-14">
				{' '}
				Tell your fans more about you!
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
				<div className="">
					<textarea
						className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4"
						placeholder="About"
						rows={7}
						{...register('about', {
							value: user.about,
							onChange: (e) => {
								setValue('about', e.target.value);
								clearErrors('about');
							},
						})}
					/>
					{errors.about?.message && (
						<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.about?.message}
						</div>
					)}
				</div>
				<button
					className="btn btn-default px-24 py-4 mt-14 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
					type="submit"
					disabled={loading}>
					Continue
				</button>
			</form>
		</div>
	);
};

export default AboutInfo;
