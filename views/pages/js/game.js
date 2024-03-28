// Made Tuesday, March 26th, 2024
// MenuJS
$(".top").hide() // Hides all pages
$("#gameDiv").show();$("#wheel").hide()
//$("#menuDiv").show() // Shows the Menu
var ready = false 
// When the user readys up in the menu 
$("#ready_menu").click(function() {
    // Checks if the user ready up or unready
    if (ready == false) {
        ready = true
        this.textContent = "Un-Ready"
    } else {
        ready = false
        this.textContent = "Ready"
    }
    socket.emit("player_status", [$("#nameInp").val(), ready])

})

// Game JS
var $inner = $('.inner'),
$spin = $('#spin'),
$reset = $('#reset'),
$data = $('.data'),
$mask = $('.mask'),
maskDefault = 'Place Your Bets',
timer = 9000;

var red = [32,19,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3];

$reset.hide();

$mask.text(maskDefault);
// Spins the wheel
$spin.on('click',function(){

    // get a random number between 0 and 36 and apply it to the nth-child selector
    // Sends the random number to the server
    socket.emit("spin", [Math.floor(Math.random() * 36), this])
});

// Spins the wheel
function spinWheel(parm) {
    // parm 0 = The RandomNumber | 1 = The Element
    let randomNumber = parm[0]
    color = null;
    $(".inner").attr('data-spinto', randomNumber).find('li:nth-child('+ randomNumber +') input').prop('checked','checked');
    // prevent repeated clicks on the spin button by hiding it
    $("#spin").hide();
    // disable the reset button until the ball has stopped spinning
    $reset.addClass('disabled').prop('disabled','disabled').show();

    $('.placeholder').remove();


    setTimeout(function() {
        $mask.text('No More Bets');
    }, timer/2);
    // Sets the text in the middle
    setTimeout(function() {
        $mask.text(maskDefault);
    }, timer+500);

    // remove the disabled attribute when the ball has stopped
    setTimeout(function() {
        $reset.removeClass('disabled').prop('disabled','');

        if($.inArray(randomNumber, red) !== -1){ color = 'red'} else { color = 'black'};
        if(randomNumber == 0){color = 'green'};

        $('.result-number').text(randomNumber);
        $('.result-color').text(color);
        $('.result').css({'background-color': ''+color+''});
        $data.addClass('reveal');
        $inner.addClass('rest');

        $thisResult = '<li class="previous-result color-'+ color +'"><span class="previous-number">'+ randomNumber +'</span><span class="previous-color">'+ color +'</span></li>';

        $('.previous-list').prepend($thisResult);
        // Will check the payouts
        checkPayout()
    }, timer);
}

// Resets the wheel
$reset.on('click',function(){
    // remove the spinto data attr so the ball 'resets'
    $inner.attr('data-spinto','').removeClass('rest');
    $(this).hide();
    $spin.show();
    $data.removeClass('reveal');
});

// All of the Table settings
// Checks the payout for this players bet
function checkPayout() {

}

// Allows the Dragging box follow the cursor
$(document).on('mousemove', function(e){
    $('#drag').css({
       left:  e.pageX-37.5,
       top:   e.pageY
    });
});

// When the player clicks a chip
$(".pokerchip").click(function() {
    let color = (this.className).replace("pokerchip ", "")
    // Clones the chip into the dragging element
    var button = $(this).clone();
    $('#drag').html(button);
})

// Adds the bet to the item on the table
function addBet(elm) {
    let val = elm.children[0].id
    
    // If value does not exist then continue to the text
    if (val == "") {val = elm.children[0].textContent}
    
}

// Adds click events to the table
$("#table").children().each(function() {
    // Containers children
    $(this).children().each(function() {
        $(this).click(function() {addBet(this)})
    })
})