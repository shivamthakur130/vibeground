import CircleLoader from '@/assets/images/svg/circle_loader.svg';
import Image from 'next/image';

interface LoadingProps {
	width: number;
	height: number;
	className: string;
}

const Loading = ({ width, height, className }: LoadingProps) => {
	return (
		<>
			<div className={className}>
				<Image src={CircleLoader} width={width} height={height} alt={'loader'} />
			</div>
		</>
	);
};
export default Loading;
