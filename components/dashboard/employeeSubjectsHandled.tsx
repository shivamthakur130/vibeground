import React from 'react';
import Image from 'next/image';
import NoticeImg from 'assets/images/nitice1.png';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import get from '@/lib/requests';
import Loading from '@/components/common/loading';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
interface EmployeeSubjectsResponse {
	employeeSubjects: string | null;
	error: AxiosError | null;
}

const EmployeeSubjectsHandled = ({ showItem }: any) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [employeeSubjectsData, setEmployeeSubjectsData] = useState<any | null>(
		null
	);
	const searchParams = useSearchParams();
	const totalItems = searchParams.get('totalItems');

	useEffect(() => {
		(async () => {
			const { employeeSubjects, error } = await getEmployeeSubjects(totalItems);
			// console.log(employeeSubjects, 'employeeSubjects');
			if (error) {
				return;
			}
			setEmployeeSubjectsData(employeeSubjects);
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
			<div className="relative Noticeboard mb-8 mx-8 shadow-md bg-[#e2baf5] rounded-[10px]">
				{/* <div className="border-solid border-[#C7C7C7] w-full h-full absolute top-[5px] left-[2px] border rounded-[10px]" /> */}
				<div className=" relative flex flex-col mr-1 gap-1 pt-4 pb-3 px-4 ">
					<div className="text-lg  font-semibold self-start mb-1">
						Employee Subjects Handled
					</div>
					<ul className="space-y-4">
						{/* <li className="flex justify-items-start items-center bg-white/30 p-2 space-x-2 rounded">
							<div className="text-[#23262F] flex space-x-2 py-1">
								<div className="text-[12px] leading-3 py-1">Subject Name</div>
								<div className="text-[12px] leading-3 text-[#708099] py-1">
									Grade name
								</div>
								<div className="text-[12px] leading-3 text-[#708099] py-1">
									Section Name
								</div>
							</div>
						</li> */}
						{employeeSubjectsData?.data?.map((item: any, index: number) => (
							<li
								className="flex justify-items-start items-center bg-white/30 hover:bg-white/50 p-2 space-x-2 rounded"
								key={index}>
								<div className="text-[#23262F] flex space-x-2 py-1">
									<div className="text-[12px] leading-3 py-1">{item.subjectname}</div>
									<div className="text-[12px] leading-3 text-[#708099] py-1">
										{item.gradename}
									</div>
									<div className="text-[12px] leading-3 text-[#708099] py-1">
										{item.sectionname}
									</div>
								</div>
							</li>
						))}
					</ul>
					{employeeSubjectsData?.data?.length === 0 ? (
						<div className="text-[12px] leading-3">No record found.</div>
					) : (
						<div className="text-right">
							{/* <Link
								href={
									showItem == 'more'
										? '/dashboard/employee-subjects-handled'
										: '/dashboard'
								}
								className="text-[12px] leading-3 text-[#708099] hover:text-[#23262F] cursor-pointer">
								{showItem == 'more'
									? 'Click here to view all'
									: 'Click here to view less'}
							</Link> */}
							{employeeSubjectsData?.pagination?.totalItems > 3 &&
								(showItem == 'more' ? (
									<Link
										href={{
											pathname: `${'/dashboard/employee-subjects-handled'}`,
											query: {
												totalItems: employeeSubjectsData?.pagination?.totalItems ?? 5,
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
		// <div className="shadow-[0px_0px_8px_0px_rgba(81,_69,_159,_0.09)] bg-white flex flex-col gap-3 items-start pt-4 pb-8 px-8 rounded-lg mb-10">
		// 	<div className="text-lg manropeSemiBold font-semibold leading-[40px] text-[#23262f]">
		// 		Employee Subjects Handled
		// 	</div>
		// 	<div className="w-full overflow-x-auto">
		// 		<table className="table-auto w-full shadow">
		// 			<thead className="text-left bg-[#d6d6d6]">
		// 				<tr>
		// 					<th className="p-2">Subject Name</th>
		// 					<th className="py-2">Employee Id</th>
		// 					<th className="py-2">Grade</th>
		// 					<th className="py-2">Section Name</th>
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
		// 				</tr>
		// 				<tr className="even:bg-[#F2F2F2]">
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Emp-12345</td>
		// 					<td className="p-2 min-w-max">A+</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 				</tr>
		// 				<tr className="even:bg-[#F2F2F2]">
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Emp-12345</td>
		// 					<td className="p-2 min-w-max">A+</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 				</tr>
		// 				<tr className="even:bg-[#F2F2F2]">
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Emp-12345</td>
		// 					<td className="p-2 min-w-max">A+</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 					<td className="p-2 min-w-max">Maths</td>
		// 				</tr>
		// 			</tbody>
		// 		</table>
		// 	</div>
		// </div>
	);
};

export default EmployeeSubjectsHandled;

async function getEmployeeSubjects(
	totalItems: any
): Promise<EmployeeSubjectsResponse> {
	try {
		const queryParams: { page: number; limit: any; keyword: string } = {
			page: 1,
			limit: totalItems ? totalItems : 3,
			keyword: '',
		};
		const queryString = new URLSearchParams(
			queryParams as never as Record<string, string>
		).toString();

		const { data } = await get(`/employee?${queryString}`, true);
		return {
			employeeSubjects: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;
		return {
			employeeSubjects: null,
			error,
		};
	}
}
