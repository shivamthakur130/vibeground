'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import ManageImages from '@/components/influencer/manage/ManageImages';
import ManageVideos from '@/components/influencer/manage/ManageVideos';
import ManageLinks from '@/components/influencer/manage/ManageLinks';
import ManageAbout from '@/components/influencer/manage/ManageAbout';
import { useRouter } from 'next/navigation';
import { IoChevronBackOutline } from 'react-icons/io5';
import ManageCategories from './ManageCategories';
import Link from 'next/link';
import PageWrapper from '../common/PageWrapper';

const ManageProfile = ({ categoriesList }: any) => {
	const { replace } = useRouter();
	const user = useSelector((state: any) => state.userReducer.user);

	return (
		<PageWrapper>
			<div className="max-w-7xl px-5 mx-auto sm:mt-16 sm:mb-32 ">
				<div className="flex justify-between border-b shadow-sm  border-gray-300 p-4 pt-20">
					<div>
						<h1 className="md:text-4xl text-2xl font-PoppinsSemiBold text-111">
							Manage Profile
						</h1>
						<Link href="/influencer/profile-view">
							<div className="text-md text-303030 font-PoppinsRegular underline py-2">
								View Profile
							</div>
						</Link>
					</div>
					<div>
						<div
							className="cursor-pointer pr-5 btn btn-default px-3 py-2 mt-0 text-lg text-white bg-303030 rounded-md hover:bg-151515 transition-all duration-300 active:bg-303030 flex items-center space-x-1"
							onClick={() => {
								replace('/influencer/profile');
							}}>
							<IoChevronBackOutline className="text-xl" /> <span>Back</span>
						</div>
					</div>
				</div>
				<ManageImages user={user} showHide={true} />
				<ManageVideos user={user} showHide={true} />
				<ManageLinks user={user} showHide={true} />
				<ManageAbout user={user} showHide={true} />
				<ManageCategories
					user={user}
					showHide={true}
					categoriesList={categoriesList}
				/>
			</div>
		</PageWrapper>
	);
};

export default ManageProfile;
