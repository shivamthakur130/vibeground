'use client';
import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { modelAbout } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const ManageAbout = ({ user, showHide }: any) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const [showHideSection, setShowHideSection] = useState(showHide);
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
				SuccessMessage('Model Profile', 'About details saved successfully');
			} else {
				ErrorMessage('Model Profile', 'Something went wrong');
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
			ErrorMessage('Model Profile', message);
		} else if (error.request) {
			ErrorMessage(
				'Model Profile',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'Model Profile',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	return (
		<div className=" max-w-7xl px-5 mx-auto mt-16 mb-10 relative border-b border-gray-200 pb-5">
			<div className="flex justify-between">
				<h2 className="text-2xl font-PoppinsSemiBold text-111 mb-10">About Me</h2>
				<div className="flex space-x-2">
					<div>
						<button
							className="btn btn-default px-4 py-1 mt-0 text-lg border border-black text-151515 bg-transparent rounded-md hover:border-gray-800 hover:text-gray-200 hover:bg-gray-800 transition-all duration-300 active:border-black flex"
							type="submit"
							form="AboutForm"
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

			{showHideSection && (
				<div
					className={`max-w-2xl ${
						!showHideSection
							? 'hidden transition-all duration-300'
							: 'transition-all duration-300'
					}`}>
					<form
						id="AboutForm"
						name="AboutForm"
						onSubmit={handleSubmit(onSubmit)}
						className={`${loading ? 'opacity-25' : ''}`}>
						<div className="">
							<textarea
								className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4"
								placeholder="About"
								rows={7}
								cols={80}
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
					</form>
				</div>
			)}
		</div>
	);
};

export default ManageAbout;
