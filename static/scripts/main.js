var quotes;

$(document).ready(function () {	
	var json = $('#quotesjson').html();	
	quotes = jQuery.parseJSON(json);

	// Just to get things going
	firstSelection = false;
	nextClicked();
	
	$('.list-group-item').on('click', function() {
		if (firstSelection){
			$('.active').removeClass('active');
			$(this).toggleClass('active')
		
			selectionMade($(this));		
			$('.btn').removeClass('disabled');		
		}
	});
	
	$('.btn').on('click', function() {		
		nextClicked();
	});
});

var right = 0;
var wrong = 0;
var firstSelection;

function selectionMade(item){
	$('.result').show(200);
	$('.source').show(200);
	
	if (firstSelection){
		firstSelection = false;
	    $('#hoverstyle').remove();
		var currentCorrect = false;
		$('.active').removeClass('active');
		$('.result').each( function () {
			if ($(this).data('answer')){
				$(this).parent().parent().effect("highlight", { color: 'green'}, 1000);

				if ($(this).parent().parent().attr('id') == item.attr('id')) {
                    right += 1;
                    currentCorrect = true;
                } else {
                    wrong += 1;
                }

			}
		});
		
		$('#score').html('Right: <span class="label label-success">' + right + '</span> Wrong: <span class="label label-danger">' + wrong + '</span>');
	}
}

function nextClicked(){
    if (firstSelection) {
        return;
    }

	firstSelection = true;
	$('.active').removeClass('active');
	$('.result').hide();
	$('.source').hide();
	
	if (quotes.quotetriplets.length == 0){
		$('.btn').hide();
		$('.list-group').hide();
		$('#headerText').text("Well, that's all the dumb shit  our commander in chief has said that we've bothered to dig up so far. Come back later for more.");
	}
	
	var index = Math.floor(Math.random()*quotes.quotetriplets.length);
	var quote = quotes.quotetriplets[index];
	quotes.quotetriplets.splice(index, 1);
	shuffle(quote);
	
	$('#q1q').text(quote[0].quote);
	$('#q1s').text(quote[0].result);
	if (quote[0].result != "Donald Trump"){
		$('#q1s').data('answer', true);
	} else {		
		$('#q1s').data('answer', false);
	}
	$('#q1s').attr("href", quote[2].source);
	
	$('#q2q').text(quote[1].quote);
	$('#q2s').text(quote[1].result);
	if (quote[1].result != "Donald Trump"){
		$('#q2s').data('answer', true);
	} else {		
		$('#q2s').data('answer', false);
	}
	$('#q2s').attr("href", quote[2].source);
	
	$('#q3q').text(quote[2].quote);
	$('#q3s').text(quote[2].result);
		if (quote[2].result != "Donald Trump"){
		$('#q3s').data('answer', true);
	} else {		
		$('#q3s').data('answer', false);
	}
	$('#q3s').attr("href", quote[2].source);
	
	$('.btn').addClass('disabled');
	$(document.body).append('<style id="hoverstyle">.list-group-item:hover { background: gray; cursor: pointer; }</style>');
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}