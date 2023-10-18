'use client';
import Footer from '@/components/layout/Footer';
import Start from '@/components/home/Start';
import Landing from '@/components/home/Landing';
import Header from '@/components/layout/Header';
import { useState } from 'react';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	return (
		<div className="min-h-screen relative ">
			<Header />
			<div className="max-w-full mx-auto">{/* <Start /> */}</div>
			<Landing modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
			<div className="w-full bg-[#151515]">
				<div className="max-w-7xl mx-auto py-20">
					<Footer modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
				</div>
			</div>
		</div>
	);
}
