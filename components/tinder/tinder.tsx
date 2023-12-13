"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post1 from '@/assets/images/Jessica.png';
import Back from '@/assets/images/svg/backa.svg';
import Close from '@/assets/images/svg/close-x.svg';
import Heart from '@/assets/images/svg/heart-wbg.svg';
import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react';

const Tinder = () => {
	let [isOpen, setIsOpen] = useState(false)

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}
	return (
		<div className="Tinder max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">
			<p className='md:text-3xl text-base mb-5'>Hello</p>
			<h2 className="md:text-5xl text-2xl font-PoppinsSemiBold text-111 flex items-center mb-10 justify-between">
				Dominik

				<button
					type="button"
					onClick={openModal}
					className="bg-d9d9d9 px-9 py-4 text-22px text-2f2f2f font-PoppinsRegular rounded-md hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
				>
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
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="bg-black/50 backdrop-blur-md w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
									<h2 className='text-white font-PoppinsBold text-3xl mb-7'>Filter</h2>
									<ul className='flex flex-wrap gap-3'>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Busty</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Huge Boobs</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Beautiful</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Glasses</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Lipstick</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Big Ass</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Beautiful</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Busty</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Huge Boobs</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Beautiful</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Glasses</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Lipstick</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Big Ass</li>
										<li className='border border-white py-2.5 px-4 rounded-lg text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f'>Beautiful</li>
									</ul>
									<button className='bg-2f2f2f text-base px-16 py-3 rounded-md mt-7 text-white'>Apply Filter</button>


								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			<div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-10">
				<div className='shadow-xl rounded-2xl'>
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
					<div className='flex item-center space-x-4 justify-center py-7'>
						<a href='#'><Image src={Back} className="" alt="#" /></a>
						<a href='#'><Image src={Close} className="" alt="#" /></a>
						<a href='#'><Image src={Heart} className="" alt="#" /></a>
					</div>
				</div>
				<div className='shadow-xl rounded-2xl'>
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
					<div className='flex item-center space-x-4 justify-center py-7'>
						<a href='#'><Image src={Back} className="" alt="#" /></a>
						<a href='#'><Image src={Close} className="" alt="#" /></a>
						<a href='#'><Image src={Heart} className="" alt="#" /></a>
					</div>
				</div>

			</div>
		</div>
	);
};

export default Tinder;
