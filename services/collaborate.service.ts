import { ReturnResponse } from '@/types/ReturnResponse';
import get, { post } from '@/lib/requests';
import { AxiosError } from 'axios';
import { checkIfAuthorized } from '@/services/user.service';

//collaborate/signup
export const signUp = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`collaborate/signup`, dataReq, true);
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

//collaborate/get
export const getAvailable = async (): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`collaborate/get`, true);
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
//collaborate/get
export const getAvailableCollaborate = async (): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`collaborate/get`, true);
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
