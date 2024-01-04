import ManageProfile from '@/components/influencer/ManageProfile';
import categoriesList from '../../categories.json';

export default async function ManageProfilePage() {
	return (
		<div className="max-w-7xl mx-auto">
			<ManageProfile categoriesList={categoriesList} />
		</div>
	);
}
