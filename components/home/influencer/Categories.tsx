import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Upload from '@/assets/images/svg/upload.svg';
const Categories = () => {
	return (
		<div className="Email text-center max-w-7xl mx-auto mt-40 mb-40">
			<p className="text-xl text-888 mb-5">Let’s Complete your Profile</p>
			<h2 className="text-5xl font-PoppinsBold text-111 mb-16">
				Select your categories
			</h2>
			<ul className="flex gap-4 flex-wrap">
				<li>
					<input
						type="checkbox"
						id="opt1"
						value=""
						className="hidden peer"
						required
					/>
					<label
						htmlFor="opt1"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt2" value="" className="hidden peer" />
					<label
						htmlFor="opt2"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="op3" value="" className="hidden peer" />
					<label
						htmlFor="op3"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input
						type="checkbox"
						id="opt4"
						value=""
						className="hidden peer"
						required
					/>
					<label
						htmlFor="opt4"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt5" value="" className="hidden peer" />
					<label
						htmlFor="opt5"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt6" value="" className="hidden peer" />
					<label
						htmlFor="opt6"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt7" value="" className="hidden peer" />
					<label
						htmlFor="opt7"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt8" value="" className="hidden peer" />
					<label
						htmlFor="opt8"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt9" value="" className="hidden peer" />
					<label
						htmlFor="opt9"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input
						type="checkbox"
						id="opt10"
						value=""
						className="hidden peer"
						required
					/>
					<label
						htmlFor="opt10"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt11" value="" className="hidden peer" />
					<label
						htmlFor="opt11"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Trends</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt12" value="" className="hidden peer" />
					<label
						htmlFor="opt12"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
				<li>
					<input
						type="checkbox"
						id="opt13"
						value=""
						className="hidden peer"
						required
					/>
					<label
						htmlFor="opt13"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Fun</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt14" value="" className="hidden peer" />
					<label
						htmlFor="opt14"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">Trends</div>
					</label>
				</li>
				<li>
					<input type="checkbox" id="opt15" value="" className="hidden peer" />
					<label
						htmlFor="opt15"
						className="rounded-[30px] cursor-pointer border border-[#a3a3a3] inline-flex py-5 px-16 peer-checked:bg-[#010101] peer-checked:text-white text-111">
						<div className="w-full text-15px  peer-checked:text-white">
							Entertainment
						</div>
					</label>
				</li>
			</ul>
			<Link href="/influencer/categories">
				<button className="btn btn-default px-24 py-4 mt-20 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
					Continue
				</button>
			</Link>
		</div>
	);
};

export default Categories;
