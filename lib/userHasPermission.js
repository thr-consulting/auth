import isArray from 'lodash/isArray';
import intersection from 'lodash/intersection';
import isObject from 'lodash/isObject';
import {SYSADMIN} from './permissions';
import {getConfig} from './config';

/**
 * Checks whether a user has a certain permission or not.
 * @param {object|string} authStateOrId - Pass in either the auth state tree (for client) or a user ID (for server).
 * @param {string|string[]} permission - Permission constant or array of permission constants.
 * @returns {boolean} - Returns true if the user has the specified permission(s).
 */
export default function userHasPermission(authStateOrId, permission) {
	if (!getConfig()) throw new Error('Make sure you call userHasPermission.setConfig() before using userHasPermission()');
	const matchPerms = isArray(permission) ? [...permission, SYSADMIN] : [permission, SYSADMIN];

	if (isObject(authStateOrId)) {
		if (!authStateOrId.get('user')) return false;
		return intersection(authStateOrId.get('permissions'), matchPerms).length > 0;
	}

	const user = getConfig().Users.findOne(authStateOrId);
	if (!user) return false;
	return getConfig().Roles.findOne({
		$and: [
			{name: {$in: user.roles}},
			{permissions: {$in: matchPerms}},
		],
	}) !== null;
}
