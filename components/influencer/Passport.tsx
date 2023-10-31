'use client';

import React from 'react';
import Image from 'next/image';
import Upload from '@/assets/images/svg/upload.svg';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { modelPassport } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const Passport = () => {
	const [loading, setLoading] = useState(false);
	const [passportFront, setPassportFront] = useState(null);
	const [passportBack, setPassportBack] = useState(null);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();
	const MAX_FILE_SIZE = 51502400; //51500KB

	// form validation rules
	const validationSchema = Yup.object().shape({
		passport_front: Yup.mixed()
			.required('Passport front is required')
			.test('is-valid-type', 'Passport front is required', (value: any) => {
				return value.length > 0;
				// isValidFileType(value && value.name?.toLowerCase(), 'image');
			}),

		passport_back: Yup.mixed()
			.required('Passport back is required')
			.test('is-valid-type', 'Passport back is required', (value: any) => {
				return value.length > 0;
				// isValidFileType(value && value.name?.toLowerCase(), 'image');
			}),
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

	const onChange = (e: any, passportType: String) => {
		const file = e.target.files[0];
		if (passportType === 'passport_front') {
			setPassportFront(file);
		}
		if (passportType === 'passport_back') {
			setPassportBack(file);
		}
	};

	async function onSubmit(formField: any) {
		setLoading(true);
		const formData = new FormData();
		formData.append(
			'passport_front',
			formField.passport_front[0],
			formField.passport_front[0].name
		);
		formData.append(
			'passport_back',
			formField.passport_back[0],
			formField.passport_back[0].name
		);
		formData.append('userId', user.userId);
		try {
			const { data, error } = await modelPassport(formData);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				reset();
				SuccessMessage('Model Registration', 'Passport saved successfully');

				dispatch(
					updateUser({
						...user,
						passport_back: data.data.passport_back,
						passport_front: data.data.passport_front,
					})
				);
				push('/account/choose-plan');
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

	const removeSelectedImage = () => {
		setPassportFront(null);
	};
	const removeSelectedImageBack = () => {
		setPassportBack(null);
	};
	return (
		<div className="Email text-center max-w-4xl mx-auto mt-28 mb-24 relative">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Upload your Passport or ID to verify
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
				className={`${loading ? 'opacity-25' : ''}`}
				encType="multipart/form-data">
				<div className="grid grid-cols-2 gap-6 my-6 max-w-xl mx-auto">
					<div>
						<label className="">
							{passportFront ? (
								<div className="flex flex-col items-end justify-center max-w-[283px] h-52 rounded-xl relative ">
									<button
										onClick={removeSelectedImage}
										className="top-1 px-2 font-PoppinsBold text-red-500 mr-1 rounded-md absolute bg-[#f9f9f9] cursor-pointer hover:bg-[#ffffff] active:bg-[#f9f9f9]">
										X
									</button>
									<img
										src={URL.createObjectURL(passportFront)}
										alt="Thumb"
										className="rounded-md h-full w-full object-cover"
									/>
								</div>
							) : (
								<div className="flex flex-col items-center justify-center max-w-[283px] h-52 rounded-xl bg-[#f9f9f9]  hover:bg-[#dedddd] active:bg-[#f9f9f9] transition-all duration-300 cursor-pointer">
									<label
										className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer"
										htmlFor="passport_front">
										<Image src={Upload} alt="#" />
									</label>
								</div>
							)}
							<input
								id="passport_front"
								type="file"
								accept="image/*"
								className="hidden"
								{...register('passport_front', {
									onChange: (e) => {
										onChange(e, 'passport_front');
										clearErrors('passport_front');
									},
								})}
								name="passport_front"
							/>
						</label>
						{errors.passport_front?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.passport_front?.message}
							</div>
						)}
					</div>
					<div>
						<label className="">
							{passportBack ? (
								<div className="flex flex-col items-end justify-center max-w-[283px] h-52 rounded-xl relative ">
									<button
										onClick={removeSelectedImageBack}
										className="top-1 px-2 font-PoppinsBold text-red-500 mr-1 rounded-md absolute bg-[#f9f9f9] cursor-pointer hover:bg-[#ffffff] active:bg-[#f9f9f9]">
										X
									</button>
									<img
										src={URL.createObjectURL(passportBack)}
										alt="Thumb"
										className="rounded-md h-full w-full object-cover"
									/>
								</div>
							) : (
								<div
									//
									className="flex flex-col items-center justify-center max-w-[283px] h-52 rounded-xl bg-[#f9f9f9]  hover:bg-[#dedddd] active:bg-[#f9f9f9] transition-all duration-300 cursor-pointer">
									<label
										className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer"
										htmlFor="passport_back">
										<Image src={Upload} alt="#" />
									</label>
								</div>
							)}
							<input
								id="passport_back"
								type="file"
								accept="image/*"
								className="hidden"
								{...register('passport_back', {
									onChange: (e) => {
										onChange(e, 'passport_back');
										clearErrors('passport_back');
									},
								})}
								name="passport_back"
							/>
						</label>
						{/* <label
							htmlFor="passport_back"
							className="flex flex-col items-center justify-center max-w-[283px] h-52 rounded-xl bg-[#f9f9f9] cursor-pointer hover:bg-[#dedddd] active:bg-[#f9f9f9] transition-all duration-300">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<Image src={Upload} alt="#" />
							</div>
							<input
								id="passport_back"
								type="file"
								className="hidden"
								{...register('passport_back', {
									onChange: (e) => {
										onChange(e, 'passport_back');
										clearErrors('passport_back');
									},
								})}
								name="passport_back"
							/>
						</label> */}
						{errors.passport_back?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.passport_back?.message}
							</div>
						)}
					</div>
				</div>
				{/* <Link href="/influencer/pictures"> */}
				<button
					className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
					type="submit"
					disabled={loading}>
					Continue
				</button>
				{/* </Link> */}
			</form>
		</div>
	);
};

export default Passport;
