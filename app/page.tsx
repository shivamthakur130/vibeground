import Image from 'next/image';
import LoginImg from 'assets/images/login.svg';
import Bg1 from 'assets/images/bg1.svg';
import Bg2 from 'assets/images/bg2.svg';
import LoginForm from '@/components/login/loginForm';
import IconLogo from 'assets/images/svg/icon_logo.svg';
import LoginLine from 'assets/images/svg/login_line.svg';

export default function Home() {
	return (
		<div
			className="overflow-hidden bg-[#edf1fa] flex flex-col justify-between  w-full"
			id="LoginRoot">
			<div className="flex items-center justify-center bg-[#8974f6] shadow-[0px_4px_20px_0px_rgba(0,_0,_0,_0.25)]  py-8  ">
				<Image src={IconLogo} className="w-8 shrink-0" alt={''} />
				<div className="text-xl font-manropeRegular font-bold text-[#f5f5f5] self-start ml-2">
					Demo
				</div>
			</div>
			<div className="md:mt-10 mt-16  lg:-mb-14 max-w-6xl w-auto lg:w-[1187px] flex flex-col lg:flex-row items-center bg-white justify-around lg:mx-auto mx-3 py-16 px-12 rounded-3xl z-10"></div>
			<div className="flex items-end relative"></div>
		</div>
	);
}
