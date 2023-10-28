import Footer from '@/components/layout/Footer';
import Landing from '@/components/home/Landing';
import Header from '@/components/layout/Header';

export default function Home() {
	return (
		<div className="min-h-screen relative ">
			<Header />
			<div className="max-w-full mx-auto bg-[#151515]">{/* <Start /> */}</div>
			<Landing />
			<div className="w-full bg-[#151515]">
				<div className="max-w-7xl mx-auto py-20">
					<Footer />
				</div>
			</div>
		</div>
	);
}
