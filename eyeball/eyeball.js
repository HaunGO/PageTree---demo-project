;(function ( $, window, document, undefined ) {



    // Create the defaults once
    var pluginName = "EyeBall",
        defaults = {
          ballColor: "#f5f0d8",
          irisColor: "#00bff3",
          pupilColor: "#333",
          size: '100'
        },
        EYEBALL,
        dataKey = "plugin_" + pluginName;



    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();

    }





    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        
        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).
            
            EYEBALL = $(this.element);

            this.buildEyeBall();
            this.buildParallax();
            this.setColors();
            this.setSize();

            console.log("eyeball created!");

        },

        buildEyeBall: function() {
            // ADD THE NESTED DIVS WITH THE CLASS AND DATA FOR THE PARALLAX.JS
            var BallIrisPupil =  $("<div class='eyeball'><div class='layer ball'  data-depth='-.5'></div><div class='layer iris'  data-depth='-2'></div><div class='layer pupil' data-depth='-2.1'></div></div>");

            EYEBALL.append(BallIrisPupil);
        },

        buildParallax: function() {

            EYEBALL.parallax({
               relativeInput:true,
               clipRelativeInput:true,
               limitY:50,
               limitX:50,
               frictionX:0.4, 
               frictionY:0.4
            });

            if(Modernizr.touch){
               EYEBALL.parallax('invert', false, false);
            }  

        },

        blink: function() {
            console.log('>blink<');
        },

        setColors: function() 
        {
            // IF THERE ARE CUSTOM SETTINGS SENT VIA CONSTRUCTOR FUNCTION, 
            // IT WILL OVERWRITE THE DATA-ATTRIBUTES:
            if(this.settings.irisColor === defaults.irisColor){  
              var color = EYEBALL.data('eye-color');
              if(color !== undefined) {          
                this.settings.irisColor = color;
              }
            }

            // SET THE COLOR OF THE IRIS.
            EYEBALL.find('.iris').css({
              'background-color': this.settings.irisColor
            });

        },

        setSize: function() 
        {
            // IF THERE ARE CUSTOM SETTING SENT VIA CONSTRUCTOR FUNCTION, 
            // IT WILL OVERWRITE THE DATA-ATTRIBUTES:
            if(this.settings.size === defaults.size){  
              var size = EYEBALL.data('eye-size');
              if(size !== undefined) {          
                this.settings.size = size;
              }
            }

            // SET THE SIZE OF THE EYEBALL:
            EYEBALL.css({
              'width': this.settings.size + 'px',
              'height': this.settings.size + 'px'
            });

            EYEBALL.find('.eyeball').css({
              'width': this.settings.size + 'px',
              'height': this.settings.size + 'px'
            });

        }





    });




/*
*   THIS IS THE PLUGIN WRAPPER CODE THAT CAME IN THE jquery.boilerplate THAT I USED,
*   BUT IT WAS SOMEHOW PREVENTING THE CALLING OF METHODS/FUNCTIONS 
*   FROM OUTSIDE OF THE PLUGIN.   
*
*   THE ALTERNATE VERSION WAS PULLED FROM A FUNCTIONING EXAMPLE FROM THE NET..
*   I DO NOT UNDERSTAND THE PROBLEM.
*/

// FIRST WRAPPER CODE:
    // // A really lightweight plugin wrapper around the constructor,
    // // preventing against multiple instantiations
    //  $.fn[ pluginName ] = function ( options ) {
    //     this.each(function() {
    //         if ( !$.data( this, "plugin_" + pluginName ) ) {
    //             $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
    //         }
    //     });

    //     // chain jQuery functions
    //     return this;
    // };




// ALTERNATE WRAPPER CODE THAT I PULLED FROM ANOTHER EXAMPLE:
    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * return plugin instance.
     */
    $.fn[pluginName] = function (options) {

        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if (plugin instanceof Plugin) {
            // if have options arguments, call plugin.init() again
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Plugin(this, options);
            this.data(dataKey, plugin);
        }
        
        return plugin;
    };














})(jQuery, window, document);


// THIS IS FOR THE SUPER-ULTRA-SIMPLE IMPLEMENTATION:

$(function() {
  if( $('.EYEBALL').length ){
    // console.log('do it');
    $('.EYEBALL').EyeBall();
  }
});

// ADD THE FOLLOSING TO YOUR HMTL PAGE:
// <div class="EYEBALL" data-eye-size="500" data-eye-color="#18c6b8"></div>




