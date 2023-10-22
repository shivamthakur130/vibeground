'use client';

import React from 'react';
import Image from 'next/image';
import FaceBook from 'assets/images/fb.png';
import Google from 'assets/images/google.png';
import Phone from 'assets/images/phone.png';
import Link from 'next/link';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { googleLogin, getUser } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import { useState, useEffect } from 'react';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import axios from 'axios';

const Registration = () => {
	const [loading, setLoading] = useState(false);
	const { replace } = useRouter();
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const login = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const { data } = await axios.get(
				'https://www.googleapis.com/oauth2/v1/userinfo',
				{
					headers: {
						Authorization: `Bearer ${tokenResponse.access_token}`,
					},
				}
			);
			const prepareRequest = {
				firstName: data.given_name,
				lastName: data.family_name,
				email: data.email,
				picture: data.picture,
				provider: 'google',
				providerId: data.id,
				access_token: tokenResponse.access_token,
			};
			loginGoogle(prepareRequest);
		},
	});
	const loginGoogle = async (formField: any) => {
		const { data, error } = await googleLogin(formField);
		if (error) {
			// setLoading(false);
			handleError(error);
			return;
		}
		console.log(data, 'data');
		if (typeof data === 'object' && data !== null && 'data' in data) {
			SuccessMessage('Google Login', 'Login Successfully');
			if (data.data.status) {
				dispatch(
					updateUser({
						...user,
						userId: data.data._id,
						...data.data,
					})
				);
			}
			replace('/account/are-you');
		} else {
			ErrorMessage('Google Login', 'Something went wrong');
		}
	};
	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response.data.message;
			ErrorMessage('Google Login', message);
		} else if (error.request) {
			ErrorMessage(
				'Google Login',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'Google Login',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};
	return (
		<div className="registration text-center mt-24 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111">Create account</h2>
			<p className="text-xl text-888 mt-3 mb-16">
				By Clicking Login, you agreeing our Terms and Polices
			</p>
			<ul className="max-w-[375px] mx-auto space-y-3">
				<li
					className="flex border border-black hover:bg-gray-100 cursor-pointer rounded-lg p-4 text-lg justify-between items-center"
					onClick={() => login()}>
					Continue with Google <Image src={Google} alt="#" />
				</li>
				{/* <li className="flex border border-black  hover:bg-gray-100 cursor-pointer rounded-lg p-4 text-lg justify-between items-center">
					Continue with Facebook <Image src={FaceBook} alt="#" />
				</li>
				<li className="flex border border-black  hover:bg-gray-100 cursor-pointer rounded-lg p-4 text-lg justify-between items-center">
					Continue with Phone number <Image src={Phone} alt="#" />
				</li> */}
				<li>
					<Link href="/account/are-you">
						<span className="btn btn-default flex border justify-center mt-5 border-black  cursor-pointer p-4 text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
							SIGN UP
						</span>
					</Link>
				</li>
			</ul>

			{/* <Link href="/account/are-you">
				<button className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
					SignUp
				</button>
			</Link> */}
		</div>
	);
};

export default Registration;
