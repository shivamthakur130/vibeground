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
import { modelVideos, getUser } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import PageWrapper from '../common/PageWrapper';

const Videos = () => {
	const user = useSelector((state: any) => state.userReducer.user);
	const [loading, setLoading] = useState(false);
	const [selectedVideos, setSelectedVideos] = useState(Array(1).fill(null));
	const [videosPreviews, setVideosPreviews] = useState(Array(1).fill(null));
	const [firstLoad, setFirstLoad] = useState(true);
	const dispatch = useAppDispatch();
	const { push } = useRouter();
	const [subscription, setSubscription] = useState<any>(null);
	const [planDetails, setPlanDetails] = useState<any>(null);
	//Video size idea can try put 25 mb size
	const MAX_FILE_SIZE = 100000000; //25000000KB

	// form validation rules
	const validationSchema = Yup.object().shape({
		videos: Yup.array().of(Yup.mixed()),
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
		if (user) {
			setSubscription(user?.subscription);
			setPlanDetails(user?.subscription?.planId);
			if (user?.subscription?.planId?.max_videos) {
				setSelectedVideos(Array(user?.subscription?.planId?.max_videos).fill(null));
				setVideosPreviews(Array(user?.subscription?.planId?.max_videos).fill(null));
			}
			const videosList = user?.videos;
			if (videosList) {
				const previews = videosList.map((video: any) => (video ? video : null));
				setVideosPreviews(previews);
			}
		}
	}, [user]);

	const updatePreview = (updatedImages: any) => {
		const previews = updatedImages.map(
			(image: Blob | MediaSource, index: string | number) => {
				if (image) {
					return URL.createObjectURL(image);
				}
				return user?.videos[index] ? user?.videos[index] : null;
			}
		);
		setVideosPreviews(previews);
	};

	useEffect(() => {
		if (!firstLoad) {
			handleValidation();
		}
	}, [videosPreviews]);

	const handleFileChange = async (
		event: { target: { files: any } },
		index: number
	) => {
		const files = event.target.files;
		// validate file size should be max 25 mb
		if (files[0].size > MAX_FILE_SIZE) {
			setError('videos', {
				type: 'file-size',
				message: 'File Size is too large (Max 100 MB)',
			});
			setValue(`videos.${index}`, undefined);
			return;
		}
		const updatedVideos = [...selectedVideos];
		updatedVideos[index] = files[0];
		setSelectedVideos(updatedVideos);
		setFirstLoad(false);
		updatePreview(updatedVideos);
	};

	const handleValidation = async () => {
		const selectedCount = videosPreviews.filter((video) => video !== null).length;

		if (selectedCount < planDetails.min_videos) {
			setError('videos', {
				type: 'at-least-three-videos',
				message: `Select at least ${planDetails.min_videos} videos to continue`,
			});
			return true;
		} else if (selectedCount > planDetails.max_videos) {
			setError('videos', {
				type: 'too-many-videos',
				message: `Select at most ${planDetails.max_videos} videos to continue`,
			});
			return true;
		} else {
			clearErrors('videos');
		}

		// Check if videos are selected from 1 to 5
		for (let i = 0; i < videosPreviews.length; i++) {
			if (videosPreviews[i] === null && i < selectedCount) {
				setError('videos', {
					type: 'missing-videos',
					message: `Videos must be selected from 1 to ${planDetails.max_videos}`,
				});
				return true;
				break;
			}
		}
	};

	const removeSelectedVideo = async (index: number) => {
		const updatedVideos = [...selectedVideos];
		const updatedPreviews = [...videosPreviews];
		if (updatedVideos[index] == null) {
			updatedPreviews[index] = null;
			setVideosPreviews(updatedPreviews);
		} else {
			updatedVideos[index] = null;
			setSelectedVideos(updatedVideos);
		}
		setValue(`videos.${index}`, undefined);
	};

	async function onSubmit(formField: any) {
		// let countMin = 0;
		// picturesPreviews.forEach((image, index) => {
		// 	if (image != null && selectedPictures[index] == null) {
		// 		countMin++;
		// 	}
		// });

		// if (countMin >= planDetails?.min_pics) {
		// 	push('/account/videos');
		// 	return;
		// }

		let countMin = 0;
		let flag = false;
		videosPreviews.forEach((video, index) => {
			if (video != null && selectedVideos[index] == null) {
				countMin++;
			}
			if (selectedVideos[index] !== null) {
				flag = true;
			}
		});

		if (
			countMin >= planDetails?.min_videos &&
			!flag &&
			user?.videos?.length == countMin
		) {
			push('/account/add-links');
			return;
		}

		const validation = await handleValidation();
		if (validation) return;

		setLoading(true);
		const formData = new FormData();

		// Append each selected video to the FormData
		for (let i = 0; i < selectedVideos.length; i++) {
			if (selectedVideos[i] !== null) {
				formData.append(`videos[${i}]`, selectedVideos[i], selectedVideos[i].name);
			} else {
				formData.append(`videos[${i}]`, '');
			}
		}
		for (let i = 0; i < videosPreviews.length; i++) {
			if (videosPreviews[i] !== null) {
				// compare the videos are from the user.videos
				if (videosPreviews[i] == user.videos[i]) {
					formData.append(`videosExisting[${i}]`, videosPreviews[i]);
				} else {
					formData.append(`videosExisting[${i}]`, 'new');
				}
			} else {
				formData.append(`videosExisting[${i}]`, '');
			}
		}
		formData.append('userId', user.userId);
		try {
			const { data, error } = await modelVideos(formData);
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				reset();
				SuccessMessage('Model Registration', 'Videos saved successfully');
				dispatch(
					updateUser({
						...user,
						videos: data.data.videos,
					})
				);
				push('/account/add-links');
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
		<PageWrapper>
			<div className="Email text-center  max-w-7xl  mx-auto  mt-20 mb-20 relative px-4">
				<p className="md:text-xl text-xs text-888 mb-5">
					Let`s complete your profile
				</p>
				<div className="mb-16">
					<div className="md:text-5xl text-3xl font-PoppinsBold text-111 mb-3">
						Upload your videos
					</div>
					<span className="text-888">Each videos should be maximum size 100MB.</span>
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
					className={`${loading ? 'opacity-25' : ''}`}
					encType="multipart/form-data">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-6 mx-auto">
						{selectedVideos.map((item, index) => (
							<div key={index}>
								{videosPreviews[index] == null && !item ? (
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
									videosPreviews[index] && (
										<div className="flex flex-col items-end justify-center bg-gray-100 max-w-[283px] h-52 rounded-xl relative">
											<button
												onClick={() => {
													removeSelectedVideo(index);
												}}
												type="button"
												className="top-1 px-2 font-PoppinsBold text-red-500 mr-1 rounded-lg absolute z-50 bg-[#f9f9f9] cursor-pointer hover:bg-[#e1e1e1] active:bg-[#f9f9f9]">
												X
											</button>
											<video
												controls
												className="rounded-md h-full w-full object-cover"
												src={videosPreviews[index]}
												onError={(e) => {
													e.currentTarget.src = '/upload.svg';
													e.currentTarget.style.padding = '2rem';
												}}>
												Your browser does not support the video tag.
											</video>
											{/* <img src={} alt={`Preview ${index}`} /> */}
										</div>
									)
								)}
								<input
									id={`dropzone-file${index}`}
									accept="video/*"
									type="file"
									className="hidden"
									{...register(`videos.${index}`, {
										onChange: (e) => {
											handleFileChange(e, index);
										},
									})}
								/>
							</div>
						))}
					</div>

					{errors.videos?.message && (
						<div className="text-red-600 h-5 mt-3 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.videos?.message}
						</div>
					)}
					<button
						className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
						type="submit"
						disabled={loading}>
						Continue
					</button>
				</form>
			</div>
		</PageWrapper>
	);
};

export default Videos;
