import Footer from '@/components/common/Footer';
import Start from '@/components/home/Start';
import Landing from '@/components/home/Landing';
import Header from '@/components/common/Header';

export default function Home() {
	return (
		<div className="min-h-screen relative ">
			<Header />
			<div className="max-w-full mx-auto">{/* <Start /> */}</div>
			<Landing />
			<div className="w-full bg-[#151515]">
				<div className="max-w-7xl mx-auto py-20">
					<Footer />
				</div>
			</div>
		</div>
	);
}
