import React from 'react';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import get from '@/lib/requests';
import Loading from '@/components/common/Loading';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
interface AnnouncementResponse {
	announcement: string | null;
	error: AxiosError | null;
}
interface AnnouncementProps {
	showItem: string;
}

const Announcement = ({ showItem }: AnnouncementProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const searchParams = useSearchParams();
	const totalItems = searchParams.get('totalItems');
	const [announcementList, setAnnouncement] = useState<any | null>(null);
	useEffect(() => {
		(async () => {
			const { announcement, error } = await getAnnouncement(totalItems as any);
			if (error) {
				return;
			}
			setAnnouncement(announcement);
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
		<div className="relative Announcements">
			<div className="border-solid border-[#C7C7C7] w-full h-full absolute top-[5px] left-[2px] border rounded-[10px]" />
			<div className="bg-[#fde1ac]  relative flex flex-col mr-1 gap-1 pt-4 pb-3 px-4 rounded-[10px]">
				<div className="text-lg  font-semibold self-start mb-1">Announcements</div>
				<ul className="space-y-2">
					{announcementList.data?.map((item: any, index: number) => (
						<li
							className="flex flex-row items-start space-x-2 hover:bg-white/30 p-2 border-b border-b-[#6B4806] border-opacity-20 rounded-[10px]"
							key={index}>
							<div className="h-2 w-2.5 bg-[#6B4806] rounded-full mt-4"></div>
							<div className="text-[#6b4806]">
								<div className="text-[12px] mb-0.5 pb-1.5 leading-4">{item.title}</div>
								<div className="text-[12px] mb-0.5 pb-1.5 leading-4 ">
									{/* write 2 line data  from description*/}
									{/* {item.description.length > 200 ? (
										<div>
											{item.description.slice(0, 200)}
											{' ...'}
										</div>
									) : (
										item.description
									)} */}
									{item.description}
								</div>
								<div className="flex justify-between text-[12px]">
									<span>{new Date(item.date).toLocaleDateString()}</span>
								</div>
								<div className="flex justify-between text-[12px] py-1">
									<span>
										<a href={item.url} target="_blank">
											Download
										</a>
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
				{announcementList.data?.length == 0 ? (
					<div className="text-[#6b4806]">
						<div className="text-sm border-b border-b-[#6B4806] border-opacity-20 mb-0.5 pb-1.5 leading-4">
							No Announcements
						</div>
					</div>
				) : (
					<div className="text-right">
						{announcementList?.pagination?.totalItems > 3 &&
							(showItem == 'more' ? (
								<Link
									href={{
										pathname: `${'/dashboard/announcement'}`,
										query: {
											totalItems: announcementList?.pagination?.totalItems ?? 5,
										},
									}}
									className="text-[12px] leading-3 text-[#708099] hover:text-[#23262F] cursor-pointer">
									{'Click here to view all'}
								</Link>
							) : (
								<Link
									href={{
										pathname: `${'/dashboard'}`,
									}}
									className="text-[12px] leading-3 text-[#708099] hover:text-[#23262F] cursor-pointer">
									{'Click here to view less'}
								</Link>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Announcement;

async function getAnnouncement(totalItems: any): Promise<AnnouncementResponse> {
	try {
		const queryParams: { page: number; limit: any; keyword: string } = {
			page: 1,
			limit: totalItems ? totalItems : 3,
			keyword: '',
		};
		const queryString = new URLSearchParams(
			queryParams as never as Record<string, string>
		).toString();

		const { data } = await get(`/announcement?${queryString}`, true);
		return {
			announcement: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		return {
			announcement: null,
			error,
		};
	}
}
