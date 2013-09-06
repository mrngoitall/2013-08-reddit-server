module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {}
    },
    watch: {
      js: {
        files: 'public/js/**/*.js'
      },
      html: {
        files: ['public/*.html']
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concurrent:target']);
}