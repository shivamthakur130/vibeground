import { User } from '@/types/User';
import get, { post, delete_, put, postFormData } from '@/lib/requests';
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
export const getUser = async (): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`/me`, true);
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

export const loginUser = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`/login`, dataReq, true);
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
export const forgotPassword = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`/forgot-password`, dataReq, true);
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

export const resetPassword = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`/reset-password`, dataReq, true);
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

export const googleLogin = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`/google/login`, dataReq, true);
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
//logout
export const logoutUser = async (): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`/logout`, {}, true);
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

export const getPlans = async (type: string): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`/plans/${type}`, true);
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

// getPlan
export const getPlanDetails = async (id: string): Promise<ReturnResponse> => {
	try {
		const { data } = await get(`/plans/get-details/${id}`, true);
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

export const updateUser = async (data: User): Promise<AxiosResponse<User>> => {
	return await put('/user', data);
};

export const deleteUser = async (): Promise<AxiosResponse<User>> => {
	return await delete_('/user');
};

export const fanEmail = async (data: any): Promise<AxiosResponse<User>> => {
	return await post('fan/email', data);
};

export const fanDetails = async (data: any): Promise<AxiosResponse<User>> => {
	return await post('fan/details', data);
};

export const fanPassword = async (data: any): Promise<AxiosResponse<User>> => {
	return await post(`fan/password`, data, true);
};

//fan/dob
export const fanDob = async (data: any): Promise<AxiosResponse<User>> => {
	return await post(`fan/dob`, data, true);
};

//fan/gender
export const fanGender = async (data: any): Promise<AxiosResponse<User>> => {
	return await post(`fan/gender`, data, true);
};

//fan/location
export const fanLocation = async (data: any): Promise<AxiosResponse<User>> => {
	return await post(`fan/location`, data, true);
};

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

//model/details
export const modelDetails = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`model/details`, dataReq, true);
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

//model/about
export const modelAbout = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`model/about`, dataReq, true);
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

//model/passport
export const modelPassport = async (
	dataReq: FormData
): Promise<ReturnResponse> => {
	try {
		const { data } = await postFormData(`model/passport`, dataReq, true);
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

//model/photos
export const modelPhotos = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await postFormData(`model/photos`, dataReq, true);
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

//model/videos
export const modelVideos = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await postFormData(`model/videos`, dataReq, true);
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
//model/links
export const modelLinks = async (dataReq: any): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`model/links`, dataReq, true);
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
//model/categories
export const modelCategories = async (
	dataReq: any
): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`model/categories`, dataReq, true);
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
export const sendStripeApiKey = async (
	dataReq: any
): Promise<ReturnResponse> => {
	try {
		const { data } = await post(`payments/sendStripeApiKey`, dataReq, true);
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

export const checkIfAuthorized = async (error: AxiosError) => {
	if (error.response?.status === 401) {
		if (window) {
			removeUserData();
			window.location.href = '/';
		}
	}
};
