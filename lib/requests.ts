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
	username: string;
	usn: string;
}

interface Headers {
	headers: {
		'Content-Type': string;
		Authorization: string;
	};
	cancelToken: CancelToken;
}

const getHeader = async (
	ourRequestToken: CancelToken | null = null
): Promise<Headers> => {
	const user: User | null = await getUser();
	const source: CancelTokenSource = axios.CancelToken.source();
	let header: Headers;
	if (user) {
		header = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${user.token}`,
			},
			cancelToken: ourRequestToken ? ourRequestToken : source.token,
		};
	} else {
		header = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: '',
			},
			cancelToken: ourRequestToken ? ourRequestToken : source.token,
		};
	}
	return header;
};

export default async function get(
	url: string,
	type: boolean = false,
	ourRequestToken: CancelToken | null = null
): Promise<AxiosResponse> {
	const header: Headers = await getHeader(ourRequestToken);
	// type ? header : { cancelToken: ourRequestToken ? ourRequestToken : undefined }
	const prepareData = {
		...header,
	};
	// console.log(prepareData, 'prepareData');
	return await axiosPrepare.get(url, prepareData);
}

export async function delete_(
	url: string,
	type: boolean = false
): Promise<AxiosResponse> {
	const header: Headers = await getHeader();
	return await axiosPrepare.delete(url, type ? header : {});
}

export async function post(
	url: string,
	props: any,
	type: boolean = false
): Promise<AxiosResponse> {
	// await csrf();
	const header: Headers = await getHeader();
	return await axiosPrepare.post(url, props, type ? header : {});
}

// const getHeader = async (ourRequestToken = null) => {
// 	const user = await getUser();
// 	const header = user
// 		? {
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: `${user.token_type} ${user.token}`,
// 				},
// 				cancelToken: ourRequestToken ? ourRequestToken : "",
// 		  }
// 		: { cancelToken: ourRequestToken ? ourRequestToken : "" };
// 	return header;
// };

// export default async function get(url, type = false, ourRequestToken = null) {
// 	const header = await getHeader(ourRequestToken);
// 	return await axios.get(
// 		url,
// 		type ? header : { cancelToken: ourRequestToken ? ourRequestToken : "" }
// 	);
// }

// export async function delete_(url: any, type = false) {
// 	const header = await getHeader();
// 	return await axios.delete(url, type ? header : {});
// }

// export async function post(url, props, type = false) {
// 	// await csrf();
// 	const header = await getHeader();
// 	return await axios.post(url, props, type ? header : {});
// }
