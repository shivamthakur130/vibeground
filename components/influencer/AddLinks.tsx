'use client';
import React from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { modelLinks, getUser } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const AddLinks = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const [links, setLinks] = useState(['']);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		links: Yup.array().of(Yup.string().url().required('Link is required')),
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

	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, error } = await getUser();
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				const linksList = data?.data?.links;
				dispatch(
					updateUser({
						...user,
						links: linksList,
					})
				);
				if (linksList.length > 0) {
					setLinks(linksList);
					setValue('links', linksList);
				}
			}
			setLoading(false);
		})();
	}, []);
	const addLink = () => {
		setLinks([...links, '']);
	};
	async function onSubmit(formField: any) {
		console.log(formField, 'formField');
		setLoading(true);
		formField.userId = user.userId;
		try {
			const { data, error } = await modelLinks(formField);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				reset();
				SuccessMessage('Model Registration', 'Links saved successfully');
				dispatch(
					updateUser({
						...user,
						links: data.data.links,
					})
				);
				push('/account/categories');
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
	const removeLink = (index: number) => {
		const updatedLinks = [...links];
		updatedLinks.splice(index, 1);
		setLinks(updatedLinks);
	};
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
		<div className="Email max-w-2xl mx-auto mt-10 mb-20 text-center">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-7">Add my links</h2>
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
				<div>
					{links.length < 5 && (
						<div className="flex justify-end mx-auto max-w-lg ">
							<button
								type="button"
								className="btn btn-default px-2 hover:bg-151515 hover:text-white py-2 text-sm text-white border rounded-[8px] transition-all duration-300 active:bg-303030 border-black bg-303030"
								onClick={addLink}>
								Add +
							</button>
						</div>
					)}

					<div className="">
						{links.map((link, index) => (
							<div
								key={index}
								className="flex space-x-3 my-2 transition-all duration-300 p-2 py-4 rounded-md mx-auto max-w-lg bg-gray-100 m-2 px-4 text-center">
								<div>
									<button className="btn btn-default px-4 mt-1 text-black py-2 text-sm border rounded-[19px] transition-all duration-300  border-black">
										{index + 1}
									</button>
								</div>
								<div className="w-full">
									<input
										className="border border-black text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-2 px-4 "
										placeholder="Enter Link"
										type="url"
										value={link}
										{...register(`links.${index}`, {
											value: link,
											onChange: (e) => {
												setValue(`links.${index}`, e.target.value);
												clearErrors(`links.${index}`);
												const updatedLinks = [...links];
												updatedLinks[index] = e.target.value;
												setLinks(updatedLinks);
											},
										})}
									/>
									{errors.links?.[index]?.message && (
										<div className="text-red-600 h-5 mt-2 text-sm font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
											{errors.links?.[index]?.message}
										</div>
									)}
								</div>
								<div>
									<button
										type="button"
										onClick={() => removeLink(index)}
										className="px-4 py-2 font-PoppinsBold text-red-500  rounded-2xl shadow-sm bg-gray-200 cursor-pointer hover:bg-[#e1e1e1] active:bg-[#f9f9f9]">
										X
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* <Link href="/influencer/categories"> */}
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

export default AddLinks;
