import { basePath, PostSettings } from './setting';
const getUsers = async (signal: AbortSignal) => {
	const resp = await fetch(`${basePath}user/users`, { signal });
	return resp.json();
};
const loginUser = async (data: {
	email: string;
	password: string | number;
	type?: string;
}) => {
	const resp = await fetch(`${basePath}user/login`, PostSettings(data));
	return resp.json();
};
export { getUsers, loginUser };
