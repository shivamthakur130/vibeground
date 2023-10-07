import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Start from '@/components/home/Start';

export default function Home() {
	return (
		<div id="LoginRoot" className="home-screen min-h-screen">
			<Header />
			<div className="max-w-7xl mx-auto">
				<Start />
			</div>
			<div className="w-full bg-[#151515]">
				<div className="max-w-7xl mx-auto py-20">
					<Footer />
				</div>
			</div>
		</div>
	);
}
