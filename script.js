var lightningNow = false;
var firstStrike = false;
var swoosh = new Audio();
swoosh.src = 'audio/swoosh.mp3';

var thunderStruck = new Audio();
thunderStruck.src = 'audio/thunderStruck.mp3';

var pika = new Audio();
pika.src = 'audio/pika.mp3';

var cast = new Audio();
cast.src = 'audio/lightningCast.mp3'

var rCounter = 0;
var sCounter = 0;

var time = 60;
var score = 0;

var gameOver = false;

//This is responsible for the controls of the cloud
$(document).keydown(function(e) {
    switch(e.which){
        case 37:
        if((($('#cloud').position().left) - 150  >= -150) &&(lightningNow == false) && (gameOver == false)) {
        $("#cloud").animate({left: '-=150px'}, 200);
        swoosh.play();
        }
        break;
        
        case 39:
         if((($('#cloud').position().left) + 150  <= 1050) &&(lightningNow == false)&& (gameOver == false)){
        $("#cloud").animate({left: '+=150px'},200);
        swoosh.play();
         }
        break;
        
        case 32:
        if((lightningNow == false) && (gameOver == false)){
        makeLightning();
        collision();
        scoreHandler();
        }
        break;
}}
)

//This decides which lightniing gif to use
var selectBolt = function ()
{
    var choice = Math.floor((Math.random() * 2) + 1);
    var cloudLeft;
    if (choice == 1)
    {
        $('#lightning').attr('src', 'lightning/1stBOLT.gif'); 
        $('#lightning').css('left', $('#cloud').position().left -70 +"px");
    }
    else
    {   
         $('#lightning').attr('src', 'lightning/2ndBOLT.gif');
         $('#lightning').css('left', $('#cloud').position().left+50  +"px");
    }
}

//THis is responsible for the collision, the lightning bolt hitting the sprites and updating the score
var collision = function()
{
   
    var lightPos = $('#lightning').position().left;
    
    
       $( '.leftRamona, .leftScott, .rightRamona, .rightScott' ).each(function( index ) {
           
       var spritePos = $(this).position().left;
       var distance = Math.abs(lightPos-spritePos);
       
       if((distance  <= 260) && (lightningNow))
       {
           if($(this).hasClass('leftRamona') || $(this).hasClass('rightRamona'))
           {
               score+=2;
               rCounter++;
                $('.score').text("Score:"+ score);
           }
           
           else if($(this).hasClass('leftScott') || $(this).hasClass('rightScott'))
           {
               score+=1;
               sCounter++;
                $('.score').text("Score:"+ score);
           }
           $(this).remove();
       }
});
}

//This is for choosing audio to play when lightning strikes
var selectAudio = function(){
 var choice = Math.floor((Math.random() *3) + 1);
    if (choice == 1)
    {
        thunderStruck.play();
    }
    else if (choice == 2)
    {
        pika.play();
    }
    else
    {
        cast.play();
    }
  
  }

//This is responsible for the background changing and sound effects when lightning is struck
var makeLightning = function()
{
     $("#background").animate({opacity: .5},"slow");
     $('#cloudGIF').attr("src","clouds/blackCLOUD.gif");
     selectBolt();
     selectAudio();
     lightningNow = true;
     firstStrike = true
     setTimeout(function()
     {
    $("#background").animate({opacity: 1},"slow");
    $('#cloudGIF').attr("src","clouds/whiteCLOUD.gif");
    $('#lightning').attr('src', '');
    lightningNow = false;
     },
     1200);
}

//This moves the sprites
var moveSprites = function ()
{
    $('.leftRamona').animate({left: '+=1500px'}, 3500);
    $('.leftScott').animate({left: '+=1500px'}, 4000);
    $('.rightRamona').animate({left: '+=1500px'}, 3500);
    $('.rightScott').animate({left: '+=1500px'}, 4000);
    collision();
}

//This is responsible for adding Ramona characters
var addRamona = function()
{
    $('.leftSprites').append
    (
        $('<div/>')
        .addClass("leftRamona")
        .append('<img src = "Sprites/Ramona.gif" width = "200px" height = "200px" >')
        );
        
    $('.rightSprites').append
    (
        $('<div/>')
        .addClass("rightRamona")
        .append('<img src = "Sprites/Ramona.gif" width = "200px" height = "200px" >')
        );
}


//This is for adding Scott characters
var addScott = function()
{
    $('.leftSprites').append
    (
        $('<div/>')
        .addClass("leftScott")
        .append('<img src = "Sprites/Scott.gif" width = "200px" height = "200px" >')
        );
        
    $('.rightSprites').append
    (
        $('<div/>')
        .addClass("rightScott")
        .append('<img src = "Sprites/Scott.gif" width = "200px" height = "200px" >')
        );
}


//This checks the score and adds characters as accordingly
var scoreHandler = function()
{
    var numLR = $('.leftRamona').length;
    var numLS = $('.leftScott').length;
    
    var numRR = $('.rightRamona').length;
    var numRS = $('.rightScott').length;
    
    if((numLR == 0) && (numLS == 0) && (numRR == 0) && (numRS == 0))
    {
        addRamona();
        addScott();
    }
    
    if((score> 0) && (score%2 == 0))
    {
        addScott();
    }
    
    else if ((score > 0) && (score %3 == 0))
    {
        addRamona();
    }
}


//Simple just turns the clock red when in crunch time
var timeHandler = function()
{
    if(time <=10)
    {
        $('.timer').css('color', "red");
    }
}

//This makes sure that there is always sprites on the screen
var noEmpty = function()
{
    var numLR = $('.leftRamona').length;
    var numLS = $('.leftScott').length;
    
    var numRR = $('.rightRamona').length;
    var numRS = $('.rightScott').length;
    
    if((numLR == 0) && (numLS == 0) && (numRR == 0) && (numRS == 0))
    {
        addRamona();
        addScott();
    }
}

//Removes the left sprites if they go off the page 
var removeLeftSprites = function()
{
   $( ".leftRamona" ).each(function( index ) {
       var ramonaP = $(this).css('left');
       var position = parseInt(ramonaP);
       if(position  >= 100)
       {
           $(this).remove();
       }
});

   $( ".leftScott" ).each(function( index ) {
       var ramonaP = $(this).css('left');
       var position = parseInt(ramonaP);
       if(position  >= 100)
       {
           $(this).remove();
       }
});
}

//Removes the right sprites if they go off the page
var removeRightSprites = function()
{
   $( ".rightRamona" ).each(function( index ) {
       var ramonaP = $(this).css('left');
       var position = parseInt(ramonaP);
       if(position  >= 1000)
       {
           $(this).remove();
       }
});

   $( ".rightScott" ).each(function( index ) {
       var ramonaP = $(this).css('left');
       var position = parseInt(ramonaP);
       if(position  >= 1000)
       {
           $(this).remove();
       }
});
}

//Removes the sprites once they go off screen
var removeSprites = function()
{
    removeLeftSprites();
    removeRightSprites();
}

//This calls functions to move the sprites, make sure they don't go off screen, change the time color and always ensure there are sprites on screen
var playGame = function()
{
    moveSprites();
    removeSprites();
    timeHandler();
    noEmpty();
}


//This is responsible for starting the game 
var start = function(){
    playGame();
setTimeout(
    function(){
        time--;
        $('.timer').text("Time:"+ time);
        if(time > 0){
            start();   
        }
        else
        {
            gameOver = true;
            $(".leftSprites").html("");
            $(".rightSprites").html("");
            $("#background, #cloud").animate({opacity: .4},"slow");
            $('.gameOver').css('visibility', 'initial');
            $('#ramonaCounter').text("You zapped " +rCounter + " Ramona(s)");
            $('#scottCounter').text("You zapped " +sCounter + " Scott(s)");
        }
    },1000);
}
start();


