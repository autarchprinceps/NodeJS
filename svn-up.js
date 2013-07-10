#!/usr/bin/shjs

require('shelljs/global');

console.log(process.argv);

if(!which('svn')) {
	echo('Install subversion!');
	exit(1);
}

cd(process.argv[2] + '/..');
pwd();

if(exec('svn up').code !== 0) {
	echo('svn up failed');
	exit(2);
}
exit(0);
