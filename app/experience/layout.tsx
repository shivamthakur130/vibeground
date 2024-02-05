'use client';
import AuthVerification from '@/components/common/AuthVerification';

import MobileBottomMenu from '@/components/common/mobileBottomMenu';

export default function ExperienceLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<MobileBottomMenu />
			<AuthVerification userType="fan">{children}</AuthVerification>
		</>
	);
}
