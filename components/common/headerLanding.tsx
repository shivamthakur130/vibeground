'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from 'assets/images/svg/logo.svg';
import CenterLogo from 'assets/images/logo/logo_white.png';
import Hmenu from '@/assets/images/svg/hembarg.svg';
import Link from 'next/link';


const HeaderLanding = () => {

	return (
		<div className="absolute left-0 right-0 top-0 z-10">
			<div className="max-w-6xl mx-auto py-10">
				<div className="flex justify-between items-center">
					<Link href="/">
						<div className="flex items-center">
							<Image src={CenterLogo} className="shrink-0" width={336} alt={''} />
						</div>
					</Link>
					<div className='flex items-center space-x-6'>
						<Link href="/account/welcome">
							<div
								className="
				rounded-[8px]  btn  py-3 px-14 bg-white hover:bg-gray-300   text-151515 cursor-pointer text-xl text-center transition-all duration-300 active:bg-gray-50">
								Login
							</div>
						</Link>
						<Image src={Hmenu} alt='#' />
					</div>


				</div>
			</div>
		</div>
	);
};

export default HeaderLanding;
