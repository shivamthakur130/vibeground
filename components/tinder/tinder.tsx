'use client';
import { useState, useEffect, Fragment } from 'react';
import Filter from './filter';
import { useRouter } from 'next/navigation';
import ItemDetails from './itemDetails';
import { useSelector, useDispatch } from 'react-redux';
import { getAllModels } from '@/services/tinder.service';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import { removeUser } from '@/redux/slice/user';
import Loading from '../layout/Loading';
import { Transition } from '@headlessui/react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const settings = {
	dots: false,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: false,
	speed: 500,
	swipeToSlide: true,
	arrows: false,
};

const Tinder = ({ categoriesList }: any) => {
	const [userData, setUserData] = useState<any | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const messageTitle = 'Profile View';
	const [modelDetails, setModelDetails] = useState<any | null>(null);
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { replace } = useRouter();
	const [filterCategory, setFilterCategory] = useState<any | []>([]);

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
	return (
		<div className="Tinder max-w-7xl px-5 mx-auto mt-10 md:mt-10 mb-10">
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
			<div className="md:text-5xl  text-111 flex items-center mb-10 justify-between">
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
			<center>
				<Slider {...settings} className=" max-w-md ">
					{modelDetails?.map((model: any, index: number) => (
						<ItemDetails
							model={model}
							key={index}
							loading={loading}
							setLoading={setLoading}
							filterCategory={filterCategory}
							getAllModelsDetails={getAllModelsDetails}
						/>
					))}
				</Slider>
			</center>
		</div>
	);
};

export default Tinder;
