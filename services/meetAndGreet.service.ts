import { ReturnResponse } from '@/types/ReturnResponse';
import get, { post, delete_, put } from '@/lib/requests';
import { AxiosError } from 'axios';
import { checkIfAuthorized } from '@/services/user.service';

//meet-and-greet/signup
export const signUp = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`meet-and-greet/signup`, dataReq, true);
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

//meet-and-greet/get
export const getAvailable = async (): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`meet-and-greet/get`, true);
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
