'use client';

import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { getCities } from '@/services/common.service';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { fanLocation } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const Selection = ({ countries }: any) => {
	const [loading, setLoading] = useState(false);

	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const [country, setCountry] = useState(user.country);
	const [city, setCity] = useState(user.city);

	const [cityList, setCityList] = useState([]);

	const { push } = useRouter();
	const messageTitle =
		user.type === 'fan' ? 'User Registration' : 'Model Registration';
	// form validation rules
	const validationSchema = Yup.object().shape({
		city: Yup.string().required('City is required'),
		country: Yup.string().required('Country is required'),
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
			const response = await fanLocation({
				userId: user.userId,
				country: formField.country,
				city: formField.city,
			});
			if (response.status === 201) {
				reset();
				dispatch(
					updateUser({ ...user, city: formField.city, country: formField.country })
				);
				SuccessMessage(messageTitle, 'Gender changes saved successfully');
				if (user.type === 'fan') {
					push('/account/choose-plan');
				} else {
					push('/account/passport');
				}
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

	const onChangeCountry = (e: any, city: string) => {
		setCountry(e.target.value);
		setValue('country', e.target.value);
		// const cityListSelected = cities.filter(
		// 	(item: any) => item['country_code'] == e.target.value
		// );
		// setCityList(cityListSelected);

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

	return (
		<div className="Email text-center max-w-2xl mx-auto mt-14 mb-24 relative px-4">
			<p className="md:text-xl text-xs text-888 mb-5">
				Let`s complete your profile
			</p>
			<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 mb-2">
				Where are you from?
			</h2>
			<div className="mb-14">
				{user.type !== 'fan' && <>(This is not visible to the fans)</>}
			</div>
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
				<div className="max-w-lg mx-auto">
					<select
						id="countries"
						className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4"
						{...register('country', {
							value: country,
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

					<select
						id="city"
						className="flex justify-between border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 w-full py-4 px-4 mb-4"
						{...register('city', {
							value: city,
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
					{/* <Link href="/account/choose-plan"> */}
					<button className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
						Continue
					</button>
					{/* </Link> */}
				</div>
			</form>
		</div>
	);
};

export default Selection;
