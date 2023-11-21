'use client';

import React from 'react';
import Image from 'next/image';
import Croun from '@/assets/images/croun.png';
import Star from '@/assets/images/star.png';
import Tic from '@/assets/images/tic.png';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPlans, logoutUser } from '@/services/user.service';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { removeUser, updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { makeSubscription } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import { Plan } from '@/types/Plan';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const Plan = () => {
	const [loading, setLoading] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState('');
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();
	const [planList, setPlanList] = useState<Plan[]>([]);
	const messageTitle =
		user.type === 'fan' ? 'User Registration' : 'Model Registration';

	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, error } = await getPlans(user.type);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			setPlanList((data as { data: any[] })['data']);
			setLoading(false);
		})();
	}, []);

	// form validation rules
	const validationSchema = Yup.object().shape({
		plan: Yup.string().required('Plan is required'),
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
	// get functions to build form with useForm() hook
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		getValues,
		clearErrors,
		reset,
		formState,
	} = useForm(formOptions);
	const { errors } = formState;

	async function onSubmit(formField: any) {
		setLoading(true);
		const { data, error } = await makeSubscription({
			planId: formField.plan,
			userId: user.userId,
		});
		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}

		if (typeof data === 'object' && data !== null && 'data' in data) {
			const response = data.data;
			if (response.status) {
				reset();
				const planId = response.planId;
				const subscriptionId = response._id;

				dispatch(
					updateUser({ ...user, planId: planId, subscriptionId: subscriptionId })
				);
				SuccessMessage(messageTitle, 'Plan saved successfully');
				if (response.planDetails && response.planDetails.planType !== 'free') {
					push('/account/billing');
				} else {
					if (user.type === 'model') {
						push('/account/pictures');
						return;
					} else if (user.type === 'fan') {
						push('/experience');
						return;
					}
				}
			} else {
				ErrorMessage(messageTitle, 'Something went wrong');
			}
		} else {
			ErrorMessage(messageTitle, 'Something went wrong');
		}
		setLoading(false);
	}

	const handleError = (error: any) => {
		if (error.response?.status === 401) {
			dispatch(removeUser());
			push('/login');
		}
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
	const updatePlan = (planId: string) => {
		setSelectedPlan(planId);
		setValue('plan', planId);
	};

	return (
		<div className="Plan max-w-[900px] mx-auto mt-14 mb-24 text-center relative px-4">
			<p className="md:text-xl text-xs text-888 mb-5">
				Let`s complete your profile
			</p>
			<h2 className="hidden md:block  md:text-5xl text-lg font-PoppinsBold text-111 mb-16 md:text-center">
				Choose your plan
			</h2>
			{loading && (
				<Loading
					width={50}
					height={50}
					className="flex absolute justify-center w-96
					z-50 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				/>
			)}
			{planList.length === 0 && (
				<div className="text-red-600 text-center h-5 mt-5 text-lg font-PoppinsRegular ml-3  transition delay-150 transform duration-300 ease-in-out">
					No plan found
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={` ${loading ? 'opacity-25' : ''}`}>
				<div className="mx-auto flex justify-center space-x-8">
					{planList.map((plan, index) => (
						<div
							className={`text-left  px-5 cursor-pointer pt-5 pb-5 rounded-xl relative hover:border-2 hover:border-[#F4BE55] shadow-shado w-[300px] space-y-2 ${
								selectedPlan == plan._id
									? 'border-2 border-[#F4BE55]'
									: 'border-2 border-[#DFE9DF]'
							}`}
							key={index}
							onClick={() => updatePlan(plan._id)}>
							{plan.recommended && (
								<div className="absolute -top-4 left-0 right-0 flex items-center">
									<span className="px-5 py-2 bg-[#F4BE55] rounded text-xs mx-auto text-center text-white">
										Recommended
									</span>{' '}
								</div>
							)}
							<div className="h-9 w-9 rounded bg-[#DFE9DF] flex items-center justify-center">
								{plan.recommended ? (
									<Image src={Croun} alt="#" />
								) : (
									<Image src={Star} alt="#" />
								)}
							</div>
							<h2 className="font-PoppinsBold text-15px mt-1.5">
								{plan.name}
								{plan.planType !== 'free' && (
									<span className="text-[10px]"> ({plan.duration} Month)</span>
								)}
							</h2>
							{plan.planType !== 'free' && (
								<>
									<h2 className="font-PoppinsBold text-2xl text-2f2f2f">
										{plan.price}
										<span className="text-sm font-PoppinsMedium text-[#B5B5B5]">
											€/{'  '}
											{plan.duration} Month
										</span>
									</h2>

									{/* <div className="font-PoppinsMedium py-3 text-[#B5B5B5]">
										({(parseInt(plan.price) / parseInt(plan.duration)).toFixed(2)}
										{'  '}
										€/month)
									</div> */}
								</>
							)}
							<ul className="space-y-4 text-sm">
								{plan.type == 'model' && (
									<>
										<li className="flex justify-between items-start">
											Maximum Picture Upload
											<span className="border-2 border-green-700 rounded-full px-2  font-PoppinsSemiBold">
												{plan.max_pics}
											</span>
										</li>
										<li className="flex justify-between items-start">
											Maximum Video Upload
											<span className="border-2 border-gray-700 rounded-full px-2  font-PoppinsSemiBold">
												{' '}
												{plan.max_videos}{' '}
											</span>
										</li>
										<li className="flex justify-between items-start">
											Maximum Link Add
											<span className="border-2 border-gray-700 rounded-full px-2  font-PoppinsSemiBold">
												{' '}
												{plan.max_links}{' '}
											</span>
										</li>
									</>
								)}
								<li className="flex justify-between">
									Videos
									{plan.features.video == 'full' ? (
										<span>
											<Image src={Tic} alt="#" />
										</span>
									) : (
										<span>--</span>
									)}
								</li>
								<li className="flex justify-between">
									Images{' '}
									{plan.features.image == 'full' ? (
										<span>
											<Image src={Tic} alt="#" />
										</span>
									) : (
										<span>--</span>
									)}
								</li>
								{plan.type == 'fan' && (
									<li className="flex justify-between">
										Swipe Models
										{plan.features.swipeModel == 'full' ? (
											<span>
												<Image src={Tic} alt="#" />
											</span>
										) : plan.features.swipeModel !== '' ? (
											<span className="text-[#558F71]">{plan.features.swipeModel}</span>
										) : (
											<span>--</span>
										)}
									</li>
								)}
								{plan.type == 'model' && (
									<li className="flex justify-between">
										Newcomer of the month
										{plan.features.newComerOfWeek == 'full' ? (
											<span>
												<Image src={Tic} alt="#" />
											</span>
										) : plan.features.newComerOfWeek !== '' ? (
											<span className="text-[#558F71]">
												{plan.features.newComerOfWeek}
											</span>
										) : (
											<span>--</span>
										)}
									</li>
								)}
							</ul>

							<input
								type="radio"
								id={`plan-${plan._id}`}
								value={plan._id}
								className="hidden"
								{...register('plan', {
									onChange: () => {
										clearErrors('plan');
										setSelectedPlan(plan._id);
									},
								})}
							/>
						</div>
					))}
				</div>
				{errors.plan?.message && (
					<div className="text-red-600 text-center h-5 mt-5 text-lg font-PoppinsRegular ml-3  transition delay-150 transform duration-300 ease-in-out">
						{errors.plan?.message}
					</div>
				)}
				<div className="w-full text-center">
					<button
						className="btn btn-default px-24 py-4 mt-14 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 self-center transition-all duration-300 active:bg-303030 "
						type="submit"
						disabled={loading}>
						Continue
					</button>
				</div>
			</form>
		</div>
	);
};

export default Plan;
