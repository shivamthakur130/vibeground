'use client';
import Layout from '@/components/common/layout';
import Image from 'next/image';
import Arrow from '@/assets/images/svg/down-arrow.svg';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';

export default function SupportFormPage() {
	return (
		<Layout>
			<div className="max-w-6xl mx-auto font-PoppinsRegular text-lg min-h-96 ">
				<div className="flex flex-col py-10 px-4 items-center min-h-[540px]">
					{/* <h1 className="text-gray-500 font-bold ">FAQs</h1> */}
					<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 mb-10">
						All about fan support
					</h2>
					{/* <p className="text-3xl py-2">FAQ will follow soon!</p> */}
					{/* <p className="text-gray-800 text-sm ">
						If you’re trying to get to know us better, you’ve come to the right place.
						This is Tinder at a glance.
					</p> */}
					<Accordion className="w-full space-y-1">
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className="bg-2f2f2f text-white p-4 rounded text-base flex justify-between">
									<p>How do I delete my account?</p>
									<Image src={Arrow} alt="#" />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="bg-656565 text-xs text-white rounded p-4">
								<p>
									Fans can delete their account by sending an e-mail to
									support@vibeground.com
								</p>
							</AccordionItemPanel>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</Layout>
	);
}
