import CollapseMenu_ from '@/assets/svg/collapse-menu.svg';
import Image from 'next/image';
import React, { use, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks';
import { removeUser } from '@/redux/slice/user';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const CollapseMenu = () => {
	const pathname = usePathname();
	const [toggleUser, setToggleUser] = React.useState(false);
	const [userDetails, setUserDetails] = React.useState<any>(null);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	useEffect(() => {
		setUserDetails(user);
	}, [user]);
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
	const logOut = async () => {
		push('/');
		dispatch(removeUser());
		setToggleUser(false);
	};
	const setToggle = () => {
		setToggleUser(!toggleUser);
	};
	return (
		<div className="sm:hidden relative">
			<Image
				src={CollapseMenu_}
				alt="Collapse Menu"
				className="w-8 h-8 absolute top-4  right-4"
				onClick={() => setToggleUser(!toggleUser)}
			/>

			<div
				className={`${
					toggleUser ? 'block' : 'hidden'
				} flex items-center justify-between px-4 absolute top-12 bg-151515 min-w-[150px] rounded-md p-2 py-4 z-40  right-7 transition-all duration-300`}>
				<ul className="space-y-3  flex flex-col items-start text-white ">
					<li onClick={redirectProfile} className="hover:bg-gray-700 px-5 w-full">
						Profile
					</li>
					{/* <li className="hover:bg-gray-700 px-5 w-full" onClick={setToggle}>
						<Link href="/experience/tinder">Tinder</Link>
					</li>
					<li className="hover:bg-gray-700 px-5 w-full" onClick={setToggle}>
						<Link href="/experience/favorites">Favorites</Link>
					</li> */}
					<li className="hover:bg-gray-700 px-5 w-full" onClick={logOut}>
						Log Out
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CollapseMenu;
