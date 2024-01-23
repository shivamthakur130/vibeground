import React from 'react';
import Footer_vb from '@/assets/images/footer-icons/vb-logo.svg';
import FooterSearch from '@/assets/images/footer-icons/ft-search.svg';
import FooterHeart from '@/assets/images/footer-icons/ft-heart.svg';
import FooterUser from '@/assets/images/footer-icons/ft-user.svg';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MobileBottomMenuModel = () => {
	const pathname = usePathname();
	return (
		<div className="fixed bottom-0 w-full bg-white px-3 pt-3 pb-6 block sm:hidden z-50">
			<ul className="flex justify-around items-center">
				<li className="text-center relative h-9 w-9 flex items-center cursor-pointer group"></li>
				<li className="text-center relative h-9 w-9 flex items-center cursor-pointer group"></li>
				<li className="text-center relative h-9 w-9 flex items-center cursor-pointer group"></li>
				<li className="text-center relative h-9 w-9 flex items-center cursor-pointer group"></li>
				{/* <Link href="/experience">
					<li className="text-center relative h-9 w-9 flex items-center cursor-pointer group">
						<span
							className={`${
								pathname === '/experience' ? 'opacity-100' : 'opacity-50'
							}`}>
							<Image src={Footer_vb} alt="#" />
						</span>
						{pathname === '/experience' && (
							<div className="absolute w-full -bottom-3 left-0 right-0 group-hover:block">
								<div className="h-2.5 w-2.5 bg-111 rounded-full mx-auto"></div>
							</div>
						)}
					</li>
				</Link>
				<Link href="/experience/tinder">
					<li className="text-center relative h-9 w-9 flex items-center cursor-pointer group">
						<span
							className={`${
								pathname === '/experience/tinder' ? 'opacity-100' : 'opacity-50'
							}`}>
							<Image src={FooterSearch} alt="#" />
						</span>
						{pathname === '/experience/tinder' && (
							<div className="absolute w-full -bottom-3 left-0 right-0  group-hover:block">
								<div className="h-2.5 w-2.5 bg-111 rounded-full mx-auto"></div>
							</div>
						)}
					</li>
				</Link>
				<Link href="/experience/favorites">
					<li className="text-center relative h-9 w-9 flex items-center cursor-pointer group">
						<span
							className={`${
								pathname === '/experience/favorites' ? 'opacity-100' : 'opacity-50'
							}`}>
							<Image src={FooterHeart} alt="#" />
						</span>
						{pathname === '/experience/favorites' && (
							<div className="absolute w-full -bottom-3 left-0 right-0  group-hover:block">
								<div className="h-2.5 w-2.5 bg-111 rounded-full mx-auto"></div>
							</div>
						)}
					</li>
				</Link> */}
				<Link href="/influencer/profile">
					<li className="text-center relative h-9 w-9 flex items-center cursor-pointer group">
						<span
							className={`${
								pathname === '/influencer/profile' ? 'opacity-100' : 'opacity-50'
							}`}>
							<Image src={FooterUser} alt="#" />
						</span>
						{pathname === '/influencer/profile' && (
							<div className="absolute w-full -bottom-3 left-0 right-0  group-hover:block">
								<div className="h-2.5 w-2.5 bg-111 rounded-full mx-auto"></div>
							</div>
						)}
					</li>
				</Link>
			</ul>
		</div>
	);
};

export default MobileBottomMenuModel;
