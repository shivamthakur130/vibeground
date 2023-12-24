'use client';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/redux/slice/user';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { fanDob } from '@/services/user.service';
import Loading from '@/components/layout/Loading';
import {
	SuccessMessage,
	ErrorMessage,
} from '@/components/layout/ToastifyMessages';
import AgeVerificationDialog from './AgeVerificationDialog';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import PageWrapper from '../common/PageWrapper';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DOB = () => {
	// start date of birth more than 18 years ago
	const startDate = new Date();
	startDate.setFullYear(startDate.getFullYear() - 18);
	const [selectedDate, setSelectedDate] = useState<Date>(startDate);

	const [showAgeVerificationDialog, setShowAgeVerificationDialog] =
		useState<boolean>(false);

	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();

	const user = useSelector((state: any) => state.userReducer.user);
	const { push } = useRouter();
	// form validation rules
	const validationSchema = Yup.object().shape({
		checkAgeVerified: Yup.string(),
	});
	const messageTitle =
		user.type === 'fan' ? 'User Registration' : 'Model Registration';
	const formOptions = { resolver: yupResolver(validationSchema) };
	// get functions to build form with useForm() hook
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		reset,
		formState,
	} = useForm(formOptions);
	const { errors } = formState;

	const checkAgeIsValid = (selected: Date): boolean => {
		const date = new Date(selected);
		const today = new Date();
		const age = today.getFullYear() - date.getFullYear();
		const monthDiff = today.getMonth() - date.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
			return age - 1 >= 18;
		}
		return age >= 18;
	};

	const buttonRef = useRef<HTMLButtonElement>(null);

	const onClickSubmit = () => {
		if (buttonRef.current) {
			buttonRef.current.click();
		}
	};

	async function onSubmit(formField: any) {
		setLoading(true);
		// check if age is valid
		if (!selectedDate) {
			ErrorMessage(messageTitle, 'Please select a date of birth');
			setLoading(false);
			return;
		}
		if (!checkAgeIsValid(selectedDate)) {
			ErrorMessage(messageTitle, 'You must be 18 years or older to join');
			setLoading(false);
			return;
		}
		if (formField.checkAgeVerified === 'false') {
			setShowAgeVerificationDialog(true);
			setLoading(false);
			return;
		}
		const formattedDate = moment(selectedDate).format('DD-MM-YYYY');
		// const formattedDate = moment(dateStr);
		try {
			const response = await fanDob({
				userId: user.userId,
				dob: formattedDate,
			});
			if (response.status === 201) {
				reset();
				dispatch(updateUser({ ...user, date_of_birth: formattedDate }));
				SuccessMessage(messageTitle, 'Date of birth saved successfully.');
				push('/account/gender');
			} else {
				ErrorMessage(messageTitle, 'Something went wrong');
			}
		} catch (error) {
			handleError(error);
		}
		setLoading(false);
	}

	const handleError = (error: any) => {
		if (error.response) {
			let message = error.response.data.message;
			ErrorMessage(messageTitle, message);
		} else if (error.request) {
			ErrorMessage(
				messageTitle,
				'Network Error. Please check your internet connection.'
			);
		} else {
			ErrorMessage(
				messageTitle,
				'An unexpected error occurred. Please try again later.'
			);
		}
	};

	const onChangeDate = (date: Value) => {
		const dateStr = `${date}`;
		const formattedDate = moment(dateStr);
		setSelectedDate(formattedDate.toDate());
	};

	return (
		<PageWrapper>
			<div className="Email text-center max-w-2xl mx-auto sm:mt-28 sm:mb-24 relative px-4 my-10">
				<p className="md:text-xl text-xs text-888 mb-5">
					Let`s complete your profile
				</p>
				<h2 className="md:text-5xl text-lg font-PoppinsBold text-111 mb-10">
					Choose your date of birth
				</h2>
				{loading && (
					<Loading
						width={50}
						height={50}
						className="flex absolute justify-center w-96
					z-50 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					/>
				)}
				<form
					id="DOBForm"
					onSubmit={handleSubmit(onSubmit)}
					className={`${loading ? 'opacity-25' : ''}`}>
					<input type="hidden" {...register('checkAgeVerified')} value={'false'} />
					<div className=" flex justify-center">
						<DatePicker
							onChange={onChangeDate}
							clearIcon={null}
							value={selectedDate}
							format="dd-MM-y"
							className=" text-gray-900 text-tg rounded-lg focus:ring-black-500 focus:border-black-500 block px-4"
						/>
					</div>
					<button
						ref={buttonRef}
						className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515 transition-all duration-300 active:bg-303030 "
						id="birthdayForm"
						type="submit"
						disabled={loading}>
						Continue
					</button>
				</form>
				{/* {showAgeVerificationDialog && ( */}
				<AgeVerificationDialog
					setValue={setValue}
					onClickSubmit={onClickSubmit}
					showAgeVerificationDialog={showAgeVerificationDialog}
					setShowAgeVerificationDialog={setShowAgeVerificationDialog}
				/>
				{/* )} */}
			</div>
		</PageWrapper>
	);
};

export default DOB;
