import React from 'react';
import Image from 'next/image';
import NoticeImg from 'assets/images/nitice1.png';
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import get from '@/lib/requests';
import Loading from '@/components/common/Loading';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
interface TimeTableResponse {
	timetables: string | null;
	error: AxiosError | null;
}
interface TimeTableProps {
	showItem: string;
}

const TimeTable = ({ showItem }: TimeTableProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [timeTableData, setTimeTableData] = useState<any | null>(null);
	const searchParams = useSearchParams();
	const totalItems = searchParams.get('totalItems');

	useEffect(() => {
		(async () => {
			const { timetables, error } = await getTimeTable(totalItems);

			if (error) {
				return;
			}
			setTimeTableData(timetables);
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
		<>
			<div className="relative Noticeboard mb-8 mx-8 shadow-md bg-[#fdc4c4] rounded-[10px]">
				{/* <div className="border-solid border-[#C7C7C7] w-full h-full absolute top-[5px] left-[2px] border rounded-[10px]" /> */}
				<div className=" relative flex flex-col mr-1 gap-1 pt-4 pb-3 px-4 ">
					<div className="text-lg  font-semibold self-start mb-1">Time Table</div>
					<ul className="space-y-4">
						{timeTableData?.data?.map((item: any, index: number) => (
							<li
								className="flex justify-items-start items-center bg-white/30 hover:bg-white/50 p-2 space-x-2 rounded"
								key={index}>
								{/* <div className="h-9 w-9 min-w-[36px]">
									<Image className="w-full" src={NoticeImg} alt="#"></Image>
								</div> */}
								<div className="text-[#23262F] flex flex-col space-y-1">
									<div className="text-[12px] leading-3 py-1">{item.subject}</div>
									<div className="text-[12px] leading-3 py-1">Download</div>
									<div className="text-[12px] leading-3 text-[#708099] py-1">
										<a href={item.downloadurl} target="_blank">
											{item.downloadurl}
										</a>
									</div>
									<div className="text-[10px] leading-3 text-[#708099]">
										{new Date(item.date).toLocaleDateString()} |{' '}
										{new Date(item.date).toLocaleTimeString()}
									</div>
								</div>
							</li>
						))}
					</ul>

					{timeTableData?.data?.length === 0 ? (
						<div className="text-[12px] leading-3">No record found.</div>
					) : (
						<div className="text-right">
							{timeTableData?.pagination?.totalItems > 3 &&
								(showItem == 'more' ? (
									<Link
										href={{
											pathname: `${'/dashboard/time-table'}`,
											query: {
												totalItems: timeTableData?.pagination?.totalItems ?? 5,
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
			{/* <div className="relative Noticeboard ">
				<div className="shadow-[0px_0px_8px_0px_rgba(81,_69,_159,_0.09)] bg-[#BAE5F5] flex flex-col gap-3 items-start pt-4 pb-8 px-8 rounded-lg mb-10">
					<div className="border-solid border-[#C7C7C7] w-full h-full absolute top-[5px] left-[2px] border rounded-[10px]" />
					<div className=" relative flex flex-col mr-1 gap-1 pt-4 pb-3 px-4 rounded-[10px]">
						<div className="text-lg  font-semibold self-start mb-1">Time table</div>
						<ul className="space-y-4">
							{timeTableData?.data?.map((item: any, index: number) => (
								<li
									className="flex justify-items-start items-center bg-white/50 p-1 space-x-2 rounded"
									key={index}>
									<div className="h-9 w-9 min-w-[36px]">
										<Image className="w-full" src={NoticeImg} alt="#"></Image>
									</div>
									<div className="text-[#23262F] flex flex-col space-y-1">
										<div className="text-[12px] leading-3">{item.title}</div>
										<div className="text-[10px] leading-3 text-[#708099]">
											{new Date(item.date).toLocaleDateString()} |{' '}
											{new Date(item.date).toLocaleTimeString()}
										</div>
										<div className="text-[10px] leading-3 text-[#708099]">
											<a href={item.url} target="_blank">
												{item.url}
											</a>
										</div>
									</div>
								</li>
							))}
						</ul>
						{timeTableData?.data?.length === 0 && (
							<div className="text-[12px] leading-3">No notices.</div>
						)}
					</div>
				</div>
			</div> */}
		</>
	);
};

export default TimeTable;

async function getTimeTable(totalItems: any): Promise<TimeTableResponse> {
	try {
		const queryParams: { page: number; limit: any; keyword: string } = {
			page: 1,
			limit: totalItems ? totalItems : 3,
			keyword: '',
		};
		const queryString = new URLSearchParams(
			queryParams as never as Record<string, string>
		).toString();

		const { data } = await get(`/timetable?${queryString}`, true);
		return {
			timetables: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		return {
			timetables: null,
			error,
		};
	}
}
