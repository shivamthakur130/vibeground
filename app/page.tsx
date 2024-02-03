import Footer from '@/components/layout/Footer';
import Landing from '@/components/home/Landing';
import Header from '@/components/layout/Header';

export default function Home() {
	return (
		<div className="min-h-screen relative ">
			<Header />
			<div className="max-w-full mx-auto bg-[#151515]">{/* <Start /> */}</div>
			<Landing />
			<Footer />
		</div>
	);
}
