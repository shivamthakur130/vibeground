import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/redux/provider';
import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata: Metadata = {
	title: 'Vibeground',
	description: 'Vibeground',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="font-manropeRegular">
				<Providers>
					<React.Fragment>
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							transition={Zoom}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							style={{ marginTop: '110px', marginRight: '-10px', borderRadius: '0' }}
							pauseOnHover
							limit={1}
						/>
						{children}
					</React.Fragment>
				</Providers>
			</body>
		</html>
	);
}
