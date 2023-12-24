'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getStripeApiKey } from '@/services/payment.service';
import { ErrorMessage } from '@/components/layout/ToastifyMessages';
import Loading from '@/components/layout/Loading';
import ManageBilling from '@/components/experience/ManageBilling';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { removeUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import PageWrapper from '@/components/common/PageWrapper';

export default function ManageBillingPage() {
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
				className="flex mx-auto justify-center w-96 h-96 items-center text-center"
			/>
		);
	}
	return (
		<PageWrapper>
			<div className="max-w-7xl mx-auto min-h-96">
				{stripeKey !== '' && (
					<Elements stripe={loadStripe(stripeKey)}>
						<ManageBilling />
					</Elements>
				)}
			</div>
		</PageWrapper>
	);
}
