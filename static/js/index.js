let idx = 0;// to index the portfolios
let portfolios1 = ['Software', '', 'Software'];
let portfolios2 = ['Developer', 'Programmer', 'Engineer'];
let fonts = ['Fira Code', 'Playfair Display', 'Indie Flower', 'Kanit','Pacifico', 'Caveat', 'Satisfy', 'Ubuntu'];		
let nav = document.getElementById('nav');
let navTop = nav.offsetTop;
let age = (new Date(new Date() - new Date('06/30/1999')).getFullYear() - 1970) + ' years old';
document.getElementById('age').innerText = age;

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

shuffle(idx);
setInterval(()=>{
	idx+=1; 
	idx%=portfolios1.length; 
	shuffle(idx);
}, 5000);

let audio = new Audio();
let song_idx = 0;
let songs=[
	{'src':'./static/songs/azaleh_rainy_nights.mp3', 'name':'Rainy Nights', 'title': 'Azaleh - Rainy Nights'},
	{'src':'./static/songs/clandestina_cocaina.mp3', 'name':'Cocaina', 'title': 'Clandestina - Cocaina'},
	{'src':'./static/songs/danny_cocke_collider.mp3', 'name':'Collider', 'title': 'Danny Cocke - Collider'},
	{'src':'./static/songs/victoriya_disconnect.mp3', 'name':'Disconnect', 'title': 'Victoriya - Disconnect'},
];


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

setTimeout(()=>{setUpText("Click to Play");}, 2000);
setTimeout(()=>{document.getElementById('song-text').innerHTML = "Now Playing: "+songs[song_idx].name;}, 5000);
setSong(song_idx);

function scrollDiv(direction){
	let nav_mob = document.getElementsByClassName('navBar')[0];
	let scroll = nav_mob.children[0].offsetWidth;
	nav_mob.scrollLeft += (scroll*direction);
}


let projects = [
	{
		'title': 'JNTUH Alumni Association', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql'], 
		'github': '',
		'deploy': 'http://jntuhcehaa.org/'
	},{
		'title': 'JNTUH CSE - Quest website', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql'], 
		'github': 'https://github.com/Ray784/quest_website', 
		'deploy': ''
	},{
		'title': 'Quiz Application', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'angular', 'nodejs', 'mongodb'], 
		'github': '', 
		'deploy': 'https://hirestar.io/'
	},{
		'title': 'Exploring Feature reduction techniques for Indic scripts', 
		'desp':'', 
		'icon':'',
		'technologies': ['python'], 
		'github': 'https://github.com/Ray784/mini_project', 
		'deploy': ''
	},{
		'title': 'Don\'t Forget the Can Opener! - NASA', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql'], 
		'github': 'https://github.com/Ray784/nasa_spaceapps', 
		'deploy': ''
	},{
		'title': 'Event Management System', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql'], 
		'github': 'https://github.com/Ray784/event_management', 
		'deploy': ''
	},{
		'title': 'Project Mate', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'java', 'postgresql'], 
		'github': 'https://github.com/Ray784/Project-Mate', 
		'deploy': ''
	},{
		'title': 'Bits and Bytes', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'angular', 'nodejs', 'mongodb'], 
		'github': 'https://github.com/Ray784/bitsandbytes', 
		'deploy': 'https://bitsandbytes2020.herokuapp.com'
	},{
		'title': 'Gate2020 Score Calculator', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'bootstrap', 'python'], 
		'github': 'https://github.com/Ray784/Gate2020-Score', 
		'deploy': 'https://gate-2020.herokuapp.com/'
	},{
		'title': 'TS Intermediate first year results 2020 name-wise', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'bootstrap', 'python'], 
		'github': 'https://github.com/Ray784/ts-inter-data', 
		'deploy': 'https://tsbie20.herokuapp.com/'
	},{
		'title': 'Scraped English words', 
		'desp':'', 
		'icon':'',
		'technologies': ['python'], 
		'github': 'https://github.com/Ray784/english-words', 
		'deploy': ''
	},{
		'title': 'Tic-Tac-Toe', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'ai'], 
		'github': 'https://github.com/Ray784/tic_tac_toe/', 
		'deploy': 'https://ray784.github.io/tic_tac_toe/'
	},{
		'title': 'Calculator', 
		'desp':'', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap'], 
		'github': 'https://github.com/Ray784/calculator/', 
		'deploy': 'https://ray784.github.io/calculator/'
	},{
		'title': 'Calculator - java', 
		'desp':'', 
		'icon':'',
		'technologies': ['java'], 
		'github': 'https://github.com/Ray784/java-calculator', 
		'deploy': ''
	},{
		'title': 'Chatbot - Tensorflow', 
		'desp':'', 
		'icon':'',
		'technologies': ['python'], 
		'github': 'https://github.com/Ray784/chatbot', 
		'deploy': ''
	},{
		'title': 'Cryptography Algorithms', 
		'desp':'', 
		'icon':'',
		'technologies': ['java'], 
		'github': 'https://github.com/Ray784/CryptAlgo', 
		'deploy': ''
	},{
		'title': 'Classification/Clustering Algorithms', 
		'desp':'', 
		'icon':'',
		'technologies': ['java'], 
		'github': 'https://github.com/Ray784/DMDW', 
		'deploy': ''
	},{
		'title': 'Paint', 
		'desp':'', 
		'icon':'',
		'technologies': ['android'], 
		'github': 'https://github.com/Ray784/paint', 
		'deploy': 'https://github.com/Ray784/paint/releases'
	}
];

function getProjectCard(){

}