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
import Loading from '@/components/common/Loading';
import { SuccessMessage, ErrorMessage } from '@/components/common/Toastify';

const Videos = () => {
	const [loading, setLoading] = useState(false);
	const [selectedVideos, setSelectedVideos] = useState(Array(5).fill(null));
	const [videosPreviews, setVideosPreviews] = useState(Array(5).fill(null));
	const [firstLoad, setFirstLoad] = useState(true);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		videos: Yup.array()
			.of(Yup.mixed())
			.required('Video is required')
			.test('at-least-three-videos', 'Select at least 3 videos', (value) => {
				return value.filter((video) => video !== null).length >= 3;
			}),
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
			console.log(data, 'data');
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				const videosList = data?.data?.videos;
				dispatch(
					updateUser({
						...user,
						videos: videosList,
					})
				);
				if (videosList) {
					const previews = videosList.map((video: any) => (video ? video : null));
					setVideosPreviews(previews);
				}
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		const previews = selectedVideos.map((video, index) => {
			if (video) {
				return URL.createObjectURL(video);
			}
			return user?.videos[index] ? user?.videos[index] : null;
		});
		if (!firstLoad) {
			setVideosPreviews(previews);
			handleValidation();
		}
	}, [selectedVideos]);

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
		const updatedVideos = [...selectedVideos];
		updatedVideos[index] = files[0];
		setSelectedVideos(updatedVideos);
		setFirstLoad(false);
	};

	const handleValidation = async () => {
		const selectedCount = videosPreviews.filter((video) => video !== null).length;

		if (selectedCount < 3) {
			setError('videos', {
				type: 'at-least-three-videos',
				message: 'Select at least 3 videos',
			});
			return true;
		} else if (selectedCount > 5) {
			setError('videos', {
				type: 'too-many-videos',
				message: 'Select a maximum of 5 videos',
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
					message: 'Videos must be selected from 1 to 5',
				});
				return true;
				break;
			}
		}
	};

	const removeSelectedPicture = async (index: number) => {
		const updatedVideos = [...selectedVideos];
		const updatedPreviews = [...videosPreviews];
		if (updatedVideos[index] == null) {
			updatedPreviews[index] = null;
			setVideosPreviews(updatedPreviews);
		} else {
			updatedVideos[index] = null;
			setSelectedVideos(updatedVideos);
		}
	};

	async function onSubmit(formField: any) {
		// validate the selectedVideos have any video file if not than return and give message
		let isAnyVideo = false;
		selectedVideos.forEach((video) => {
			if (video != null) {
				isAnyVideo = true;
			}
		});
		if (!isAnyVideo) {
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
				console.log(data.data, 'data.data');
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
		<div className="Email text-center  max-w-7xl  mx-auto  mt-20 mb-20 relative ">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Upload Your Videos
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
				<div className="grid grid-cols-5 gap-6 my-6">
					{selectedVideos.map((_, index) => (
						<div key={index}>
							{!videosPreviews[index] ? (
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
												removeSelectedPicture(index);
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
				{/* <Link href="/influencer/addlinks"> */}
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

export default Videos;