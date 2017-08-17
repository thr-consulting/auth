let config = null;

function setConfig({Users, Roles, Meteor}) {
	config = {
		Users,
		Roles,
		Meteor,
	};
}

function getConfig() {
	return config;
}

export {
	setConfig,
	getConfig,
};
