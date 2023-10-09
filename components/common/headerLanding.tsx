'use client';
import Link from 'next/link';

const HeaderLanding = () => {
	return (
		<div className=" bg-black">
			<div className="max-w-7xl mx-auto py-10 px-10">
				<div className="flex items-center justify-end">
					<Link href="/account/welcome">
						<div
							className="
	rounded-[8px]  btn  py-3 px-14 bg-white hover:bg-gray-300   text-151515 cursor-pointer text-xl text-center transition-all duration-300 active:bg-gray-50">
							Login
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeaderLanding;
