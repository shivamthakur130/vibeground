'use client';
import ResetPassword from '@/components/login/ResetPassword';

export default function ResetPasswordPage({ params }: { params: any }) {
	return (
		<div className="max-w-7xl mx-auto">
			<ResetPassword params={params} />
		</div>
	);
}
