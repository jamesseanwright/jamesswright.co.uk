module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			dev: {
				files: ['**/*.js', 'public/stylesheets/**/*.scss', 'views/*.html'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			}
		},
		express: {
			dev: {
				options: {
					script: 'server.js',
					node_env: 'development'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['express:dev', 'watch']);
};

