import React from 'react';
import Link from 'next/link';

const MeetAndGreet = () => {
	return (
		<div className="Email text-center max-w-xl mx-auto mt-40 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111 mb-7">
				Meet & Greet
			</h2>
			<p className='text-xl'>interact with your followers in a personal and interactive way</p>

			<Link href="/influencer">
				<button className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Sign me up for this
				</button>
			</Link>
		</div>
	);
};

export default MeetAndGreet;
