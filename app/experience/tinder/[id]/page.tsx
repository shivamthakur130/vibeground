import TinderAbout from '@/components/tinder/about';

const TinderDetailPage = ({ params }: { params: { id: string } }) => {
	return (
		<>
			<TinderAbout params={params} />
		</>
	);
};

export default TinderDetailPage;
