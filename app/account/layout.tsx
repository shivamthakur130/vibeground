'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
