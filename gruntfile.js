module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig({
    pkg,
    sass: {
      dist: {
        options:{
          loadPath: ['node_modules'],
          style: 'compressed'
        },
        files: {
          'dist/author.css':  'src/theme/author.scss',
          'dist/icons.css':   'src/theme/icons.scss',
          'dist/index.css':   'src/theme/index.scss',
          'dist/main.css':    'src/theme/main.scss',
          'dist/mobile.css':  'src/theme/navigation.scss',
          'dist/post.css':    'src/theme/post.scss',
        }
      }
    },
    copy: {
      fonts: {
        expand: true,
        cwd: 'node_modules/@fontsource',
        src: ['**', '!**/scss/**', '!**/*.json', '!**/*.md'],
        dest: 'dist/@fontsource/'
      },
      iconfonts: {
        expand: true,
        cwd: 'src/theme/fonts',
        src: ['**', '!**/less/**', '!**/css/**', '!bower.json'],
        dest: 'dist/fonts'
      },

    },
    autoprefixer: {
      dist:{
        files: {
          'dist/author.css': 'dist/author.css',
          'dist/icons.css' : 'dist/icons.css',
          'dist/index.css' : 'dist/index.css',
          'dist/main.css': 'dist/main.css',
          'dist/mobile.css': 'dist/mobile.css',
          'dist/post.css': 'dist/post.css',
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/index.js': 'src/js/index.js'
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: `spirit-theme${pkg.version}.zip`,
        },
        files: [
          { src: ['package.json'] },
          { src: ['dist/**'], expand: true },
          { src: ['./**/*.hbs'] }
        ],
      }
    },
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'copy', 'autoprefixer', 'uglify', 'compress']);

};
