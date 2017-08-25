import {Map} from 'immutable';
import {setAuthConfig, userHasPermission} from '../client';

setAuthConfig({
	Meteor: {},
	Users: {},
	Roles: {},
});

const authState = new Map({
	user: {},
	permissions: ['SYSADMIN'],
});

it('should validate permission', () => {
	expect(userHasPermission(authState, 'SYSADMIN')).toBe(true);
});
