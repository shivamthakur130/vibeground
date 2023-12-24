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

//get-all-models
export const getAllModels = async (): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`/users/get-all-models`, true);
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

//users/get-all-models/:id
export const getSingleModel = async (id: string): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`/users/get-all-models/${id}`, true);
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
