import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProfileImg from '@/assets/images/profile_img.png';
import Arrow from '@/assets/images/svg/arrow-right.svg';
const Profile = () => {
	return (
		<div className="Profile max-w-7xl px-5 mx-auto mt-32 mb-32">
			<div className="flex items-center">
				<div className="flex-shrink-0 mr-10">
					<Image className="w-40 h-40" src={ProfileImg} alt="Neil image" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-5xl font-PoppinsMedium text-[#444]">
						Kesmine
					</p>
					<p className="text-2xl text-[#444]">
						dominik@applaunch.ch
					</p>
				</div>

			</div>



			<div className='mt-20 space-y-14'>
				<h2 className='flex justify-between text-2xl'>
					Interest<span><Image src={Arrow} alt='#' width={7} /></span>
				</h2>
				<h2 className='flex justify-between text-2xl'>
					Browse Profile<span><Image src={Arrow} alt='#' width={7} /></span>
				</h2>
				<h2 className='flex justify-between text-2xl'>
					Terms & Conditions<span><Image src={Arrow} alt='#' width={7} /></span>
				</h2>
				<h2 className='flex justify-between text-2xl'>
					Invoice<span><Image src={Arrow} alt='#' width={7} /></span>
				</h2>



			</div>




		</div>
	);
};

export default Profile;
