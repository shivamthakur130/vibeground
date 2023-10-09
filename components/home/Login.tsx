import React from 'react';
import Link from 'next/link';

const Login = () => {
	return (
		<div className="Login max-w-xl mx-auto mt-24 mb-40 px-10">
			<h2 className="text-5xl font-PoppinsBold text-111 flex items-center justify-center">
				Welcome to User
			</h2>
			<div className="flex flex-col space-y-3 mt-5">
				<div>
					<input
						type="email"
						id="email"
						className="border mt-4 border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-5 "
						placeholder="Enter email address"
						required
					/>
				</div>
				<div>
					<input
						type="password"
						id="password"
						className="border mb-5 mt-4 border-[#C1C1C1] text-656565 text-lg rounded-lg focus:ring-black-500 focus:border-black-500 block w-full py-4 px-5 "
						placeholder="Enter password"
						required
					/>
				</div>
				<div className="text-center">
					<div>
						<Link href="/account/otp">
							<button className="w-full px-24 py-4 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030">
								Login
							</button>
						</Link>
					</div>
					<div className="pt-3 mt-4">
						<Link href="/account/otp" className="mt-5">
							<button className="btn btn-default px-10 hover:bg-303030 hover:text-white py-3 text-xl text-303030 border rounded-[8px] transition-all duration-300 active:bg-303030 border-black">
								Are You Model?
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
