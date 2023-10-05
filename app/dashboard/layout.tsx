'use client';

import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/header';
import Loading from '@/components/common/loading';
import { useSelector } from 'react-redux';
import get from '@/lib/requests';
import Announcement from '@/components/dashboard/announcement';
import Noticeboard from '@/components/dashboard/noticeboard';
import Events from '@/components/dashboard/events';
import { usePathname } from 'next/navigation';
interface UserResponse {
	user: string | null;
	error: AxiosError | null;
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const { push } = useRouter();
	const userData = useSelector((state: any) => state.userReducer.user);
	const [showLeftSide, setShowLeftSide] = useState('');
	const pathName = usePathname();
	const toggleLeftSide = (value: string) => {
		push(`/dashboard`);
		setShowLeftSide(value);
	};
	useEffect(() => {
		(async () => {
			// const { user, error } = await getUser();
			// if (error) {
			// 	push('/');
			// 	return;
			// }
			setIsSuccess(true);
		})();
	}, [push]);

	if (!isSuccess) {
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
		<div className="flex flex-col w-full" id="NewRootRoot">
			<div className="overflow-hidden bg-white flex flex-col gap-8 " id="Desktop">
				<Header userData={userData} />
				<div className="max-w-[1380px] lg:grid grid-cols-3 w-full mx-auto flex flex-col lg:flex-row gap-8 items-start mb-5 ">
					Hello
				</div>
			</div>
		</div>
	);
}

async function getUser(): Promise<UserResponse> {
	try {
		const { data } = await get('/me', true);
		return {
			user: data,
			error: null,
		};
	} catch (e) {
		const error = e as AxiosError;

		return {
			user: null,
			error,
		};
	}
}
