'use client';
import PageWrapper from '@/components/common/PageWrapper';
import Login from '@/components/login/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function LoginPage() {
	return (
		<PageWrapper>
			<div className="max-w-7xl mx-auto">
				<GoogleOAuthProvider clientId="947221295981-sd8b9tv8p4oqmrbgp3um2vhl14p5l4k7.apps.googleusercontent.com">
					<Login />
				</GoogleOAuthProvider>
			</div>
		</PageWrapper>
	);
}
