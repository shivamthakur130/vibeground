import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Upload from '@/assets/images/svg/upload.svg';
const AddLinks = () => {
	return (
		<div className="Email text-center max-w-3xl mx-auto mt-40 mb-40">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Add my links
			</h2>
			<ul>
				<li>kdfjkjdf</li>
				<li>kdfjkjdf</li>
				<li>kdfjkjdf</li>
			</ul>
			<Link href="/influencer/categories">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default AddLinks;
