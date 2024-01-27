'use client'; // <===== REQUIRED

import React, { useRef } from 'react';
import { useState, useEffect, Fragment } from 'react';
import Filter from './filter';
import { useRouter } from 'next/navigation';
import ItemDetails from './itemDetails';
import { useSelector, useDispatch } from 'react-redux';
import { getAllModels } from '@/services/tinder.service';
import {
	ErrorMessage,
	SuccessMessage,
} from '@/components/layout/ToastifyMessages';
import { removeUser } from '@/redux/slice/user';
import Loading from '../layout/Loading';
import { Transition } from '@headlessui/react';

import EffectTinder from './effect-tinder.esm.js';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { addFavorite } from '@/services/favorite.service';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Tinder = ({ categoriesList }: any) => {
	const swiperRef = useRef<any>(null);
	const [userData, setUserData] = useState<any | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const messageTitle = 'Profile View';
	const [modelDetails, setModelDetails] = useState<any | null>(null);
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { replace } = useRouter();
	const [filterCategory, setFilterCategory] = useState<any | []>([]);
	const checkType_ = useRef<HTMLInputElement>(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [previousSlide, setPreviousSlide] = useState(0);
	const [modelId, setModelId] = useState('');
	const [previousClicked, setPreviousClicked] = useState(false);

	const getAllModelsDetails = async (filterCategory_: []) => {
		setLoading(true);
		const paramPass = filterCategory_.length > 0 ? filterCategory_.join() : '';
		const { data, error } = await getAllModels(paramPass);
		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		setModelDetails((data as { data: any })['data']);
		setLoading(false);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getAllModelsDetails(filterCategory);
		setUserData(user);
	}, []);

	function openModal() {
		setIsOpen(true);
	}
	const handleError = (error: any) => {
		if (error.response?.status === 401) {
			dispatch(removeUser());
			replace('/login');
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

	const addToFavorite = async (id: string, status: string) => {
		setLoading(true);
		const request = {
			userId: user?._id,
			modelId: id,
			status: status,
		};
		const { data, error } = await addFavorite(request);

		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		if (typeof data === 'object' && data !== null && 'data' in data) {
			if (data.status) {
				if (status === 'accepted') {
					SuccessMessage(messageTitle, 'Model added to your favorite list');
				} else {
					SuccessMessage(messageTitle, 'Model rejected');
				}
				// getAllModelsDetails(filterCategory);
			}
		}
		setLoading(false);
	};
	const goToSlide = (index: number) => {
		// setPreviousClicked(true);
		checkType_.current!.value = 'previous';
		swiperRef.current?.slideTo(index);
	};
	console.log(previousSlide, 'previousSlide');
	console.log(currentSlide, 'currentSlide');
	console.log(modelId, 'modelId');
	return (
		<div className="Tinder max-w-7xl mx-auto mt-10 md:mt-10 mb-10">
			<div className="md:text-5xl  text-111 flex items-center mb-2 justify-between px-5 ">
				<div className="md:text-3xl text-base mb-5">
					Hello
					<h2 className="text-2xl font-PoppinsSemiBold">{userData?.userName}</h2>
				</div>
				<button
					type="button"
					onClick={openModal}
					className="bg-d9d9d9 px-5 py-2 text-lg text-2f2f2f font-PoppinsRegular rounded-md hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
					Apply Filters
				</button>
			</div>
			<Filter
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				categoriesList={categoriesList}
				filterCategory={filterCategory}
				setFilterCategory={setFilterCategory}
				getAllModelsDetails={getAllModelsDetails}
			/>
			<Transition
				appear
				show={loading}
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-99"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-99">
				<div className="fixed inset-0 bg-gray-100/50 z-50">
					<Loading
						width={50}
						height={50}
						className="flex absolute justify-center w-96
					z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
					/>
				</div>
			</Transition>
			<input
				type="hidden"
				id="checkType"
				className="border border-black"
				ref={checkType_}
			/>
			<button
				className="bg-gray-500 text-white hidden"
				onClick={() => {
					goToSlide(previousSlide);
				}}>
				previousSlide
			</button>
			<Swiper
				effect="tinder"
				modules={[EffectTinder, Autoplay, Navigation, Pagination]}
				className="rounded-xl  w-[382px] h-full  shadow-2xl border-gray-900"
				onSlideChange={(swiper) => {
					setCurrentSlide(swiper.activeIndex);
					setPreviousSlide(swiper.previousIndex);
					const modelId_ = swiper.slides[swiper.previousIndex].id;
					setModelId(modelId_);
					// console.log(previousClicked, 'previousClicked');
					// console.log(checkType_.current!.value, 'checkType_.current!.value');
					if (checkType_.current!.value === 'yes') {
						addToFavorite(modelId_, 'accepted');
					} else if (checkType_.current!.value === 'no') {
						addToFavorite(modelId_, 'rejected');
					}
				}}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				grabCursor={true}>
				{modelDetails?.map((model: any, index: number) => (
					<SwiperSlide
						key={index}
						className="border-[10px] border-white jaydip"
						id={model?._id}>
						<ItemDetails
							model={model}
							loading={loading}
							setLoading={setLoading}
							filterCategory={filterCategory}
							getAllModelsDetails={getAllModelsDetails}
						/>
					</SwiperSlide>
				))}
				<SwiperSlide className="aspect-[5/9] flex justify-center items-center h-full w-full">
					<h1 className="text-3xl text-gray-700 w-full text-center">
						No more models
					</h1>
				</SwiperSlide>
				<div className="bg-gradient-to-b from-transparent via-black/70 to-black  absolute flex bottom-5 left-2 right-2 h-28 z-50 rounded-r-xl rounded-l-xl">
					<button
						className="swiper-tinder-button swiper-tinder-button-no"
						onClick={() => {
							if (checkType_) {
								// set the value of the input field
								checkType_.current!.value = 'no';
								// addToFavorite(modelId, 'rejected');
							}
						}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="48"
							viewBox="0 -960 960 960"
							width="48">
							<path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
						</svg>
					</button>

					<button
						className="swiper-tinder-button swiper-tinder-button-yes"
						onClick={() => {
							if (checkType_) {
								// set the value of the input field
								checkType_.current!.value = 'yes';
								// addToFavorite(modelId, 'accepted');
							}
						}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="48"
							viewBox="0 -960 960 960"
							width="48">
							<path d="m480-121-41-37q-106-97-175-167.5t-110-126Q113-507 96.5-552T80-643q0-90 60.5-150.5T290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.5T880-643q0 46-16.5 91T806-451.5q-41 55.5-110 126T521-158l-41 37Z" />
						</svg>
					</button>
				</div>
			</Swiper>

			{/* <button className="swiper-tinder-button-undo">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="48"
							viewBox="0 -960 960 960"
							width="48">
							<path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
						</svg>
					</button> */}
			{/* <swiper {...settings} className=" max-w-md "> */}
			{/* {modelDetails?.map((model: any, index: number) => (
						<ItemDetails
							model={model}
							key={index}
							loading={loading}
							setLoading={setLoading}
							filterCategory={filterCategory}
							getAllModelsDetails={getAllModelsDetails}
						/>
					))} */}
			{/* </Swiper> */}
			{/* <div className="text-lg mb-10 space-y-4">
        <p>
          Welcome to a world of limitless discovery and a unique search function
          like you{"'"}ve never experienced before! We offer you a search that
          is not only unique and exclusive, but also introduces you to creators
          of all imaginable platforms. Immerse yourself in our search function
          and find exactly what you{"'"}ve always been looking for!
        </p>

        <p>
          Our search function is more than just a simple way to find creators.
          It{"'"}s a gateway to a world of creativity and inspiration. Here you
          can find creators from different platforms - be it OnlyFans, Fansly or
          others. Our search is the perfect link between you and creators,
          opening the doors to an infinite variety of content and ideas.
        </p>

        <p>
          What makes our search function so unique is not only its ability to
          unite creators from different platforms, but also the ability to
          discover new favorite creators and save them as favorites. This means
          that not only can you discover great content, but you can also build a
          close connection with the creators that inspire you the most.
        </p>

        <p>
          We strive to create a community where you are not just a passive
          viewer, but can actively shape your interactive experience. Our unique
          search function is the tool that puts you in control of your
          discoveries and preferences.
        </p>

        <p>
          Here you will be surprised by the sheer variety of creators. You will
          have the opportunity to find creators who share your preferences and
          inspire you. It{"'"}s a world where you can get lost, and at the same
          time a world where you will find yourself.
        </p>

        <p>
          So get ready for a journey into the world of unique searches. You will
          experience something very special when you use our unique search
          function to find and subscribe to your favorite creators!{" "}
        </p>
      </div> */}
			{/* </center> */}
		</div>
	);
};

export default Tinder;
