'use client';
import React from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { modelCategories, getUser } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

//  convert above list into const attribute list
const categoryList = [
	'All natural',
	'Anal',
	'Asian',
	'ASMR',
	'BBW',
	'BDSM',
	'Behind The Scences',
	'Big tits',
	'Big Booty',
	'Bisexual',
	'Black',
	'Blonde',
	'Blowjob',
	'Bondage',
	'Boy/Girl',
	'Brunette',
	'Cosplay',
	'Creampie',
	'Cuckolding',
	'Cumshot',
	'Curvy',
	'Deepthroat',
	'Dickrating',
	'Ebony',
	'Facial',
	'Fart',
	'Feet',
	'Fetish',
	'Gangbang',
	'Gay',
	'German',
	'Girl/Girl',
	'Hairy',
	'Hardcore',
	'Hentai',
	'Latex',
	'Latina',
	'Massage',
	'Masturbating',
	'Milf',
	'Pool',
	'POV',
	'Public',
	'Redhead',
	'Rough Sex',
	'Russian',
	'Sex',
	'Squirting',
	'Student',
	'Tattoo',
	'Thai',
	'Threesome',
	'Toy',
	'TS',
	'Twerking',
	'Videocall',
];

const Categories = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const { push } = useRouter();
	// form validation rules
	const validationSchema = Yup.object().shape({
		categories: Yup.array().of(Yup.string()),
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
	// write function to update the category selected list when user select the category
	const handleCategory = (e: any) => {
		const { checked, value } = e.target;
		if (checked) {
			setSelectedCategories([...selectedCategories, value]);
		} else {
			const newList = selectedCategories.filter((item) => item !== value);
			setSelectedCategories(newList);
		}
	};

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
				const categoriesList = data?.data?.categories;
				dispatch(
					updateUser({
						...user,
						categories: categoriesList,
					})
				);
				if (categoriesList.length > 0) {
					setSelectedCategories(categoriesList);
				}
			}
			setLoading(false);
		})();
	}, []);

	async function onSubmit(formField: any) {
		if (selectedCategories.length < 5) {
			ErrorMessage('Model Registration', 'Please select at least 5 categories');
			return;
		}
		if (selectedCategories.length > 20) {
			ErrorMessage('Model Registration', 'Please select at most 20 categories');
			return;
		}

		setLoading(true);

		try {
			const { data, error } = await modelCategories({
				userId: user.userId,
				categories: selectedCategories,
			});
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				SuccessMessage('Model Registration', 'Categories saved successfully');
				dispatch(
					updateUser({
						...user,
						links: data.data.links,
					})
				);
				push('/influencer');
			} else {
				ErrorMessage('Model Registration', 'Something went wrong');
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

	return (
		<div className="Email text-center max-w-7xl mx-auto mt-20 mb-20">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Choose what suits you
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
				className={`${loading ? 'opacity-25' : ''}`}>
				<ul className="flex gap-4 flex-wrap">
					{categoryList.map((category, index) => (
						<li key={index}>
							<input
								type="checkbox"
								checked={selectedCategories.includes(category)}
								id={`opt${index}`}
								value={category}
								className="hidden peer"
								{...register(`categories.${index}`, {
									onChange: (e) => {
										handleCategory(e);
									},
								})}
							/>
							<label
								htmlFor={`opt${index}`}
								className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-4 px-12 peer-checked:bg-[#010101] peer-checked:text-white text-111">
								<div className="w-full text-15px  peer-checked:text-white">
									{category}
								</div>
							</label>
						</li>
					))}
				</ul>
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
					Continue
				</button>
			</form>
		</div>
	);
};

export default Categories;
