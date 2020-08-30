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
		main.style.paddingTop = '40px';
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
{'src':'./static/songs/Are you gonna be my girl-Jet.mp3', 'name':'JET', 'title': 'Are you gonna be my girl-Jet'},
{'src':'./static/songs/Adventure of a lifetime-Coldplay.mp3', 'name':'Coldplay', 'title': 'Adventure of a lifetime-Coldplay'},
{'src':'./static/songs/Cocaina-Clandestina.mp3', 'name':'Clandestina', 'title': 'Cocaina-Clandestina'}];


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