'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import NoticeImg from 'assets/images/nitice1.png';
import DownArrow from 'assets/images/svg/down-arrow.svg';
import IconLogo from 'assets/images/svg/icon_logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import user from '@/redux/slice/user';

const Header = ({ userData }: any) => {
	const [toggleUser, setToggleUser] = useState(false);
	const [toggleBell, setToggleBell] = useState(false);
	const { push } = useRouter();
	function _toggleUser() {
		setToggleUser(!toggleUser);
	}
	function _toggleBell() {
		setToggleBell(!toggleBell);
	}
	const logOut = () => {
		localStorage.removeItem('user');
		push('/');
	};

	return (
		<div className="flex p-4 md:px-32 shadow-[0px_4px_20px_0px_rgba(0,_0,_0,_0.25)] bg-[#8974f6] justify-between ">
			<Link href="/dashboard">
				<div className="flex items-center">
					{/* <img
						src="https://file.rendit.io/n/Nzqn4Au9zVsInEb9ek85.svg"
						className="w-8 shrink-0"
						id="Vuesaxbulksetting"
					/> */}
					<Image src={IconLogo} className="w-8 shrink-0" alt={''} />
					<div className="text-xl font-bold text-[#f5f5f5] ml-2">Marvel Soft</div>
				</div>
			</Link>
			<div className="flex flex-row gap-3 items-center">
				{/* <div className="relative">
					<img
						onClick={_toggleBell}
						src="https://file.rendit.io/n/ciuTk52PEX5jXAPHDTRH.svg"
						className="mr-5 w-6 shrink-0 cursor-pointer"
						id="Bell"
					/>
					{toggleBell ? (
						<div className="absolute right-5 top-6 z-20">
							<div className="bg-white rounded-lg w-80 shadow-md p-4">
								<ul className="space-y-4">
									<li className="flex justify-items-start items-center bg-[#F9F9F9] p-3 space-x-2 rounded">
										<div className="h-9 w-9 min-w-[36px]">
											<Image className="w-full" src={NoticeImg} alt="#"></Image>
										</div>
										<div className="text-[#23262F] flex flex-col space-y-1">
											<div className="text-[12px] leading-3">
												Ellie joined team developers
											</div>
											<div className="text-[10px] leading-3 text-[#708099]">
												04 April, 2021 | 04:00 PM
											</div>
										</div>
									</li>
									<li className="flex justify-items-start items-center bg-[#F9F9F9] p-3 space-x-2 rounded">
										<div className="h-9 w-9 min-w-[36px]">
											<Image className="w-full" src={NoticeImg} alt="#"></Image>
										</div>
										<div className="text-[#23262F] flex flex-col space-y-1">
											<div className="text-[12px] leading-3">Jenny joined team HR</div>
											<div className="text-[10px] leading-3 text-[#708099]">
												04 April, 2021 | 04:00 PM
											</div>
										</div>
									</li>
									<li className="flex justify-items-start items-center bg-[#F9F9F9] p-3 space-x-2 rounded">
										<div className="h-9 w-9 min-w-[36px]">
											<Image className="w-full" src={NoticeImg} alt="#"></Image>
										</div>
										<div className="text-[#23262F] flex flex-col space-y-1">
											<div className="text-[12px] leading-3">
												Announcements psum dolor sit{' '}
											</div>
											<div className="text-[10px] leading-3 text-[#708099]">
												04 April, 2021 | 04:00 PM
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					) : (
						''
					)}
				</div> */}
				<div
					onClick={_toggleUser}
					className="relative flex  justify-center items-center space-x-2 cursor-pointer">
					<img
						src={`${
							userData?.details?.photo == ''
								? 'https://file.rendit.io/n/fvUpDZTFTicAhzG5Kmog.png'
								: userData?.details?.photo
						}`}
						className="self-start w-12 shrink-0 rounded-full border-2 border-gray-500 shadow-sm"
						id="UnsplashNohBFJSY"
					/>

					<div className="text-lg font-manropeRegular font-bold text-white mr-1 hidden sm:flex">
						{/* <div>
							{userData?.details?.first_name + ' ' + userData?.details?.last_name}
						</div> */}
						{userData?.username}
					</div>
					{/* <img
						src="https://file.rendit.io/n/2F5YzKkq4xYFqYhO0QZz.svg"
						className="w-3 shrink-0 cursor-pointer"
					/> */}
					<Image src={DownArrow} className="w-8 shrink-0 cursor-pointer" alt={''} />
					{toggleUser ? (
						<div className="absolute right-0 top-10 z-20">
							<div className="bg-white rounded-lg min-w-[130px] manropeSemiBold shadow-md ">
								<ul className="divide-y">
									<li className="py-3 px-6 text-sm hover:rounded-lg hover:bg-slate-100 cursor-pointer">
										<Link href="/dashboard/profile">Profile</Link>
									</li>
									<li className="py-3 px-6 text-sm hover:bg-slate-100 cursor-pointer">
										<Link href="/dashboard">Dashboard</Link>
									</li>
									<li
										className="py-3 px-6 text-sm hover:rounded-lg cursor-pointer hover:bg-slate-100"
										onClick={logOut}>
										Logout
									</li>
								</ul>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
