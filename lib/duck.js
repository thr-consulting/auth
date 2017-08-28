import debug from 'debug';
import {Map} from 'immutable';
import {actionType, changed} from '@thx/ducks';
import {getAuthConfig} from './config';

const d = debug('thx:auth:duck');

export const {DATA, LOGGEDOUT} = actionType('USER');

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

		case LOGGEDOUT:
			return state
				.set('user', null)
				.set('permissions', []);

		default:
			return state;
	}
}

function buildUserData() {
	const {Meteor, Roles} = getAuthConfig();
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
export function subscribeToUserData(firstRun = false) {
	const {Meteor, Accounts} = getAuthConfig();

	d(`Getting user data. First run: ${firstRun}`);
	if (firstRun) {
		return dispatch => {
			dispatch({
				type: DATA,
				data: buildUserData(),
			});

			// Hook accounts log in/out mechanism
			if (!subscribeToUserData.hooksInstalled) {
				subscribeToUserData.hooksInstalled = true;
				Accounts.onLogout(() => {
					dispatch({type: LOGGEDOUT});
				});
			}
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
subscribeToUserData.hooksInstalled = false;

export function getAuthUser(state) {
	return state.getIn(['auth', 'user']);
}
