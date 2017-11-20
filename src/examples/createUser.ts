import * as fs from 'fs';
import * as DracoNode from 'draconode';

function generateDeviceId() {
	return '00000000-0000-4000-8000-000000000000'.replace(/0/g, () => (0 | Math.random() * 16).toString(16)).toUpperCase();
}

function generateNickname() {
	const chars = 'abcdefghijklmnopqrstuvwxyz';
	let name = '';
	for (let i = 0; i < 8; i++) {
		name += chars[Math.floor(Math.random() * chars.length)];
	}
	return name;
}

async function main() {
	console.log('Starting...');

	let googleUsername = process.argv[2];
	let googlePassword = process.argv[3];

	if( !googleUsername || !googlePassword )
		throw new Error("Please pass your Google username and password");

	const draco = new DracoNode.Client({
		proxy: 'http://172.98.185.66:29842'
	});

	console.log('Boot...');
	await draco.boot({
		deviceId: generateDeviceId(),
		login: "GOOGLE",
		username: googleUsername,
		password: googlePassword
	});

	console.log('Init login...');
	await draco.login();

	console.log('Generate nickname...');
	let nickname = generateNickname();
	let response = await draco.validateNickname(nickname);
	while (response != null && response.error === DracoNode.enums.FNicknameValidationError.DUPLICATE) {
		nickname = response.suggestedNickname;
		response = await this.validateNickname(nickname);
	}
	if (response) throw new Error('Unable to register nickname. Error: ' + response.error);
	console.log('  nickname: ' + nickname);

	console.log('Accept tos...');
	await draco.acceptTos();

	console.log('Register account...');
	await draco.register(nickname);

	console.log('Set avatar...');
	response = await draco.setAvatar(271891);

	console.log('Save data into users.json...');
	let users = [];
	if (fs.existsSync('users.json')) {
		users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	}
	users.push(draco.user);
	fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');

	// console.log('Load...');
	// await draco.load();

	console.log('Done.');
}

main()
	.catch(e => {
		console.log(e);
	});
