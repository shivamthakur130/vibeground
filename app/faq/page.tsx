"use client"
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
				<div className="flex flex-col py-10 px-4 items-center ">
					{/* <h1 className="text-gray-500 font-bold ">FAQs</h1> */}
					<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 mb-10">
						All about your profile and matches
					</h2>
					{/* <p className="text-3xl py-2">FAQ will follow soon!</p> */}
					{/* <p className="text-gray-800 text-sm ">
						If you’re trying to get to know us better, you’ve come to the right place.
						This is Tinder at a glance.
					</p> */}
					<Accordion className='w-full space-y-1'>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									What picture should I use on Creator®?

									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									What picture should I use on Creator®?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									What should I put in my bio?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									How do I unmatch someone?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									How do Tinder® matches work?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
					</Accordion>

					<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 my-10">
						All about how Creator® works
					</h2>

					<Accordion className='w-full space-y-1'>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									What picture should I use on Creator®?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									What should I put in my bio?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									How do I unmatch someone?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									How do Tinder® matches work?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading>
								<AccordionItemButton className='bg-2f2f2f text-white p-4 rounded text-base flex justify-between'>
									How do Tinder® matches work?
									<Image src={Arrow} alt='#' />
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className='bg-656565 text-xs text-white rounded p-4'>
								<p>Upload photos to Tinder® that feature who everyone came to see: you! Ditch your friends, because this isn’t about them, and remove the sunglasses, because they hide your face. The best pics are in-focus, and some say a smile goes a long way here.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</Layout>
	);
}
