module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: [ 'css/sass/*.scss'],
        tasks: ['default'],
      },
    },

    uglify: {
      options: {
        banner: '/*! Last Modified: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        expand: true,
        cwd: 'js/',
        src: ['*.js', '!*.min.js'],
        dest: 'js/',
        ext: '.min.js'
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'css/sass/',
          src: ['main.scss'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    }
  });

  // Watch for changes
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Compile SASS
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Minify JS
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Minify CSS
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Minify JS
  grunt.registerTask('minify', ['uglify']);

  // CSS Compilation
  grunt.registerTask('default', ['sass', 'cssmin']);
};