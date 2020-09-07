let idx = 0;// to index the portfolios
let portfolios1 = ['Software', '', 'Software'];
let portfolios2 = ['Developer', 'Programmer', 'Engineer'];
let fonts = ['Fira Code', 'Playfair Display', 'Indie Flower', 'Kanit','Pacifico', 'Caveat', 'Satisfy', 'Ubuntu'];		
let nav = document.getElementById('nav');
let navTop = nav.offsetTop;
let age = (new Date(new Date() - new Date('06/30/1999')).getFullYear() - 1970) + ' years old';
let navHidden = true;
let audio = new Audio();
let song_idx = 0;
let songs=[
	{'src':'./static/songs/azaleh_rainy_nights.mp3', 'name':'Rainy Nights', 'title': 'Azaleh - Rainy Nights'},
	{'src':'./static/songs/clandestina_cocaina.mp3', 'name':'Cocaina', 'title': 'Clandestina - Cocaina'},
	{'src':'./static/songs/danny_cocke_collider.mp3', 'name':'Collider', 'title': 'Danny Cocke - Collider'},
];
let imageUrl = "/static/images/collage/";
let images = ["araku-1.jpg", "araku-2.jpg", "araku-3.jpg", "hyderabad-1.jpg", "hyderabad-2.jpg", "kasaragod-1.jpg", "pondy-1.jpg", "pondy-2.jpg", "pondy-3.jpg", "pondy-4.jpg", "vishaka-1.jpg", "vishaka-2.jpg"];
let image = new Image();
let n = 0;
let max_imgs = 3;

function hideNav(){
	document.getElementById('notification').classList.remove('hide');
	document.getElementById('nav').classList.add('hide');
	navHidden = false;
}

function showNav(){
	document.getElementById('notification').classList.add('hide');
	document.getElementById('nav').classList.remove('hide');
}

window.onscroll = function(){
	var currentScroll =window.pageYOffset;
	let padding = document.getElementsByClassName('padding')[0];
	let part1 = document.getElementsByClassName('part1')[0];

	if (currentScroll >= 20){
		part1.style.width = '100vw';
		padding.style.marginLeft = '0';
	}
	else if (currentScroll == 0){
		let active_nav = document.getElementsByClassName('active')[0]
		if(active_nav)
			active_nav.classList.remove('active');
		let active_main = document.getElementsByClassName('show')[0];
		if(active_main)
			active_main.classList.remove('show');
	}
	
	if(currentScroll > navTop){
		nav.classList.add('fixed');
		main.style.paddingTop = '45px';
	}
	else{
		nav.classList.remove('fixed');
		main.style.paddingTop = '0px';
	}
}

function shuffle(idx){ 
	var shuffleInterval= setInterval( ()=>{
		let randomIndex1 = Math.floor(Math.random() * portfolios1.length);

		let randomPortfolio1 = portfolios1[randomIndex1];
		let randomPortfolio2 = portfolios2[randomIndex1];

		let randomFont1 = fonts[Math.floor(Math.random()*fonts.length)];
		let randomFont2 = fonts[Math.floor(Math.random()*fonts.length)];

		let div = document.getElementById('title1');
		div.innerHTML = randomPortfolio1;
		div.style.fontFamily = randomFont1;

		div = document.getElementById('title2');
		div.innerHTML = randomPortfolio2;
		div.style.fontFamily = randomFont2;
	}, 100);

	setTimeout(()=>{
		clearInterval(shuffleInterval); 

		let div= document.getElementById('title1');
		div.innerHTML= portfolios1[idx];
		div.style.fontFamily = fonts[0];

		div= document.getElementById('title2');
		div.innerHTML= portfolios2[idx];
		div.style.fontFamily = fonts[0];
	}, 2000);
}

function active(nav, id){
	active_nav = document.getElementsByClassName('active')[0];
	if(active_nav)
		active_nav.classList.remove('active');
	active_main = document.getElementsByClassName('show')[0];
	if(active_main)
		active_main.classList.remove('show');
	nav.classList.add('active');
	document.getElementById(id).classList.add('show');
}

function setUpText(text){
	document.getElementById('song-text').innerHTML = text;
	document.getElementById('songList').style.maxWidth="500px";	
	setTimeout(()=>{document.getElementById('songList').style.maxWidth="";}, 4000);
}

function setSong(idx){
	song_idx = idx;
	audio.src = songs[idx].src;
	setUpText('Now Playing: '+songs[idx].name);
	let current = document.getElementsByClassName('current')[0];
	if(current)
		current.classList.toggle('current');
	document.getElementById('song_'+idx).classList.add('current');
	document.getElementById('playButton').classList.remove('pause');
}

function play(){
	document.getElementById('playButton').classList.toggle('pause');
	if(!audio.paused)
		audio.pause();
	else
		audio.play();
}

audio.onended = function(){
	document.getElementById('playButton').classList.remove('pause');
	song_idx += 1;
	song_idx %= songs.length;
	setSong(song_idx);
	play();
}

function getTwoRandoms(){
	let random1 = Math.floor(Math.random() * n);
	let random2 = random1;
	while(random1 == random2)
		random2 = Math.floor(Math.random() * n);
	return [random1, random2];
}

function collageImageAbout(){
	let randomNum = getTwoRandoms();
	img1 = document.getElementById('about-collage-image1');
	img2 = document.getElementById('about-collage-image2');
	img1.classList.add('fade-out')
	img2.classList.add('fade-out')

	setTimeout(()=>{
		img1.src = imageUrl + images[randomNum[0]];
		img2.src = imageUrl + images[randomNum[1]];
		img1.classList.remove('fade-out')
		img2.classList.remove('fade-out')
	}, 500);
	
}

function scrollDiv(direction){
	let nav_mob = document.getElementsByClassName('navBar')[0];
	let scroll = nav_mob.children[0].offsetWidth;
	nav_mob.scrollLeft += (scroll*direction);
}


let projects = [
	{
		'title': 'JNTUH Alumni Association', 
		'subtitle': 'Backend | JNTUH',
		'desp':'An alumni association website is “members-only” online community where alumni i.e former students can set up a profile to access exclusive resources. Worked as a backend developer for an Alumni Association website for JNTUH.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql', 'github'], 
		'github': '',
		'deploy': 'http://jntuhcehaa.org/'
	},{
		'title': 'JNTUH CSE - Quest website',
		'subtitle': 'Full Stack | JNTUH', 
		'desp':'Quest is a National Level Technical Symposium conducted by the Department of C.S.E, JNTUH-CEH. Worked as a developer for a website to allow students from across colleges to register themselves for the events.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql', 'github'], 
		'github': 'https://github.com/Ray784/quest_website', 
		'deploy': ''
	},{
		'title': 'Quiz Application', 
		'subtitle':'Full Stack | Dapplogix',
		'desp':'HireStar(a product of Dapplogix) is a recruitment & verification portal on Hyperledger blockchain. Worked on creating a quiz application to evaluate candidate\'s technical skills.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'angular', 'nodejs', 'mongodb', 'github'], 
		'github': '', 
		'deploy': 'https://hirestar.io/'
	},{
		'title': 'Exploring Feature reduction techniques for Indic scripts', 
		'subtitle': 'Research | JNTUH | Curriculum',
		'desp':'Indic languages create a great challenge in text mining due to high dimensionality thus we explored the effects of feature reduction techniques on such languages.', 
		'icon':'',
		'technologies': ['python', 'github'], 
		'github': 'https://github.com/Ray784/mini_project', 
		'deploy': ''
	},{
		'title': 'Don\'t Forget the Can Opener! - NASA', 
		'subtitle':'Full Stack | Hackathon',
		'desp':'Created an easy-to-use way for people to develop their own, custom checklists – both items and plans – for earthquakes. Used NASA USGS data to illustrate it, to help people understand how to prepare, provide safety measures as well as locations to safequard themselves.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql', 'github'], 
		'github': 'https://github.com/Ray784/nasa_spaceapps', 
		'deploy': ''
	},{
		'title': 'Event Management System', 
		'subtitle': 'Full Stack | Curriculum',
		'desp':'Event management is the application of project management to the creation and development of small and/or large-scale personal or corporate events such as festivals, conferences, ceremonies, weddings, formal parties, concerts, or conventions. It involves coordinating the technical aspects before actually launching the event. Created this website under Database System curicullum.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql', 'github'], 
		'github': 'https://github.com/Ray784/event_management', 
		'deploy': ''
	},{
		'title': 'Project Mate', 
		'subtitle':'Full Stack | Curriculum', 
		'desp':'Project mate is a project collaboration website that allows students from India to work together on a project idea. Created under Web Development Curriculum', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'java', 'postgresql', 'github'], 
		'github': 'https://github.com/Ray784/Project-Mate', 
		'deploy': ''
	},{
		'title': 'Bits and Bytes', 
		'subtitle':'Full Stack | Curriculum', 
		'desp':'Bits and Bytes is intended to create an exploration environment, in which students can learn through and also provide teachers with a good teaching aid. Features such as interview preparation, blogs from college seniors and links to important books are also available.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'angular', 'nodejs', 'mongodb', 'd3js', 'heroku', 'github'], 
		'github': 'https://github.com/Ray784/bitsandbytes', 
		'deploy': 'https://bitsandbytes2020.herokuapp.com'
	},{
		'title': 'Gate2020 Score Calculator', 
		'subtitle':'Flask | Scraping', 
		'desp':'A web application to calculate the gate score of CSIT - 2020 paper just by giving in the responses url.', 
		'icon':'',
		'technologies': ['html', 'css', 'bootstrap', 'python', 'heroku', 'github'], 
		'github': 'https://github.com/Ray784/Gate2020-Score', 
		'deploy': 'https://gate-2020.herokuapp.com/'
	},{
		'title': 'TS Intermediate first year results 2020 name-wise', 
		'subtitle':'Flask | Scraping', 
		'desp':'A web application to get the results of IPE-TS-1st year 2020 name-wise. The data was scraped from original TS-results website and stored on mongodb.', 
		'icon':'',
		'technologies': ['html', 'css', 'bootstrap', 'python', 'heroku', 'github', 'mongodb'], 
		'github': 'https://github.com/Ray784/ts-inter-data', 
		'deploy': 'https://tsbie20.herokuapp.com/'
	},{
		'title': 'Scraped English words', 
		'subtitle':'Scraping', 
		'desp':'A list of 20,000(appx) most used valid english words scraped from wikipedia.', 
		'icon':'',
		'technologies': ['python', 'github'], 
		'github': 'https://github.com/Ray784/english-words', 
		'deploy': ''
	},{
		'title': 'Tic-Tac-Toe', 
		'subtitle':'Android | AI | Game', 
		'desp':'A web app simulating the famous tic-tac-toe(x\'s and o\'s) game in three modes: easy, medium, hard(min-max approach)', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'android', 'github'], 
		'github': 'https://github.com/Ray784/tic_tac_toe/', 
		'deploy': 'https://ray784.github.io/tic_tac_toe/'
	},{
		'title': 'Calculator', 
		'subtitle':'Android | JS', 
		'desp':'A basic calculator application which uses postfix expression evaluation using a stack.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'android', 'github'], 
		'github': 'https://github.com/Ray784/calculator/', 
		'deploy': 'https://ray784.github.io/calculator/'
	},{
		'title': 'Calculator - java', 
		'subtitle':'Side Project', 
		'desp':'An almost scientific calculator application created using Java awt package.', 
		'icon':'',
		'technologies': ['java','github'], 
		'github': 'https://github.com/Ray784/java-calculator', 
		'deploy': ''
	},{
		'title': 'Chatbot - Tensorflow', 
		'subtitle':'RNN | Tensorflow', 
		'desp':'A chat-bot made using recurrent neural networks with the help of Tensorflow module.', 
		'icon':'',
		'technologies': ['python','github'], 
		'github': 'https://github.com/Ray784/chatbot', 
		'deploy': ''
	},{
		'title': 'Cryptography Algorithms', 
		'subtitle':'Cryptography | Curriculum', 
		'desp':'Java implementation of popular Cryptography algorithms  such as RSA, Blowfish, Diffie Hellman etc. implemented under the curriculum of Network Security and Cryptography.', 
		'icon':'',
		'technologies': ['java','github'], 
		'github': 'https://github.com/Ray784/CryptAlgo', 
		'deploy': ''
	},{
		'title': 'Classification/Clustering Algorithms', 
		'subtitle':'ML | Curriculum', 
		'desp':'Java Implementation of popular Classification/Clustering algorithms such as Kmeans, Kmedoids, Naive Bayes implemented under the curriculum of Data Mining and Data Warehousing.', 
		'icon':'',
		'technologies': ['java','github'], 
		'github': 'https://github.com/Ray784/DMDW', 
		'deploy': ''
	},{
		'title': 'Paint', 
		'subtitle':'Android | Thunkable', 
		'desp':'An android application with basic drawing options line, brush, circle, color-picker etc., that helps users to show their creativity without a pen/ paper.', 
		'icon':'',
		'technologies': ['android','github'], 
		'github': 'https://github.com/Ray784/paint', 
		'deploy': 'https://github.com/Ray784/paint/releases'
	}
];

function getProjects(skill){
	let projectContainer = document.getElementById('project-cards');
	projectContainer.innerHTML = '';
	let result = projects.filter(project => project['technologies'].includes(skill));
	result.sort(function(a, b) {
		let keyA = a.desp.length + a.title.length;
		let keyB = b.desp.length + b.title.length;
		if (keyA < keyB) return -1;
		if (keyA > keyB) return 1;
		return 0;
	});
	let row = document.createElement('div');
	row.classList.add('project-row');

	for(let i = 0; i < result.length; i++){
		row.innerHTML += getProjectCard(result[i]);
	}

	projectContainer.appendChild(row);
}

function getProjectCard(project){
	let head = `<div class="project-content"><p class="card-text card-title">${project.title}</p>`;
	let sub_head = `<p class="card-text card-subtitle">${project.subtitle}</p>`;
	let description = `<p class="card-text">${project.desp}</p>`;
	let technologies = `<p class="project-skill-container">${getTechnologies(project.technologies)}</p>`;
	let overlay = `<div class="overlay fade">`;
	let source = `<a class="source" href ="${project.github}" target = "_blank"><img src="/static/images/projects/github.svg" class="github">Source</a>`;
	let deploy = `<a class="source" href ="${project.deploy}" target = "_blank"><img src="/static/images/projects/website.png" class="github">Deploy</a>`;
	let foot = `</div></div>`;
	if(project.deploy != '')
		foot = deploy + foot;
	if(project.github != '')
		foot = source + foot;
	return head + sub_head + technologies + description + overlay + foot;
}

function getTechnologies(technologies){
	let technology = ``;
	for(tech of technologies){
		technology += `<img src="/static/images/projects/${tech}.svg" class="project-skill">`;
	}
	return technology;
}

function scrollToView(id){
	let elmnt = document.getElementById(id);
	elmnt.scrollIntoView();
}

window.onload = function(){
	setTimeout(()=>{
		document.getElementById('load_circle').classList.remove('hide');
		document.getElementById('load_gif').classList.add('hide');
		document.getElementById('load_circle').classList.add('zoomToFill');
		if(window.screen.width < 720){
			hideNav();
		}
	}, 500);
	setTimeout(()=>{
		document.getElementsByTagName('body')[0].classList.remove('prebody');
		document.getElementsByClassName('body')[0].classList.add('fade');
		document.getElementsByClassName('init')[0].classList.add('hide');
		document.getElementById('age').innerText = age;
		collageImageAbout();
		setInterval(()=>{collageImageAbout();}, 6000);
		shuffle(idx);
		setInterval(()=>{
			idx+=1; 
			idx%=portfolios1.length; 
			shuffle(idx);
		}, 5000);
		getProjects('github');

		setTimeout(()=>{setUpText("Click to Play");}, 2000);
		setTimeout(()=>{document.getElementById('song-text').innerHTML = "Now Playing: "+songs[song_idx].name;}, 5000);
		for(let i = 0; i < songs.length; i++){
			let playlistEntry = 
			`<div class="row">
				<p onclick="setSong(${i}); play();">${songs[i].title}</p>
				<div class="pointer">
					<div class="other" id="song_${i}"></div>
				</div>
			</div>`;
			document.getElementById('player').innerHTML = document.getElementById('player').innerHTML + playlistEntry;
		}
		max_imgs = images.length;
		preloadCollageImages(3);
		setSong(song_idx);
	}, 1000);
}

//preloading images - images optimised using http://jpeg-optimizer.com/ - settings: compression-level: 70, image-size: 1024px.
function preloadCollageImages(i){
	if(i < max_imgs){
		image.src = imageUrl + images[i]
		image.onload = () => {
			n = i+1;
			return preloadCollageImages(i + 1);
		}
	}else
		return;
}

preloadCollageImages(0);




