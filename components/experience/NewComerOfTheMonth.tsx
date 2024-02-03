'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowLeft from '@/assets/images/svg/arrow-left.svg';
import PageWrapper from '../common/PageWrapper';

const NewComerWeek = () => {
	return (
		<PageWrapper>
			<div className="Experience max-w-7xl px-5 mx-auto sm:mt-24  sm:mb-24 py-5 sm:py-0 mb-24 ">
				<h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex items-center my-10 mb-10 mt-7">
					<div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50 hover:bg-gray-100 active:bg-gray-200">
						<Link href="/experience">
							<Image src={ArrowLeft} height={32} width={32} alt="#" />
						</Link>
					</div>
					<div className="ml-10">Newcomer of the month</div>
				</h2>
				<div className="space-y-4 mb-10 text-lg">
					<p className="text-lg font-PoppinsSemiBold">
						Welcome to the election of the Newcomer Of The Month!
					</p>
					<p>
						Here, you will find a unique opportunity to choose your favorite creators
						as the Newcomer of the Month through interactive voting.
					</p>
					<p>
						The interactive voting function is the heart of the vote for the Newcomer
						Of The Month. As a member of our community, you have the power to
						determine the Newcomer Of The Month by casting your votes for your
						favorites. Each month brings forth new talents, and you can actively
						contribute to giving them more attention and recognition!
					</p>
					<p>
						The winners will receive fame and honor, and you can support them in
						achieving that! Who will be next to win the coveted title Newcomer Of The
						Month?
					</p>
				</div>
				{/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
          <div className="relative rounded-2xl overflow-hidden">
            <Image src={Post1} className="w-full" alt="#" />
            <div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
              <div className="mt-auto self-end w-full">
                <h3 className="text-2xl text-white font-PoppinsSemiBold">
                  Jessica, 24{" "}
                </h3>
                <div className="flex justify-between mt-3">
                  <button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
                    Asian
                  </button>
                  <span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
                    <Image src={Like} alt="#" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <Image src={Post1} className="w-full" alt="#" />
            <div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
              <div className="mt-auto self-end w-full">
                <h3 className="text-2xl text-white font-PoppinsSemiBold">
                  Jessica, 24{" "}
                </h3>
                <div className="flex justify-between mt-3">
                  <button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
                    Asian
                  </button>
                  <span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
                    <Image src={Like} alt="#" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <Image src={Post1} className="w-full" alt="#" />
            <div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
              <div className="mt-auto self-end w-full">
                <h3 className="text-2xl text-white font-PoppinsSemiBold">
                  Jessica, 24{" "}
                </h3>
                <div className="flex justify-between mt-3">
                  <button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
                    Asian
                  </button>
                  <span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
                    <Image src={Like} alt="#" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <Image src={Post1} className="w-full" alt="#" />
            <div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
              <div className="mt-auto self-end w-full">
                <h3 className="text-2xl text-white font-PoppinsSemiBold">
                  Jessica, 24{" "}
                </h3>
                <div className="flex justify-between mt-3">
                  <button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
                    Asian
                  </button>
                  <span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
                    <Image src={Like} alt="#" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <Image src={Post1} className="w-full" alt="#" />
            <div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
              <div className="mt-auto self-end w-full">
                <h3 className="text-2xl text-white font-PoppinsSemiBold">
                  Jessica, 24{" "}
                </h3>
                <div className="flex justify-between mt-3">
                  <button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
                    Asian
                  </button>
                  <span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
                    <Image src={Like} alt="#" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <Image src={Post1} className="w-full" alt="#" />
            <div className="absolute flex bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-white/5 min-h-[90%]">
              <div className="mt-auto self-end w-full">
                <h3 className="text-2xl text-white font-PoppinsSemiBold">
                  Jessica, 24{" "}
                </h3>
                <div className="flex justify-between mt-3">
                  <button className="btn px-6 py-2 bg-white/20 text-white text-base rounded font-PoppinsRegular">
                    Asian
                  </button>
                  <span className="flex items-center justify-center h-11 w-11 bg-white hover:bg-white/60 cursor-pointer rounded-full">
                    <Image src={Like} alt="#" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
			</div>
		</PageWrapper>
	);
};

export default NewComerWeek;
