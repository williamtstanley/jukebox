// Parse Song
$(document).ready(function() {

    function parseNote(note) {
        if (note.length <= 2){
            return {pitch: note, beats: 1};
        } else if (note.length === 3) {
            return {pitch: note.slice(0,1), beats: note[note.length-1]/1};
        } else {
            return {pitch: note.slice(0,2), beats: note[note.length-1]/1};
        }
    }

    function parseSong(arrSong) {
        var parsed = [];
        for (var i = 0; i < arrSong.length; i++) {
            parsed.push(parseNote(arrSong[i]));
        }
        return parsed;
    }

    // function player(input){
        var odeJoy = "B*2 B*2 C*2 D*2 D*2 C*2 B*2 A*2 Gd*2 Gd*2 A*2 B*2 B*4 A A*4 P B*2 B*2 C*2 D*2 D*2 C*2 B*2 A*2 Gd*2 Gd*2 A*2 B*2 A*4 Gd Gd*4 P A*2 A*2 B*2 Gd*2 A*2 B C B*2 Gd*2 A*2 B C B*2 A*2 Gd*2 A*2 Dd*4 P B*2 B*2 C*2 D*2 D*2 C*2 B*2 A*2 Gd*2 Gd*2 A*2 B*2 A*4 Gd Gd*4";//(400bpm)
    //
        var starWars = "D D D G*4 D*4 C B A G*4 D*2 C B A G*4 D*2 C B C A*4 D*2 D G*4 D*4 C B A G*4 D*2 C B A G*4 D*2 C B C A*4 D*2 D E*3 E C B A G G A B A E F#*2 D*2 D E*3 E C B A G D A A*4 D*2 D E*3 E C B A G G A B A*2 E F#*2 D*2 D G F Eb D C Bb A G D*6 D*2 D"; //(250bpm)

        var hotCross = "B*2 A*2 Gd*2 B*2 A*2 Gd*2 Gd Gd Gd Gd A A A A B*2 A*2 Gd*2"


    $('#play-button').click(function(){
        $(this).attr('disabled', true);
        $(this).html('Playing...');
        player()
    })

    var player = function(){
        var count = $('ul li').length;
        if (count >= 1) {
            song = getSong()
            setTimeout(function(){
                playSong(parseSong(song), 400, player);
            }, 1000);
        } else {
            resetButton();
        }
    }

    var getSong = function(){
        var listSong = $('ul :first').html().split(': ');
        // remove song from list
        $('ul :first').fadeOut(500);
        setTimeout(function () {
            $('ul :first').remove();
        }, 1000);

        // set title and song variables
        var title = listSong[0];
        if (title.toLowerCase() === 'ode') {
            var song = odeJoy.split(" ");
        }else if (title.toLowerCase() === 'starwars') {
            var song = starWars.split(" ");
        }else if (title.toLowerCase() === 'hotcross') {
            var song = hotCross.split(" ");
        } else {
            var song = listSong[1].split(" ");
        }
            // var song = listSong[1].split(" ");
        // add song title to playing now h1
        $('#song-title').fadeOut(500);
        setTimeout(function () {
            $('#song-title').html('Now playing: ' + title).fadeIn(1000);
        }, 500);
        // function returns song array
        return song;
    }

    var resetButton = function(){
        $('#play-button').html('Play a song');
        $('#play-button').removeAttr('disabled');
        $('#song-title').html('JUKE BOX BABY');
    }

    $('#list-button').click(function(event){
        event.preventDefault();
        var title = $('#title').val()
        var song = $('#song').val()
        $('#queue').html("Song Queue")
        $('#song-list').append('<li>' + title + ': ' + song + '</li>');
        $('#song').val('');
        $('#title').val('');
    })



});


