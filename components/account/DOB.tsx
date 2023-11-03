'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { fanDob } from '@/services/user.service';
import Loading from '@/components/layout/Loading';

import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import AgeVerificationDialog from './AgeVerificationDialog';

const DOB = () => {
	const [selectedDay, setSelectedDay] = useState<string>('');
	const [selectedMonth, setSelectedMonth] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<string>('');
	const [showAgeVerificationDialog, setShowAgeVerificationDialog] =
		useState<boolean>(false);
	// Define arrays for days, months, and years
	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	const months = Array.from({ length: 12 }, (_, i) => i + 1);
	const years = Array.from({ length: 100 }, (_, i) => i + 1923); // Adjust the starting year as needed

	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();

	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		dd: Yup.string().required('Day is required'),
		mm: Yup.string().required('Month is required'),
		yyyy: Yup.string().required('Year is required'),
		checkAgeVerified: Yup.string(),
	});
	const messageTitle =
		user.type === 'fan' ? 'User Registration' : 'Model Registration';
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

	const isDateValid = (day: string, month: string, year: string): boolean => {
		const date = new Date(`${year}-${month}-${day}`);
		return (
			!isNaN(date.getTime()) &&
			date.getDate() === parseInt(day, 10) &&
			date.getMonth() + 1 === parseInt(month, 10) &&
			date.getFullYear() === parseInt(year, 10)
		);
	};

	const checkAgeIsValid = (
		day: string,
		month: string,
		year: string
	): boolean => {
		const date = new Date(`${year}-${month}-${day}`);
		const today = new Date();
		const age = today.getFullYear() - date.getFullYear();
		const monthDiff = today.getMonth() - date.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
			return age - 1 >= 18;
		}
		return age >= 18;
	};

	const buttonRef = useRef<HTMLButtonElement>(null);

	const onClickSubmit = () => {
		if (buttonRef.current) {
			buttonRef.current.click();
		}
	};

	async function onSubmit(formField: any) {
		setLoading(true);
		if (!isDateValid(formField.dd, formField.mm, formField.yyyy)) {
			ErrorMessage(messageTitle, 'Invalid Date of Birth');
			setLoading(false);
			return;
		}
		// check if age is valid
		if (!checkAgeIsValid(formField.dd, formField.mm, formField.yyyy)) {
			ErrorMessage(messageTitle, 'You must be 18 years or older to join');
			setLoading(false);
			return;
		}
		if (formField.checkAgeVerified === 'false') {
			// if (!checkAgeIsValid(formField.dd, formField.mm, formField.yyyy)) {
			setShowAgeVerificationDialog(true);
			setLoading(false);
			return;
			// }
		}

		try {
			const dateOfBirth = `${formField.dd}-${formField.mm}-${formField.yyyy}`;
			const response = await fanDob({
				userId: user.userId,
				dob: dateOfBirth,
			});
			if (response.status === 201) {
				reset();
				dispatch(updateUser({ ...user, date_of_birth: dateOfBirth }));
				SuccessMessage(messageTitle, 'Date of birth saved successfully.');
				push('/account/gender');
			} else {
				ErrorMessage(messageTitle, 'Something went wrong');
			}
		} catch (error) {
			handleError(error);
		}
		setLoading(false);
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
			ErrorMessage(
				messageTitle,
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	return (
		<div className="Email text-center max-w-xl mx-auto mt-24 mb-24 relative">
			<p className="text-xl text-888 mb-5">Let`s complete your profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Enter your date of birth
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
				id="DOBForm"
				onSubmit={handleSubmit(onSubmit)}
				className={`${loading ? 'opacity-25' : ''}`}>
				<input type="hidden" {...register('checkAgeVerified')} value={'false'} />
				<div className="grid   grid-cols-3 gap-6 my-6 ">
					<div>
						<select
							id="day"
							{...register('dd', {
								onChange: (e) => {
									setSelectedDay(e.target.value);
									setValue('dd', e.target.value);
									clearErrors('dd');
								},
							})}
							className="text-center border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 ">
							<option value="">DD</option>
							{days.map((day) => (
								<option key={day} value={day}>
									{day}
								</option>
							))}
						</select>
						{errors.dd?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.dd?.message}
							</div>
						)}
					</div>
					<div>
						<select
							id="month"
							className="text-center border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							{...register('mm', {
								onChange: (e) => {
									setSelectedMonth(e.target.value);
									setValue('mm', e.target.value);
									clearErrors('mm');
								},
							})}>
							<option value="">MM</option>
							{months.map((month) => (
								<option key={month} value={month}>
									{month}
								</option>
							))}
						</select>
						{errors.mm?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.mm?.message}
							</div>
						)}
					</div>
					<div>
						<select
							id="year"
							className="text-center border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 "
							{...register('yyyy', {
								onChange: (e) => {
									setSelectedYear(e.target.value);
									setValue('yyyy', e.target.value);
									clearErrors('yyyy');
								},
							})}>
							<option value="">YYYY</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
						{errors.yyyy?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.yyyy?.message}
							</div>
						)}
					</div>
				</div>
				<button
					ref={buttonRef}
					className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
					id="birthdayForm"
					type="submit"
					disabled={loading}>
					Continue
				</button>
			</form>
			{showAgeVerificationDialog && (
				<AgeVerificationDialog
					setValue={setValue}
					onClickSubmit={onClickSubmit}
					showAgeVerificationDialog={showAgeVerificationDialog}
					setShowAgeVerificationDialog={setShowAgeVerificationDialog}
				/>
			)}
		</div>
	);
};

export default DOB;
