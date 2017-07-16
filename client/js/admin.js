window.addEventListener('load', function(){
	getNonApproved();
	// $('#searchButton').click(searchData('girls'));
}, false);

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCBYiwORm0aeQg-uHZy_GL_LYr2byPnvcw",
	authDomain: "sdsdsd-6ec94.firebaseapp.com",
	databaseURL: "https://sdsdsd-6ec94.firebaseio.com",
	projectId: "sdsdsd-6ec94",
	storageBucket: "",
	messagingSenderId: "543685716217"
};

firebase.initializeApp(config);
window.database  = firebase.database();

function generateID(){
  return (new Date()).getTime();
}

function writeNonProfitData(name, link, description, cost, key1, key2, key3, location, approved) {
	var _id = generateID();
 	firebase.database().ref('nonProfits/' + _id).set({
 		id: _id,
    	name: name,
    	link: link,
    	description: description,
    	cost: cost,
    	keyword1: key1,
    	keyword2: key2,
    	keyword3: key3,
    	location: location,
    	approved: approved
  	});
}


function handle_admin_approval() {
  var x = document.forms["submit_event"];

  // let email = x["nonprofitEmail"].value;
  let nonprofit_name = x["nonprofitName"].value;
  let website_link = x["websiteLink"].value;
  let location = x["location"].value;
  let description = x["description"].value;
  let cost = x["cost"].value;
  let keywords = x["keywords"].value

  // console.log(email);

  // console.log(nonprofit_name);
  // console.log(website_link);
  // console.log(location);
  // console.log(description);
  // console.log(cost);
  // console.log(keywords);

  keywords = keywords.split(" ");

  if (keywords.length < 3) {
    for (var i = 0; i < (4 - keywords.length); i++) {
      keywords.push(" ");
    }
  } else {
    keywords = keywords.slice(0, 3);
  }

  writeNonProfitData(nonprofit_name, website_link, description, cost,
                     keywords[0], keywords[1], keywords[2], location, 0);

}

function getNonApproved(){
	return firebase.database().ref('nonProfits').once('value').then(function(snapshot) {
		var data = snapshot.val();
		var output = [];
		for(var _id in data){
			if (!data[_id]['approved']){
				output.push(data[_id]);
			}
		}
		for (var i in output){ 
			string = '<tr> ' +
			'<td><a href="' + output[i]['link'] + '">' + output[i]['name'] + '</a></td>' + 
			'<td>' + output[i]['description'] + '</td>' +
			'<td>' + output[i]['cost'] + '</td>' +
			'<td>' + output[i]['keyword1'] + ',' + output[i]['keyword2'] + ',' + output[i]['keyword3'] + '</td>' + '<td>' + output[i]['location'] + '</td>' +
	        '<td> ' +

	        '<button type="button" class="btn btn-default" aria-label="Ok" onclick=\'makeApproved(' + JSON.stringify(output[i]) +');\'> ' +
	        	'<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' +
	        '</button> ' +
	        '</td> ' +
	        '<td> ' +
	        	'<button type="button" class="btn btn-default" aria-label="No" onclick=\'reject(' + JSON.stringify(output[i]) +');\'> ' +
	        	'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' +
	        '</button> ' +
	        '</td> ' +	
			'</tr>'

			$(".listContainer").append(string);
		}
		// return output;
	});
}

function makeApproved(data){
	console.log(data);
	var postData = {
		id: data['id'],
		name: data['name'],
		link: data['link'],
		description: data['description'],
		cost: data['cost'],
		keyword1: data['keyword1'],
		keyword2: data['keyword2'],
		keyword3: data['keyword3'],
		location: data['location'],
		approved: 1
	};
	var updates = {};
	updates['/nonProfits/' + data['id']] = postData;
	firebase.database().ref().update(updates);
	location.reload();
}

function reject(data){
	console.log(data);
	firebase.database().ref().child('/nonProfits/' + data['id']).remove();
	location.reload();	
}




