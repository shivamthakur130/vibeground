import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Start from '@/components/home/Start';
import Landing from '@/components/home/Landing';
import HeaderLanding from '@/components/common/headerLanding';

export default function Home() {
	return (
		// <div id="LoginRoot" className="home-screen min-h-screen">
		<div id="LoginRoot" className="min-h-screen relative ">
			<HeaderLanding />
			<div className="max-w-7xl mx-auto">
				{/* <Start /> */}

			</div>
			<Landing />
			<div className="w-full bg-[#151515]">
				<div className="max-w-7xl mx-auto py-20">
					<Footer />
				</div>
			</div>
		</div>
	);
}
