import TinderAbout from '@/components/tinder/about';

const TinderDetailPage = ({ params }: { params: { id: string } }) => {
	console.log(params, 'id');
	return (
		<>
			<TinderAbout params={params} />
		</>
	);
};

export default TinderDetailPage;
