module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			dev: {
				files: ['sass/**'],
				tasks: ['sass', 'express:dev'],
				options: {
					spawn: false
				}
			}
		},
		express: {
			dev: {
				options: {
					script: 'server.js',
					node_env: 'development',
				}
			},
			test: {
				options: {
					script: 'tests/testserver.js',
					node_env: 'test',
				}
			}
		},
		sass: {
			dist: {
				files: {
					'public/stylesheets/main.css': 'sass/main.scss'
				}
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['tests/unit/server/**/*.js']
			}
		},
		mocha_phantomjs: {
			all: {
				options: {
					urls: ['http://localhost:3001']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-mocha-phantomjs');

	grunt.registerTask('default', ['sass', 'express:dev', 'watch']);
	grunt.registerTask('test', ['mochaTest', 'express:test', 'mocha_phantomjs']);
};