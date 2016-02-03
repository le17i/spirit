module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      options: {
        compress: true,
        paths: ["assets/css"],
        plugins: [
          new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
          new (require('less-plugin-clean-css'))(cleanCssOptions)
        ]
      },
      files: {
        "assets/css/screen.css": "src/less/screen.less"
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      files: {
        'assets/js/index.js': 'src/js/index.js'
      }
    },
    watch: {
      less:{
        files: ['styles/**/*.scss'],
        tasks: ['sass:debug']
      },
      uglify: {
        files: ['app/**/*.js', 'app-login/**/*.js', 'build/**/*.js'],
        tasks: ['jshint', 'concat', 'karma:debug']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'uglify', 'watch']);

};
