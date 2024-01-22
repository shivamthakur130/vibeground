'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useSelector } from 'react-redux';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { push } = useRouter();
	const userData = useSelector((state: any) => state.userReducer.user);
	useEffect(() => {
		if (userData?.type == 'model') {
			push('/influencer');
		} else if (userData?.type == 'fan') {
			push('/experience');
		}
	}, []);

	return (
		<div className="min-h-screen">
			<Header />
			{children}
			{/* <div className="w-full bg-[#151515]">
				<div className="max-w-7xl mx-auto py-20"> */}
			<Footer />
			{/* </div>
			</div> */}
		</div>
	);
}
