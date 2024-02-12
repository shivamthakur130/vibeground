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

export function Address(props: { showEmail: boolean; }) {
	return (
		<p
			style={{
				marginTop: '14pt',
				marginBottom: '14pt',
				lineHeight: 'normal',
			}}>
			<strong>
				<span style={{ fontFamily: '"Times New Roman"' }}>Vibeground Ltd.</span>
			</strong>
			<br />
			<strong>
				<span style={{ fontFamily: '"Times New Roman"' }}>
					Persefonis 8
				</span>
			</strong>
			<br />
			<strong>
				<span style={{ fontFamily: '"Times New Roman"' }}>
					2102 Nicosia
				</span>
			</strong>
			<br />
			<strong>
				<span style={{ fontFamily: '"Times New Roman"' }}>
					Cyprus
				</span>
			</strong>
			<br />
			{props.showEmail ?
				<a href="mailto:info@vibeground.com" style={{ textDecoration: 'none' }}>
					<span
						className="Hyperlink"
						style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>
						info@vibeground.com
					</span>
				</a>
			: null}
		</p>
	);
}