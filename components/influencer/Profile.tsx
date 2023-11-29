'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import ProfileImg from '@/assets/images/profile_img.png';
import Arrow from '@/assets/images/svg/arrow-right.svg';
import Link from 'next/link';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { AiOutlineUser } from 'react-icons/ai';

const UserProfile = () => {
	const { replace } = useRouter();
	const user = useSelector((state: any) => state.userReducer.user);
	return (
		<div className="Profile max-w-7xl px-5 mx-auto  mt-16 mb-32">
			<div className="flex justify-between border-b shadow-sm  border-gray-300 p-4 mb-12">
				<h1 className="text-4xl font-PoppinsSemiBold text-111">Profile</h1>
				<div
					className="cursor-pointer pr-5 btn btn-default px-3 py-2 mt-0 text-lg text-white bg-303030 rounded-md hover:bg-151515 transition-all duration-300 active:bg-303030 flex items-center space-x-1"
					onClick={() => {
						replace('/influencer');
					}}>
					<IoChevronBackOutline className="text-xl" /> <span>Back</span>
				</div>
			</div>
			<div className="flex items-center">
				<div className="flex-shrink-0 mr-5 md:mr-10 ">
					{user?.photos?.length > 0 ? (
						<img
							className="w-20 h-20 md:w-40 md:h-40 shadow-sm rounded-md"
							src={user?.photos[0]}
							alt="Neil image"
						/>
					) : (
						<AiOutlineUser className="w-40 h-40 shadow-sm rounded-md border" />
					)}
				</div>
				<div className="flex-1 min-w-0">
					<p className="md:text-5xl text-xl font-PoppinsMedium text-[#444]">
						{user?.firstName} {user?.lastName}
					</p>
					<p className="md:text-2xl text-base text-[#444]">{user?.email}</p>
				</div>
			</div>

			<div className="mt-20 space-y-10">
				{/* <h2 className="flex justify-between text-2xl">
					Interest
					<span>
						<Image src={Arrow} alt="#" width={7} />
					</span>
				</h2> */}
				<h2 className="flex justify-between text-2xl border-b border-gray-200 pb-4">
					<Link href="/influencer/manage-profile">
						<span className="cursor-pointer">Manage Profile</span>
					</Link>
					<Link href="/influencer/manage-profile">
						<span className="cursor-pointer">
							<Image src={Arrow} alt="#" width={10} />
						</span>
					</Link>
				</h2>
				<h2 className="flex justify-between text-2xl border-b border-gray-200 pb-4">
					<Link href="/influencer/manage-subscription">
						<span className="cursor-pointer">Manage Subscription</span>
					</Link>
					<Link href="/influencer/manage-subscription">
						<span className="cursor-pointer">
							<Image src={Arrow} alt="#" width={10} />
						</span>
					</Link>
				</h2>
				<h2 className="flex justify-between text-2xl border-b border-gray-200 pb-4">
					<Link href="/influencer/manage-personal-info">
						<span className="cursor-pointer">Manage Personal Info</span>
					</Link>
					<Link href="/influencer/manage-personal-info">
						<span className="cursor-pointer">
							<Image src={Arrow} alt="#" width={10} />
						</span>
					</Link>
				</h2>
				<h2 className="flex justify-between text-2xl border-b border-gray-200 pb-4">
					<span className="cursor-pointer">Terms & Conditions</span>
					<span className="cursor-pointer">
						<Image src={Arrow} alt="#" width={10} />
					</span>
				</h2>
				<h2 className="flex justify-between text-2xl border-b border-gray-200 pb-4">
					<span className="cursor-pointer">Invoice</span>
					<span className="cursor-pointer">
						<Image src={Arrow} alt="#" width={10} />
					</span>
				</h2>
			</div>
		</div>
	);
};

export default UserProfile;
