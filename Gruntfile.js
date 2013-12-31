module.exports = function( grunt )
{

	'use strict';

	//Define Constants
	var PORT 					= 3000,
			RELOAD_PORT 	= 35729, 
			DIST_DIR			= 'distribution',
			RESOURCES_DIR = DIST_DIR + '/resources';


	/**
	 * Tasks Config
	 * @type { Object }
	 */
	grunt.initConfig(
		{

			/**
			 * Remove the distribution dir
			 * @type { Object }
			 */
			clean : 
			{
				dist : 
				[
					DIST_DIR
				],

				html :
				[
					DIST_DIR + '/**/*.html'
				]

			},

			/**
			 * Create the distribution dir
			 * @type { Object }
			 */
			mkdir: {
		    all: {
		      options: {
		        mode : '0700',
		        create : [ DIST_DIR ]
		      },
		    },
		  },

			/**
			 * Assemble
			 */
			assemble :
			{

				/**
				 * Task level options
				 */
				options :
				{
					prettify : { indent: 2 },
					marked : { sanitize: false },
					data : 'src/**/*.{json,yml}',
					assets : DIST_DIR + '/resources',
					helpers : 'src/helpers/helper-*.js',
					layoutdir : 'src/templates/layouts',
					partials : [ 'src/templates/includes/**/*hbs' ]

				},
				site: 
				{
					options : { layout: 'default.hbs' },
					files :
					[
						{
							expand : true,
							cwd : 'src/templates/pages',
							src : [ '*.hbs' ],
							dest : DIST_DIR
						}
					] 
				}

			},


			/**
			 * HTML Linter
			 */
			htmllint:
			{
				all :
				[
					DIST_DIR + '/**/*.html'
				]
			},


			/**
			 * Less
			 */
			recess:
			{
				options: 
				{
        	compile: true
      	},

      	screen:
      	{
      		files: 
      		{
          	'distribution/resources/css/screen.css' : ['src/styles/less/screen.less']
        	}
      	}

			},

			csslint: 
			{
	      options:
	      {
	        'overqualified-elements': false,
	        'adjoining-classes': false,
	        'unqualified-attributes': false,
	        'compatible-vendor-prefixes': false,
	        'font-sizes': false,
	        'floats': false,
	        'duplicate-background-images': false
	      },
	      screen:
	      {
	        src: [ 'distribution/resources/css/screen.css' ]
	      }
    	},

    	/**
    	 * JavaScript
    	 */
    	uglify: 
    	{
				all: 
				{
	        options: 
	        {
	          beautify: true,
	          sourceMap: 'distribution/resources/js/app.map.js',
          	sourceMappingURL: 'app.map.js',
          	sourceMapRoot:  '/'
	        },

	        files:
	        {
          	'distribution/resources/js/app.min.js': ['src/js/**/*.js']
          }
	      }
    	},

			/**
			 * Launch the distribution dir via connect middleware
			 * @type { Object }
			 */
			connect : 
			{
				server :
				{
					options:
					{
						hostname : '*',
						port : PORT,
						base : DIST_DIR
					}
				}
			},


			watch:
			{
	      options:
	      {
	        livereload: true
	      },

	      html:
	      {
	        files: 
	        [
		        'src/templates/**/*.hbs',
		        'README.md',
		        'src/data/**/*.json'
	        ],
	        tasks: ['clean:html', 'html']
	      },

	      css: 
	      {
	        files: 'src/styles/**/*.less',
	        tasks: [ 'recess', 'csslint' ]
	      },

	      js:
	      {
	      	files: 'src/js/**/*.js',
	      	tasks: [ 'uglify' ]

	      }

	    }


		}
	);


	grunt.event.on('watch', function( action, filepath ) 
	{

		grunt.config(['assemble', 'all'], filepath);
		grunt.config(['htmllint', 'all'], filepath);

		grunt.config(['csslint', 'all'], filepath);

		grunt.config(['uglify', 'all'], filepath);

	});


	/**
	 * Load Tasks
	 */
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-mkdir' );
 

  /**
   * HTML
   */
  grunt.loadNpmTasks( 'assemble' );
  grunt.loadNpmTasks( 'grunt-html' );


  /**
   * CSS
   */
  grunt.loadNpmTasks( 'grunt-recess' );
  grunt.loadNpmTasks( 'grunt-contrib-csslint' );


  /**
   * JS
   */
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );


  /**
   * Server
   */
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  

  /**
   * Register Tasks
   */
  grunt.registerTask( 'clear', [ 'clean', 'mkdir' ] );
  grunt.registerTask( 'html', [ 'assemble', 'htmllint' ] );
  grunt.registerTask( 'css', [ 'recess', 'csslint' ] );
  grunt.registerTask( 'js', [ 'uglify' ] );
 	

  //Add tasks to build here
 	grunt.registerTask( 'build', [ 'html', 'css', 'js' ] );
  grunt.registerTask( 'server', [ 'connect', 'watch' ] );


  /**
   * Init
   */
  grunt.registerTask( 'default', [ 'clear', 'build', 'server' ] );


};