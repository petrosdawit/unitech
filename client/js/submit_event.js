// window.addEventListener('load', function(){
// 	console.log('we here');
// 	setTimeout( function(){
// 		handle_submit_event();
// 	}, 1000);
// }, false);

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


function handle_submit_event() {
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

  alert("You have submitted succesful!")

}
