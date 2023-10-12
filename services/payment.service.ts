import { ReturnResponse } from '@/types/ReturnResponse';
import get, { post, delete_, put } from '@/lib/requests';
import { AxiosError } from 'axios';
import { checkIfAuthorized } from '@/services/user.service';
//make/subscription
export const makeSubscription = async (
	dataReq: any
): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`subscription/make`, dataReq, true);
		return {
			data: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		await checkIfAuthorized(error);
		return {
			data: null,
			error,
		};
	}
};

//payments/sendStripeApiKey
export const getStripeApiKey = async (): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`payments/sendStripeApiKey`, true);
		return {
			data: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		await checkIfAuthorized(error);
		return {
			data: null,
			error,
		};
	}
};
//payments/processPayment
export const processPayment = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`payments/processPayment`, dataReq, true);
		return {
			data: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		await checkIfAuthorized(error);
		return {
			data: null,
			error,
		};
	}
};
