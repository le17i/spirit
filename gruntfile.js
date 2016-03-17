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
          'assets/css/screen.css': 'src/less/screen.less'
        }
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: '/',
          cache: [
            '/assets/css/screen.css',
            '/content/images/2016/02/leandro-dias-frontend-developer-2.svg',
            '/content/images/2016/02/leandro-dias-frontend-developer-1.jpg',
            'https://fonts.googleapis.com/css?family=Fjalla+One|Slabo+27px',
            '/assets/fonts/icons/icomoon.eot',
            '/assets/fonts/icons/icomoon.svg',
            '/assets/fonts/icons/icomoon.ttf',
            '/assets/fonts/icons/icomoon.woff'
          ],
          headcomment: " <%= pkg.name %> v<%= pkg.version %>",
          verbose: true,
          timestamp: true,
          hash: true,
          process: function(path) {
            return path.substring('/assets/'.length);
          }
        },
        src: [
          'assets/css/*.css'
        ],
        dest: 'assets/cache/manifest.appcache'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-manifest');

  // Default task(s).
  grunt.registerTask('default', ['less', 'uglify', 'manifest']);

};
