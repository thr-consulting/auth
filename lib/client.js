import {SYSADMIN} from './permissions';
import userHasPermission from './userHasPermission';
import hasPermission from './hasPermission';
import {setAuthConfig} from './config';
import reducer, {subscribeToUserData, DATA, getAuthUser} from './duck';

const authReducer = {
	auth: reducer,
};

export {
	SYSADMIN,
	userHasPermission,
	hasPermission,
	setAuthConfig,
	authReducer,
	subscribeToUserData,
	DATA,
	getAuthUser,
};
