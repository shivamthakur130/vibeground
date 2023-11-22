'use client';

import Registration from '@/components/account/Registration';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Home() {
	return (
		<div className="max-w-7xl mx-auto">
			<GoogleOAuthProvider clientId="947221295981-sd8b9tv8p4oqmrbgp3um2vhl14p5l4k7.apps.googleusercontent.com">
				<Registration />
			</GoogleOAuthProvider>
		</div>
	);
}
