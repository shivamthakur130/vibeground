'use client';

import React from 'react';
import Image from 'next/image';
import Fan from 'assets/images/fan.png';
import Modal from 'assets/images/model.png';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import PageWrapper from '../common/PageWrapper';

const AreYou = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { replace } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		type: Yup.string().required('Type is required'),
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
		dispatch(updateUser({ ...user, type: formField.type }));
		if (formField.type === 'fan') {
			if (
				user?.email === undefined ||
				user?.email === null ||
				user?.email === ''
			) {
				replace('/account/email');
			} else {
				replace('/account/user-details');
			}
			return;
		}
		if (user?.email === undefined || user?.email === null || user?.email === '') {
			replace('/account/user-information');
		} else {
			replace('/account/about');
		}
	}

	return (
		<PageWrapper>
			<div className="AreYou text-center max-w-[430px] mx-auto mt-16 mb-40 relative px-5">
				<h2 className="text-5xl font-PoppinsBold text-111">Who are you?</h2>
				{/* <p className="text-xl text-888 mt-3 mb-10">Choose who you are going to be</p> */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="transition delay-150 duration-300 ease-in-out">
					<div className="mx-auto grid grid-flow-col gap-4 mt-5">
						<label
							className="flex items-center cursor-pointer rounded-xl aspect-square relative"
							htmlFor="fanRadio">
							<Image src={Fan} alt="Fan" />
							<input
								id="fanRadio"
								type="radio"
								value="fan"
								{...register('type', {
									onChange: (e) => {
										setValue('type', e.target.value);
										clearErrors('type');
									},
								})}
								name="type"
								className="w-8 h-8 absolute top-5 left-5  bg-white border-0 ring-0 focus:ring-0  "
							/>
							<label
								htmlFor="fanRadio"
								className="absolute bottom-4 left-0 right-0 text-white text-2xl">
								Fan
							</label>
						</label>
						<label
							className="flex items-center cursor-pointer rounded-xl aspect-square relative "
							htmlFor="modalRadio">
							<Image src={Modal} alt="Modal" />
							<input
								id="modalRadio"
								type="radio"
								value="model"
								{...register('type', {
									onChange: (e) => {
										setValue('type', e.target.value);
										clearErrors('type');
									},
								})}
								name="type"
								className="w-8 h-8 absolute top-5 left-5  bg-white border-0 ring-0 focus:ring-0  "
							/>
							<label
								htmlFor="modalRadio"
								className="absolute bottom-4 left-0 right-0 text-white text-2xl">
								Model
							</label>
						</label>
					</div>
					<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
						{errors.type?.message && errors.type?.message}
					</div>
					<button
						className="btn w-full px-24 py-4 mt-12 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
						type="submit">
						Continue
					</button>
				</form>
			</div>
		</PageWrapper>
	);
};

export default AreYou;
