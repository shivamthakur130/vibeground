import Image from 'next/image';
import Post1 from '@/assets/images/Jessica.png';
import Back from '@/assets/images/svg/backa.svg';
import Close from '@/assets/images/svg/close-x.svg';
import Heart from '@/assets/images/svg/heart-wbg.svg';
import { useRouter } from 'next/navigation';

const ItemDetails = ({ model }: any) => {
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
							className="text-2xl text-white font-PoppinsSemiBold cursor-pointer"
							onClick={() => {
								openDetails(model?._id);
							}}>
							{model?.userName}, {getAge(model?.date_of_birth)}{' '}
						</h3>
						<div className="flex justify-between mt-3">
							<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
								{model?.firstName}
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
					<Image src={Heart} className="" alt="#" />
				</a>
			</div>
		</div>
	);
};

export default ItemDetails;
