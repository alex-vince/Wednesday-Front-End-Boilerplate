module.exports = function( grunt )
{

	'use strict';

	//Define Constants
	var PORT 					= 3000,
			RELOAD_PORT 	= 35729, 
			DIST_DIR			= 'distribution';


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
						base : DIST_DIR,
						keepalive: true
					}
				}
			}


		}
	);


	/**
	 * Load Tasks
	 */
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-mkdir' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );

  grunt.loadNpmTasks( 'assemble' );
  

  /**
   * Register Tasks
   */
  grunt.registerTask( 'clear', [ 'clean', 'mkdir' ] );
  grunt.registerTask( 'html', [ 'assemble' ] );
 	

 	grunt.registerTask( 'build', [ 'html' ] );
  grunt.registerTask( 'server', [ 'connect' ] );


  /**
   * Init
   */
  grunt.registerTask( 'default', [ 'clear', 'build', 'server' ] );


};