import set from 'lodash/set';
import get from 'lodash/get';

function setAuthConfig({Users, Roles, Meteor, Match, Accounts}) {
	set(global, 'thx.auth.config', {
		Users,
		Roles,
		Meteor,
		Match,
		Accounts,
	});
}

function getAuthConfig() {
	return get(global, 'thx.auth.config');
}

export {
	setAuthConfig,
	getAuthConfig,
};
