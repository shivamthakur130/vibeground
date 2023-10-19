'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import MainBanner from '@/assets/images/main_banner.jpg';
import banner2 from '@/assets/images/banner2.png';
import banner3 from '@/assets/images/banner3.png';
import Quote from '@/assets/images/quote.png';
import Ico1 from '@/assets/images/ico1.png';
import Ico2 from '@/assets/images/ico2.png';
import Ico3 from '@/assets/images/ico3.png';
import Ico4 from '@/assets/images/ico4.png';
import CenterLogo from '@/assets/images/logo/l_white.png';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		zIndex: 1000,
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		width: '60%',
		height: 'auto',
		marginRight: '-50%',
		background: '#0d0d0d',
		transform: 'translate(-50%, -50%)',
	},
};

const Landing = ({ modalIsOpen, setModalIsOpen }: any) => {
	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};
	return (
		<div className="Landing text-center ">
			<div id="root"></div>
			<div className="max-w-full mx-auto ">
				<div className=" bg-black h-fit py-36">
					<div className="flex items-center justify-center py-16">
						<div className="max-w-2xl mx-auto text-white my-20">
							{/* <h1 className="text-75px font-PoppinsBlack leading-[78px]">
								Spice your time with Best Creators
							</h1>
							<p className="text-21px max-w-2xl mx-auto py-4">
								The Best app for content creators out there that provide single platform
								to connect with your audience
							</p> */}
							<p className="mx-auto px-10 ">
								<Image src={CenterLogo} alt="#" className="" />
							</p>
							{/* <Link href="account"> */}
							<button
								onClick={openModal}
								className="mt-10 
				rounded-[8px]  btn btn-default  py-4 px-16 bg-white hover:bg-gray-300   text-151515 cursor-pointer text-xl text-center transition-all duration-300 active:bg-gray-50 ">
								Join Today!
							</button>
							{/* </Link> */}
						</div>
					</div>
				</div>
				{/* <div className="flex items-center justify-center mt-20">
					<div className="max-w-4xl mx-auto ">
						<h2 className="text-[54px] font-PoppinsBold leading-[65px]">
							Encounters are not always easy, but trust us, it{"'"}s worth it.
						</h2>
						<p className="text-21px max-w-2xl mx-auto mt-6 mb-14">
							The Best app for content creators out there that provide single platform
							to connect with your audience
						</p>
						<Image src={banner2} alt="#" />
					</div>
				</div>
				<div className="flex items-center justify-center mt-20">
					<div className="max-w-4xl mx-auto ">
						<h2 className="text-[54px] font-PoppinsBold leading-[65px]">
							It{"'"}s easy to find that Best Content Creator you look for
						</h2>
						<p className="text-21px max-w-4xl mx-auto mt-6 mb-10">
							You can find the person that caught your eye in no time. Read through
							their profile to see their pics, the music they like, the things you have
							in common… Precious intel that will help you confirm your desire to meet
							them.
						</p>
						<p className="text-21px text-[#5546FF]/50 max-w-2xl mx-auto">
							Join Today to Find the Best Content Creators through Best Looking Ui
							Design
						</p>
						<div className="flex justify-center mt-5 mb-32">
							<Image src={banner3} width={623} alt="#" />
						</div>
					</div>
				</div> */}
			</div>
			{/* <div className="flex items-center justify-center bg-black p-20">
				<div className="max-w-4xl mx-auto text-white">
					<h1 className="text-[54px] font-PoppinsBold leading-[65px]">
						Find the Creators you{'’'}ve been looking for
					</h1>
					<Link href="#">
						<button
							className="mt-12 
				rounded-[8px]  btn btn-default  py-4 px-16 bg-white hover:bg-gray-300   text-151515 cursor-pointer text-xl text-center transition-all duration-300 active:bg-gray-50 ">
							Get Started
						</button>
					</Link>
				</div>
			</div>
			<div className="max-w-6xl mx-auto">
				<div className="flex items-center justify-center">
					<div className="text-[#0d0d0d] font-PoppinsBold text-[54px] mt-28 mb-20">
						What Users say
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="bg-[#e3e3e3] text-[#0d0d0d] p-10 text-left relative">
							<div className="absolute -top-6 right-12">
								<Image src={Quote} alt="#" />
							</div>
							<h3 className="text-[28px] font-PoppinsBold">Natlie</h3>
							<p className="text-15.5px  mb-4">Content Creator</p>
							<p className="text-[16.5px]">
								First and foremost, the user interface is intuitive and visually
								appealing. Navigating through the app feels effortless, with
								well-organized menus and easily accessible options. Even if you{"'"}re
								new to content creation or technology in general, this app{"'"}s
								user-friendly design will have you creating captivating content in no
								time.
							</p>
						</div>
						<div className="bg-[#e3e3e3] text-[#0d0d0d] p-10 text-left relative">
							<div className="absolute -top-6 right-12">
								<Image src={Quote} alt="#" />
							</div>
							<h3 className="text-[28px] font-PoppinsBold">Natlie</h3>
							<p className="text-15.5px  mb-4">Content Creator</p>
							<p className="text-[16.5px]">
								First and foremost, the user interface is intuitive and visually
								appealing. Navigating through the app feels effortless, with
								well-organized menus and easily accessible options. Even if you{"'"}re
								new to content creation or technology in general, this app{"'"}s
								user-friendly design will have you creating captivating content in no
								time.
							</p>
						</div>
						<div className="bg-[#e3e3e3] text-[#0d0d0d] p-10 text-left relative">
							<div className="absolute -top-6 right-12">
								<Image src={Quote} alt="#" />
							</div>
							<h3 className="text-[28px] font-PoppinsBold">Natlie</h3>
							<p className="text-15.5px  mb-4">Content Creator</p>
							<p className="text-[16.5px]">
								First and foremost, the user interface is intuitive and visually
								appealing. Navigating through the app feels effortless, with
								well-organized menus and easily accessible options. Even if you{"'"}re
								new to content creation or technology in general, this app{"'"}s
								user-friendly design will have you creating captivating content in no
								time.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-6xl mx-auto mt-32">
				<div className="grid  md:grid-cols-2 gap-6">
					<div className="text-left">
						<div className="flex items-start">
							<div className="flex-shrink-0 mr-10">
								<Image
									className=""
									src={Ico1}
									height={86}
									width={86}
									alt="Neil image"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-[32px] font-PoppinsMedium leading-none text-[#0B0B0B] mb-3">
									We promise, no one will bother you!
								</p>
								<p className="text-xs text-[#444]">
									Users can only talk to one another if they have both Liked each other.
									This condition of reciprocity lets you use the app without fear of
									spamming or harassment.
								</p>
							</div>
						</div>
					</div>
					<div className="text-left">
						<div className="flex items-start">
							<div className="flex-shrink-0 mr-10">
								<Image
									className=""
									src={Ico2}
									height={86}
									width={86}
									alt="Neil image"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-[32px] font-PoppinsMedium leading-none text-[#0B0B0B] mb-3">
									We promise, no one will bother you!
								</p>
								<p className="text-xs text-[#444]">
									Users can only talk to one another if they have both Liked each other.
									This condition of reciprocity lets you use the app without fear of
									spamming or harassment.
								</p>
							</div>
						</div>
					</div>
					<div className="text-left">
						<div className="flex items-start">
							<div className="flex-shrink-0 mr-10">
								<Image
									className=""
									src={Ico3}
									height={86}
									width={86}
									alt="Neil image"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-[32px] font-PoppinsMedium leading-none text-[#0B0B0B] mb-3">
									We promise, no one will bother you!
								</p>
								<p className="text-xs text-[#444]">
									Users can only talk to one another if they have both Liked each other.
									This condition of reciprocity lets you use the app without fear of
									spamming or harassment.
								</p>
							</div>
						</div>
					</div>
					<div className="text-left">
						<div className="flex items-start">
							<div className="flex-shrink-0 mr-10">
								<Image
									className=""
									src={Ico4}
									height={86}
									width={86}
									alt="Neil image"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-[32px] font-PoppinsMedium leading-none text-[#0B0B0B] mb-3">
									We promise, no one will bother you!
								</p>
								<p className="text-xs text-[#444]">
									Users can only talk to one another if they have both Liked each other.
									This condition of reciprocity lets you use the app without fear of
									spamming or harassment.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div> */}
			{modalIsOpen && (
				<Modal
					isOpen={modalIsOpen}
					// onAfterOpen={afterOpenModal}
					// overlayClassName={'bg-black bg-opacity-50'}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal">
					<div className=" rounded-lg text-white">
						<div className="flex justify-between ">
							<h1></h1>
							<button onClick={closeModal}>X</button>
						</div>
						<div className="w-full flex flex-col justify-center items-center  space-y-2 mt-4">
							<h1 className="text-4xl text-center">We are launching soon!</h1>
							<p className=" text-center text-2xl">Stay excited.</p>
							<div className="md:flex justify-center space-x-4 text-center">
								For more information contact{'  '}
								<a
									href="mailto:info@vibeground.com"
									className="px-2 cursor-pointer text-blue-500 underline">
									info@vibeground.com
								</a>
							</div>
						</div>
					</div>
					<div className="mt-10 px-8 pb-2">
						<video
							controls
							width="600"
							height="400"
							muted
							className="w-full h-1/6"
							poster="/video/thumbnail.png">
							<source src="/video/intro.mp4" type="video/mp4" />
						</video>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Landing;
