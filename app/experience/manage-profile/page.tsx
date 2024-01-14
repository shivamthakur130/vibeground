import ManageProfile from '@/components/experience/ManageProfile';
import { promises as fs } from 'fs';

export default async function ManageProfilePage() {
	const countriesFile = await fs.readFile(
		process.cwd() + '/app/countries.json',
		'utf8'
	);

	const countries = JSON.parse(countriesFile);

	return (
		<div className="max-w-7xl mx-auto">
			<ManageProfile countries={countries} />
		</div>
	);
}
