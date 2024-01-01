'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const AgeVerificationDialog = ({
	setShowAgeVerificationDialog,
	showAgeVerificationDialog,
	onClickSubmit,
	setValue,
}: any) => {
	const [showFullDetails, setShowFullDetails] = useState(false);
	function openModal() {
		setShowAgeVerificationDialog(true);
	}

	function afterOpenModal() {}

	function closeModal() {
		setShowAgeVerificationDialog(false);
	}
	const verifyAge = () => {
		setValue('checkAgeVerified', 'true');
		closeModal();
		onClickSubmit();
	};
	return (
		<>
			<Transition appear show={showAgeVerificationDialog} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={() => {}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-99"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-99">
						<div className="fixed inset-0 bg-black/50" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto ">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-50"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-300"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-50">
								<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-202020 dark:text-E3E3E3">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900">
										<div className="flex justify-between border-b pb-1 mb-4">
											<h1 className="text-2xl font-bold">
												{!showFullDetails ? 'Age Verification' : 'Terms & Conditions'}
											</h1>
											<button
												onClick={closeModal}
												className="btn btn-default px-3 shadow-sm  text-lg text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 ">
												X
											</button>
										</div>
									</Dialog.Title>
									<div className="mt-2 text-sm text-gray-500">
										{!showFullDetails && (
											<div className="py-4">
												By clicking {'"Accept"'}, you confirm that you are 18 years or older
												and agree to our{' '}
												<a
													target="_blank"
													href="/privacy-policy"
													className="text-blue-600 cursor-pointer underline">
													Privacy policy
												</a>{' '}
												and{' '}
												<a
													target="_blank"
													href="/terms-of-use"
													className="text-blue-600 cursor-pointer underline">
													Terms of use
												</a>
												.
											</div>
										)}
										<div className="flex flex-end space-x-4 justify-end">
											<button
												className="btn btn-default px-4 shadow-sm py-2 mt-10 text-xl text-white bg-red-500 rounded-[8px] hover:bg-red-700 transition-all duration-300 active:bg-red-700 "
												onClick={closeModal}>
												Close
											</button>
											<button
												className="btn btn-default px-4 shadow-sm py-2 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
												onClick={verifyAge}
												type="button">
												Accept
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default AgeVerificationDialog;
