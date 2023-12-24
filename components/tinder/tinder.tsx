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
};

const Tinder = () => {
	const userDetails = useSelector((state: any) => state.userReducer.user);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const messageTitle = 'Profile View';
	const [modelDetails, setModelDetails] = useState<any | null>(null);
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { replace } = useRouter();

	const getAllModelsDetails = async () => {
		setLoading(true);
		const { data, error } = await getAllModels();
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
		getAllModelsDetails();
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
		<div className="Tinder max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">
			<div className="md:text-5xl  text-111 flex items-center mb-10 justify-between">
				<div className="md:text-3xl text-base mb-5">
					{' '}
					Hello
					{/* <h2 className="text-2xl font-PoppinsSemiBold">{userDetails?.firstName}</h2> */}
				</div>
				<button
					type="button"
					onClick={openModal}
					className="bg-d9d9d9 px-5 py-2 text-lg text-2f2f2f font-PoppinsRegular rounded-md hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
					Apply Filters
				</button>
			</div>
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
			<Filter isOpen={isOpen} setIsOpen={setIsOpen} />
			<center>
				<Slider {...settings} className=" max-w-md ">
					{modelDetails?.map((model: any, index: number) => (
						<ItemDetails model={model} key={index} />
					))}
				</Slider>
			</center>
		</div>
	);
};

export default Tinder;
