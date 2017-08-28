import userHasPermission from './userHasPermission';
import {getAuthConfig} from './config';

export default function(permission) {
	const {Match} = getAuthConfig();
	return Match.Where(id => userHasPermission(id, permission));
}
