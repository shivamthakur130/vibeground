import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProfileImg from '@/assets/images/profile_img.png';
import Post2 from '@/assets/images/p02.png';
import Post3 from '@/assets/images/p03.png';
import Croun from '@/assets/images/svg/croun2.svg';
import Heart from '@/assets/images/heart.png';
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
		</div>
	);
};

export default Profile;
