import Selection from '@/components/account/Selection';
import { promises as fs } from 'fs';

export default async function SelectionPage() {
	const countriesFile = await fs.readFile(
		process.cwd() + '/app/countries.json',
		'utf8'
	);

	const countries = JSON.parse(countriesFile);
	return (
		<div className="max-w-7xl mx-auto">
			<Selection countries={countries} />
		</div>
	);
}
