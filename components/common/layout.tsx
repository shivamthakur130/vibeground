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

				<Footer />
			</div>
		</PageWrapper>
	);
}
