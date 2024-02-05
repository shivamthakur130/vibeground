'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageWrapper from '../common/PageWrapper';
import ArrowLeft from '@/assets/images/svg/arrow-left.svg';

const Advertising = () => {
	return (
		<PageWrapper>
			<div className="Email mx-auto  sm:mt-24 sm:mb-24 px-5">
				<h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex  mb-10 pt-20 sm:pt-0">
					<div>
						<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50 hover:bg-gray-100 active:bg-gray-200">
							<Link href="/influencer">
								<Image src={ArrowLeft} height={32} width={32} alt="#" />
							</Link>
						</div>
					</div>
					<div className="ml-10 pt-2">Advertising</div>
				</h2>
				<div className="space-y-4 text-lg mb-10">
					<p>
						{' '}
						Discover the ultimate opportunity to present yourself and your profile
						exclusively and strategically on Vibeground! Here you will find the
						perfect platform to showcase your unique personality, talent and beauty.
						If you are looking for the best way to market yourself, there is no better
						place than Vibeground.
					</p>

					<p>
						With Vibeground, you can make sure you{"'"}re seen by the right audience.
						We offer you tools and features to increase your reach and showcase
						yourself in our community.
					</p>

					<p>
						So don{"'"}t waste any time and take advantage of the exclusive
						opportunity to stand out on Vibeground and increase your international
						reach. Welcome to Vibeground Advertising.
					</p>
				</div>

				{/* <p className="text-xl">
          This is a special one-time experience that can only be done once
        </p>

        <Link href="/influencer">
          <button className="btn btn-default px-24 py-4 my-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
            Sign up for the contest
          </button>
        </Link>
        <p className="text-xl">
          This feature is available only for verified pro subscriptions
        </p> */}
			</div>
		</PageWrapper>
	);
};

export default Advertising;
