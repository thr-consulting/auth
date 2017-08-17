import debug from 'debug';
import {Map} from 'immutable';
import {actionType, changed} from '@thx/ducks';
import {getConfig} from './config';

const d = debug('app:user:userData');

export const {DATA} = actionType('USER');

const initialState = new Map({
	user: null,
	permissions: [],
});

export default function reducer(state = initialState, action) {
	const {type, data} = action;

	switch (type) {
		case changed(DATA):
		case DATA:
			d('Setting user data');
			return state
				.set('user', data.user)
				.set('permissions', data.permissions);

		// case 'USER_LOGOUT':
		// 	return state
		// 		.set('user', null)
		// 		.set('permissions', []);

		default:
			return state;
	}
}


function buildUserData() {
	const {Meteor, Roles} = getConfig();
	const roles = Meteor.user() ? Meteor.user().roles || [] : [];
	const permissions = Roles.find({name: {$in: roles}}).fetch().reduce((memo, v) => [...memo, ...v.permissions], []);
	return {
		user: Meteor.user(),
		permissions,
	};
}

/**
 * Copies logged in user data to state reactively.
 * @tag Action
 * @returns {ReduxAction}
 */
export function getUserData(firstRun = false) {
	const {Meteor} = getConfig();
	d(`Getting user data. First run: ${firstRun}`);
	if (firstRun) {
		return {
			type: DATA,
			data: buildUserData(),
		};
	}
	return {
		type: DATA,
		meteor: {
			subscribe: () => Meteor.subscribe('userData'),
			get: () => buildUserData(),
		},
	};
}

