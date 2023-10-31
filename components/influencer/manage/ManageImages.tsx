'use client';
import React from 'react';
import Image from 'next/image';
import Upload from '@/assets/images/svg/upload.svg';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { modelPhotos, getUser } from '@/services/user.service';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const ManageImages = ({ user }: any) => {
	const [loading, setLoading] = useState(false);
	const [showHideSection, setShowHideSection] = useState(false);
	const [selectedPictures, setSelectedPictures] = useState(Array(1).fill(null));
	const [picturesPreviews, setPicturesPreviews] = useState(Array(1).fill(null));
	const [subscription, setSubscription] = useState<any>(null);
	const [planDetails, setPlanDetails] = useState<any>(null);
	const [firstLoad, setFirstLoad] = useState(true);
	const dispatch = useAppDispatch();
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		photos: Yup.array().of(Yup.mixed()).required('Pictures is required'),
		// .test('at-least-three-images', 'Select at least 3 images', (value) => {
		// 	return value.filter((image) => image !== null).length >= 3;
		// }),
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
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
		if (user) {
			setSubscription(user?.subscription);
			setPlanDetails(user?.subscription?.planId);
			if (user?.subscription?.planId?.max_pics) {
				setSelectedPictures(Array(user?.subscription?.planId?.max_pics).fill(null));
				setPicturesPreviews(Array(user?.subscription?.planId?.max_pics).fill(null));
			}
			const photosList = user.photos;
			if (photosList) {
				const previews = photosList.map((image: any) => (image ? image : null));
				setPicturesPreviews(previews);
			}
		}
	}, [user]);

	const updatePreview = (updatedImages: any) => {
		const previews = updatedImages.map(
			(image: Blob | MediaSource, index: string | number) => {
				if (image) {
					return URL.createObjectURL(image);
				}
				return user?.photos[index] ? user?.photos[index] : null;
			}
		);
		setPicturesPreviews(previews);
	};

	useEffect(() => {
		if (!firstLoad) {
			handleValidation();
		}
	}, [picturesPreviews]);

	const handleFileChange = async (
		event: { target: { files: any } },
		index: number
	) => {
		const files = event.target.files;
		const updatedImages = [...selectedPictures];
		updatedImages[index] = files[0];
		setSelectedPictures(updatedImages);
		setFirstLoad(false);
		updatePreview(updatedImages);
	};

	const handleValidation = async () => {
		const selectedCount = picturesPreviews.filter(
			(image) => image !== null
		).length;

		if (selectedCount < planDetails?.min_pics) {
			setError('photos', {
				type: 'at-least-three-images',
				message: `Select at least ${planDetails?.min_pics} images`,
			});
			return true;
		} else if (selectedCount > planDetails?.max_pics) {
			setError('photos', {
				type: 'too-many-images',
				message: `Select at most ${planDetails?.max_pics} images`,
			});
			return true;
		} else {
			clearErrors('photos');
		}
		// Check if images are selected from 1 to 5
		for (let i = 0; i < picturesPreviews.length; i++) {
			if (picturesPreviews[i] === null && i < selectedCount) {
				setError('photos', {
					type: 'missing-images',
					message: `Images must be selected from 1 to ${planDetails?.max_pics}`,
				});
				return true;
			}
		}
	};

	const removeSelectedPicture = async (index: number) => {
		const updatedImages = [...selectedPictures];
		const updatedPreviews = [...picturesPreviews];
		if (updatedImages[index] != null) {
			updatedImages[index] = null;
			updatedPreviews[index] = null;
			setSelectedPictures(updatedImages);
			setPicturesPreviews(updatedPreviews);
		} else {
			if (updatedImages[index] == null) {
				updatedPreviews[index] = null;
				setPicturesPreviews(updatedPreviews);
			} else {
				updatedImages[index] = null;
				setSelectedPictures(updatedImages);
			}
		}
		dispatch(updateUser({ ...user, photos: updatedPreviews }));
		setValue(`photos.${index}`, undefined);
	};

	async function onSubmit(formField: any) {
		// validate the selectedPictures have any image file if not than return and give message
		let countMin = 0;
		let flag = false;
		picturesPreviews.forEach((image, index) => {
			if (image != null) {
				countMin++;
			}
			if (selectedPictures[index] != null) {
				flag = true;
			}
		});

		if (
			countMin >= planDetails?.min_pics &&
			!flag &&
			user?.photos?.length == countMin
		) {
			SuccessMessage('Model Registration', 'Pictures saved successfully');
			return;
		}

		const validation = await handleValidation();
		if (validation) return;

		setLoading(true);
		const formData = new FormData();

		// Append each selected image to the FormData
		for (let i = 0; i < selectedPictures.length; i++) {
			if (selectedPictures[i] !== null) {
				formData.append(
					`photos[${i}]`,
					selectedPictures[i],
					selectedPictures[i].name
				);
			} else {
				formData.append(`photos[${i}]`, '');
			}
		}
		for (let i = 0; i < picturesPreviews.length; i++) {
			if (picturesPreviews[i] !== null) {
				// compare the images are from the user.photos
				if (picturesPreviews[i] == user.photos[i]) {
					formData.append(`photosExisting[${i}]`, picturesPreviews[i]);
				} else {
					formData.append(`photosExisting[${i}]`, 'new');
				}
			} else {
				formData.append(`photosExisting[${i}]`, '');
			}
		}
		formData.append('userId', user.userId);
		try {
			const { data, error } = await modelPhotos(formData);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				reset();
				SuccessMessage('Model Registration', 'Pictures saved successfully');
				dispatch(
					updateUser({
						...user,
						photos: data.data.photos,
					})
				);
				// push('/account/videos');
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
		<div className=" max-w-7xl px-5 mx-auto mt-10 mb-10 relative border-b border-gray-200 pb-4">
			<div className="flex justify-between">
				<h2 className="text-2xl font-PoppinsSemiBold text-111 mb-10">
					Manage My Images
				</h2>
				<div className="flex space-x-2">
					<div>
						<button
							className="btn btn-default px-4 py-1 mt-0 text-lg border border-black text-151515 bg-transparent rounded-md hover:border-151515 hover:text-gray-200 hover:bg-151515 transition-all duration-300 active:border-black flex"
							type="submit"
							form="ImageForm"
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
				className={`flex items-center space-x-7  ${
					showHideSection
						? 'hidden transition-all duration-300'
						: 'transition-all duration-300'
				}`}>
				<form
					id="ImageForm"
					name="ImageForm"
					onSubmit={handleSubmit(onSubmit)}
					className={`${loading ? 'opacity-25' : ''}`}
					encType="multipart/form-data">
					<div className="grid grid-cols-5 gap-6 my-6 mx-auto">
						{selectedPictures.map((_, index) => (
							<div key={index}>
								{!picturesPreviews[index] ? (
									<div className="w-full min-w-full">
										<label
											htmlFor={`ImageDropzone-file${index}`}
											className="flex flex-col items-center justify-center rounded-xl bg-[#f9f9f9] cursor-pointer hover:bg-[#eaeaea] active:bg-[#f9f9f9]  w-40 h-40">
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<Image src={Upload} alt="#" />
											</div>
										</label>
									</div>
								) : (
									picturesPreviews[index] && (
										<div className="flex flex-col items-end justify-center max-w-[283px] rounded-xl relative w-40 h-40">
											<button
												onClick={() => {
													removeSelectedPicture(index);
												}}
												type="button"
												className="top-1 px-2 font-PoppinsBold text-red-500 mr-1 rounded-md absolute bg-[#f9f9f9] cursor-pointer hover:bg-[#e1e1e1] active:bg-[#f9f9f9] ">
												X
											</button>
											<img
												className="rounded-md h-full w-full object-cover"
												src={picturesPreviews[index]}
												alt={`Preview ${index}`}
												onError={(e) => {
													e.currentTarget.src = '/upload.svg';
													e.currentTarget.style.padding = '2rem';
												}}
											/>
										</div>
									)
								)}
								<input
									id={`ImageDropzone-file${index}`}
									accept="image/*"
									type="file"
									className="hidden"
									{...register(`photos.${index}`, {
										onChange: (e) => {
											handleFileChange(e, index);
										},
									})}
								/>
							</div>
						))}
					</div>

					{errors.photos?.message && (
						<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.photos?.message}
						</div>
					)}
				</form>
				{/* <div className="flex items-center justify-center">
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center w-40 h-40 rounded-xl cursor-pointer bg-[#f9f9f9] hover:bg-gray-100">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Image src={Upload} alt="#" />
						</div>
						<input id="dropzone-file" type="file" className="hidden" />
					</label>
				</div> */}
			</div>
		</div>
	);
};

export default ManageImages;
