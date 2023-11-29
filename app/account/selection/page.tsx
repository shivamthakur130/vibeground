import Selection from '@/components/account/Selection';
import { promises as fs } from 'fs';

export default async function SelectionPage() {
	const countriesFile = await fs.readFile(
		process.cwd() + '/app/countries.json',
		'utf8'
	);
	const citiesFile = await fs.readFile(
		process.cwd() + '/app/cities.json',
		'utf8'
	);
	const countries = JSON.parse(countriesFile);
	const cities = JSON.parse(citiesFile);
	return (
		<div className="max-w-7xl mx-auto">
			<Selection countries={countries} cities={cities} />
		</div>
	);
}
