import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SupportFormPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<div className="max-w-7xl mx-auto px-5">
				<div className="font-PoppinsRegular mt-10">
					<ul className="space-y-2">
						<li className="font-PoppinsBold">Vibeground Ltd.</li>
						<li>Georgiou Karaiskaki, 11-13 </li>
						<li>CARISA SALONICA COURT, Flat/Office 102</li>
						<li>7560 Pervolia</li>
						<li>Republic of Cyprus</li>
					</ul>
				</div>
				<div className="font-PoppinsRegular mt-10 mb-10">
					<ul className="space-y-2">
						<li className="font-PoppinsBold mb-8">E-Mail: info@vibeground.com </li>
						<li>Company No. HE 449550</li>
						<li>MINISTRY OF COMMERCE, INDUSTRY AND TOURISM,</li>
						<li>DEPARTMENT OF REGISTRAR OF COMPANIES AND OFFICIAL RECEIVER </li>
						<li>DIRECTOR: Lukas Splettstoesser</li>
					</ul>
				</div>
			</div>
			<div className="w-full bg-[#151515]">
				<div className="max-w-7xl mx-auto py-20">
					<Footer />
				</div>
			</div>
		</div>
	);
}
