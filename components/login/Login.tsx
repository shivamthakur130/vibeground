'use client';
import { post } from '../../lib/requests';
import * as Yup from 'yup';
import Image from 'next/image';
import Hand from '@/assets/images/hand.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setUser, updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { loginUser } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	LoadingMgs,
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [typeLogin, setTypeLogin] = useState('fan');
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required'),
		password: Yup.string().required('Password is required'),
		// type: Yup.string().required('Type is required'),
	});

	const changeLoginType = () => {
		setTypeLogin(typeLogin == 'fan' ? 'model' : 'fan');
	};

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
		login(formField);
	}
	const login = async (formField: any) => {
		LoadingMgs('Login Operation', 'Login...');
		setLoading(true);
		const { data, error } = await loginUser({
			email: formField.email,
			password: formField.password,
			type: typeLogin,
		});

		if (error) {
			setLoading(false);
			handleError(error);
			return;
		}
		if (typeof data === 'object' && data !== null && 'data' in data) {
			const userId = data.data._id;
			reset();
			dispatch(updateUser({ ...user, userId: userId, ...data.data }));
			SuccessMessage('Login Operation', 'Login success');
			if (typeLogin === 'fan') {
				push('/experience');
			} else {
				push('/dashboard');
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
	return (
		<div className="Login max-w-3xl mx-auto mt-24 mb-40 px-10 relative">
			<h2 className="text-5xl font-PoppinsBold text-111 flex items-center justify-center">
				Welcome to {typeLogin === 'fan' ? 'User' : 'Influencer'}{' '}
				<Image className="ml-8" src={Hand} alt="#" />
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
					<div className="pt-3 mt-4">
						<button
							type="button"
							onClick={changeLoginType}
							className="btn btn-default px-10 hover:bg-151515 hover:text-white py-3 text-xl text-303030 border rounded-[8px] transition-all duration-300 active:bg-303030 border-black">
							Are You {typeLogin}?
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
