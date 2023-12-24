'use client';
import PageWrapper from '@/components/common/PageWrapper';
import ResetPassword from '@/components/login/ResetPassword';

export default function ResetPasswordPage({ params }: { params: any }) {
	return (
		<PageWrapper>
			<div className="max-w-7xl mx-auto">
				<ResetPassword params={params} />
			</div>
		</PageWrapper>
	);
}
