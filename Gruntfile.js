var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {}
    },
    watch: {
      js: {
        files: 'js/**/*.js'
      },
      html: {
        files: ['templates/**/*.html', 'index.html']
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    connect: {
      options: {
        port: 3000,
        hostname: 'localhost'
      },
      proxies: [
        {
          context: '/reddit',
          host: 'www.reddit.com',
          port: 80,
          https: false,
          changeOrigin: false,
          rewrite: {
            '/^reddit': ''
          }
        }
      ],
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              proxySnippet
            ];
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['configureProxies','concurrent:target']);
}