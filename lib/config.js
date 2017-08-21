let config = null;

function setAuthConfig({Users, Roles, Meteor}) {
	config = {
		Users,
		Roles,
		Meteor,
	};
}

function getAuthConfig() {
	return config;
}

export {
	setAuthConfig,
	getAuthConfig,
};
