import React from 'react';
import Image from 'next/image';
import NoticeImg from 'assets/images/nitice1.png';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import get from '@/lib/requests';
import Loading from '@/components/common/Loading';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
interface HolidaysResponse {
	holidays: string | null;
	error: AxiosError | null;
}

const Holidays = ({ showItem }: any) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [holidaysData, setHolidaysData] = useState<any | null>(null);
	const searchParams = useSearchParams();
	const totalItems = searchParams.get('totalItems');
	useEffect(() => {
		(async () => {
			const { holidays, error } = await getHolidays(totalItems);
			// console.log(holidays, 'holidays');
			if (error) {
				return;
			}
			setHolidaysData(holidays);
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
			<div className="relative Noticeboard mb-8 mx-8 shadow bg-[#f8e2fc] rounded-[10px]">
				{/* <div className="border-solid border-[#C7C7C7] w-full h-full absolute top-[5px] left-[2px] border rounded-[10px]" /> */}
				<div className=" relative flex flex-col mr-1 gap-1 pt-4 pb-3 px-4 ">
					<div className="text-lg  font-semibold self-start mb-1">Holidays</div>
					<ul className="space-y-4">
						{holidaysData?.data?.map((item: any, index: number) => (
							<li
								className="flex justify-items-start items-center  bg-white/30 p-2 hover:bg-white/50 space-x-2 rounded"
								key={index}>
								<div className="text-[#23262F] flex flex-col space-y-1">
									<div className="text-[12px] leading-3 py-1">{item.title}</div>
									<div className="text-[12px] leading-3 py-1">{item.description}</div>
									<div className="text-[10px] leading-3 text-[#708099]">
										{new Date(item.date).toLocaleDateString()}d
									</div>
								</div>
							</li>
						))}
					</ul>

					{holidaysData?.data?.length === 0 ? (
						<div className="text-[12px] leading-3">No record found.</div>
					) : (
						<div className="text-right">
							{/* <Link
								href={showItem == 'more' ? '/dashboard/holidays' : '/dashboard'}
								className="text-[12px] leading-3 text-[#708099] hover:text-[#23262F] cursor-pointer">
								{showItem == 'more'
									? 'Click here to view all'
									: 'Click here to view less'}
							</Link> */}
							{holidaysData?.pagination?.totalItems > 3 &&
								(showItem == 'more' ? (
									<Link
										href={{
											pathname: `${'/dashboard/holidays'}`,
											query: {
												totalItems: holidaysData?.pagination?.totalItems ?? 5,
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
		</>
		// <div className="shadow-[0px_0px_8px_0px_rgba(81,_69,_159,_0.09)] bg-white flex flex-col gap-3 items-start pt-4 pb-8 px-8 rounded-lg">
		// 	<div className="text-lg manropeSemiBold font-semibold leading-[40px] text-[#23262f]">
		// 		Holidays
		// 	</div>
		// 	<div className="w-full overflow-x-auto">
		// 		<table className="table-auto w-full shadow">
		// 			<thead className="text-left bg-[#d6d6d6]">
		// 				<tr>
		// 					<th className="p-2 min-w-max">Holiday Name</th>
		// 					<th className="py-2">Holiday Desc.</th>
		// 					<th className="py-2">Date</th>
		// 					<th className="py-2">Deleted</th>
		// 					<th className="py-2">Grad</th>
		// 					<th className="py-2">School Name</th>
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				<tr className="even:bg-[#F2F2F2]">
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Emp-12345</td>
		// 					<td className="p-2 min-w-max">A+</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 				</tr>
		// 				<tr className="even:bg-[#F2F2F2]">
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Emp-12345</td>
		// 					<td className="p-2 min-w-max">A+</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 				</tr>
		// 				<tr className="even:bg-[#F2F2F2]">
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Emp-12345</td>
		// 					<td className="p-2 min-w-max">A+</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 				</tr>
		// 				<tr className="even:bg-[#F2F2F2]">
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Emp-12345</td>
		// 					<td className="p-2 min-w-max">A+</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 				</tr>
		// 			</tbody>
		// 		</table>
		// 	</div>
		// </div>
	);
};

export default Holidays;

async function getHolidays(totalItems: any): Promise<HolidaysResponse> {
	try {
		const queryParams: { page: number; limit: any; keyword: string } = {
			page: 1,
			limit: totalItems ? totalItems : 3,
			keyword: '',
		};
		const queryString = new URLSearchParams(
			queryParams as never as Record<string, string>
		).toString();

		const { data } = await get(`/holiday?${queryString}`, true);
		return {
			holidays: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		return {
			holidays: null,
			error,
		};
	}
}
