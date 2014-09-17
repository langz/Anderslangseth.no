			jQuery(document).ready(function($) {

				jQuery.noConflict();

				/* ---------------------------------------------------------------------- */
				/*	Slider - [Flexslider]
				/* ---------------------------------------------------------------------- */
			  	try {
					$('.flexslider').flexslider({
						animation: 'fade',
						controlsContainer: ".slider-wrapper"
					});
				} catch(err) {

				}

				/* ---------------------------------------------------------------------- */
				/*	Input & Textarea Placeholder
				/* ---------------------------------------------------------------------- */ 
				$('input[type="text"], textarea').focus(function(){
					$(this).removeClass('error');
					if($(this).val() == $(this).attr('placeholder'))
						$(this).val('');
				}).blur( function(){ 
					if($(this).val() == '')
						$(this).val($(this).attr('placeholder'));
				});


				/* ---------------------------------------------------------------------- */
				/*	Fancybox Gallery Images
				/* ---------------------------------------------------------------------- */ 
				try {
					$("#portfolio-list").find('a').fancybox({

						'titleShow'     : true,
						'titlePosition' : 'inside',
						'overlayOpacity': 0.6,
						'overlayColor'	: '#000',
						'transitionIn'	: 'fade',
						'transitionOut'	: 'fade',
						'speedIn'		: 200,
						'speedOut'		: 200
					});
				} catch(err) {

				}

				/* ---------------------------------------------------------------------- */
				/*	Social Media Effect
				/* ---------------------------------------------------------------------- */ 
				$('#social-media a').on('mouseenter', function(){
					$(this).children('img').css({'width': '12px', 'height': '12px'}).animate({'width': '16px', 'height': '16px'}, 200);
				});

				/* ---------------------------------------------------------------------- */
				/*	LavaLamp
				/* ---------------------------------------------------------------------- */ 
				$("#portfolio-filter").lavaLamp({
					speed: 300,
					click: function(event, menuItem) {
			            return false;
			        }
				});

				/* ---------------------------------------------------------------------- */
				/*	Portfolio
				/* ---------------------------------------------------------------------- */ 

				// Needed variables
				var $container	 	= $('#portfolio-list');
				var $filter 		= $('#portfolio-filter');
					
				// Run Isotope  
				$container.isotope({
					filter				: '*',
					layoutMode   		: 'masonry',
					animationOptions	: {
					duration			: 750,
					easing				: 'linear'
				   }
				});

				$(window).bind('resize', function(){
					var selector = $filter.find('a.active').attr('data-filter');
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 750,
							easing	: 'linear',
							queue	: false,
				   		}
					});
				  	return false;
				});
				
				// Isotope Filter 
				$filter.find('a').click(function(){
					var selector = $(this).attr('data-filter');
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 750,
							easing	: 'linear',
							queue	: false,
				   		}
					});
				  	return false;
				});

				//Append effect to portfolio image
				$('#portfolio-list li').each(function(){
					$(this).append('<a href="'+ $(this).find('a:first').attr('href') +'"class="image-hover" title="'+ $(this).find('a:first').attr('title') +'"</a>');
				});
				
				//Image hover effect
				$('#portfolio-list li').on('mouseenter', function(){
					$(this).children('.image-hover').stop(true,true).slideDown(200);
				}).on('mouseleave', function(){
					$(this).children('.image-hover').stop(true,true).slideUp(200);
				});
				
				// Copy categories to item classes
				$filter.find('a').click(function() {
					var currentOption = $(this).attr('data-filter');
					$filter.find('a').removeClass('active');
					$(this).addClass('active');
				});

				$('#skills li').each(function(){
					$(this).append('<div class="progressbar"></div>');
				});

				var animate_sate = false;

				$('#header-inner nav a').on('click', function(e){
					e.preventDefault();

					if(!$(this).hasClass('active') && animate_sate == false){
						$this = $(this);

						animate_sate = true;

						$('html').css({'overflow':'hidden'});

						var id_old_active = $('#header-inner nav a.active').attr('href');
						$('#header-inner nav a').removeClass('active');

						var id_active = $(this).attr('href');

						$(id_old_active).removeClass('active').stop().slideUp('slow', function(){
							$this.addClass('active');

							$('#loading-container').show();
							$('#loading').css({'width': '0px'}).animate({'width' : '100%'}, 700, function(){
								$('#loading-container').hide();
								$('#skills li div.progressbar').css({'width':'0px'});
								$(id_active).addClass('active').stop().slideDown('slow', function(){
									animate_sate = false;
									$('html').css({'overflow':'auto'});
									google.maps.event.trigger(map, 'resize');
									$('#map').gmap3({trigger:"resize"});
									$('#map').gmap3({map:{options:{center:[60.3879903,5.3266263]}}});
									$('#skills li').each(function(){
										$(this).children('div.progressbar').css({'width':'0px'}).animate({'width': $(this).attr('data-value') + '%'}, 500);
									});
								});
							});
						});
					}
				});

				/* ---------------------------------------------------------------------- */
				/*	Contact Map
				/* ---------------------------------------------------------------------- */
				try {
					
					$('#map').gmap3({
				   
							map:{
		                        options:{
		                            center: [60.3879903,5.3266263],
		                            zoom: 14
		                        }
		                    },
		                    marker:{ 
		                        latLng: [60.3879903,5.3266263]
		                    }
		});


     
 


				
					}
				  catch(err) {

				}   

				/* ---------------------------------------------------------------------- */
				/*	Contact Form
				/* ---------------------------------------------------------------------- */
				$('#submit').on('click', function(e){
					e.preventDefault();
					$.ajax({
						type: "POST",
						url: "contact.php",
						data: $('#contact-form').serialize(),
						success: function(data) {

							if(data=="Sendt"){
								console.log("stemmer");
								$('#msg').hide().removeClass('success').removeClass('error').addClass('success').html(data).fadeIn('slow').delay(5000).fadeOut('slow');
							} else {
								$('#msg').hide().removeClass('success').removeClass('error').addClass('error').html(data).fadeIn('slow').delay(5000).fadeOut('slow');
							}
							
						}
					});
				});
				
				/* ---------------------------------------------------------------------- */
				/*	Others
				/* ---------------------------------------------------------------------- */ 
				$('#content > section').css({'display':'none'});
				$('#content').css({'visibility':'visible'});
				$('html').css({'overflow':'auto'});
				$("#downloadpdf").on('click', function(e){
					e.preventDefault();
    				// // hope the server sets Content-Disposition: attachment!
    				window.open('test.pdf', '_blank');
				});
				$("#studielop").on('click', function(e){
					e.preventDefault();
    				// // hope the server sets Content-Disposition: attachment!
    				window.open('/upload/portfolio/content/fag.html', '_blank');
				});

				/* ---------------------------------------------------------------------- */
				/*	First slideDown Effect
				/* ---------------------------------------------------------------------- */ 
				var id_active = $('#header-inner nav a.active').attr('href');
				$('#loading-container').show();
				$('#loading').css({'width': '0px'}).animate({'width' : '100%'}, 700, function(){
					$('#loading-container').hide();
					$(id_active).addClass('active').stop().slideDown('slow');
						
						$('#skills li div.progressbar').css({'width':'0px'});
						$('#skills li').each(function(){
										$(this).children('div.progressbar').css({'width':'0px'}).animate({'width': $(this).attr('data-value') + '%'}, 1000);
									});
				});
		
			});