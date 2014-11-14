module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			ejs: {
				files: ['client/modules/**/index.ejs',
						'client/modules/inventory/views/*.ejs']
			},
			css: {
				files: 'client/libs/css/style.css'
			},
			options: {
		        livereload: true,
		    }
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

};