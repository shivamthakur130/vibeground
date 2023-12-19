'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/Jessica1.png';
import Back from '@/assets/images/svg/backa.svg';
import Close from '@/assets/images/svg/close-x.svg';
import Heart from '@/assets/images/svg/heart-wbg.svg';


const Favorites = () => {

	return (
		<div className="Favorites max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">

			<h2 className="md:text-5xl text-2xl font-PoppinsSemiBold text-111 flex items-center mb-10 justify-between">
				Favorites
			</h2>


			<div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
				<div className="rounded-2xl">
					<div className="relative rounded-2xl overflow-hidden bg-white">
						<Image src={Post1} className="w-full" alt="#" />
						<div className="flex absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">

						</div>
					</div>
					<div className="mt-3 self-end w-full ">
						<h3 className="text-xl text-[#444] font-PoppinsSemiBold">
							Jessica, 24{' '}
						</h3>
						<div className="flex justify-between mt-3">
							<button className="btn px-6 py-2 bg-black/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular">
								Asian
							</button>
						</div>
					</div>

				</div>
				<div className="rounded-2xl">
					<div className="relative rounded-2xl overflow-hidden bg-white">
						<Image src={Post1} className="w-full" alt="#" />
						<div className="flex absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">

						</div>
					</div>
					<div className="mt-3 self-end w-full ">
						<h3 className="text-xl text-[#444] font-PoppinsSemiBold">
							Jessica, 24{' '}
						</h3>
						<div className="flex justify-between mt-3">
							<button className="btn px-6 py-2 bg-black/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular">
								Asian
							</button>
						</div>
					</div>

				</div>
				<div className="rounded-2xl">
					<div className="relative rounded-2xl overflow-hidden bg-white">
						<Image src={Post1} className="w-full" alt="#" />
						<div className="flex absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">

						</div>
					</div>
					<div className="mt-3 self-end w-full ">
						<h3 className="text-xl text-[#444] font-PoppinsSemiBold">
							Jessica, 24{' '}
						</h3>
						<div className="flex justify-between mt-3">
							<button className="btn px-6 py-2 bg-black/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular">
								Asian
							</button>
						</div>
					</div>

				</div>
				<div className="rounded-2xl">
					<div className="relative rounded-2xl overflow-hidden bg-white">
						<Image src={Post1} className="w-full" alt="#" />
						<div className="flex absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">

						</div>
					</div>
					<div className="mt-3 self-end w-full ">
						<h3 className="text-xl text-[#444] font-PoppinsSemiBold">
							Jessica, 24{' '}
						</h3>
						<div className="flex justify-between mt-3">
							<button className="btn px-6 py-2 bg-black/20 text-2f2f2f text-base rounded-3xl font-PoppinsRegular">
								Asian
							</button>
						</div>
					</div>

				</div>

			</div>
		</div>
	);
};

export default Favorites;
