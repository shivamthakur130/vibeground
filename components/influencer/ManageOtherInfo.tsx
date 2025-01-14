'use client';
import React, { useEffect, useRef } from 'react';
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
import { getCities } from '@/services/common.service';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import AgeVerificationDialog from '../account/AgeVerificationDialog';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ManageOtherInfo = ({ user, showHide, countries }: any) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	// start date of birth more than 18 years ago
	const startDate = new Date();
	startDate.setFullYear(startDate.getFullYear() - 18);
	const [selectedDate, setSelectedDate] = useState<Date>(startDate);

	const [country, setCountry] = useState(user.country);
	const [city, setCity] = useState(user.city);

	// const [countriesList, setCountriesList] = useState(countries);
	const [cityList, setCityList] = useState([]);

	const [showAgeVerificationDialog, setShowAgeVerificationDialog] =
		useState<boolean>(false);
	const messageTitle = user.type === 'fan' ? 'User details' : 'Model details';

	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const [showHideSection, setShowHideSection] = useState(showHide);

	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Email is invalid').required('Email is required'),
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		gender: Yup.string().required('Gender is required'),
		city: Yup.string().required('City is required'),
		country: Yup.string().required('Country is required'),
	});

	const checkAgeIsValid = (selected: Date): boolean => {
		const date = new Date(selected);
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
		setSelectedDate(dateOfBirth);
		setValue('country', user.country);
		getCitiesList(user.country);
		setValue('city', user.city);
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
		// check if age is valid
		if (!selectedDate) {
			ErrorMessage(messageTitle, 'Please select a date of birth');
			setLoading(false);
			return;
		}
		if (!checkAgeIsValid(selectedDate)) {
			ErrorMessage(messageTitle, 'You must be 18 years or older to join');
			setLoading(false);
			return;
		}
		const formattedDate = moment(selectedDate).format('DD-MM-YYYY');
		const prepareData = {
			firstName: formField.firstName,
			lastName: formField.lastName,
			email: formField.email,
			date_of_birth: formattedDate,
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
			ErrorMessage(
				'Model Registration',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	const onChangeCountry = (e: any, city: string) => {
		setCountry(e.target.value);
		setValue('country', e.target.value);
		getCitiesList(e.target.value);
		setCity(city);
		setValue('city', city);
	};

	const getCitiesList = async (countryCode: string) => {
		setLoading(true);
		try {
			const { data, error } = await getCities(countryCode);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}

			if (typeof data === 'object' && data !== null && 'data' in data) {
				setCityList(data.data);
			} else {
				setCityList([]);
			}
			setLoading(false);
		} catch (error) {
			handleError(error);
			setLoading(false);
		}
	};

	const onChangeDate = (date: Value) => {
		const dateStr = `${date}`;
		const formattedDate = moment(dateStr);
		setSelectedDate(formattedDate.toDate());
	};
	const onClickSubmit = () => {
		if (buttonRef.current) {
			buttonRef.current.click();
		}
	};

	return (
		<div className=" max-w-7xl px-5 mx-auto mt-10 mb-10 relative border-b border-gray-200 pb-5">
			<div className="flex justify-between">
				<h2 className="text-2xl font-PoppinsSemiBold text-111 mb-7">Other Info</h2>
				<div className="flex space-x-2">
					<div>
						<button
							ref={buttonRef}
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
			{showHideSection && (
				<div
					className={`max-w-2xl ${
						!showHideSection
							? 'hidden transition-all duration-300'
							: 'transition-all duration-300'
					}`}>
					<form
						id="OtherInfo"
						name="OtherInfo"
						onSubmit={handleSubmit(onSubmit)}
						className={`${loading ? 'opacity-25' : ''}`}>
						<div className="flex md:flex-row flex-col justify-between w-full md:space-x-10">
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
							<div className="w-full pt-4 md:pt-0">
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
							<div className="  justify-left">
								<DatePicker
									onChange={onChangeDate}
									clearIcon={null}
									value={selectedDate}
									format="dd-MM-y"
									className="  border-black text-656565  text-tg rounded-lg focus:ring-black-500 focus:border-black-500 block py-3 px-0"
								/>
							</div>
						</div>
						<div className="w-full my-4 ">
							<label>
								Gender <span className="text-red-500">*</span>
							</label>
							<div className="grid  md:grid-cols-3 grid-flow-row md:grid-flow-col gap-6 mt-2">
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
											onChangeCountry(e, user.city);
										},
									})}>
									<option value="">Select Country</option>

									{countries?.map((item: any, index: number) => (
										<option value={item['iso2'] ?? ''} key={index}>
											{item['name']}
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
									value={city}
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
										cityList.map((item: any, index: number) => (
											<option value={item['name']} key={index}>
												{item['name']}
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
					{/* {showAgeVerificationDialog && ( */}
					<AgeVerificationDialog
						setValue={setValue}
						onClickSubmit={onClickSubmit}
						showAgeVerificationDialog={showAgeVerificationDialog}
						setShowAgeVerificationDialog={setShowAgeVerificationDialog}
					/>
					{/* )} */}
				</div>
			)}
		</div>
	);
};

export default ManageOtherInfo;
