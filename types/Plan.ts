export interface Plan {
	min_pics: number;
	max_pics: number;
	min_videos: number;
	max_videos: number;
	min_links: number;
	max_links: number;
	planType: string;
	data: any;
	_id: string;
	description: string;
	duration: string;
	features: {
		video: string;
		image: string;
		swipeModel: string;
		newComerOfWeek: string;
	};
	name: string;
	price: string;
	type: string;
	recommended: boolean;
}
