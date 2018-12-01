$(document).ready(function() {

    var $cells = $('.cell');
    var userPlayer = 0;
    var computerPlayer = 0;
    var x = 'x';
    var o = 'o';
    var turn = true;
    var counterPlayer = 0;

    $('.player-submit').on('click', function(){ // take the value 'name' from user 
        var playerinput = $('.player-name').val();
        setPlayer(playerinput);
    });

    function setPlayer(name){ // save the value localStorage
        window.localStorage.setItem('currentPlayer', name);
        renderPlayer();
    };
    renderPlayer();

    function renderPlayer(){ // prine the value in the index page 
        var player = window.localStorage.getItem('currentPlayer');
        var playerTag = $('<h3/>').html(player); // create h3 tage for the name of user
        $('.user').prepend(playerTag); // prepend the tag h3 in class user 
    }
    
    startGame();   

    function startGame(){
        
        $('.cell').on('click', function(){
            if (turn && $(this).html() == ''){ // the player is the first to play ==> turn = true
                $(this).html(x);
                counterPlayer++; // calculates the number of game
                turn = !turn; // giv the turn to robot ==> turn = false
                robotPlayer(); // call function robotPlayer for robot to play
                winer(); // call function winer to check if any one is win
            } 
        });
    }

    function robotPlayer(){  

        var randomNumber = Math.floor(Math.random() * $cells.length);
        var bestNumber = bestMove(); // call function bestMove if can select best location

        if (bestNumber >= 0){ // if function bestMove select number the robot use the number
            $($cells[bestNumber]).html(o); // write O in the box
            counterPlayer++;
                turn = !turn;
                bestNumber = null; // after use number from bestMove function we give the bestNumber null
        } else { // if function bestMove can't select number thin the random select number
            if (!turn && $($cells[randomNumber]).html() == '' ){
                $($cells[randomNumber]).html(o);
                counterPlayer++;
                turn = !turn;
            } else if ( counterPlayer !== 9 ) { // if the random number select box note empty we call robotPlayer to select another number
                robotPlayer();
            }
        }
    };

    function winer(){ // her we select who is win

        for ( var i = 0; i < winr.length; i++){ // for loop to check all box if any three box have same value.
            var a = winr[i][0];
            var b = winr[i][1];
            var c = winr[i][2];

            if ( $($cells[a]).html() !== '' && ($($cells[a]).html() == $($cells[b]).html()) && ($($cells[b]).html() == $($cells[c]).html()) ){
                return counter($($cells[a]).html()); // call function counter and giv him parameter who is win and exit from function
            }
        }
        if ( counterPlayer == 9){ // if any one not winer
            alert('No one is winner');
        }
    };

    $('.startAgen').on('click', function(){ // if you want play agen you click the button
        for (var i = 0; i < $cells.length; i++){
            $($cells[i]).html('');
        } 
        counterPlayer = 0; 
        startGame();    
    });

    function counter(player){ // calculates how many the players is winner
        if (player == 'x'){
            userPlayer++;
            $('.userResult').html(userPlayer);
            alert(`The User Player X is winner`);
            $('.cell').off('click');

        }else {
            computerPlayer++;
            $('.computerReselt').html(computerPlayer);
            alert(`The Computer Player O is winner`);
        }
    };

    var winr = [ // the array have all possibilities for winner
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function bestMove(){ // bestMove function select the best step for the user not win

        for ( var i = 0; i < winr.length; i++){
            var a = winr[i][0];
            var b = winr[i][1];
            var c = winr[i][2];

            if ( $($cells[a]).html() === $($cells[b]).html() && $($cells[a]).html() !== '' && $($cells[c]).html() === '' ){
                return c;
            }

            if ( $($cells[a]).html() === $($cells[c]).html() && $($cells[a]).html() !== '' && $($cells[b]).html() === '' ){
                return b;
            }

            if ( $($cells[b]).html() === $($cells[c]).html() && $($cells[b]).html() !== '' && $($cells[a]).html() === '' ){
                return a;
            }
        }
    }
});