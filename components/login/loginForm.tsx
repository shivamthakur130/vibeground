'use client';
import Image from 'next/image';
import User from 'assets/images/user.svg';
import Lock from 'assets/images/lock.svg';
import { post } from '../../lib/requests';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import {
	LoadingMgs,
	SuccessMessage,
	ErrorMessage,
} from '@/components/common/toastify';

interface LoginProps {
	token: string | null;
}

const LoginForm = ({ token }: LoginProps) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const user = useSelector((state: any) => state.userReducer.user);
	const [accountType, setAccountType] = useState('false');
	const [multipleUsers, setMultipleUsers] = useState([]);
	const { push } = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Email is required'),
		password: Yup.string().required('Password is required'),
		type: Yup.string().required('Type is required'),

		// account required only for multiple users
		account: Yup.string().test(
			'account-validation',
			'Account is required when type is multiple accounts',
			function (value, context) {
				if (context.parent.type === 'true' && (!value || value.trim() === '')) {
					console.log(context.parent.type, 'context.parent.type');
					return this.createError({
						path: 'account',
						message: 'Account is required when type is multiple accounts',
					});
				}
				return true;
			}
		),
	});

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
	const login = async (data: any) => {
		LoadingMgs('Login Operation', 'Login...');
		setLoading(true);
		try {
			const res = await post('/auth/login', data);

			if (res.data.success) {
				if (res.data.data.login) {
					SuccessMessage('Login Operation', 'Login success');
					reset();
					dispatch(setUser(res?.data?.data));
					push('/dashboard');
				} else {
					SuccessMessage('Login Operation', 'You have multiple accounts');
					setAccountType('true');
					setValue('type', 'true');
					setMultipleUsers(res.data.data.users);
				}
			} else {
				let message = res.data.error.map((err: any) => {
					return err.message;
				});
				message = message.join(', ');
				console.log(message);
				ErrorMessage('Login Operation', message);
			}
			setLoading(false);
		} catch (error) {
			handleError(error);
			setLoading(false);
		}
	};
	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response.data.error.message;
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
		<>
			<form
				className=" lg:w-[400px] min-w-[325px]"
				onSubmit={handleSubmit(onSubmit)}>
				<label className="relative block mt-5">Username</label>
				<label className="relative block mt-2">
					<input
						className="border-solid border-[#dddddd] bg-white  w-full p-3 items-center px-5 border rounded-2xl placeholder:text-[#DDDDDD]"
						placeholder="username"
						// value={'jane_smith'}
						{...register('username', {
							onChange: (e) => {},
						})}
					/>
					<Image
						className="absolute right-4 top-4"
						src={User}
						height={18}
						width={15}
						alt="#"></Image>
				</label>
				{errors.username?.message && (
					<div className="text-red-600 text-xs ml-3 my-1">
						{errors.username?.message}
					</div>
				)}
				<input
					type="hidden"
					value={accountType}
					{...register('type', {
						onChange: (e) => {
							setAccountType(e.target.value);
						},
					})}
				/>
				<label className="relative block mt-5">Password</label>
				<label className="relative block mt-2">
					<input
						className="border-solid border-[#dddddd] bg-white  w-full p-3 items-center px-5 border rounded-2xl placeholder:text-[#DDDDDD]"
						type="password"
						// value={'test123'}
						placeholder="***************"
						{...register('password', {
							onChange: (e) => {},
						})}
					/>
					<Image
						className="absolute right-4 top-4"
						src={Lock}
						height={20}
						width={18.5}
						alt="#"></Image>
				</label>
				{errors.password?.message && (
					<div className="text-red-600 text-xs ml-3 my-1">
						{errors.password?.message}
					</div>
				)}
				{multipleUsers && multipleUsers?.length > 0 && (
					<>
						<label className="relative block mt-5">Organization</label>
						{multipleUsers?.map((user: any) => {
							return (
								<div className="flex items-center mt-5 ml-3" key={user.id}>
									<input
										type="radio"
										className="form-radio h-5 w-5 text-[#8974f6]"
										value={user.org_id}
										id={user.id}
										{...register('account', {})}
									/>
									<label htmlFor={user.id} className="ml-2 text-sm text-gray-700">
										{user.org_id}
									</label>
								</div>
							);
						})}
					</>
				)}
				{errors.account?.message && (
					<div className="text-red-600 text-xs ml-3 my-1">
						{errors.account?.message}
					</div>
				)}
				<label className="relative block my-7">
					<button
						type="submit"
						className="border-[#8974f6] shadow-[0px_2px_4px_0px_rgba(0,_0,_0,_0.25)] bg-[#8974f6] w-full rounded-2xl text-white uppercase p-3 font-bold text-sm">
						Login
					</button>
				</label>
			</form>
		</>
	);
};

export default LoginForm;
