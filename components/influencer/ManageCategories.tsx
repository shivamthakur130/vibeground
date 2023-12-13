'use client';
import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { modelCategories, getUser } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const categoryList = [
	'All natural',
	'An*l',
	'Asian',
	'ASMR',
	'BDSM',
	'Behind The Scenes',
	'Big Bo*ty',
	'Bis*xual',
	'Black',
	'Blonde',
	'Blowj*b',
	'Bond*ge',
	'Boy/Girl',
	'Brunette',
	'Cosplay',
	'Cre*mpie',
	'C*mshot',
	'Curvy',
	'De*pthroath',
	'D*ckrating',
	'Face Sitt*ng',
	'F*cial',
	'Feet',
	'Fetish',
	'G*ngb*ng',
	'Gay',
	'German',
	'Girl/Girl',
	'H*rdcore',
	'Hentai',
	'High Heels',
	'Latex',
	'Latina',
	'Massage',
	'M*sturbating',
	'M*lf',
	'Piercing',
	'Pool',
	'POV',
	'Public',
	'Redhead',
	'Roleplay',
	'R*ugh S*x',
	'Russian',
	'S*x',
	'Sq*irting',
	'Student',
	'Thai',
	'Threes*me',
	'Toy',
	'TS',
	'Twerking',
	'Videocall',
];

const ManageCategories = ({ user, showHide }: any) => {
	const [loading, setLoading] = useState(false);
	const [showHideSection, setShowHideSection] = useState(showHide);
	const dispatch = useAppDispatch();
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
			ErrorMessage('Model Profile', 'Please select at least 5 categories');
			return;
		}
		if (selectedCategories.length > 20) {
			ErrorMessage('Model Profile', 'Please select at most 20 categories');
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
				SuccessMessage('Model Profile', 'Categories saved successfully');
				dispatch(
					updateUser({
						...user,
						categories: selectedCategories,
					})
				);
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
			ErrorMessage(
				'Model Profile',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	return (
		<div className=" max-w-7xl px-5 mx-auto mt-16 mb-10 relative border-b border-gray-200 pb-5">
			<div className="flex justify-between">
				<h2 className="text-2xl font-PoppinsSemiBold text-111 mb-10">
					what suits you
				</h2>
				<div className="flex space-x-2">
					<div>
						<button
							className="btn btn-default px-4 py-1 mt-0 text-lg border border-black text-151515 bg-transparent rounded-md hover:border-gray-800 hover:text-gray-200 hover:bg-gray-800 transition-all duration-300 active:border-black flex"
							type="submit"
							form="CategoriesForm"
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
			<form
				id="CategoriesForm"
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
			</form>
		</div>
	);
};

export default ManageCategories;
