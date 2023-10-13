import AuthVerification from '@/components/common/AuthVerification';
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthVerification userType="model">{children}</AuthVerification>;
}