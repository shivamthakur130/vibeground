export interface Plan {
	data: any;
	_id: string;
	description: string;
	duration: string;
	features: {
		video: string;
		image: string;
		swipeModel: string;
	};
	name: string;
	price: string;
	type: string;
	recommended: boolean;
}
