'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/Jessica.png';
import Back from '@/assets/images/svg/backa.svg';
import Close from '@/assets/images/svg/close-x.svg';
import Heart from '@/assets/images/svg/heart-wbg.svg';
import Footer_vb from '@/assets/images/footer-icons/vb-logo.svg';
import FooterSearch from '@/assets/images/footer-icons/ft-search.svg';
import FooterHeart from '@/assets/images/footer-icons/ft-heart.svg';
import FooterUser from '@/assets/images/footer-icons/ft-user.svg';
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

const Tinder = () => {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	return (
		<>
			<div className="Tinder max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">
				<p className="md:text-3xl text-base mb-5">Hello</p>
				<h2 className="md:text-5xl text-2xl font-PoppinsSemiBold text-111 flex items-center mb-10 justify-between">
					Dominik
					<button
						type="button"
						onClick={openModal}
						className="bg-d9d9d9 px-9 py-4 text-22px text-2f2f2f font-PoppinsRegular rounded-md hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
						Apply Filters
					</button>
				</h2>

				<Transition appear show={isOpen} as={Fragment}>
					<Dialog as="div" className="relative z-10 " onClose={closeModal}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<div className="fixed sm:bg-black/25 sm:backdrop-blur-sm" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex  min-h-full bg-black/50 backdrop-blur-sm sm:items-center items-end sm:justify-center  sm:p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95">
									<Dialog.Panel className="sm:bg-black/50 bg-white sm:backdrop-blur-md w-full max-w-4xl transform overflow-hidden rounded-2xl p-10 text-left align-middle shadow-xl transition-all">
										<h2 className="sm:text-white text-2f2f2f font-PoppinsBold text-3xl mb-7">Filter</h2>
										<ul className="flex flex-wrap gap-3">
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Busty
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Huge Boobs
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Beautiful
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Glasses
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Lipstick
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Big Ass
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Beautiful
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Busty
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Huge Boobs
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Beautiful
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Glasses
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Lipstick
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Big Ass
											</li>
											<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
												Beautiful
											</li>
										</ul>
										<button className="bg-2f2f2f text-base px-16 py-3 rounded-md mt-7 text-white hover:opacity-70">
											Apply Filter
										</button>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
				<div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-10">
					<div className="shadow-xl rounded-2xl">
						<div className="relative rounded-2xl overflow-hidden bg-white">
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
					<div className="shadow-xl rounded-2xl">
						<div className="relative rounded-2xl overflow-hidden bg-white">
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
				</div>

			</div>
			<div className='fixed bottom-0 w-full bg-white px-3 pt-3 pb-6 block sm:hidden'>
				<ul className='flex justify-around items-center'>
					<li className='text-center relative h-9 w-9 flex items-center cursor-pointer'>
						<Image src={Footer_vb} className="opacity-100" alt="#" />
						<div className="absolute w-full -bottom-3 left-0 right-0">
							<div className="h-2.5 w-2.5 bg-111 rounded-full mx-auto"></div>
						</div>

					</li>
					<li className='text-center relative h-9 w-9 flex items-center cursor-pointer'>
						<Image src={FooterSearch} className="opacity-50" alt="#" />
						<div className="absolute w-full -bottom-3 left-0 right-0 hidden">
							<div className="h-2.5 w-2.5 bg-111 rounded-full mx-auto"></div>
						</div>

					</li>
					<li className='text-center relative h-9 w-9 flex items-center cursor-pointer'>
						<Image src={FooterHeart} className="opacity-50" alt="#" />
						<div className="absolute w-full -bottom-3 left-0 right-0 hidden">
							<div className="h-2.5 w-2.5 bg-111 rounded-full mx-auto"></div>
						</div>

					</li>
					<li className='text-center relative h-9 w-9 flex items-center cursor-pointer'>
						<Image src={FooterUser} className="opacity-50" alt="#" />
						<div className="absolute w-full -bottom-3 left-0 right-0 hidden">
							<div className="h-2.5 w-2.5 bg-111 rounded-full mx-auto"></div>
						</div>

					</li>
				</ul>
			</div>
		</>
	);
};

export default Tinder;
