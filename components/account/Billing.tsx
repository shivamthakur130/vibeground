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
import { useState, useEffect } from 'react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { processPayment } from '@/services/payment.service';
import user, { removeUser } from '@/redux/slice/user';
import { useRouter } from 'next/navigation';
import paymentIntents from '@stripe/stripe-js';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import Loading from '@/components/layout/Loading';
import { makeSubscription, getPlanDetails } from '@/services/user.service';
import { updateUser } from '@/redux/slice/user';

const Billing = () => {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useAppDispatch();
	const [selectedPlan, setSelectedPlan] = useState<any>(null);
	const userData = useAppSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();
	const messageTitle =
		userData.type === 'fan' ? 'User Registration' : 'Model Registration';
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const [cardNumberCheck, setCardNumberCheck] = useState(false);
	const [cardExpiryCheck, setCardExpiryCheck] = useState(false);
	const [cardCvcCheck, setCardCvcCheck] = useState(false);
	const [validationCheck, setValidationCheck] = useState({
		cardNumber: '',
		cardExpiry: '',
		cardCvc: '',
		cardName: '',
		address: '',
	});
	const [cardNameCheck, setCardNameCheck] = useState(false);
	const [addressCheck, setAddressCheck] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);

	const fetchPlan = async () => {
		try {
			const { data, error } = await getPlanDetails(userData.planId);
			if (error) {
				setIsProcessingPayment(false);
				handleError(error);
				return;
			}
			if (typeof data === 'object' && data !== null && 'data' in data) {
				setSelectedPlan(data.data);
			} else {
				ErrorMessage(
					messageTitle,
					'Something went wrong with plan selected please try again later.'
				);
			}
			setIsProcessingPayment(false);
		} catch (error) {}
	};
	useEffect(() => {
		if (userData.planId) {
			fetchPlan();
		}
	}, []);

	const handleFormChange = () => {
		let numberCheck = false;
		let expiryCheck = false;
		let cvcCheck = false;
		(elements?.getElement('cardNumber') as StripeCardNumberElement).on(
			'change',
			function (event) {
				if (event.complete) {
					setCardNumberCheck(true);
					setValidationCheck({ ...validationCheck, cardNumber: '' });
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
					setValidationCheck({ ...validationCheck, cardExpiry: '' });
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
					setValidationCheck({ ...validationCheck, cardCvc: '' });
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

		if (cardName) {
			setValidationCheck({ ...validationCheck, cardName: '' });
		}
		setCardNameCheck(cardName);
		if (address) {
			setValidationCheck({ ...validationCheck, address: '' });
		}
		setAddressCheck(address);

		const flagCheck =
			cardNumberCheck && cardExpiryCheck && cardCvcCheck && cardName && address;
		setIsFormValid(flagCheck);
	};

	const makeSubscriptionUpdate = async (prepareStripeResponse: any) => {
		setIsProcessingPayment(true);
		const { data, error } = await makeSubscription({
			planId: userData.planId,
			subscriptionId: userData.subscriptionId,
			userId: userData.userId,
			...prepareStripeResponse,
			address: (document.getElementById('address') as HTMLInputElement)?.value,
		});
		if (error) {
			setIsProcessingPayment(false);
			handleError(error);
			return;
		}

		if (typeof data === 'object' && data !== null && 'data' in data) {
			if (!data.status) {
				ErrorMessage(messageTitle, data.message);
				setIsProcessingPayment(false);
				return;
			}
			SuccessMessage(messageTitle, 'Subscription successfully activated');
			const subscriptionDetails = data.data.subscriptionDetails;
			dispatch(
				updateUser({
					...userData,
					// status: subscriptionDetails.status,
					subscription: subscriptionDetails,
					expiry_date: subscriptionDetails?.expiry_date,
					purchase_date: subscriptionDetails?.purchase_date,
				})
			);
			if (userData.type === 'fan') {
				push('/experience');
				return;
			}
			if (userData.type === 'model') {
				push('/account/pictures');
				return;
			}
		} else {
			ErrorMessage(messageTitle, 'Something went wrong');
		}
		setIsProcessingPayment(false);
	};

	const stripeConfirmPayment = async (client_secret: string) => {
		if (!stripe || !elements || !client_secret) {
			ErrorMessage(messageTitle, 'Stripe or Elements not available.');
			return;
		}
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
			.then(async (result) => {
				if (result.error) {
					console.log('Payment error:', result.error);
					if (result.error.message) {
						ErrorMessage(messageTitle, result.error.message);
					}
					setIsProcessingPayment(false);
					return;
				}
				if (result?.paymentIntent?.status == 'succeeded') {
					// localStorage.setItem(
					// 	'paymentIntent',
					// 	JSON.stringify(result?.paymentIntent)
					// );

					SuccessMessage(messageTitle, 'Payment successfully completed!');
					const prepareStripeResponse = {
						paymentIntentId: result?.paymentIntent?.id,
						status: result?.paymentIntent?.status,
						response: result,
					};
					await makeSubscriptionUpdate(prepareStripeResponse);
					setIsProcessingPayment(false);
				} else {
					ErrorMessage(messageTitle, 'Payment was not successful');
					console.log('Payment was not successful:', result.paymentIntent);
					const prepareStripeResponse = {
						paymentIntentId: result?.paymentIntent?.id,
						status: result?.paymentIntent?.status,
						response: result,
					};
					await makeSubscriptionUpdate(prepareStripeResponse);
					setIsProcessingPayment(false);
				}
			})
			.catch((error) => {
				setIsProcessingPayment(false);
				ErrorMessage(messageTitle, 'Error occurred during payment');
				console.log('Error occurred during payment:', error);
			});
	};

	useEffect(() => {}, [isFormValid]);

	const handlePayment = async () => {
		// check if form is valid
		if (!cardNumberCheck) {
			setValidationCheck({
				...validationCheck,
				cardNumber: 'Card number is required',
			});
			setIsFormValid(!isFormValid);
			return;
		} else {
			setValidationCheck({
				...validationCheck,
				cardNumber: '',
			});
		}

		if (!cardExpiryCheck) {
			setValidationCheck({
				...validationCheck,
				cardExpiry: 'Card expiry is required',
			});
			setIsFormValid(!isFormValid);
			return;
		} else {
			setValidationCheck({
				...validationCheck,
				cardExpiry: '',
			});
		}
		if (!cardCvcCheck) {
			setValidationCheck({ ...validationCheck, cardCvc: 'Card cvc is required' });
			setIsFormValid(!isFormValid);
			return;
		} else {
			setValidationCheck({
				...validationCheck,
				cardCvc: '',
			});
		}
		if (!cardNameCheck) {
			setValidationCheck({
				...validationCheck,
				cardName: 'Card name is required',
			});
			setIsFormValid(!isFormValid);
			return;
		} else {
			setValidationCheck({
				...validationCheck,
				cardName: '',
			});
		}

		if (!addressCheck) {
			setValidationCheck({ ...validationCheck, address: 'Address is required' });
			setIsFormValid(!isFormValid);
			return;
		} else {
			setValidationCheck({
				...validationCheck,
				address: '',
			});
		}

		if (!isProcessingPayment) {
			setIsProcessingPayment(true);
			try {
				const { data, error } = await processPayment({
					userid: userData.userId,
					planid: userData.planId,
				});
				if (error) {
					setIsProcessingPayment(false);
					handleError(error);
					return;
				}
				if (typeof data === 'object' && data !== null && 'data' in data) {
					const client_secret = data.data.client_secret;
					if (client_secret) {
						stripeConfirmPayment(client_secret);
					} else {
						setIsProcessingPayment(false);
						ErrorMessage(
							messageTitle,
							'Error occurred during payment, contact support or try again later.'
						);
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
	console.log('validationCheck', validationCheck);
	return (
		<div className="Billing max-w-4xl mx-auto mt-24 mb-20 relative px-4">
			<div className="mx-auto grid md:grid-cols-6 grid-flow-row md:grid-flow-col gap-4">
				<div className="mx-auto">
					<div className="h-24 w-24 rounded-[20px] bg-[#282626] flex items-center justify-center mb-3.5">
						<Image src={Card} alt="#" />
					</div>
					{/* <div className="h-24 w-24 rounded-[20px] bg-[#DBDBDB] flex items-center justify-center">
						<Image src={PayPal} alt="#" />
					</div> */}
				</div>
				{isProcessingPayment && (
					<Loading
						width={50}
						height={50}
						className="flex absolute justify-center w-96
						z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
					/>
				)}
				<div
					className={`md:col-span-5  ${isProcessingPayment ? 'opacity-25' : ''}`}>
					<h2 className="text-xl text-center md:text-left md:text-4xl font-PoppinsBold text-111 mb-8">
						Enter your billing information
					</h2>

					<CardNumberElement
						className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
						id="cardNumber"
						onChange={handleFormChange}
					/>
					{validationCheck.cardNumber && (
						<div className="text-111 text-xs font-PoppinsMedium mt-2 ml-4">
							<span className="text-red-500">Card number is required</span>
						</div>
					)}

					<div className="grid grid-flow-col grid-cols-8 gap-6 my-6">
						<div className="col-span-3">
							<CardExpiryElement
								id="cardExpiry"
								className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
								onChange={handleFormChange}
							/>
							{validationCheck.cardExpiry && (
								<div className="text-111 text-xs font-PoppinsMedium mt-2 ml-4">
									<span className="text-red-500">Expiry is required</span>
								</div>
							)}
						</div>
						<div className="col-span-5">
							<CardCvcElement
								id="cardCvc"
								className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
								onChange={handleFormChange}
							/>
							{validationCheck.cardCvc && (
								<div className="text-111 text-xs font-PoppinsMedium mt-2 ml-4">
									<span className="text-red-500">CVC is required</span>
								</div>
							)}
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
						{validationCheck.cardName && (
							<div className="text-111 text-xs font-PoppinsMedium mt-2 ml-4">
								<span className="text-red-500">Card name is required</span>
							</div>
						)}
					</div>
					<div className="py-2">
						<input
							className="rounded-3xl bg-black/25 w-full px-5 py-4 text-xs text-[#3f3f3f] placeholder:text-[#3f3f3f]"
							type="text"
							name="address"
							id="address"
							placeholder="Address"
							onKeyUp={handleFormChange}
							onChange={handleFormChange}
						/>
						{validationCheck.address && (
							<div className="text-111 text-xs font-PoppinsMedium mt-2 ml-4">
								<span className="text-red-500">Address is required</span>
							</div>
						)}
					</div>
					<div className="mt-6">
						{/* <div className="flex justify-between">
							<h3 className="font-PoppinsBold">25 Boosts</h3>
							<span className="text-111">${selectedPlan?.price}/each</span>
						</div> */}
						{/* <div className="flex justify-between mt-2">
							<h3 className="font-PoppinsBold">Charged as</h3>
							<span className="text-111">€{selectedPlan?.price}</span>
						</div> */}
						<div className="flex justify-between mt-10">
							<button
								className={`btn btn-default px-7 py-3 bg-2f2f2f text-white rounded-lg self-center transition-all duration-300 active:bg-303030 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3f3f3f] ${
									isProcessingPayment || !selectedPlan
										? 'opacity-50 cursor-not-allowed'
										: ''
								}}`}
								type="button"
								disabled={isProcessingPayment || !selectedPlan}
								onClick={handlePayment}>
								{isProcessingPayment ? 'Processing...' : 'Confirm Purchase'}
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
