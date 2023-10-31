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
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const Pictures = () => {
	const [loading, setLoading] = useState(false);
	const [selectedPictures, setSelectedPictures] = useState(Array(1).fill(null));
	const [picturesPreviews, setPicturesPreviews] = useState(Array(1).fill(null));
	const [subscription, setSubscription] = useState<any>(null);
	const [planDetails, setPlanDetails] = useState<any>(null);
	const [firstLoad, setFirstLoad] = useState(true);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
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

	// const userPhotoAssign = async (user: any) => {
	// 	setLoading(true);
	// 	const { data, error } = await getUser();
	// 	if (error) {
	// 		setLoading(false);
	// 		handleError(error);
	// 		return;
	// 	}
	// 	if (typeof data === 'object' && data !== null && 'data' in data) {
	// 	const photosList = user.photos;
	// 	dispatch(
	// 		updateUser({
	// 			...user,
	// 			...data?.data,
	// 		})
	// 	);
	// 	if (photosList) {
	// 		const previews = photosList.map((image: any) => (image ? image : null));
	// 		setPicturesPreviews(previews);
	// 	}
	// 	}
	// 	setLoading(false);
	// };

	// useEffect(() => {
	// userPhotoAssign(user);
	// const previews = selectedPictures.map((image, index) => {
	// 	if (image) {
	// 		return URL.createObjectURL(image);
	// 	}
	// 	if (user?.photos) {
	// 		return user?.photos[index] ? user?.photos[index] : null;
	// 	}
	// 	return null;
	// });
	// if (!firstLoad) {
	// 	setPicturesPreviews(previews);
	// 	handleValidation();
	// }
	// }, []);

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
			push('/account/videos');
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
				push('/account/videos');
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
		<div className="Email max-w-5xl mx-auto mt-20 mb-20 relative text-center">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Upload Your Pictures
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
				className={`${loading ? 'opacity-25' : ''}`}
				encType="multipart/form-data">
				<div className="grid grid-cols-5 gap-6 my-6 mx-auto">
					{selectedPictures.map((_, index) => (
						<div key={index}>
							{!picturesPreviews[index] ? (
								<div className="w-full min-w-full">
									<label
										htmlFor={`dropzone-file${index}`}
										className="flex flex-col items-center justify-center w-full h-52 rounded-xl bg-[#f9f9f9] cursor-pointer hover:bg-[#eaeaea] active:bg-[#f9f9f9]">
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
											<Image src={Upload} alt="#" />
										</div>
									</label>
								</div>
							) : (
								picturesPreviews[index] && (
									<div className="flex flex-col items-end justify-center max-w-[283px] h-52 rounded-xl relative">
										<button
											onClick={() => {
												removeSelectedPicture(index);
											}}
											type="button"
											className="top-1 px-2 font-PoppinsBold text-red-500 mr-1 rounded-md absolute bg-[#f9f9f9] cursor-pointer hover:bg-[#e1e1e1] active:bg-[#f9f9f9]">
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
								id={`dropzone-file${index}`}
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

				<button
					className="btn btn-default px-24 py-4 mt-14 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
					type="submit"
					disabled={loading}>
					Continue
				</button>
			</form>
		</div>
	);
};

export default Pictures;
