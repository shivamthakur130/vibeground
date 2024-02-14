import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Layout from '@/components/common/layout';

export default function SupportFormPage() {
	return (
		<Layout>
			<div className="max-w-5xl mx-auto font-PoppinsRegular text-lg px-5">
				<div className="font-PoppinsRegular mt-10">
					<ul className="space-y-2">
						<li className="font-PoppinsBold">Vibeground Ltd.</li>
						<li>Persefonis 8 </li>
						<li>2102 Nicosia</li>
						<li>Cyprus</li>
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
		</Layout>
	);
}
