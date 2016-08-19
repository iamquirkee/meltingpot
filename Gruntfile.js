module.exports = function(grunt) {

  // Grunt configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['.tmp'],

    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'public/css/app.css': 'scss/app.scss'
        }
      }
    },

    coffeelint: {
      app: [
        'coffee/*.coffee',
        'coffee/**/*.coffee'
      ],
      tests: {
        files: {
          src: ['spec/coffee/*.coffee']
        },
      },
      options: {
        'no_trailing_whitespace': {
          level: 'ignore'
        },'max_line_length': {
          value: 200,
          level: 'ignore'
        }
      }
    },

    concat: {
      options: {
        separator: '\n',
      },
      libjs: {
        src: [
          'node_modules/oauthio-web/dist/oauth.min.js',
        ],
        dest: 'public/js/lib/lib.min.js',
      }
    },

    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: false,
        cwd: 'coffee',
        src: ['*.coffee', '**/*.coffee'],
        dest: 'public/js/',
        ext: '.js'
      }
    },

    watch: {
      sass: {
        files: ['scss/**/*.{scss,sass}', 'scss/*.scss'],
        tasks: ['sass:dist', ],
      },
      coffee: {
        files: [
          'coffee/*.coffee',
          'coffee/**/*.coffee',
          'spec/coffee/**/*.coffee'
        ],
        tasks: ['coffeelint', 'coffee:glob_to_multiple' ],
      },
    }

  });

  // Load Grunt tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Run "grunt" to start the go server and watch scss files for recompilation
  grunt.registerTask('default', [
    'coffeelint',
    'coffee:glob_to_multiple',
    'concat:libjs',
    'sass',
    'watch',
  ]);



};
