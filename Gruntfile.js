module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		nodemon: {
			app: {
				script: 'server.js',
				options: {
					watch: ['**/*.js', '**/public/stylesheets/**/*.scss', '**/views/*.html']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['nodemon']);
};

// concurrent: {
// 			app: {
// 				tasks: ['nodemon', 'watch'],
// 				options: {
// 					logConcurrentOutput: true
// 				}
// 			}
// 		},
// 		watch: {
// 			src: {
// 				files: ['**/*.js', 'public/stylesheets/**/*.scss', 'views/*.html'],
// 				tasks: ['nodemon']
// 			}
// 		},