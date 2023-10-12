'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DownArrow from '@/assets/images/svg/down-arrow_.svg';
import CenterLogo from '@/assets/images/center-logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import UserIcon from '@/assets/images/svg/user.svg';
import { memo } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { removeUser } from '@/redux/slice/user';

const Header = () => {
	const [toggleUser, setToggleUser] = useState(false);
	const [toggleBell, setToggleBell] = useState(false);
	const [userDetails, setUserDetails] = useState<any>(null);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();
	const pathName = usePathname();
	function _toggleUser() {
		setToggleUser(!toggleUser);
	}
	function _toggleBell() {
		setToggleBell(!toggleBell);
	}
	const logOut = async () => {
		push('/');
		dispatch(removeUser());
	};

	useEffect(() => {
		setUserDetails(user);
	}, [user]);

	if (!user) return null;
	return (
		<div className=" bg-black">
			<div className="max-w-7xl mx-auto py-10 px-10">
				<div
					className={`flex ${pathName == '/' ? 'justify-end' : 'justify-between'} `}>
					{pathName !== '/' && (
						<Link href="/">
							<div className="flex items-center">
								<Image src={CenterLogo} className="shrink-0" height={60} alt={''} />
							</div>
						</Link>
					)}
					{(userDetails?.token == '' || !userDetails) && pathName === '/' && (
						<Link href="/login">
							<div
								className="
				rounded-[8px]  btn  py-3 px-14 bg-white hover:bg-gray-300   text-151515 cursor-pointer text-xl text-center transition-all duration-300 active:bg-gray-50">
								Login
							</div>
						</Link>
					)}
					{userDetails && userDetails?.token !== '' && (
						<div className="flex">
							{/* <div className="flex mr-6">
								<input
									className="placeholder:text-111 bg-d9d9d9 rounded-[50px] px-8 py-3 mr-8"
									type="text"
									placeholder="Search"
								/>
								<Link href="/account/welcome">
									<div className="btn py-4 px-5 bg-2f2f2f  text-white cursor-pointer rounded-[8px] hover:bg-151515 text-xs">
										Upgrade to Premium
									</div>
								</Link>
							</div> */}

							<div className="flex items-center">
								{/*<div className="flex items-center mr-5 relative">
									<Image src={NoticeImg} className="shrink-0" alt={''} />
									<div className="absolute -top-2 right-0 h-4 w-4 rounded-full bg-2f2f2f flex items-center justify-center">
										<span className="text-[10px] text-white">23</span>
									</div>
								</div>
								 <div className="flex items-center mr-10">
									<Image src={Msg} className="shrink-0" alt={''} />
								</div> */}
								<div className="flex items-center space-x-3">
									<span className="mr-3 font-PoppinsRegular text-22px text-white">
										{userDetails?.firstName}
									</span>
									<Image src={UserIcon} className="shrink-0" alt={''} />
									<span className="relative">
										<Image
											src={DownArrow}
											onClick={_toggleUser}
											className="cursor-pointer hover:bg-gray-700 rounded-md transition-all duration-300 active:bg-gray-900 p-2 relative"
											alt={''}
										/>
										{toggleUser ? (
											<div className="absolute right-1 top-10 z-20">
												<div className="bg-white rounded-lg min-w-[130px] manropeSemiBold shadow-md ">
													<ul className="divide-y">
														<li className="py-3 px-6 text-sm hover:rounded-lg hover:bg-slate-100 cursor-pointer">
															<Link href="/dashboard/profile">Profile</Link>
														</li>
														{/* <li className="py-3 px-6 text-sm hover:bg-slate-100 cursor-pointer">
															<Link href="/dashboard">Dashboard</Link>
														</li> */}
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
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Header);
