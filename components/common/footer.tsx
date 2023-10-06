'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Fb from 'assets/images/facebook.png';
import Ig from 'assets/images/insta.png';
import Tw from 'assets/images/twitter.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Footer = () => {
	return (
		<div className="footer text-white text-[15px]">
			<div className="grid grid-flow-col">
				<div>
					<h3 className='text-22px font-bold'>Vibeground.</h3>
					<p className='text-13px my-2.5'>All Rights are Reserved 2023</p>
					<ul className='flex space-x-2'>
						<li><a><Image src={Fb} alt='Facebook' /></a></li>
						<li><a><Image src={Ig} alt='instagram' /></a></li>
						<li><a><Image src={Tw} alt='twitter' /></a></li>
					</ul>
				</div>
				<div>
					<h3 className='text-22px font-bold mb-2'>Company</h3>
					<ul className='space-y-1'>
						<li><Link href='/about-us'>About Us</Link></li>
						<li><Link href='/careers'>Careers</Link></li>
						<li><Link href='/imprint'>Imprint</Link></li>
					</ul>
				</div>
				<div>
					<h3 className='text-22px font-bold mb-2'>Conditions</h3>
					<ul className='space-y-1'>
						<li><Link href='privacy'>Privacy </Link></li>
						<li><Link href='terms'>Terms</Link></li>
						<li><Link href='/guidelines'>Guidelines</Link></li>
					</ul>
				</div>
				<div>
					<h3 className='text-22px font-bold mb-2'>Contact</h3>
					<ul className='space-y-1'>
						<li><Link href='/support'>Support</Link></li>
						<li><Link href='/security'>Security</Link></li>
						<li><Link href='/safety-tips'>Safety Tips</Link></li>
					</ul></div>
				<div >
					<div className='btn py-4 px-6 bg-white rounded text-151515 cursor-pointer text-xl text-center'>Join Today</div>
				</div>
			</div>


		</div>
	);
};

export default Footer;
