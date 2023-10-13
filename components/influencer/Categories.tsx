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
import Loading from '@/components/common/Loading';
import { SuccessMessage, ErrorMessage } from '@/components/common/Toastify';

const categoryList = [
	{
		id: 1,
		name: 'Fun',
	},
	{
		id: 2,
		name: 'Muscular',
	},
	{
		id: 3,
		name: 'Smart',
	},
	{
		id: 4,
		name: 'Beautiful',
	},
	{
		id: 5,
		name: 'Cute',
	},
	{
		id: 6,
		name: 'Skinny',
	},
	{
		id: 7,
		name: 'Lipstick',
	},
	{
		id: 8,
		name: 'Glasses',
	},
	{
		id: 9,
		name: 'Shine',
	},
	{
		id: 10,
		name: 'Entertainment',
	},
	{
		id: 11,
		name: 'Trends',
	},
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
				push('/influencer/experience');
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
			// Something else happened while setting up the request
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
				Select your categories
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
						<li key={category.id}>
							<input
								type="checkbox"
								checked={selectedCategories.includes(category.name)}
								id={`opt${category.id}`}
								value={category.name}
								className="hidden peer"
								{...register(`categories.${index}`, {
									onChange: (e) => {
										handleCategory(e);
									},
								})}
							/>
							<label
								htmlFor={`opt${category.id}`}
								className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-4 px-12 peer-checked:bg-[#010101] peer-checked:text-white text-111">
								<div className="w-full text-15px  peer-checked:text-white">
									{category.name}
								</div>
							</label>
						</li>
					))}
					<div>
						{/*<li>
					<input type="checkbox" id="op3" value="" className="hidden peer" />
					<label
						htmlFor="op3"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input
						type="checkbox"
						id="opt4"
						value=""
						className="hidden peer"
						required
					/>
					<label
						htmlFor="opt4"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt5" value="" className="hidden peer" />
					<label
						htmlFor="opt5"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt6" value="" className="hidden peer" />
					<label
						htmlFor="opt6"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt7" value="" className="hidden peer" />
					<label
						htmlFor="opt7"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt8" value="" className="hidden peer" />
					<label
						htmlFor="opt8"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt9" value="" className="hidden peer" />
					<label
						htmlFor="opt9"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input
						type="checkbox"
						id="opt10"
						value=""
						className="hidden peer"
						required
					/>
					<label
						htmlFor="opt10"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt11" value="" className="hidden peer" />
					<label
						htmlFor="opt11"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Trends</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt12" value="" className="hidden peer" />
					<label
						htmlFor="opt12"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input
						type="checkbox"
						id="opt13"
						value=""
						className="hidden peer"
						required
					/>
					<label
						htmlFor="opt13"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt14" value="" className="hidden peer" />
					<label
						htmlFor="opt14"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Trends</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt15" value="" className="hidden peer" />
					<label
						htmlFor="opt15"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li> */}
					</div>
				</ul>
				{/* <Link href="/influencer/categories"> */}
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
					Continue
				</button>
			</form>
			{/* </Link> */}
		</div>
	);
};

export default Categories;
