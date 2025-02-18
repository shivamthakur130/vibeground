'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DownArrow from '@/assets/images/svg/down-arrow_.svg';
import CenterLogo from '@/assets/images/center-logo.png';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { getUser } from '@/services/user.service';
import { useAppDispatch } from '@/redux/hooks';
import { removeUser, updateUser } from '@/redux/slice/user';

const Header = () => {
	const [toggleUser, setToggleUser] = useState(false);
	const [userDetails, setUserDetails] = useState<any>(null);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	function _toggleUser() {
		setToggleUser(!toggleUser);
	}

	const logOut = async () => {
		push('/');
		dispatch(removeUser());
		setToggleUser(false);
	};

	const redirectDashboard = () => {
		const userType = userDetails?.type;
		if (userType === 'fan') {
			push('/experience');
		}
		if (userType === 'model') {
			push('/influencer');
		}
	};

	const redirectProfile = () => {
		const userType = userDetails?.type;

		if (userType === 'fan') {
			push('/experience/profile');
		}
		if (userType === 'model') {
			push('/influencer/profile');
		}
		setToggleUser(false);
	};

	const checkUser = async () => {
		if (user?.token !== '' && user?.token !== null) {
			const { data, error } = await getUser();
			if (error) {
				handleError(error);
				logout();
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				const responseData = data?.data;
				dispatch(updateUser({ ...user, ...responseData }));
				return;
			}
			logout();
		}
	};

	useEffect(() => {
		const checkParentPath = pathName.split('/')[1];
		if (checkParentPath !== 'experience' && checkParentPath !== 'influencer') {
			checkUser();
		}
	}, []);

	useEffect(() => {
		setUserDetails(user);
	}, [user]);

	const handleError = (error: any) => {
		if (
			error?.response?.status === 401 ||
			error?.response?.data?.message === 'Unauthorized'
		) {
			dispatch(removeUser());
			// push('/login');
		}
		if (error.response) {
			const message = error.response.data.message;
		} else if (error.request) {
		} else {
		}
	};

	const logout = () => {
		dispatch(removeUser());
	};

	const redirectLogoClick = () => {
		const userToken = userDetails?.token;
		if (userToken) {
			push('/experience');
		} else {
			push('/');
		}
	};

	return (
		<div className=" bg-black hidden sm:flex w-full">
			<div className="max-w-7xl mx-auto py-10 px-10 w-full">
				<div
					className={`flex ${pathName == '/' ? 'justify-end' : 'justify-between'} `}>
					{pathName !== '/' && (
						<div
							className="flex items-center cursor-pointer"
							onClick={redirectLogoClick}>
							<Image src={CenterLogo} className="shrink-0" height={60} alt={''} />
						</div>
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
					{userDetails &&
						userDetails?.token !== '' &&
						userDetails?.status !== '' &&
						userDetails?.status !== 'inactive' && (
							<div className="flex">
								<div className="flex items-center">
									<div className="flex items-center ">
										<span
											className="hidden sm:block mr-3 font-PoppinsRegular text-22px text-white cursor-pointer hover:underline"
											onClick={redirectProfile}>
											{userDetails?.firstName} {userDetails?.lastName}
										</span>
										{/* <div
											className="cursor-pointer hover:bg-gray-700 p-2 rounded-md active:bg-gray-900 relative"
											onClick={redirectDashboard}>
											<AiOutlineDashboard className="text-3xl text-white" />
										</div> */}
										<span className="relative">
											<Image
												src={DownArrow}
												onClick={_toggleUser}
												className="cursor-pointer hover:bg-gray-700 rounded-md transition-all duration-300 active:bg-gray-900 p-2 relative"
												alt={'down-arrow'}
											/>
											{toggleUser ? (
												<div className="absolute right-1 top-10 z-20">
													<div className="bg-white rounded-lg min-w-[130px] manropeSemiBold shadow-md ">
														<ul className="divide-y">
															<li
																className="py-3 px-6 text-sm hover:rounded-lg hover:bg-slate-100 cursor-pointer"
																onClick={redirectProfile}>
																Profile
															</li>
															{userDetails?.type === 'fan' && (
																<>
																	<li
																		className="py-3 px-6 text-sm hover:rounded-lg hover:bg-slate-100 cursor-pointer"
																		onClick={() => {
																			push('/experience/tinder');
																			setToggleUser(false);
																		}}>
																		Tinder
																	</li>
																	<li
																		className="py-3 px-6 text-sm hover:rounded-lg hover:bg-slate-100 cursor-pointer"
																		onClick={() => {
																			push('/experience/favorites');
																			setToggleUser(false);
																		}}>
																		Favorites
																	</li>
																</>
															)}
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

					{userDetails?.status === 'inactive' && (
						<div className="flex">
							<div className="flex items-center">
								<div className="flex items-center ">
									<span
										onClick={logOut}
										className="text-white cursor-pointer hover:underline">
										Logout
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
