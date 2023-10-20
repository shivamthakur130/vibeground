'use client';
import React from 'react';
import * as Yup from 'yup';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { fanDetails } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import Image from 'next/image';
import ProfileImg from '@/assets/images/profile_img.png';
import Arrow from '@/assets/images/svg/arrow-right.svg';

import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const UserProfile = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		userName: Yup.string().required('UserName is required'),
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
		dispatch(updateUser({ ...user, email: formField.email }));

		try {
			const prepareData = {
				userId: user.userId,
				firstName: formField.firstName,
				lastName: formField.lastName,
				userName: formField.userName,
			};
			const response = await fanDetails(prepareData);
			if (response.status === 201) {
				dispatch(updateUser({ ...user, ...prepareData }));
				SuccessMessage('User Registration', 'Details changes saved successfully');
				push('/account/password');
			} else {
				ErrorMessage('User Registration', 'Something went wrong');
			}
		} catch (error) {
			console.log(error, 'error');
			handleError(error);
		}
		setLoading(false);
	}

	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response.data.message;
			ErrorMessage('User Registration', message);
		} else if (error.request) {
			ErrorMessage(
				'User Registration',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'User Registration',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	return (
		<div className="Profile max-w-7xl px-5 mx-auto mt-32 mb-32">
			<div className="flex items-center">
				<div className="flex-shrink-0 mr-10">
					<Image className="w-40 h-40" src={ProfileImg} alt="Neil image" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-5xl font-PoppinsMedium text-[#444]">
						{user?.firstName} {user?.lastName}
					</p>
					<p className="text-2xl text-[#444]">{user?.email}</p>
				</div>
			</div>

			<div className="mt-20 space-y-14">
				<h2 className="flex justify-between text-2xl">
					Interest
					<span>
						<Image src={Arrow} alt="#" width={7} />
					</span>
				</h2>
				<h2 className="flex justify-between text-2xl">
					Browse Profile
					<span>
						<Image src={Arrow} alt="#" width={7} />
					</span>
				</h2>
				<h2 className="flex justify-between text-2xl">
					Terms & Conditions
					<span>
						<Image src={Arrow} alt="#" width={7} />
					</span>
				</h2>
				<h2 className="flex justify-between text-2xl">
					Invoice
					<span>
						<Image src={Arrow} alt="#" width={7} />
					</span>
				</h2>
			</div>
		</div>
	);
};

export default UserProfile;
