import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Filter = ({ isOpen, setIsOpen }: any) => {
	function closeModal() {
		setIsOpen(false);
	}
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10 " onClose={closeModal}>
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
							<Dialog.Panel className="sm:bg-black/50 bg-white sm:backdrop-blur-md w-full max-w-4xl transform overflow-hidden rounded-2xl p-10 text-left align-middle shadow-xl transition-all">
								<h2 className="sm:text-white text-2f2f2f font-PoppinsBold text-3xl mb-7">
									Filter
								</h2>
								<ul className="flex flex-wrap gap-3">
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Busty
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Huge Boobs
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Beautiful
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Glasses
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Lipstick
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Big Ass
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Beautiful
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Busty
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Huge Boobs
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Beautiful
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Glasses
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Lipstick
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Big Ass
									</li>
									<li className="border border-[#656565] sm:border-white py-2.5 px-4 rounded-lg text-151515 sm:text-white hover:text-white cursor-pointer hover:bg-2f2f2f hover:border-2f2f2f">
										Beautiful
									</li>
								</ul>
								<button className="bg-2f2f2f text-base px-16 py-3 rounded-md mt-7 text-white hover:opacity-70">
									Apply Filter
								</button>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Filter;
