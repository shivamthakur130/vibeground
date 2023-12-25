import Image from 'next/image';
import Post1 from '@/assets/images/Jessica.png';
import Back from '@/assets/images/svg/backa.svg';
import Close from '@/assets/images/svg/close-x.svg';
import Heart from '@/assets/images/svg/heart-wbg.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addFavorite } from '@/services/favorite.service';
import {
	ErrorMessage,
	SuccessMessage,
} from '@/components/layout/ToastifyMessages';
import { removeUser } from '@/redux/slice/user';
import { useDispatch } from 'react-redux';

const ItemDetails = ({ model, setLoading }: any) => {
	const messageTitle = 'Favorite';
	const dispatch = useDispatch();

	const { replace } = useRouter();

	const openDetails = (id: any) => {
		replace('/experience/tinder/' + id);
	};
	const getAge = (date: string) => {
		const today = new Date();
		const birthDate = new Date(date);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	const addToFavorite = async (id: string) => {
		setLoading(true);
		const request = {
			userId: '655a554a09facc7a369559a0',
			modelId: id,
		};
		const { data, error } = await addFavorite(request);

		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		if (typeof data === 'object' && data !== null && 'data' in data) {
			if (data.status) {
				SuccessMessage(messageTitle, 'Model added to your favorite list');
			}
		}
		setLoading(false);
	};

	const handleError = (error: any) => {
		if (
			error.response?.status === 401 ||
			error?.response?.data?.message === 'Unauthorized'
		) {
			dispatch(removeUser());
			replace('/login');
		}
		if (error.response) {
			const message = error.response.data.message;
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
		<div className="shadow-2xl rounded-[20px] ">
			<div className="relative rounded-[20px] overflow-hidden bg-white">
				{model?.photos?.length > 0 ? (
					<img
						src={model?.photos[0]}
						className="w-full h-[398px] min-w-[200px] sm:h-auto"
						alt="#"
					/>
				) : (
					<Image src={Post1} className="w-full h-[398px]" alt="#" />
				)}
				<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%] ">
					<div className="mt-auto self-end w-full">
						<h3
							className="text-2xl text-left  text-white font-PoppinsSemiBold cursor-pointer"
							onClick={() => {
								openDetails(model?._id);
							}}>
							{model?.userName}, {getAge(model?.date_of_birth)}{' '}
						</h3>
						<div className="flex justify-between mt-3">
							<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
								{model?.city}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex item-center space-x-4 justify-center py-7">
				<a href="#">
					<Image src={Back} className="" alt="#" />
				</a>
				<a href="#">
					<Image src={Close} className="" alt="#" />
				</a>
				<a href="#">
					<Image
						src={Heart}
						className=""
						alt="#"
						onClick={() => {
							addToFavorite(model?._id);
						}}
					/>
				</a>
			</div>
		</div>
	);
};

export default ItemDetails;
