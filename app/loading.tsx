import Loading from '@/components/layout/Loading';
import React from 'react';

const loading = () => {
	return (
		<div>
			<Loading
				width={50}
				height={50}
				className="flex absolute justify-center w-96
					z-50 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			/>
		</div>
	);
};

export default loading;
