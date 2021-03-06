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
          'assets/css/main.css': 'src/less/main.less',
          'assets/css/mobile.css': 'src/less/mobile.less',
          'assets/css/index.css': 'src/less/index.less',
          'assets/css/post.css': 'src/less/post.less',
          'assets/css/author.css': 'src/less/author.less'
        }
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: '/',
          cache: [
            '/assets/css/main.css',
            '/assets/css/mobile.css',
            '/assets/css/index.css',
            '/assets/css/post.css',
            '/assets/css/author.css',
            'https://fonts.googleapis.com/css?family=Oswald:700|Roboto+Slab:700,300',
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
