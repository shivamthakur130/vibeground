'use client';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { loginUser, googleLogin } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import Link from 'next/link';
import { getLoginType, setLoginType } from '@/lib/useLocalStorageUser';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [typeLogin, setTypeLogin] = useState('fan');

	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { replace } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required'),
		password: Yup.string().required('Password is required'),
		// type: Yup.string().required('Type is required'),
	});
	useEffect(() => {
		if (user?.token !== '' && user?.token !== null) {
			if (user?.type === 'fan') {
				replace('/experience');
			} else if (user?.type === 'model') {
				replace('/influencer');
			}
		}
		const loginType = getLoginType();
		if (loginType) {
			setTypeLogin(loginType);
		}
		return () => {};
	}, []);

	// const changeLoginType = () => {
	// 	const type = typeLogin == 'fan' ? 'model' : 'fan';
	// 	setTypeLogin(type);
	// };

	const formOptions = { resolver: yupResolver(validationSchema) };
	// get functions to build form with useForm() hook
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		reset,
		formState,
	} = useForm(formOptions);
	const { errors } = formState;

	async function onSubmit(formField: any) {
		const prepareRequest = {
			email: formField.email,
			password: formField.password,
			type: typeLogin,
		};
		login(prepareRequest);
	}

	const login = async (prepareRequest: any) => {
		// LoadingMgs('Login Operation', 'Login...');
		setLoading(true);
		const { data, error } = await loginUser({ ...prepareRequest });

		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		if (typeof data === 'object' && data !== null && 'data' in data) {
			const userId = data.data._id;
			reset();
			dispatch(updateUser({ ...user, userId: userId, ...data.data }));
			setLoginType(typeLogin);
			if (data.data.type === 'fan') {
				//check if user is inactive then redirect to account page
				if (data.data.status === 'inactive') {
					replace('/account/dob');
					return;
				} else {
					replace('/experience');
				}
			} else {
				//check if user is inactive then redirect to account page
				if (data.data.status === 'inactive') {
					replace('/account/about');
					return;
				} else {
					replace('/influencer');
				}
			}
		} else {
			ErrorMessage('Login Operation', 'Something went wrong');
		}
		setLoading(false);
	};

	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response?.data.message;
			ErrorMessage('Login Operation', message);
		} else if (error.request) {
			ErrorMessage(
				'Login Operation',
				'Network Error. Please check your internet connection.'
			);
		} else {
			// Something else happened while setting up the request
			ErrorMessage(
				'Login Operation',
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	// const loginGoogle = useGoogleLogin({
	// 	onSuccess: async (tokenResponse) => {
	// 		const { data } = await axios.get(
	// 			'https://www.googleapis.com/oauth2/v1/userinfo',
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${tokenResponse.access_token}`,
	// 				},
	// 			}
	// 		);
	// 		const prepareRequest = {
	// 			firstName: data.given_name,
	// 			lastName: data.family_name,
	// 			email: data.email,
	// 			picture: data.picture,
	// 			provider: 'google',
	// 			providerId: data.id,
	// 			access_token: tokenResponse.access_token,
	// 		};
	// 		loginGoogle_(prepareRequest);
	// 	},
	// });
	// const loginGoogle_ = async (formField: any) => {
	// 	const { data, error } = await googleLogin(formField);
	// 	if (error) {
	// 		// setLoading(false);
	// 		handleError(error);
	// 		return;
	// 	}
	// 	if (typeof data === 'object' && data !== null && 'data' in data) {
	// 		if (data.data.status) {
	// 			dispatch(
	// 				updateUser({
	// 					...user,
	// 					userId: data.data._id,
	// 					...data.data,
	// 				})
	// 			);
	// 		}
	// 		if (data.data.type === 'fan') {
	// 			replace('/experience');
	// 		} else {
	// 			replace('/influencer');
	// 		}
	// 	} else {
	// 		ErrorMessage('Google Login', 'Something went wrong');
	// 	}
	// };

	return (
		<div className="Login max-w-3xl mx-auto mt-24 mb-40 px-10 relative">
			<h2 className="text-5xl font-PoppinsBold text-111 flex items-center justify-center">
				Login
			</h2>
			{loading && (
				<Loading
					width={50}
					height={50}
					className="flex absolute justify-center w-96
				z-50 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				/>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`flex flex-col max-w-md mx-auto space-y-3 mt-5 ${
					loading ? 'opacity-25' : ''
				}`}>
				<div>
					<input
						type="email"
						id="email"
						className="border mt-4 border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-5 "
						placeholder="Enter email address"
						{...register('email', {
							onChange: (e) => {},
						})}
					/>
					{errors.email?.message && (
						<div className="text-red-600 h-5 mt-2 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.email?.message}
						</div>
					)}
				</div>
				<div>
					<input
						type="password"
						id="password"
						className="border mb-2 mt-4 border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-5 "
						placeholder="Enter password"
						{...register('password', {
							onChange: (e) => {},
						})}
					/>
					{errors.password?.message && (
						<div className="text-red-600 h-5 mb-5 text-lg font-PoppinsRegular ml-3 text-left transition delay-150 transform duration-300 ease-in-out">
							{errors.password?.message}
						</div>
					)}

					<div className="text-303030 text-sm font-PoppinsRegular ml-3 text-right transition delay-150 transform duration-300 ease-in-out hover:underline">
						<Link href="/login/forgot-password" className="">
							Forgot Password?
						</Link>
					</div>
				</div>
				<div className="text-center">
					<div>
						<button
							className="w-full px-24 py-4 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030"
							type="submit"
							disabled={loading}>
							Login
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
