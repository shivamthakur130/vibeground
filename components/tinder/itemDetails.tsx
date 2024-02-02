import Image from 'next/image';
import Post1 from '@/assets/images/Jessica.png';
import Close from '@/assets/images/svg/close-x.svg';
import Heart from '@/assets/images/svg/heart-wbg.svg';
import { useRouter } from 'next/navigation';
import { addFavorite } from '@/services/favorite.service';
import {
	ErrorMessage,
	SuccessMessage,
} from '@/components/layout/ToastifyMessages';
import { removeUser } from '@/redux/slice/user';
import { useDispatch, useSelector } from 'react-redux';

const ItemDetails = ({
	model,
	setLoading,
	getAllModelsDetails,
	filterCategory,
}: any) => {
	const messageTitle = 'Favorite';
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer.user);

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
		<div className="" id={model?._id}>
			<div
				className="relative rounded-xl overflow-hidden bg-slate-200 aspect-[5/9] cursor-pointer"
				onClick={() => {
					openDetails(model?._id);
				}}>
				{model?.photos?.length > 0 ? (
					<img
						onClick={() => {
							openDetails(model?._id);
						}}
						src={model?.photos[0]}
						className="aspect-[5/9] object-cover cursor-pointer"
						alt="#"
					/>
				) : (
					<Image
						onClick={() => {
							openDetails(model?._id);
						}}
						src={Post1}
						className="w-full aspect-[5/9] min-h-[250px] object-cover cursor-pointer"
						alt="#"
					/>
				)}
				<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[100%] ">
					<div className="mt-auto self-end w-full pb-16">
						<h3 className="text-2xl text-left  text-white font-PoppinsSemiBold cursor-pointer">
							{model?.userName}, {getAge(model?.date_of_birth)}{' '}
						</h3>
						<div className="flex justify-between mt-3">
							<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
								{model?.city}
							</button>
						</div>
						{/* <div className="flex item-center space-x-5 justify-center py-7 z-50">
							<a href="#">
								<Image
									src={Close}
									className=""
									alt="#"
									onClick={() => {
										addToFavorite(model?._id, 'rejected');
									}}
								/>
							</a>
							<a href="#">
								<Image
									src={Heart}
									className=""
									alt="#"
									onClick={() => {
										addToFavorite(model?._id, 'accepted');
									}}
								/>
							</a>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemDetails;
