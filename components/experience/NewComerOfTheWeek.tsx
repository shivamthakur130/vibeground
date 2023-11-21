import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/Jessica.png';

import Like from '@/assets/images/svg/like.svg';

const NewComerWeek = () => {
	return (
		<div className="Experience max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">
			<h2 className="md:text-5xl text-2xl font-PoppinsSemiBold text-111 flex items-center mb-10">
				Newcomer of the month
			</h2>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
				<div className="relative rounded-2xl overflow-hidden">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
						<div className="mt-auto self-end w-full">
							<h3 className="text-2xl text-white font-PoppinsSemiBold">
								Jessica, 24{' '}
							</h3>
							<div className="flex justify-between mt-3">
								<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
									Asian
								</button>
								<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
									<Image src={Like} alt="#" />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="relative rounded-2xl overflow-hidden">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
						<div className="mt-auto self-end w-full">
							<h3 className="text-2xl text-white font-PoppinsSemiBold">
								Jessica, 24{' '}
							</h3>
							<div className="flex justify-between mt-3">
								<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
									Asian
								</button>
								<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
									<Image src={Like} alt="#" />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="relative rounded-2xl overflow-hidden">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
						<div className="mt-auto self-end w-full">
							<h3 className="text-2xl text-white font-PoppinsSemiBold">
								Jessica, 24{' '}
							</h3>
							<div className="flex justify-between mt-3">
								<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
									Asian
								</button>
								<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
									<Image src={Like} alt="#" />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="relative rounded-2xl overflow-hidden">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
						<div className="mt-auto self-end w-full">
							<h3 className="text-2xl text-white font-PoppinsSemiBold">
								Jessica, 24{' '}
							</h3>
							<div className="flex justify-between mt-3">
								<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
									Asian
								</button>
								<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
									<Image src={Like} alt="#" />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="relative rounded-2xl overflow-hidden">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
						<div className="mt-auto self-end w-full">
							<h3 className="text-2xl text-white font-PoppinsSemiBold">
								Jessica, 24{' '}
							</h3>
							<div className="flex justify-between mt-3">
								<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
									Asian
								</button>
								<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
									<Image src={Like} alt="#" />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="relative rounded-2xl overflow-hidden">
					<Image src={Post1} className="w-full" alt="#" />
					<div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
						<div className="mt-auto self-end w-full">
							<h3 className="text-2xl text-white font-PoppinsSemiBold">
								Jessica, 24{' '}
							</h3>
							<div className="flex justify-between mt-3">
								<button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
									Asian
								</button>
								<span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
									<Image src={Like} alt="#" />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewComerWeek;
