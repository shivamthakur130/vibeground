import { AxiosError } from 'axios';

export interface ReturnResponse {
	data:
		| {
				status: any;
				data: any;
				message: any;
				success: any;
		  }
		| string
		| null
		| Array<any>
		| object
		| undefined
		| any[];
	error: AxiosError | null;
}
