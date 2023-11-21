import React from 'react';
import Link from 'next/link';

const Newcomer = () => {
	return (
		<div className="Email text-center max-w-xl mx-auto mt-40 mb-40">
			<h2 className="text-5xl font-PoppinsBold text-111 mb-7">
				Newcomer of the month
			</h2>
			<p className="text-xl">
				This is a special one-time experience that can only be done once
			</p>

			<Link href="/influencer">
				<button className="btn btn-default px-24 py-4 my-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
					Sign up for the contest
				</button>
			</Link>
			<p className="text-xl">
				This feature is available only for verified pro subscriptions
			</p>
		</div>
	);
};

export default Newcomer;
