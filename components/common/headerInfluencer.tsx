'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import NoticeImg from '@/assets/images/svg/notification.svg';
import User from '@/assets/images/svg/user.svg';
import Msg from '@/assets/images/svg/msg.svg';
import Logo from 'assets/images/svg/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import user from '@/redux/slice/user';

const HeaderInfluencer = ({ userData }: any) => {
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
		<div className="flex justify-between items-center">
			<Link href="/">
				<div className="flex items-center">
					<Image src={Logo} className="shrink-0" alt={''} />
				</div>
			</Link>
			<div className="flex">
				<div className="flex mr-6">
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
				</div>

				<div className="flex items-center">
					<div className="flex items-center mr-5 relative">
						<Image src={NoticeImg} className="shrink-0" alt={''} />
						<div className="absolute -top-2 right-0 h-4 w-4 rounded-full bg-2f2f2f flex items-center justify-center">
							<span className="text-[10px] text-white">23</span>
						</div>
					</div>
					<div className="flex items-center mr-10">
						<Image src={Msg} className="shrink-0" alt={''} />
					</div>
					<div className="flex items-center">
						<span className="mr-2 font-PoppinsBold text-22px">Mathew</span>
						<Image src={User} className="shrink-0" alt={''} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderInfluencer;
