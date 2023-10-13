'use client';

import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Loading from '@/components/common/Loading';
import { useSelector } from 'react-redux';
import get from '@/lib/requests';

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
		<div className="min-h-screen">
			<Header />
			{children}
			<div className="w-full bg-[#151515]">
				<div className="max-w-7xl mx-auto py-20">
					<Footer />
				</div>
			</div>
		</div>
	);
}
