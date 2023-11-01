'use client';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { userUpdate } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { Country, City } from 'country-state-city';
// import AgeVerificationDialog from '../account/AgeVerificationDialog';

const ManageOtherInfo = ({ user }: any) => {
	const [selectedDay, setSelectedDay] = useState<string>('');
	const [selectedMonth, setSelectedMonth] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<string>('');
	const [country, setCountry] = useState(user.country);
	const [city, setCity] = useState(user.city);
	// const [showAgeVerificationDialog, setShowAgeVerificationDialog] =
	// 	useState<boolean>(false);
	const messageTitle = user.type === 'fan' ? 'User details' : 'Model details';
	// Define arrays for days, months, and years
	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	const months = Array.from({ length: 12 }, (_, i) => i + 1);
	const years = Array.from({ length: 100 }, (_, i) => i + 1923); // Adjust the starting year as needed

	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const [showHideSection, setShowHideSection] = useState(false);
	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Email is invalid').required('Email is required'),
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		gender: Yup.string().required('Gender is required'),
		city: Yup.string().required('City is required'),
		country: Yup.string().required('Country is required'),
		dd: Yup.string().required('Day is required'),
		mm: Yup.string().required('Month is required'),
		yyyy: Yup.string().required('Year is required'),
	});
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

	useEffect(() => {
		setValue('firstName', user.firstName);
		setValue('lastName', user.lastName);
		setValue('email', user.email);
		const dateOfBirth = new Date(user.date_of_birth);
		const selectedDay_ = dateOfBirth.getDate();
		const selectedMonth_ = dateOfBirth.getMonth() + 1;
		const selectedYear_ = dateOfBirth.getFullYear();
		setSelectedDay(selectedDay_.toString());
		setSelectedMonth(selectedMonth_.toString());
		setSelectedYear(selectedYear_.toString());
		setValue('dd', selectedDay_ + '');
		setValue('mm', selectedMonth_ + '');
		setValue('yyyy', selectedYear_ + '');
		setValue('gender', user.gender);
	}, []);

	const isDateValid = (day: string, month: string, year: string): boolean => {
		const date = new Date(`${year}-${month}-${day}`);
		return (
			!isNaN(date.getTime()) &&
			date.getDate() === parseInt(day, 10) &&
			date.getMonth() + 1 === parseInt(month, 10) &&
			date.getFullYear() === parseInt(year, 10)
		);
	};

	async function onSubmit(formField: any) {
		console.log(formField);
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
		const prepareData = {
			firstName: formField.firstName,
			lastName: formField.lastName,
			email: formField.email,
			date_of_birth: `${formField.dd}-${formField.mm}-${formField.yyyy}`,
			gender: formField.gender,
			country: formField.country,
			city: formField.city,
			userId: user.userId,
		};

		try {
			setLoading(true);
			const { data, error } = await userUpdate(prepareData);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				if (data.data.status) {
					dispatch(updateUser({ ...user, ...prepareData }));
					SuccessMessage(messageTitle, 'Details saved successfully');
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
		<div className=" max-w-7xl px-5 mx-auto mt-10 mb-10 relative border-b border-gray-200 pb-5">
			<div className="flex justify-between">
				<h2 className="text-2xl font-PoppinsSemiBold text-111 mb-7">Other Info</h2>
				<div className="flex space-x-2">
					<div>
						<button
							className="btn btn-default px-4 py-1 mt-0 text-lg border border-black text-151515 bg-transparent rounded-md hover:border-gray-800 hover:text-gray-200 hover:bg-gray-800 transition-all duration-300 active:border-black flex"
							type="submit"
							form="OtherInfo"
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
					id="OtherInfo"
					name="OtherInfo"
					onSubmit={handleSubmit(onSubmit)}
					className={`${loading ? 'opacity-25' : ''}`}>
					<div className="flex justify-between w-full space-x-10">
						<div className="w-full">
							<label className="">
								First Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 mt-2"
								placeholder="First Name"
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
						<div className="w-full">
							<label>
								Last Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 mt-2"
								placeholder="Last Name"
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
					</div>
					<div className="flex justify-between w-full space-x-10 pt-4">
						<div className="w-full">
							<label>
								Email <span className="text-red-500">*</span>
							</label>
							<input
								type="email"
								className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-4 mt-2"
								placeholder="Email"
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
					</div>
					<div className="w-full my-4 ">
						<label>
							Date of Birth <span className="text-red-500">*</span>
						</label>
						<div className="grid  grid-cols-3 gap-6 mt-2">
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
					</div>
					<div className="w-full my-4 ">
						<label>
							Gender <span className="text-red-500">*</span>
						</label>
						<div className="grid  grid-cols-3 gap-6 mt-2">
							<label
								className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4"
								htmlFor="maleRadio">
								<label htmlFor="maleRadio" className="ml-2 text-xl text-151515">
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
								<label htmlFor="femaleRadio" className="ml-2 text-xl text-151515">
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
								className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4">
								<label htmlFor="otherRadio" className="ml-2 text-xl text-151515">
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
						</div>
						{errors.gender?.message && (
							<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
								{errors.gender?.message}
							</div>
						)}
					</div>
					<div className="flex justify-between w-full space-x-10">
						<div className="w-full">
							<label>
								Country <span className="text-red-500">*</span>
							</label>
							<select
								id="countries"
								className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4 mt-2"
								{...register('country', {
									value: user.country,
									onChange: (e) => {
										setCountry(e.target.value);
										setValue('country', e.target.value);
									},
								})}>
								<option value="">Select Country</option>
								{Country.getAllCountries().map((country, index) => (
									<option value={country.isoCode} key={index}>
										{country.name}
									</option>
								))}
							</select>
							{errors.country?.message && (
								<div className="text-red-600 h-5 mt-3 mb-5 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
									{errors.country?.message}
								</div>
							)}
						</div>
						<div className="w-full">
							<label>
								City <span className="text-red-500">*</span>
							</label>
							<select
								id="city"
								className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4 mt-2"
								{...register('city', {
									value: user.city,
									onChange: (e) => {
										setCity(e.target.value);
										setValue('city', e.target.value);
									},
								})}>
								{country == '' ? (
									<option value="">Please select country than city</option>
								) : (
									<option value="">Select City</option>
								)}
								{country != '' &&
									City.getCitiesOfCountry(country)?.map((city, index) => (
										<option value={city.name} key={index}>
											{city.name}
										</option>
									))}
							</select>
							{errors.city?.message && (
								<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
									{errors.city?.message}
								</div>
							)}
						</div>
					</div>
				</form>
				{/* {showAgeVerificationDialog && (
					<AgeVerificationDialog
						setValue={setValue}
						onClickSubmit={onClickSubmit}
						showAgeVerificationDialog={showAgeVerificationDialog}
						setShowAgeVerificationDialog={setShowAgeVerificationDialog}
					/>
				)} */}
			</div>
		</div>
	);
};

export default ManageOtherInfo;
