'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import ManageImages from '@/components/influencer/manage/ManageImages';
import ManageVideos from '@/components/influencer/manage/ManageVideos';
import ManageLinks from '@/components/influencer/manage/ManageLinks';
import { useRouter } from 'next/navigation';
import { IoChevronBackOutline } from 'react-icons/io5';

const ManageProfile = () => {
	const { replace } = useRouter();
	const user = useSelector((state: any) => state.userReducer.user);

	return (
		<div className="max-w-7xl px-5 mx-auto mt-16 mb-32">
			<div className="flex justify-between border-b shadow-sm  border-gray-300 p-4">
				<h1 className="text-3xl font-PoppinsSemiBold text-111">Manage Profile</h1>
				<div
					className="cursor-pointer pr-5 btn btn-default px-3 py-2 mt-0 text-lg text-white bg-303030 rounded-md hover:bg-151515 transition-all duration-300 active:bg-303030 flex items-center space-x-1"
					onClick={() => {
						replace('/influencer/profile');
					}}>
					<IoChevronBackOutline className="text-xl" /> <span>Back</span>
				</div>
			</div>
			<ManageImages user={user} />
			<ManageVideos user={user} />
			<ManageLinks user={user} />
		</div>
	);
};

export default ManageProfile;
