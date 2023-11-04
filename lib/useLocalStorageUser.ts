export const setUserData = (user: any) => {
	try {
		localStorage.setItem('user', JSON.stringify(user));
	} catch (err) {}
};
export const removeUserData = () => {
	try {
		localStorage.removeItem('user');
	} catch (err) {}
};
export const getUser = () => {
	try {
		const user = JSON.parse(localStorage.getItem('user') || '');

		if (user === null) {
			return undefined;
		}
		return user;
	} catch (err) {
		return null;
	}
};
export const setLoginType = (loginType: string) => {
	try {
		localStorage.setItem('loginType', loginType);
	} catch (err) {}
};
export const getLoginType = () => {
	try {
		const loginType = localStorage.getItem('loginType');

		if (loginType === null) {
			return 'fan';
		}
		return loginType;
	} catch (err) {
		return 'fan';
	}
};
