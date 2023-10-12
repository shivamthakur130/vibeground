'use client';

import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Loading from '@/components/common/Loading';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { getUser } from '@/services/user.service';
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
			const { data, error } = await getUser();
			setIsSuccess(true);
			if (error) {
				// push('/');
				return;
			}
		})();
	}, []);

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
				<Header />
				<div className="max-w-[1380px] lg:grid grid-cols-3 w-full mx-auto flex flex-col lg:flex-row gap-8 items-start mb-5 ">
					Hello
				</div>
			</div>
		</div>
	);
}
