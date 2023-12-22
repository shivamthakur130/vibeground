import get, { post } from '@/lib/requests';
import { AxiosError } from 'axios';
interface ReturnResponse {
	data:
		| {
				message: string | string[];
				status: any;
				data: any;
		  }
		| string
		| null
		| Array<any>
		| object
		| undefined
		| any[];
	error: AxiosError | null;
}

//support
export const support = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`/support`, dataReq, false);
		return {
			data: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		return {
			data: null,
			error,
		};
	}
};

//cities/:countryCode
export const getCities = async (
	countryCode: string
): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`/cities/${countryCode}`, false);
		return {
			data: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		return {
			data: null,
			error,
		};
	}
};
