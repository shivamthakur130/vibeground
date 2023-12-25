import { User } from '@/types/User';
import get, {
	post,
	delete_,
	put,
	putFormData,
	postFormData,
} from '@/lib/requests';
import { AxiosResponse, AxiosError } from 'axios';
import { removeUserData } from '@/lib/useLocalStorageUser';
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

//favorite/add
export const addFavorite = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`/favorite/add`, dataReq, true);
		return {
			data: data,
			error: null,
		};
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

//favorite/get-all

export const getFavorites = async (): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`/favorite/get-all`, true);
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
