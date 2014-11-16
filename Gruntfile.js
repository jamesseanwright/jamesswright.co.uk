module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			src: {
				files: ['**/*.js', 'public/stylesheets/**/*.scss', 'views/*.html'],
				tasks: ['forever:app:stop', 'forever:app:start']
			}
		},
		forever: {
			app: {
				options: {
					index: 'server.js',
					logDir: 'log'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-forever');

	grunt.registerTask('default', ['forever:app:start', 'watch']);
};