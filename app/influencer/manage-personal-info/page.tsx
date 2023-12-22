import ManagePersonalInfo from '@/components/influencer/ManagePersonalInfo';
import { promises as fs } from 'fs';

export default async function ManagePersonalInfoPage() {
	const countriesFile = await fs.readFile(
		process.cwd() + '/app/countries.json',
		'utf8'
	);

	const countries = JSON.parse(countriesFile);

	return (
		<div className="max-w-7xl mx-auto">
			<ManagePersonalInfo countries={countries} />
		</div>
	);
}
