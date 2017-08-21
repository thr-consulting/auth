import {getAuthConfig} from './config';

export default function() {
	const {Meteor, Users, Roles} = getAuthConfig();

	Meteor.publishComposite('userData', function publish() {
		return {
			find() { // Find user data
				return Users.find({
					_id: this.userId,
				}, {
					fields: {
						profile: 1,
						roles: 1,
					},
				});
			},
			children: [
				{
					find(user) { // Find permissions
						return Roles.find({
							name: {$in: user.roles || []},
						}, {
							fields: {
								name: 1,
								permissions: 1,
							},
						});
					},
				},
			],
		};
	});
}
