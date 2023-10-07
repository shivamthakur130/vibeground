import React from 'react';
import Image from 'next/image';
import NoticeImg from 'assets/images/nitice1.png';
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import get from '@/lib/requests';
import Loading from '@/components/common/Loading';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface NoticeResponse {
	notice: string | null;
	error: AxiosError | null;
}

const Noticeboard = ({ showItem }: any) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [noticeList, setNotice] = useState<any | null>(null);
	const searchParams = useSearchParams();
	const totalItems = searchParams.get('totalItems');

	useEffect(() => {
		(async () => {
			const { notice, error } = await getNotice(totalItems);
			// console.log(notice, 'notice');
			if (error) {
				return;
			}
			setNotice(notice);
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
		<div className="relative Noticeboard">
			<div className="border-solid border-[#C7C7C7] w-full h-full absolute top-[5px] left-[2px] border rounded-[10px]" />
			<div className="bg-[#BAE5F5] relative flex flex-col mr-1 gap-1 pt-4 pb-3 px-4 rounded-[10px]">
				<div className="text-lg  font-semibold self-start mb-1">Notice board</div>
				<ul className="space-y-4">
					{noticeList?.data?.map((item: any, index: number) => (
						<li
							className="flex justify-items-start items-center bg-white/30 hover:bg-white/60 p-2 py-3 space-x-2 rounded"
							key={index}>
							<div className="h-9 w-9 min-w-[36px]">
								<img className="w-full" src={item.url} alt="#" />
							</div>
							<div className="text-[#23262F] flex flex-col ">
								<div className="text-[12px] leading-3 py-1">{item.title}</div>
								<div className="text-[12px] leading-3 py-1">{item.subject}</div>
								<div className="text-[12px] leading-3 text-[#708099] py-1">
									{new Date(item.date).toLocaleDateString()} |{' '}
									{new Date(item.date).toLocaleTimeString()}
								</div>
							</div>
						</li>
					))}
					{/* <li className="flex justify-items-start items-center bg-white/50 p-1 space-x-2 rounded">
						<div className="h-9 w-9 min-w-[36px]">
							<Image className="w-full" src={NoticeImg} alt="#"></Image>
						</div>
						<div className="text-[#23262F] flex flex-col space-y-1">
							<div className="text-[12px] leading-3">
								Announcements psum dolor sit{' '}
							</div>
							<div className="text-[10px] leading-3 text-[#708099]">
								04 April, 2021 | 04:00 PM
							</div>
						</div>
					</li> */}
				</ul>
				{noticeList?.data?.length === 0 ? (
					<div className="text-[12px] leading-3">No notices.</div>
				) : (
					<div className="text-right">
						{noticeList?.pagination?.totalItems > 3 &&
							(showItem == 'more' ? (
								<Link
									href={{
										pathname: `${'/dashboard/notice-board'}`,
										query: {
											totalItems: noticeList?.pagination?.totalItems ?? 5,
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

export default Noticeboard;

async function getNotice(totalItems: any): Promise<NoticeResponse> {
	const queryParams: { page: number; limit: any; keyword: string } = {
		page: 1,
		limit: totalItems ? totalItems : 3,
		keyword: '',
	};
	const queryString = new URLSearchParams(
		queryParams as never as Record<string, string>
	).toString();

	try {
		const { data } = await get(`/noticeboard?${queryString}`, true);
		return {
			notice: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		return {
			notice: null,
			error,
		};
	}
}
