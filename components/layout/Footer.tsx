'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Fb from '@/assets/images/facebook.png';
import Ig from '@/assets/images/insta.png';
import Tw from '@/assets/images/twitter.png';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Footer = () => {
	const userData = useSelector((state: any) => state.userReducer.user);
	const [userDetails, setUserDetails] = useState<any>(null);
	useEffect(() => {
		setUserDetails(userData);
	}, [userData]);
	return (
		<div className="w-full bg-[#151515] hidden sm:flex">
			<div className="max-w-7xl mx-auto py-20">
				<div className="footer text-white text-[15px] px-4 ">
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
						<div>
							<h3 className="text-22px font-bold">Vibeground.</h3>
							<p className="text-13px my-2.5">All Rights are Reserved 2023</p>
							<ul className="flex space-x-2">
								{/* <li>
							<a>
								<Image src={Fb} alt="Facebook" />
							</a>
						</li> */}
								<li>
									<a
										href="https://www.instagram.com/vibegroundofficial/"
										target="_blank">
										<Image src={Ig} alt="instagram" />
									</a>
								</li>
								<li>
									<a href="https://twitter.com/vibegroundoffic" target="_blank">
										<Image src={Tw} alt="twitter" />
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-22px font-bold mb-2">Company</h3>
							<ul className="space-y-1">
								{/* <li>
							<a href="/about-us">About Us</a>
						</li>
						<li>
							<a href="/careers">Careers</a>
						</li> */}
								<li>
									<Link href="/imprint">Imprint</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-22px font-bold mb-2">Conditions</h3>
							<ul className="space-y-1">
								<li>
									<Link href="/privacy-policy">Privacy Policy </Link>
								</li>
								<li>
									<Link href="/terms-of-use">Terms of use</Link>
								</li>
								{/* <li>
							<a href="/guidelines">Guidelines</a>
						</li> */}
							</ul>
						</div>
						<div>
							<h3 className="text-22px font-bold mb-2">Contact</h3>
							<ul className="space-y-1">
								<li>
									<Link href="/support">Support</Link>
								</li>
								<li>
									<Link href="/faq">FAQ</Link>
								</li>
							</ul>
						</div>
						{(userDetails?.token == '' || userDetails == null) && (
							<div>
								<Link href="account">
									<div className="rounded-[8px]  btn btn-default  py-4 px-6 bg-white hover:bg-gray-300  text-151515 cursor-pointer text-xl text-center transition-all duration-300 active:bg-gray-50 ">
										Join Today
									</div>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
