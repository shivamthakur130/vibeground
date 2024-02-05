'use client';
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/layout/Loading';
import { useSelector } from 'react-redux';
import Header from '@/components/layout/Header';
import { getUser } from '@/services/user.service';
import { removeUser, updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import PageWrapper from './PageWrapper';
import { Transition } from '@headlessui/react';
import CollapseMenu from '@/components/common/CollapseMenu';

export default function AuthVerification({
	children,
	userType,
}: {
	children: React.ReactNode;
	userType: string;
}) {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const { push, replace } = useRouter();
	const messageTitle = userType === 'fan' ? 'User operation' : 'Model operation';
	const userData = useSelector((state: any) => state.userReducer.user);

	useEffect(() => {
		if (userType === 'fan' && userData?.type !== 'fan') {
			replace('/influencer');
		}
		if (userType === 'model' && userData?.type !== 'model') {
			replace('/experience');
		}
		(async () => {
			const { data, error } = await getUser();
			if (error) {
				handleError(error);
				logout();
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				const responseData = data?.data;
				dispatch(updateUser({ ...userData, ...responseData }));
				setIsLoading(false);
				return;
			}
			logout();
		})();
	}, []);

	const logout = () => {
		setIsLoading(false);
		dispatch(removeUser());
		push('/login');
	};

	const handleError = (error: any) => {
		if (
			error.response?.status === 401 ||
			error?.response?.data?.message === 'Unauthorized'
		) {
			dispatch(removeUser());
			push('/login');
		}
		if (error.response) {
			const message = error.response.data.message;
			ErrorMessage(messageTitle, message);
		} else if (error.request) {
			ErrorMessage(
				messageTitle,
				'Network Error. Please check your internet connection.'
			);
		} else {
			ErrorMessage(
				messageTitle,
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	// if (isLoading) {
	// 	return (
	// 		<Loading
	// 			width={50}
	// 			height={50}
	// 			className="flex absolute justify-center w-96
	// 		z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
	// 		/>
	// 	);
	// }

	return (
		<PageWrapper>
			<div className="min-h-screen">
				<CollapseMenu />
				<Header />
				<Transition
					appear
					show={isLoading}
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-99"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-99">
					<div className="fixed inset-0 bg-gray-100/50 z-50">
						<Loading
							width={50}
							height={50}
							className="flex absolute justify-center w-96
					z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
						/>
					</div>
				</Transition>

				{children}
				{/* <div className="w-full bg-[#151515]">
					<div className="max-w-7xl mx-auto py-20"> */}
				<Footer />
				{/* </div>
				</div> */}
			</div>
		</PageWrapper>
	);
}
