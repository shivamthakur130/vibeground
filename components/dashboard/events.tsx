import React from 'react';
import Image from 'next/image';

import EventImg from 'assets/images/event.png';

import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import get from '@/lib/requests';
import Loading from '@/components/common/loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface EventsResponse {
	events: string | null;
	error: AxiosError | null;
}

const Events = ({ showItem }: any) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [eventsList, setEvents] = useState<any | null>(null);
	useEffect(() => {
		(async () => {
			const { events, error } = await getEvents();
			// console.log(events, 'events');
			if (error) {
				return;
			}
			setEvents(events);
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<Loading
				width={50}
				height={50}
				className="flex absolute justify-center w-96
			z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
			/>
		);
	}
	return (
		<div className="relative Events ">
			{/* <Carousel>
				<div>
					<Image className="w-full" src={EventImg} alt="#" />
					<p className="legend">Legend 1</p>
				</div>
				<div>
					<Image className="w-full" src={EventImg} alt="#" />
					<p className="legend">Legend 2</p>
				</div>
				<div>
					<Image className="w-full" src={EventImg} alt="#" />
					<p className="legend">Legend 3</p>
				</div>
			</Carousel> */}
			<div className="border-solid border-[#C7C7C7] w-full h-full absolute top-[5px] left-[2px] border rounded-[10px]" />
			<div className="bg-[#CCEFBF] relative flex flex-col mr-1 gap-1 pt-4 pb-3 px-4 rounded-[10px]">
				<div className="text-lg  font-semibold self-start mb-1">Events</div>
				<Carousel
					autoPlay={true}
					infiniteLoop={true}
					interval={4000}
					showArrows={true}
					showThumbs={true}
					showIndicators={true}
					dynamicHeight={false}
					showStatus={true}
					width="100%">
					{eventsList.data?.map((item: any, index: number) => (
						<div
							className="flex-col justify-items-start items-center bg-white/50 rounded"
							key={index}>
							<div className="w-[120px] h-[120px]">
								<img className="w-full" src={item.url} alt="#" />
							</div>
							<div className="text-[#23262F] flex flex-col space-y-1 px-3 py-5">
								<div className="text-[12px] leading-3">{item.title}</div>
								<div className="text-[10px] leading-3 text-[#708099]">
									{new Date(item.date).toLocaleDateString()} |{' '}
									{new Date(item.date).toLocaleTimeString()}
								</div>
							</div>
						</div>
					))}
				</Carousel>
				{/* <div className="flex-col justify-items-start items-center bg-white/50 rounded">
					<div className="w-full">
						<Image className="w-full" src={EventImg} alt="#" />
					</div>
					<div className="text-[#23262F] flex flex-col space-y-1 px-3 py-5">
						<div className="text-[12px] leading-3">
							asdfasdfasdf sadfasdf asdfasdf
						</div>
						<div className="text-[10px] leading-3 text-[#708099]">write lorem</div>
					</div>
				</div> */}
				{eventsList?.data?.length === 0 && (
					<div className="text-[12px] leading-3">No events are scheduled.</div>
				)}
			</div>
		</div>
	);
};

export default Events;
async function getEvents(): Promise<EventsResponse> {
	try {
		const { data } = await get('/events', true);
		return {
			events: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		return {
			events: null,
			error,
		};
	}
}
