'use client';

import AuthVerification from '@/components/common/AuthVerification';

export default function ExperienceLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthVerification userType="fan">{children}</AuthVerification>;
}
