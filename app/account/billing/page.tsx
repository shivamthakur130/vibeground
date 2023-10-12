'use client';
import Billing from '@/components/home/Billing';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getStripeApiKey } from '@/services/payment.service';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { removeUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { ErrorMessage } from '@/components/common/Toastify';
import Loading from '@/components/common/Loading';

export default function BillingPage() {
	const { push } = useRouter();
	const dispatch = useAppDispatch();
	const [stripeKey, setStripeKey] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, error } = await getStripeApiKey();
			// console.log(data, error);
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
		if (error.response?.status === 401) {
			dispatch(removeUser());
			push('/login');
		}
		if (error.response) {
			let message = error.response.data.message;
			ErrorMessage('User Registration', message);
		} else if (error.request) {
			ErrorMessage(
				'User Registration',
				'Network Error. Please check your internet connection.'
			);
		} else {
			ErrorMessage(
				'User Registration',
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
