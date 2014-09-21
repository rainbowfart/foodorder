$(function(){
    var $write = $('#write'),
        shift = false,
        capslock = false;
     
     // click keyboard box event
    $('#keyboard li').click(function(){
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
        
        // Add some animation
        $this.toggleClass('actived');
        setTimeout(function(){
            $this.toggleClass('actived');
        }, 100);

        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();
             
            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }
         
        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }
         
        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.html();
            
            $write.focus(); 
            $write.html(html.substr(0, html.length - 1));
            return false;
        }
         
        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";
         
        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();
         
        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');
             
            shift = false;
        }
         
        // Add the character
        $write.focus();
        $write.html($write.html() + character);
    });

    // listen keyboard input envent
    $('body').keypress(function(e){
        var key = e.which;
        if (key == 8) {
            $('.delete').trigger("click");
        } else {
            $write.focus();
            $write.html($write.html() + String.fromCharCode(e.which));
        }
    });

    // Focus the textarea
    $write.bind("blur()", function() {
        setTimeout(function() {
            $write.focus();
        }, 0);
    });
});