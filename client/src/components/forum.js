const url_root = 'http://localhost:8081';

function get_forum_data(url_forum) {    
    fetch(`${url_root}/f/${url_forum}`)
    .then(res => res.json())
    .then(function(data) {
        //console.log(data);      
        document.getElementById("forum-banner").src         = data[0].banner;
        document.getElementById("forum-icon").src           = data[0].icon;
        document.getElementById("forum-title").innerText    = data[0].title;
        document.getElementById("forum-address").innerText  = "f/" + data[0].name;
    });
};

function get_posts(url_forum) {
    fetch(`${url_root}/p/${url_forum}`)
    .then(res => res.json())
    .then(function(data) {
        //console.log(data);
        document.getElementById("post-col").innerHTML = "";
        for(var i = 0; i < data.length; i++) {
            console.log(data[i]);
            document.getElementById("post-col").innerHTML += `<post-preview image=${data[i].image} title=${data[i].title} user=${data[i].email}></post-preview>`;
        }
    });
}

get_forum_data('Trains');
get_posts('Trains');