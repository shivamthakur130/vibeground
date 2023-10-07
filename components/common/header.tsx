'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import NoticeImg from 'assets/images/nitice1.png';
import DownArrow from 'assets/images/svg/down-arrow.svg';
import Logo from 'assets/images/svg/logo.svg';
import CenterLogo from '@/assets/images/center-logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import user from '@/redux/slice/user';
import { usePathname } from 'next/navigation';

const Header = ({ userData }: any) => {
	const [toggleUser, setToggleUser] = useState(false);
	const [toggleBell, setToggleBell] = useState(false);
	const { push } = useRouter();
	const pathName = usePathname();
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

	// console.log(pathName, 'usePathname');
	return (
		<div className=" bg-black">
			<div className="max-w-7xl mx-auto py-10">
				<div className="flex justify-between items-center">
					<>
						<Link href="/">
							<div className="flex items-center">
								<Image src={CenterLogo} className="shrink-0" height={60} alt={''} />
							</div>
						</Link>
						<Link href="/account/welcome">
							<div
								className="
				rounded-[8px]  btn  py-3 px-14 bg-white hover:bg-gray-300   text-151515 cursor-pointer text-xl text-center transition-all duration-300 active:bg-gray-50">
								Login
							</div>
						</Link>
					</>
					{/* // <>
				// 	<Link href="/">
				// 		<div className="flex items-center">
				// 			<Image src={Logo} className="shrink-0" alt={''} />
				// 		</div>
				// 	</Link>
				// 	<Link href="/account/welcome">
				// 		<div className="btn py-3 px-6 bg-2f2f2f  text-white cursor-pointer rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030">
				// 			Login
				// 		</div>
				// 	</Link>
				// </> */}
				</div>
			</div>
		</div>
	);
};

export default Header;
