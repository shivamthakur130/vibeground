'use client';

import Registration from '@/components/account/Registration';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Home() {
	return (
		<div className="max-w-7xl mx-auto">
			<GoogleOAuthProvider clientId="169544355446-ohq97v8qhvt1kr2ukqteitle9aogq47u.apps.googleusercontent.com">
				<Registration />
			</GoogleOAuthProvider>
		</div>
	);
}
