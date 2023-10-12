'use client';

import React from 'react';
import Image from 'next/image';
import Card from '@/assets/images/card.png';
import PayPal from '@/assets/images/paypal.png';
import Lock from '@/assets/images/lock.png';
import {
	StripeCardExpiryElement,
	StripeCardNumberElement,
	StripeCardCvcElement,
} from '@stripe/stripe-js';
import { useState } from 'react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { processPayment } from '@/services/payment.service';
import { removeUser } from '@/redux/slice/user';
import { useRouter } from 'next/navigation';
import paymentIntents from '@stripe/stripe-js';
import { SuccessMessage, ErrorMessage } from '@/components/common/Toastify';
import Loading from '@/components/common/Loading';

const Billing = () => {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const [cardNumberCheck, setCardNumberCheck] = useState(false);
	const [cardExpiryCheck, setCardExpiryCheck] = useState(false);
	const [cardCvcCheck, setCardCvcCheck] = useState(false);
	const [cardNameCheck, setCardNameCheck] = useState(false);
	const [addressCheck, setAddressCheck] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleFormChange = () => {
		let numberCheck = false;
		let expiryCheck = false;
		let cvcCheck = false;
		(elements?.getElement('cardNumber') as StripeCardNumberElement).on(
			'change',
			function (event) {
				if (event.complete) {
					setCardNumberCheck(true);
				} else if (event.error || event.empty) {
					setCardNumberCheck(false);
				}
			}
		);
		(elements?.getElement('cardExpiry') as StripeCardExpiryElement).on(
			'change',
			function (event) {
				if (event.complete) {
					setCardExpiryCheck(true);
				} else if (event.error || event.empty) {
					setCardExpiryCheck(false);
				}
			}
		);
		(elements?.getElement('cardCvc') as StripeCardCvcElement).on(
			'change',
			function (event) {
				if (event.complete) {
					setCardCvcCheck(true);
				} else if (event.error || event.empty) {
					setCardCvcCheck(false);
				}
			}
		);
		const cardName =
			(document.getElementById('cardName') as HTMLInputElement)?.value != ''
				? true
				: false;
		const address =
			(document.getElementById('address') as HTMLInputElement)?.value != ''
				? true
				: false;
		setCardNameCheck(cardName);
		setAddressCheck(address);

		const flagCheck =
			cardNumberCheck && cardExpiryCheck && cardCvcCheck && cardName && address;
		setIsFormValid(flagCheck);
	};
	// console.log(userData);
	const handlePayment = async () => {
		// if (splitCurrentPath?.[1] == 'infulencer') {
		if (isFormValid && !isProcessingPayment) {
			setIsProcessingPayment(true);
			try {
				const { data, error } = await processPayment({
					userid: userData.userId,
					planid: userData.planId,
				});
				console.log(data, 'data');
				if (error) {
					setIsProcessingPayment(false);
					handleError(error);
					return;
				}
				if (typeof data === 'object' && data !== null && 'data' in data) {
					const client_secret = data.data.client_secret;
					if (!stripe || !elements || !client_secret) {
						console.log('Stripe or Elements not available.');
						return;
					}
					if (client_secret) {
						stripe
							.confirmCardPayment(client_secret, {
								payment_method: {
									card: elements.getElement(CardNumberElement),
									billing_details: {
										name: userData?.firstName ? userData.firstName : 'N/A',
										email: userData?.email ? userData.email : 'example@example.com',
										// address: {
										//   city: shippingInfo.city,
										// },
									},
								},
							} as paymentIntents.ConfirmCardPaymentData)
							.then((result) => {
								if (result.error) {
									console.log('Payment error:', result.error);
									if (result.error.message) {
										ErrorMessage('User Registration', result.error.message);
									}
									return;
								}
								if (result?.paymentIntent?.status == 'succeeded') {
									localStorage.setItem(
										'paymentIntent',
										JSON.stringify(result?.paymentIntent)
									);
									console.log(result, 'result');

									SuccessMessage('User Registration', 'Payment successfully completed!');
									push('/experience');
									// createOrder({
									// 	id: result.paymentIntent.id,
									// 	status: result.paymentIntent.status,
									// 	result: result,
									// });
									// navigate('/infulencer/pictures');
									// toast.success('Infulencer Payment successfully completed!', {
									// 	autoClose: 2000,
									// });
								} else {
									ErrorMessage('User Registration', 'Payment was not successful');
									console.log('Payment was not successful:', result.paymentIntent);
								}
								setIsProcessingPayment(false);
							})
							.catch((error) => {
								setIsProcessingPayment(false);
								ErrorMessage('User Registration', 'Error occurred during payment');
								console.log('Error occurred during payment:', error);
							});
					}
				}
			} catch (error) {
				setIsProcessingPayment(false);
				console.log(error);
			}
		}
	};
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
	// console.log(isFormValid, 'isFormValid');
	return (
		<div className="Billing max-w-4xl mx-auto mt-24 mb-40 relative">
			<div className="mx-auto grid grid-cols-6 grid-flow-col gap-4">
				<div>
					<div className="h-28 w-32 rounded-[20px] bg-[#282626] flex items-center justify-center mb-3.5">
						<Image src={Card} alt="#" />
					</div>
					<div className="h-28 w-32 rounded-[20px] bg-[#DBDBDB] flex items-center justify-center">
						<Image src={PayPal} alt="#" />
					</div>
				</div>
				{isProcessingPayment && (
					<Loading
						width={50}
						height={50}
						className="flex absolute justify-center w-96
						z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
					/>
				)}
				<div className={`col-span-5 ${isProcessingPayment ? 'opacity-25' : ''}`}>
					<h2 className="text-4xl font-PoppinsBold text-111 mb-8">
						Enter Your Billing information
					</h2>
					<CardNumberElement
						className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
						id="cardNumber"
						onChange={handleFormChange}
					/>
					<div className="grid grid-flow-col grid-cols-8 gap-6 my-6">
						<div className="col-span-3">
							<CardExpiryElement
								id="cardExpiry"
								className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
								onChange={handleFormChange}
							/>
						</div>
						<div className="col-span-5">
							<CardCvcElement
								id="cardCvc"
								className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
								onChange={handleFormChange}
							/>
						</div>
					</div>
					<div className="py-2">
						<input
							className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
							type="text"
							id="cardName"
							placeholder="Name of Card"
							onKeyUp={handleFormChange}
						/>
					</div>
					<div className="py-2">
						<input
							className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
							type="text"
							name="address"
							id="address"
							placeholder="Address"
							onKeyUp={handleFormChange}
						/>
					</div>
					<div className="mt-6">
						<div className="flex justify-between">
							<h3 className="font-PoppinsBold">25 Boosts</h3>
							<span className="text-111">$300/each</span>
						</div>
						<div className="flex justify-between mt-2">
							<h3 className="font-PoppinsBold">Charged as</h3>
							<span className="text-111">$300</span>
						</div>
						<div className="flex justify-between mt-10">
							<button
								className="btn btn-default px-7 py-3 bg-2f2f2f text-white rounded-lg self-center transition-all duration-300 active:bg-303030 "
								type="button"
								disabled={!isFormValid || isProcessingPayment}
								onClick={handlePayment}>
								Confirm Purchase
							</button>
							<span className="text-111 flex items-center font-PoppinsMedium text-sm">
								<Image className="mr-1.5" src={Lock} alt="#" /> Secure
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Billing;
