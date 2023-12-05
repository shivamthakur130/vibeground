'use client';

import Link from 'next/link';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		maxWidth: '460px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};
const customStylesFullScreen = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
	},
	content: {
		background: '#fff',
	},
};

Modal.setAppElement('#dialog');

const AgeVerificationDialog = ({
	setShowAgeVerificationDialog,
	showAgeVerificationDialog,
	onClickSubmit,
	setValue,
}: any) => {
	const [showFullDetails, setShowFullDetails] = React.useState(false);
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
		<Modal
			isOpen={showAgeVerificationDialog}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={showFullDetails ? customStylesFullScreen : customStyles}>
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
			{!showFullDetails && (
				<div className="py-4">
					By clicking {'"Accept"'}, you confirm that you are 18 years or older and
					agree to our{' '}
					<a
						target="_blank"
						href="/privacy-policy"
						className="text-blue-600 cursor-pointer underline">
						{/* // onClick={() => {
						// 	setShowFullDetails(!showFullDetails);
						// }} */}
						Privacy policy
					</a>{' '}
					and{' '}
					<a
						target="_blank"
						href="/terms-of-use"
						className="text-blue-600 cursor-pointer underline">
						{/* // onClick={() => {
						// 	setShowFullDetails(!showFullDetails);
						// }} */}
						Terms of use
					</a>
					.
				</div>
			)}
			{showFullDetails && (
				<div className="py-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
					temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					<br />
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					<br />
					<br />
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					<br />
					<br />
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					<br />
					<br />
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniam Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					<br />
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					<br />
					<br />
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					<br />
					<br />
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					<br />
					<br />
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod temporin cididunt ut labore et dolore magnaaliqua. Ut enim ad minim
					veniam
					<br /> <br />
					<span
						className="text-blue-600 cursor-pointer underline"
						onClick={() => {
							setShowFullDetails(!showFullDetails);
						}}>
						show less
					</span>
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
		</Modal>
	);
};

export default AgeVerificationDialog;
