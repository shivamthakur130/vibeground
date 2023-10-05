import { toast } from 'react-toastify';
import RippleLoader from '../../assets/images/svg/ripple_loader.svg';
import Image from 'next/image';
import IconTrue from '../../assets/images/svg/true_new.svg';
import IconError from '../../assets/images/svg/error_icon.svg';

export const ErrorMessage = (
	title: string,
	message: string | string[],
	autoClose: Number = 0,
	position = 'top-right',
	type = 'message'
) => {
	function Msg() {
		return (
			<div>
				<h3 className="text-theme-blue font-medium mb-2 flex justify-between items-center font-segoe">
					<span className="flex items-center">
						<Image
							src={IconError}
							width={14}
							height={14}
							alt={'Notification'}
							className="d-block"
						/>
						<span className="ml-1">{title}</span>
					</span>
				</h3>
				<div
					className="text-222 font-segoe"
					style={{ lineHeight: '1.3', fontSize: '0.9em' }}>
					{type == 'message' ? message : <ul>{message}</ul>}
				</div>
			</div>
		);
	}
	toast.dismiss();
	toast(<Msg />, {
		position: 'top-right',
		autoClose: autoClose == 1 ? 1000 : 0,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const InfoMessage = (message: string) => {
	toast.dismiss();
	toast.info(message, {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const SuccessMessage = (title: string, message: string) => {
	toast.dismiss();
	function Msg() {
		return (
			<div>
				<h3 className="text-theme-blue font-medium mb-2 flex justify-between items-center font-segoe">
					<span className="flex items-center">
						<Image
							src={IconTrue}
							width={14}
							height={14}
							alt={'Notification'}
							className="d-block"
						/>
						<span className="ml-1">{title}</span>
					</span>
				</h3>
				<p className="text-222 font-segoe " style={{ lineHeight: '1.3' }}>
					{message}
				</p>
			</div>
		);
	}
	toast.dismiss();
	toast(<Msg />, {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const WarningMessage = (message: string) => {
	toast.dismiss();
	toast(message, {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const LoadingMgs = (title: string, message: string) => {
	function Msg() {
		return (
			<div>
				<h3 className="text-theme-blue font-medium mb-2 flex justify-between items-center font-segoe">
					<span className="flex items-center">
						<Image
							src={RippleLoader}
							width={20}
							height={20}
							alt={'Notification'}
							className="d-block"
						/>
						<span className="ml-1">{title}</span>
					</span>
				</h3>
				<p className="text-222 font-segoe" style={{ lineHeight: '1.3' }}>
					{message}
				</p>
			</div>
		);
	}
	toast.dismiss();
	toast(<Msg />, {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const DefaultMessage = (message: string) => {
	toast.dismiss();
	toast(message, {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const LoadingMessage = (title: string, message: string) => {
	function Msg() {
		return (
			<div>
				<h3 className="text-theme-blue font-medium mb-2 flex justify-between items-center font-segoe">
					<span className="flex items-center">
						<Image
							src={RippleLoader}
							width={20}
							height={20}
							alt={'Notification'}
							className="d-block"
						/>
						<span className="ml-1">{title}</span>
					</span>
				</h3>
				<p className="text-222 font-segoe" style={{ lineHeight: '1.3' }}>
					{message}
				</p>
			</div>
		);
	}
	toast.dismiss();
	const id = toast(<Msg />, {
		position: 'top-right',
		autoClose: false,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
	return id;
};

export const LoadingSuccess = (
	title: string = '',
	message: string = '',
	id: any = toast,
	show: boolean = false
) => {
	function Msg() {
		return (
			<div>
				<h3 className="text-theme-blue font-medium mb-2 flex justify-between items-center font-segoe">
					<span className="flex items-center">
						<Image
							src={IconTrue}
							width={14}
							height={14}
							alt={'Notification'}
							className="d-block"
						/>
						<span className="ml-1">{title}</span>
					</span>
				</h3>
				<p className="text-222 font-segoe " style={{ lineHeight: '1.3' }}>
					{message}
				</p>
			</div>
		);
	}
	if (!show) return toast.dismiss(id);
	toast.update(id, {
		render: <Msg />,
		autoClose: 1200,
		hideProgressBar: true,
		isLoading: false,
		pauseOnHover: true,
		draggable: true,
		closeButton: true,
	});
};

export const LoadingFail = (
	title: string = '',
	message: string = '',
	id: any = toast
) => {
	function Msg() {
		return (
			<div>
				<h3 className="text-theme-blue font-medium mb-2 flex justify-between items-center font-segoe">
					<span className="flex items-center">
						<Image
							src={IconError}
							width={14}
							height={14}
							alt={'Notification'}
							className="d-block"
						/>
						<span className="ml-1">{title}</span>
					</span>
				</h3>
				<p
					className="text-222 font-segoe"
					style={{ lineHeight: '1.3', fontSize: '0.9em' }}>
					{message}
				</p>
			</div>
		);
	}
	toast.update(id, {
		render: <Msg />,
		autoClose: false,
		hideProgressBar: true,
		isLoading: false,
		pauseOnHover: true,
		draggable: true,
		closeButton: true,
	});
};
