import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useState } from 'react';
import { RxReset, RxCheck } from 'react-icons/rx';

const Filter = ({
	isOpen,
	setIsOpen,
	categoriesList,
	filterCategory,
	setFilterCategory,
	getAllModelsDetails,
}: any) => {
	const [loading, setLoading] = useState(false);
	const [updateCategory, setUpdateCategory] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	const handleFilter = (category: any) => {
		if (filterCategory === '') {
			const newFilterCategory = [];
			newFilterCategory.push(category);
			setFilterCategory(newFilterCategory);
		} else {
			if (filterCategory.includes(category)) {
				const newFilterCategory = removeItemOnce(filterCategory, category);
				setFilterCategory(newFilterCategory);
			} else {
				const newFilterCategory = filterCategory;
				filterCategory.push(category);
				setFilterCategory(newFilterCategory);
			}
		}
		setUpdateCategory(!updateCategory);
	};
	function removeItemOnce(arr: [], value: any) {
		var index = arr.indexOf(value as never);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}
	const checkValueExist = (value: any) => {
		if (filterCategory.includes(value)) {
			return true;
		}
		return false;
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50 " onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed sm:bg-black/25 sm:backdrop-blur-sm" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex  min-h-full bg-black/50 backdrop-blur-sm sm:items-center items-end sm:justify-center  sm:p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="sm:bg-black/50 bg-white sm:backdrop-blur-md w-full max-w-4xl transform overflow-hidden rounded-2xl p-4 sm:p-10 text-left align-middle shadow-xl transition-all">
								<div className="flex justify-between border-b border-gray-200 mb-2 pb-2">
									<h2 className="sm:text-white text-2f2f2f font-PoppinsBold text-3xl ">
										Filter
									</h2>
									<div
										className="rounded-md sm:text-gray-600 text-2f2f2f font-PoppinsRegular text-2xl hover:bg-gray-300 bg-gray-100 px-3 hover:text-gray-500 duration-300 transition-all cursor-pointer"
										onClick={() => closeModal()}>
										x
									</div>
								</div>
								<ul className="flex flex-wrap gap-3 duration-200">
									{categoriesList.map((category: any, index: number) => (
										<li
											className={`
											cursor-pointer py-2.5 px-4 rounded-lg
												${
													checkValueExist(category)
														? 'bg-2f2f2f border-2f2f2f text-white'
														: 'text-gray-200  bg-[#656565] border-2f2f2f'
												}
												`}
											key={index}
											onClick={() => handleFilter(category)}>
											{category}
										</li>
									))}
								</ul>
								<div className="flex flex-wrap space-x-3 duration-200">
									<div>
										<button
											className="bg-2f2f2f text-base px-4 py-2 rounded-sm mt-7 text-white hover:opacity-70 shadow-sm transition-all duration-150"
											onClick={() => {
												getAllModelsDetails(filterCategory);
												closeModal();
											}}>
											<RxCheck
												className="inline-block mr-2 text-white"
												style={{ color: 'white', fontSize: '1.4em' }}
											/>
											Apply Filter
										</button>
									</div>
									{/* reset button */}
									<div>
										{filterCategory.length > 0 && (
											<button
												className="bg-2f2f2f text-base px-4 py-2 rounded-sm mt-7 text-white hover:opacity-70 shadow-sm transition-all duration-150"
												onClick={() => {
													setFilterCategory('');
													getAllModelsDetails([]);
													closeModal();
												}}>
												<RxReset
													className="inline-block mr-2 text-white"
													style={{ color: 'white', fontSize: '1.4em' }}
												/>
												Reset
											</button>
										)}
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Filter;
