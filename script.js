$(document).ready(function(){
    getEpisodes('https://rickandmortyapi.com/api/episode');
})

//getting all the data info
function getEpisodes(apiInfo){
    axios.get(apiInfo).then(function(response){
        console.log(response);
        let episodes = response.data.results;
        episodeList(episodes);
        var loading = response.data.info;
        //
        loadingEpisodes(loading.prev, loading.next);
        
    })
}

//create li to display episode "links"
function episodeList(episode){
    $("ul").empty();
episode.forEach(episode => {
    var episodeId = "Episode " + episode.id;
    //array of all episodes
        $("<li></li>").text(episodeId).click(function(){
            //console.log(event.target)
            episodeDetails(episode);
        }).appendTo('ul');
    });{
    }
}

//get episode detals

function episodeDetails(episodeData){
    $('#episode_name').empty();
    $('#episode_name').append(episodeData.name);
$('#episode_code').empty();
$('#episode_code').append(episodeData.episode);
$('#episode_date').empty();
$('#episode_date').append(episodeData.air_date);

//getting character details
$.each(episodeData.characters, function(index, characterData){
    axios.get(characterData).then(function(resultData){
        let image = resultData.data.image;
        let name = resultData.data.name;
        let statusSpecies = resultData.data.species + ' | ' + resultData.data.status;
        $('#character_content').append($('<div>' + '<img src="' + image + '">' + '</div>')
        .append('<h4>' + name + '</h4')
        .append('<p>' + statusSpecies + '</p>'));
    })

})}

//loading episode list
function loadingEpisodes(prev, next){
    $('#button_container').empty();
    if(next != null){
        $('<button>').text('LOAD MORE EPISODES').click(function(){
            getEpisodes(next);
        }).appendTo('#button_container');
        
    }
    if(prev != null){
        $('<button>').text('BACK').click(function(){
            getEpisodes(prev);
        }).appendTo('#button_container');
    }
}







