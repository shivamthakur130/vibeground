import Categories from '@/components/influencer/Categories';
import categoriesList from '../../../categories.json';

export default function CategoriesPage() {
	return (
		<div className="max-w-7xl mx-auto">
			<Categories categoriesList={categoriesList} />
		</div>
	);
}
