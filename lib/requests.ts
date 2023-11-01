import axiosPrepare from './axios';
import axios from 'axios';
import { getUser } from './useLocalStorageUser';
import { CancelToken, AxiosResponse, CancelTokenSource } from 'axios';

interface User {
	token_type: string;
	token: string;
	id: string;
	name: string;
	email: string;
	main_group: string;
	org_id: string;
	sub_group: string;
	updated_at: string;
	userName: string;
	usn: string;
}

interface Headers {
	headers: {
		'Content-Type': string;
		Authorization?: string;
	};
	cancelToken: CancelToken;
}
const contentType = { json: 'application/json', form: 'multipart/form-data' };
const getHeader = async (
	ourRequestToken: CancelToken | null = null,
	formData = true
): Promise<Headers> => {
	const user: User | null = await getUser();
	const source: CancelTokenSource = axios.CancelToken.source();
	let header: Headers;
	header = {
		headers: {
			'Content-Type': formData ? contentType.form : contentType.json,
			Authorization: user?.token ? `Bearer ${user.token}` : '',
		},
		cancelToken: ourRequestToken ? ourRequestToken : source.token,
	};
	return header;
};

export default async function get(
	url: string,
	type: boolean = false,
	ourRequestToken: CancelToken | null = null
): Promise<AxiosResponse> {
	const header: Headers = await getHeader(ourRequestToken, false);
	const prepareData = {
		...header,
	};
	return await axiosPrepare.get(url, prepareData);
}

export async function delete_(
	url: string,
	type: boolean = false
): Promise<AxiosResponse> {
	const header: Headers = await getHeader(undefined, false);
	return await axiosPrepare.delete(url, type ? header : {});
}

export async function post(
	url: string,
	props: any,
	type: boolean = false
): Promise<AxiosResponse> {
	const header: Headers = await getHeader(undefined, false);
	return await axiosPrepare.post(url, props, type ? header : {});
}

export async function postFormData(
	url: string,
	props: any,
	type: boolean = false
): Promise<AxiosResponse> {
	const header: Headers = await getHeader(undefined, true);
	return await axiosPrepare.post(url, props, type ? header : {});
}

export async function put(
	url: string,
	props: any,
	type: boolean = false
): Promise<AxiosResponse> {
	const header: Headers = await getHeader(undefined, false);
	return await axiosPrepare.put(url, props, type ? header : {});
}
export async function putFormData(
	url: string,
	props: any,
	type: boolean = false
): Promise<AxiosResponse> {
	const header: Headers = await getHeader(undefined, true);
	return await axiosPrepare.put(url, props, type ? header : {});
}
