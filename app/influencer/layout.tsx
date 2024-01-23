'use client';
import AuthVerification from '@/components/common/AuthVerification';
import MobileBottomMenuModel from '@/components/common/mobileBottomMenuModel';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<MobileBottomMenuModel />
			<AuthVerification userType="model">{children}</AuthVerification>
		</>
	);
}
