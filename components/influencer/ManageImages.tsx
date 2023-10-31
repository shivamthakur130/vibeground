import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProfileImg1 from '@/assets/images/profile_img.png';
import ProfileImg2 from '@/assets/images/profile_img2.png';
import ProfileImg3 from '@/assets/images/profile_img3.png';
import ProfileImg4 from '@/assets/images/profile_img4.png';
import ProfileImg5 from '@/assets/images/profile_img5.png';
import Video1 from '@/assets/images/video1.png';
import Video2 from '@/assets/images/video2.png';
import Video3 from '@/assets/images/video3.png';
import Play from '@/assets/images/svg/play.svg';
import Upload from '@/assets/images/svg/upload.svg';

const ManageImages = ({ user }: any) => {
	return (
		<div className="ManageImages max-w-7xl px-5 mx-auto mt-16 mb-32">
			<h2 className="text-5xl font-PoppinsSemiBold text-111 mb-6">
				Manage My Images
			</h2>

			<div className="flex items-center space-x-7">
				<div>
					<Image className="w-40 h-40" src={ProfileImg1} alt="Neil image" />
				</div>
				<div>
					<Image className="w-40 h-40" src={ProfileImg2} alt="Neil image" />
				</div>
				<div>
					<Image className="w-40 h-40" src={ProfileImg3} alt="Neil image" />
				</div>
				<div>
					<Image className="w-40 h-40" src={ProfileImg4} alt="Neil image" />
				</div>
				<div>
					<Image className="w-40 h-40" src={ProfileImg5} alt="Neil image" />
				</div>
				<div className="flex items-center justify-center">
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center w-40 h-40 rounded-xl cursor-pointer bg-[#f9f9f9] hover:bg-gray-100">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Image src={Upload} alt="#" />
						</div>
						<input id="dropzone-file" type="file" className="hidden" />
					</label>
				</div>
			</div>
			<h2 className="text-5xl font-PoppinsBold text-111 mt-8 mb-6">
				Manage my Vedios
			</h2>

			<div className="flex items-center space-x-7">
				<div className="relative bg-black group cursor-pointer rounded-md">
					<Image
						className="w-40 h-40 group-hover:opacity-80"
						src={Video1}
						alt="Neil image"
					/>
					<div className="w-40 h-40 absolute top-0 left-0 right-0 flex justify-center items-center">
						<Image className="w-14 h-14 " src={Play} alt="Neil image" />
					</div>
				</div>
				<div className="relative bg-black group cursor-pointer rounded-md">
					<Image
						className="w-40 h-40 group-hover:opacity-80"
						src={Video2}
						alt="Neil image"
					/>
					<div className="w-40 h-40 absolute top-0 left-0 right-0 flex justify-center items-center">
						<Image className="w-14 h-14 " src={Play} alt="Neil image" />
					</div>
				</div>
				<div className="relative bg-black group cursor-pointer rounded-md">
					<Image
						className="w-40 h-40 group-hover:opacity-80"
						src={Video3}
						alt="Neil image"
					/>
					<div className="w-40 h-40 absolute top-0 left-0 right-0 flex justify-center items-center">
						<Image className="w-14 h-14 " src={Play} alt="Neil image" />
					</div>
				</div>
				<div className="flex items-center justify-center">
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center w-40 h-40 rounded-xl cursor-pointer bg-[#f9f9f9] hover:bg-gray-100">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Image src={Upload} alt="#" />
						</div>
						<input id="dropzone-file" type="file" className="hidden" />
					</label>
				</div>
			</div>
			<h2 className="text-5xl font-PoppinsBold text-111 mt-8 mb-6">
				Manage my Links
			</h2>

			<div className="flex items-center space-x-7">
				<ul className="text-xl text-[#2799F6] space-y-7">
					<li>Jessica@applaunch.ch</li>
					<li>Jessica@applaunch.ch</li>
					<li>Jessica@applaunch.ch</li>
				</ul>
			</div>
		</div>
	);
};

export default ManageImages;
