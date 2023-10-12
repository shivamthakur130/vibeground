import { AxiosError } from 'axios';

export interface ReturnResponse {
	data: { data: any } | string | null | Array<any> | object | undefined | any[];
	error: AxiosError | null;
}
