'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { IoChevronBackOutline } from 'react-icons/io5';
import ManageOtherInfo from '@/components/influencer/ManageOtherInfo';
import ChangePassword from '@/components/influencer/ChangePassword';

const ManagePersonalInfo = ({ countries }: any) => {
	const { replace } = useRouter();
	const user = useSelector((state: any) => state.userReducer.user);

	return (
		<div className="max-w-7xl px-5 mx-auto mt-16 mb-32">
			<div className="flex justify-between border-b shadow-sm  border-gray-300 p-4">
				<h1 className="md:text-4xl text-lg font-PoppinsSemiBold text-111">
					Manage Personal Info
				</h1>
				<div
					className="cursor-pointer pr-5 btn btn-default px-3 py-2 mt-0 text-lg text-white bg-303030 rounded-md hover:bg-151515 transition-all duration-300 active:bg-303030 flex items-center space-x-1"
					onClick={() => {
						replace('/influencer/profile');
					}}>
					<IoChevronBackOutline className="text-xl" /> <span>Back</span>
				</div>
			</div>
			<ManageOtherInfo user={user} showHide={true} countries={countries} />
			<ChangePassword user={user} showHide={true} />
		</div>
	);
};

export default ManagePersonalInfo;
