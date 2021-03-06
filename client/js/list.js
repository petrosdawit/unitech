window.addEventListener('load', function(){
	getApproved();
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

window.database = firebase.database();

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

function searchCheck(keyword, data){
	var rank = 0;
	var name = data['name'].toLowerCase();
	var description = data['description'].toLowerCase();
	var keyword1 = data['keyword1'].toLowerCase();
	var keyword2 = data['keyword2'].toLowerCase();
	var keyword3 = data['keyword3'].toLowerCase();
	if (name.includes(keyword)) {
		rank = rank + 5;
	}
	if (description.includes(keyword)) {
		rank = rank + 2;
	}
	if (keyword1.includes(keyword)) {
		rank = rank + 5;
	}
	if (keyword2.includes(keyword)) {
		rank = rank + 3;
	}
	if (keyword3.includes(keyword)) {
		rank = rank + 1;
	}
	return rank;
}

function searchData(e){
	e.preventDefault();
	keyword = $('#searchValue').val();
	return firebase.database().ref('nonProfits').once('value').then(function(snapshot) {
		var searchPQ = new PriorityQueue();
		var data = snapshot.val();
		var output = [];
		if (keyword) {
			for(var _id in data){
				if (data[_id]['approved']){
					var rank = searchCheck(keyword.toLowerCase(), data[_id])
					if (rank){
						searchPQ.queue([rank, data[_id]]);
					}
				}
			}
			while (searchPQ.length > 0){
				output.push(searchPQ.dequeue()[1]);
			}
			console.log(output);
			$('.listContainer').empty();
			for (var i in output){
				// console.log(output[dataPoint]);
				string = '<tr> ' +
				'<td><a href="' + output[i]['link'] + '">' + output[i]['name'] + '</a></td>' + 
				'<td>' + output[i]['description'] + '</td>' +
				'<td>' + output[i]['cost'] + '</td>' +
				'<td>' + output[i]['keyword1'] + ',' + output[i]['keyword2'] + ',' + output[i]['keyword3'] + '</td>' + '<td>' + output[i]['location'] + '</td>' +
				'</tr>'
				 //      <tr>
	//   <td>Silicon Valley Education Foundation</td>
	//   <td><a href="www.svefoundation.org/">www.svefoundation.org/</a></td>
	//   <td>A nonprofit resource and advocate for students and educators, SVEF is dedicated to putting all students on track for college and careers, focusing on the critical areas of science, technology, engineering, and math (STEM). </td>
	//   <td>Free</td>
	//   <td>MATH, SUMMER COURSES</td>
	//   <td>San Jose</td>
	// </tr>
				$(".listContainer").append(string);	
			}
		} else {
			getApproved();
		}
	});
}

function getNonApproved(data){
	return firebase.database().ref('nonProfits').once('value').then(function(snapshot) {
		var data = snapshot.val();
		var output = [];
		for(var _id in data){
			if (!data[_id]['approved']){
				output.push(data[_id]);
			}
		}
		// console.log(output);
		return output;		
	});
}

function getApproved(data){
	return firebase.database().ref('nonProfits').once('value').then(function(snapshot) {
		var data = snapshot.val();
		var output = [];
		for(var _id in data){
			if (data[_id]['approved']){
				output.push(data[_id]);
			}
		}
		// console.log(output);
		for (var i in output){
			// console.log(output[dataPoint]);
			string = '<tr> ' +
			'<td><a href="' + output[i]['link'] + '">' + output[i]['name'] + '</a></td>' + 
			'<td>' + output[i]['description'] + '</td>' +
			'<td>' + output[i]['cost'] + '</td>' +
			'<td>' + output[i]['keyword1'] + ',' + output[i]['keyword2'] + ',' + output[i]['keyword3'] + '</td>' + '<td>' + output[i]['location'] + '</td>' +
			'</tr>'
			 //      <tr>
//   <td>Silicon Valley Education Foundation</td>
//   <td><a href="www.svefoundation.org/">www.svefoundation.org/</a></td>
//   <td>A nonprofit resource and advocate for students and educators, SVEF is dedicated to putting all students on track for college and careers, focusing on the critical areas of science, technology, engineering, and math (STEM). </td>
//   <td>Free</td>
//   <td>MATH, SUMMER COURSES</td>
//   <td>San Jose</td>
// </tr>
			$(".listContainer").append(string);	
		}
		// return output;
	});
}

function makeApproved(data){
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
	return firebase.database().ref().update(updates);
}

function writeToFirebaseFromCSV(){
	writeNonProfitData('Silicon Valley Education Foundation','http://www.svefoundation.org/', 'A nonprofit resource and advocate for students and educators, SVEF is dedicated to putting all students on track for college and careers, focusing on the critical areas of science, technology, engineering, and math (STEM).', 'FREE','MATH','SUMMER COURSES', '', 'SAN JOSE', '1');
	writeNonProfitData('The Hidden Genius Project', 'https://www.hiddengeniusproject.org/', 'The Hidden Genius Project seeks to reveal the true potential of black male youth and transform their communities from the inside out. Through our student-centered, project-based approach, we invest in young black men, give them access to technology training, and plug them into an ecosystem of  innovation and empowerment.', 'FREE','INTRO TO CS','BOOTCAMP','ENTREPRENEURSHIP','OAKLAND', '1');
	writeNonProfitData('Black Girls Code','https://www.blackgirlscode.com/', 'Their goal is to increase the number of women of color in the digital space by empowering girls of color ages 7 to 17 to become innovators in STEM fields, leaders in their communities, and builders of their own futures through exposure to computer science and technology.', 'FREE/FINANCIAL AID AVAILABLE', 'HACKATHON', 'BOOTCAMP', '', 'OAKLAND,  (MULTIPLE LOCATIONS)', '1');
	writeNonProfitData('Change The Equation', 'https://www.changetheequation.org/', 'Change the Equation is a coalition of corporate members leading a movement to ensure that every young person in the U.S. is STEM literate through high-quality STEM experiences that spark a lifelong love of learning.', 'FREE', 'ENGINEERING', 'IT', '','ALAMEDA, (MULTIPLE LOCATIONS)', '1');
	writeNonProfitData('Code.org', 'http://www.code.org', 'Code.org® is a non-profit dedicated to expanding access to computer science and increasing participation by women and underrepresented minorities. Our vision is that every student in every school should have the opportunity to learn computer science, just like biology, chemistry or algebra.', 'FREE', 'ONLINE COURSES', '','','ONLINE', '1');
	writeNonProfitData('Dare 2B Digital', 'https://www.dare2bdigitalconference.com/', 'Their mission is to re-define the image of Computer Science (CS) / STEM and to increase digital fluency of young women through student engagement and mentoring. They host a yearly conference which aims to inspire young women (grades 7–10) to explore CS/STEM careers through hands-on fun.', 'FREE', 'CONFERENCE', '', '', 'SAN JOSE,  (CHANGES LOCATION)', '1');
	writeNonProfitData('Girl Develop It', 'https://www.girldevelopit.com/', 'Girl Develop It is a nonprofit organization that exists to provide affordable and judgment-free opportunities for women interested in learning web and software development.', 'FREE', 'INTRO TO CS', 'WORKSHOPS', '', 'SAN JOSE, SAN FRANCISCO, OAKLAND', '1');
	writeNonProfitData('WHOMentors', 'http://www.whomentors.com/', 'an organization that encourages volunteering in general and they have a number of projects aimed at helping women in tech. They have a program called TeenDevelopreneur aimed at helping Teen Girls 13–19 to learn app development.', 'FREE', 'HACKATHON', '', '',
		'SAN FRANCISCO', '1');
	writeNonProfitData('National Center for Women & Information Technology (NCWIT)', 'https://www.ncwit.org/', 'The National Center for Women & Information Technology (NCWIT) is the only national non-profit focused on women\'s participation in computing across the entire ecosystem, helping nearly 900 organizations recruit, retain, and advance women from K-12 and higher education through industry and entrepreneurial careers by providing support, evidence, and action.', 'FREE', 'MENTORS', 'COUNSELING', '', 'NATIONWIDE', '1');
}





