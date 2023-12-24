'use client';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import PageWrapper from './PageWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<PageWrapper>
			<div className="min-h-screen">
				<Header />
				{children}
				<div className="w-full bg-[#151515]">
					<div className="max-w-7xl mx-auto py-20">
						<Footer />
					</div>
				</div>
			</div>
		</PageWrapper>
	);
}
