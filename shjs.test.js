#!/usr/bin/shjs

require('shelljs/global');

console.log(process.argv);

if(!which('git')) {
	echo('Install git!');
	exit(1);
}

cd(process.argv[2] + '/..');
pwd();

if(exec('git pull').code !== 0) {
	echo('git pull failed');
	exit(2);
}
exit(0);
