'use client';
import Billing from '@/components/account/Billing';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getStripeApiKey } from '@/services/payment.service';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { removeUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import Loading from '@/components/layout/Loading';
import { useAppSelector } from '@/redux/hooks';

export default function BillingPage() {
	const { push } = useRouter();
	const dispatch = useAppDispatch();
	const [stripeKey, setStripeKey] = useState('');
	const [loading, setLoading] = useState(false);
	const userData = useAppSelector((state: any) => state.userReducer.user);
	const messageTitle =
		userData.type === 'fan' ? 'User Registration' : 'Model Registration';
	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, error } = await getStripeApiKey();
			if (error) {
				setLoading(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				setStripeKey(data.data.api_key);
			}
			setLoading(false);
		})();
	}, []);
	const handleError = (error: any) => {
		if (
			error.response?.status === 401 ||
			error?.response?.data?.message === 'Unauthorized'
		) {
			dispatch(removeUser());
			push('/login');
		}
		if (error.response) {
			console.log(error.response.data);
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

	if (loading) {
		return (
			<Loading
				width={50}
				height={50}
				className="flex absolute justify-center w-96
				z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
			/>
		);
	}
	return (
		<div className="max-w-7xl mx-auto">
			{stripeKey !== '' && (
				<Elements stripe={loadStripe(stripeKey)}>
					<Billing />
				</Elements>
			)}
		</div>
	);
}
