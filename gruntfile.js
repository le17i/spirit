module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dist: {
        options: {
          compress: true,
          paths: ["assets/css"],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))()
          ]
        },
        files: {
          "assets/css/screen.css": "src/less/screen.less"
        }
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: true
        },
        files: {
          'assets/js/index.js': 'src/js/index.js'
        }
      }
    },
    watch: {
      less:{
        files: ['src/less/**/*.less'],
        tasks: ['less']
      },
      uglify: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'uglify', 'watch']);
  grunt.registerTask('build', ['less', 'uglify']);

};
