let idx = 0;// to index the portfolios
let portfolios1 = ['Software', '', 'Software'];
let portfolios2 = ['Developer', 'Programmer', 'Engineer'];
let fonts = ['Fira Code', 'Playfair Display', 'Indie Flower', 'Kanit','Pacifico', 'Caveat', 'Satisfy', 'Ubuntu'];		
let nav = document.getElementById('nav');
let navTop = nav.offsetTop;
let navHidden = true;

// Small screens see the desktop recommendation banner instead of the nav.
function hideNav(){
	let n = document.getElementById('notification');
	if(n)
		n.classList.remove('hide');
	if(nav)
		nav.classList.add('hide');
	navHidden = false;
}

function showNav(){
	let n = document.getElementById('notification');
	if(n)
		n.classList.add('hide');
	if(nav)
		nav.classList.remove('hide');
}
const BIRTH_DATE = '06/30/1999';
let age = (new Date(new Date() - new Date(BIRTH_DATE)).getFullYear() - 1970) + ' years old';
let ageModeIdx = 0;
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
const COLLAGE_API_URL = 'https://api.github.com/repos/Ray784/portfolio-design/contents/static/images/collage';
const COLLAGE_CDN_BASE = 'https://cdn.jsdelivr.net/gh/Ray784/portfolio-design@master/static/images/collage/';
// Filenames discovered on GitHub that are served from the CDN instead of the bundle.
let remoteCollageImages = new Set();

const SECTION_IDS = ['about', 'projects', 'reach-out'];
const GESTURE_IDLE_MS = 400;
const MIN_TRANSITION_MS = 600;
const SPY_THRESHOLD_RATIO = 0.4;
let sectionsUnlocked = false;
// Only one of SECTION_IDS is visible at a time, chosen by the navbar tabs.
let activeSectionId = 'about';
let unlockTimer = null;
let transitionStart = 0;
let touchStartY = null;

// Slides Page 1 from the HELLO split into the full width I am Abhay Bhat view.
function expandPage1(){
	let padding = document.getElementsByClassName('padding')[0];
	let part1 = document.getElementsByClassName('part1')[0];
	part1.style.width = '100vw';
	padding.style.marginLeft = '0';
	if(!transitionStart)
		transitionStart = Date.now();
}

// Shows the section with this id and hides the other two, like switching pages.
function showSection(id){
	activeSectionId = id;
	SECTION_IDS.forEach((sid)=>{
		let section = document.getElementById(sid);
		if(!section)
			return;
		if(sid === id){
			section.classList.remove('hide');
			section.classList.add('show');
		}else{
			section.classList.remove('show');
			section.classList.add('hide');
		}
	});
}

// Reveals the active section, About by default, once the first gesture settles.
function unlockSections(){
	if(sectionsUnlocked)
		return;
	sectionsUnlocked = true;
	clearTimeout(unlockTimer);
	unlockTimer = null;
	showSection(activeSectionId || 'about');
}

// The first downward gesture only expands Page 1. Sections unlock once the
// gesture has been idle for GESTURE_IDLE_MS and at least MIN_TRANSITION_MS
// has passed since the transition began, so momentum cannot carry into About.
function onFirstScrollGesture(){
	if(sectionsUnlocked)
		return;
	expandPage1();
	clearTimeout(unlockTimer);
	let remaining = MIN_TRANSITION_MS - (Date.now() - transitionStart);
	unlockTimer = setTimeout(unlockSections, Math.max(GESTURE_IDLE_MS, remaining));
}

// Marks the active section pill once its top crosses 40% of the viewport,
// and clears it when the visitor scrolls back up onto Page 1.
function updateActiveTab(){
	let current = null;
	if(sectionsUnlocked){
		let threshold = window.innerHeight * SPY_THRESHOLD_RATIO;
		let section = document.getElementById(activeSectionId);
		if(section && section.getBoundingClientRect().top <= threshold)
			current = activeSectionId;
	}
	setActiveTab(current);
}

function setActiveTab(id){
	let tabs = document.querySelectorAll('.nav-tab');
	for(let i = 0; i < tabs.length; i++){
		if(id && tabs[i].getAttribute('href') === '#' + id)
			tabs[i].classList.add('active');
		else
			tabs[i].classList.remove('active');
	}
}

// After unlock, a downward gesture still on Page 1 glides About flush to the
// top of the viewport, exactly like clicking the About tab.
function snapToAboutOnSecondScroll(){
	if(!sectionsUnlocked || activeSectionId !== 'about')
		return false;
	let about = document.getElementById('about');
	if(!about || !(window.pageYOffset < about.offsetTop - 20))
		return false;
	active(document.querySelector('.nav-tab[href="#about"]'), 'about');
	return true;
}

window.addEventListener('wheel', (e)=>{
	if(e.deltaY > 0 && !snapToAboutOnSecondScroll())
		onFirstScrollGesture();
}, {passive: true});

window.addEventListener('touchstart', (e)=>{
	touchStartY = e.touches[0].clientY;
}, {passive: true});

window.addEventListener('touchmove', (e)=>{
	if(touchStartY !== null && e.touches[0].clientY < touchStartY && !snapToAboutOnSecondScroll())
		onFirstScrollGesture();
}, {passive: true});

window.onscroll = function(){
	var currentScroll =window.pageYOffset;

	if (currentScroll >= 20 || unlockTimer)
		onFirstScrollGesture();
	
	if(currentScroll > navTop){
		nav.classList.add('fixed');
		main.style.paddingTop = nav.offsetHeight + 'px';
	}
	else{
		nav.classList.remove('fixed');
		main.style.paddingTop = '0px';
	}
	updateActiveTab();
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
		syncHeroIdentity();
	}, 2000);
}

function active(navEl, id){
	showSection(id);
	unlockSections();
	expandPage1();
	setActiveTab(id);
	let reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	document.getElementById(id).scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
	return false;
}

const PEEK_MS = 4000;
const PEEK_MIN_GAP_MS = 12000;
const PEEK_JITTER_MS = 13000;
const SEEK_STEP_S = 5;
let peekTimer = null;
let peekHideTimer = null;

function formatTime(seconds){
	if(!isFinite(seconds) || seconds < 0)
		seconds = 0;
	let m = Math.floor(seconds / 60);
	let s = Math.floor(seconds % 60);
	return m + ':' + (s < 10 ? '0' : '') + s;
}

function updateSongText(){
	let name = songs[song_idx].name;
	document.getElementById('song-text').textContent = audio.paused ? 'Up Next: ' + name + ' · Click to Play' : 'Now Playing: ' + name;
}

// Mirrors the audio element state onto both play buttons and the pulse ring.
function syncPlayState(){
	let playing = !audio.paused;
	let mainButton = document.getElementById('playButton');
	let panelButton = document.getElementById('panelPlayButton');
	let round = document.getElementsByClassName('round')[0];
	[mainButton, round, panelButton].forEach((el, i)=>{
		let cls = i == 0 ? 'pause' : 'is-playing';
		if(playing)
			el.classList.add(cls);
		else
			el.classList.remove(cls);
	});
	mainButton.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
	panelButton.setAttribute('aria-label', playing ? 'Pause' : 'Play');
	updateSongText();
}

function updateProgress(){
	let duration = audio.duration;
	let hasDuration = isFinite(duration) && duration > 0;
	let pct = hasDuration ? Math.min(100, audio.currentTime / duration * 100) : 0;
	document.getElementById('progressFill').style.width = pct + '%';
	document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
	document.getElementById('totalTime').textContent = formatTime(hasDuration ? duration : 0);
	document.getElementById('progressBar').setAttribute('aria-valuenow', String(Math.round(pct)));
}

function seek(e){
	let duration = audio.duration;
	if(!isFinite(duration) || duration <= 0)
		return;
	let rect = document.getElementById('progressBar').getBoundingClientRect();
	let ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
	audio.currentTime = ratio * duration;
	updateProgress();
}

function seekByKey(e){
	let duration = audio.duration;
	if(!isFinite(duration) || duration <= 0)
		return;
	let step = e.key === 'ArrowRight' ? SEEK_STEP_S : e.key === 'ArrowLeft' ? -SEEK_STEP_S : 0;
	if(!step)
		return;
	e.preventDefault();
	audio.currentTime = Math.min(duration, Math.max(0, audio.currentTime + step));
	updateProgress();
}

// Slides the Now Playing card out for PEEK_MS without needing hover.
function showPeek(){
	let back = document.getElementById('musicPlayer');
	back.classList.add('peek');
	clearTimeout(peekHideTimer);
	peekHideTimer = setTimeout(()=>{back.classList.remove('peek');}, PEEK_MS);
}

function scheduleRandomPeek(){
	clearTimeout(peekTimer);
	peekTimer = setTimeout(()=>{
		showPeek();
		scheduleRandomPeek();
	}, PEEK_MIN_GAP_MS + Math.random() * PEEK_JITTER_MS);
}

// Loads a track paused so callers decide whether playback resumes.
function setSong(idx){
	if(!audio.paused)
		audio.pause();
	song_idx = idx;
	audio.src = songs[idx].src;
	let current = document.getElementsByClassName('current')[0];
	if(current)
		current.classList.remove('current');
	document.getElementById('song_'+idx).classList.add('current');
	updateProgress();
	syncPlayState();
}

function play(){
	if(audio.paused){
		let pending = audio.play();
		if(pending && pending.catch)
			pending.catch(syncPlayState);
	}
	else
		audio.pause();
	syncPlayState();
}

// Steps through the queue with wraparound and keeps playing if it was playing.
function changeSong(step){
	let wasPlaying = !audio.paused;
	setSong((song_idx + step + songs.length) % songs.length);
	if(wasPlaying)
		play();
}

function prevSong(){
	changeSong(-1);
}

function nextSong(){
	changeSong(1);
}

audio.onplay = syncPlayState;
audio.onpause = syncPlayState;
audio.ontimeupdate = updateProgress;
audio.onloadedmetadata = updateProgress;

audio.onended = function(){
	setSong((song_idx + 1) % songs.length);
	play();
}

const LOCATION_NAMES = {
	'araku': 'Araku Valley',
	'hyderabad': 'Hyderabad',
	'kasaragod': 'Kasaragod',
	'pondy': 'Pondicherry',
	'vishaka': 'Visakhapatnam'
};
const COLLAGE_IMAGE_IDS = ['about-collage-image1', 'about-collage-image2'];
const COLLAGE_EXIT_MS = 320;
const COLLAGE_ENTER_MS = 520;
// Songs pushed to GitHub after deploy are discovered here and streamed from the CDN.
const GITHUB_SONGS_API = 'https://api.github.com/repos/Ray784/portfolio-design/contents/static/songs';
const JSDELIVR_SONGS_BASE = 'https://cdn.jsdelivr.net/gh/Ray784/portfolio-design@master/static/songs/';
const SONG_FILE_PATTERN = /\.(mp3|ogg|m4a|wav)$/i;

function titleCaseWords(text){
	return String(text).split(/[_\s]+/).filter((w)=>w).map((w)=>w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// Turns daft_punk-veridis_quo.mp3 into name Veridis Quo and title Daft Punk - Veridis Quo.
// A _-_ or - marks the artist split, otherwise the first underscore token is the artist.
function parseSongFilename(filename){
	let stem = String(filename).split('/').pop();
	try{
		stem = decodeURIComponent(stem);
	}catch(e){}
	stem = stem.replace(SONG_FILE_PATTERN, '');
	let artist = '';
	let track = '';
	let sep = stem.indexOf('_-_') !== -1 ? '_-_' : (stem.indexOf('-') !== -1 ? '-' : '');
	if(sep){
		let at = stem.indexOf(sep);
		artist = titleCaseWords(stem.slice(0, at).replace(/-/g, ' '));
		track = titleCaseWords(stem.slice(at + sep.length).replace(/-/g, ' '));
	}else{
		let words = stem.split('_').filter((w)=>w);
		if(words.length >= 2){
			artist = titleCaseWords(words[0]);
			track = titleCaseWords(words.slice(1).join(' '));
		}else{
			track = titleCaseWords(stem);
		}
	}
	if(!artist || !track){
		let single = track || artist || stem;
		return {name: single, title: single};
	}
	return {name: track, title: artist + ' - ' + track};
}

// Rebuilds the queue from songs and keeps the playing track highlighted.
function renderPlaylist(){
	let player = document.getElementById('player');
	if(!player)
		return;
	let html = '';
	for(let i = 0; i < songs.length; i++){
		html +=
		`<button class="queue-row" type="button" onclick="setSong(${i}); play();">
			<span class="queue-title">${songs[i].title}</span>
			<span class="other" id="song_${i}"></span>
		</button>`;
	}
	player.innerHTML = html;
	let current = document.getElementById('song_' + song_idx);
	if(current)
		current.classList.add('current');
}

// Appends new audio files from GitHub without touching playback, resolving to the count added.
function discoverRemoteSongs(){
	if(typeof fetch !== 'function')
		return Promise.resolve(0);
	return fetch(GITHUB_SONGS_API)
		.then((r)=>r.ok ? r.json() : [])
		.then((items)=>{
			let added = 0;
			(Array.isArray(items) ? items : []).forEach((item)=>{
				if(!item || item.type !== 'file')
					return;
				let name = String(item.name);
				if(!SONG_FILE_PATTERN.test(name))
					return;
				let encoded = encodeURIComponent(name);
				if(songs.some((s)=>s.src.endsWith('/' + name) || s.src.endsWith('/' + encoded)))
					return;
				let parsed = parseSongFilename(name);
				songs.push({src: JSDELIVR_SONGS_BASE + encoded, name: parsed.name, title: parsed.title});
				added++;
			});
			if(added)
				renderPlaylist();
			return added;
		})
		.catch(()=>0);
}

// Each swap picks one of these effects, see the anim-* rules in style.css.
const COLLAGE_ANIMATIONS = ['anim-flip-3d', 'anim-slide-glide', 'anim-iris-reveal', 'anim-tilt-shutter', 'anim-zoom-morph'];
const COLLAGE_STAGGER_MS = 220;
// Image index currently shown in each slot, matching the initial markup.
let collageSlots = [images.indexOf('araku-1.jpg'), images.indexOf('hyderabad-1.jpg')];
let collageBusy = [false, false];
// Auto-advance interval handle, restarted whenever the visitor flips a photo.
let collageTimer = null;

// Maps a collage filename such as pondy-2.jpg to a readable place name.
// Unknown prefixes such as leh_ladakh-2.webp are title cased into Leh Ladakh.
function locationFromFilename(file){
	let base = String(file).split('/').pop();
	try{
		base = decodeURIComponent(base);
	}catch(e){}
	let prefix = base.split('-')[0].toLowerCase();
	if(LOCATION_NAMES.hasOwnProperty(prefix))
		return LOCATION_NAMES[prefix];
	let stem = base.replace(/\.[^.]*$/, '').replace(/[-_]\d+$/, '');
	return stem.split(/[-_\s]+/).filter((w)=>w).map((w)=>w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// Bundled files load locally so dev works offline, discovered files use the CDN.
function resolveCollageSrc(entry){
	return remoteCollageImages.has(entry) ? COLLAGE_CDN_BASE + encodeURIComponent(entry) : imageUrl + entry;
}

// Appends collage photos pushed to GitHub after deploy, resolving to the count added.
function discoverRemoteCollageImages(){
	if(typeof fetch !== 'function')
		return Promise.resolve(0);
	return fetch(COLLAGE_API_URL)
		.then((r)=>r.ok ? r.json() : [])
		.then((items)=>{
			let added = 0;
			(Array.isArray(items) ? items : []).forEach((item)=>{
				if(!item || item.type !== 'file')
					return;
				let name = String(item.name);
				if(!/\.(jpe?g|png|webp)$/i.test(name) || /^abhay-bhat-/i.test(name) || images.indexOf(name) !== -1)
					return;
				images.push(name);
				remoteCollageImages.add(name);
				added++;
			});
			max_imgs = images.length;
			n = images.length;
			return added;
		})
		.catch(()=>0);
}

// Resolves once the image is decoded so the swap never shows a blank frame.
// Failed loads resolve too, the slideshow must not stall on one bad file.
function decodeImage(src){
	let img = new Image();
	if(typeof img.decode === 'function'){
		img.src = src;
		return img.decode().catch(()=>{});
	}
	return new Promise(resolve=>{
		img.onload = resolve;
		img.onerror = resolve;
		img.src = src;
	});
}

function wait(ms){
	return new Promise(resolve=>setTimeout(resolve, ms));
}

// Picks a random image that is not already visible in either slot.
function pickCollageIndex(slot){
	let choices = [];
	for(let i = 0; i < images.length; i++){
		if(i !== collageSlots[0] && i !== collageSlots[1])
			choices.push(i);
	}
	return choices[Math.floor(Math.random() * choices.length)];
}

// Returns one effect name at random so consecutive swaps feel varied.
function pickCollageAnimation(){
	return COLLAGE_ANIMATIONS[Math.floor(Math.random() * COLLAGE_ANIMATIONS.length)];
}

// Restarts the slideshow interval so the next auto swap is a full period away.
function resetCollageTimer(){
	if(collageTimer)
		clearInterval(collageTimer);
	collageTimer = setInterval(()=>{collageImageAbout();}, 6000);
}

// Preloads the next photo, plays the exit phase of a random effect, swaps the
// source and caption, then plays the matching entrance phase. Manual calls
// leave fromTimer unset and push back the next auto swap.
function advanceCollageSlot(slot, fromTimer){
	if(!fromTimer)
		resetCollageTimer();
	let img = document.getElementById(COLLAGE_IMAGE_IDS[slot]);
	if(!img || collageBusy[slot])
		return Promise.resolve(false);
	collageBusy[slot] = true;
	let next = pickCollageIndex(slot);
	collageSlots[slot] = next;
	let file = images[next];
	let src = resolveCollageSrc(file);
	let effect = pickCollageAnimation();
	return decodeImage(src).then(()=>{
		// A leftover fade class holds opacity through its fill mode, so drop it.
		img.classList.remove('fade');
		img.classList.add(effect);
		img.classList.add(effect + '-out');
		img.classList.add('is-exiting');
		return wait(COLLAGE_EXIT_MS);
	}).then(()=>{
		let place = locationFromFilename(file);
		img.src = src;
		img.alt = place ? place + ' photo' : 'Travel photo';
		let caption = document.getElementById('collage-caption-' + slot);
		if(caption)
			caption.textContent = place;
		img.classList.remove(effect + '-out');
		img.classList.remove('is-exiting');
		img.classList.add(effect + '-in');
		img.classList.add('is-entering');
		return wait(COLLAGE_ENTER_MS);
	}).then(()=>{
		img.classList.remove(effect + '-in');
		img.classList.remove('is-entering');
		img.classList.remove(effect);
		collageBusy[slot] = false;
		return true;
	});
}

function collageSlotKey(e, slot){
	if(e.key !== 'Enter' && e.key !== ' ')
		return;
	e.preventDefault();
	advanceCollageSlot(slot);
}

// Staggers the two slots so they never blink out together.
function collageImageAbout(){
	advanceCollageSlot(0, true);
	setTimeout(()=>{advanceCollageSlot(1, true);}, COLLAGE_STAGGER_MS);
}

let projects = [
	{
		'title': 'UMLCreator',
		'subtitle': 'Developer Tooling | Java',
		'desp': 'A Java desktop tool for creating UML diagrams, built to sketch class structures and their relationships quickly.',
		'icon': '',
		'technologies': ['java', 'github'],
		'github': 'https://github.com/Ray784/umlCreator',
		'deploy': ''
	},{
		'title': 'Data Structures & Algorithms Visualizer',
		'subtitle': 'Frontend | Visualization',
		'desp': 'Interactive browser visualisations for data structures and algorithms, animating each step so the underlying logic is easy to follow.',
		'icon': '',
		'technologies': ['html', 'css', 'js', 'github'],
		'github': 'https://github.com/Ray784/ds-visualization',
		'deploy': ''
	},{
		'title': 'Competitive Programming DS & Graph Library',
		'subtitle': 'Algorithms | Competitive Programming',
		'desp': 'A reusable library of the data structures and graph algorithms needed for competitive programming, written for fast drop-in use during contests.',
		'icon': '',
		'technologies': ['java', 'c', 'github'],
		'github': 'https://github.com/Ray784/ds-algo',
		'deploy': ''
	},{
		'title': 'Sales Helper Mobile App',
		'subtitle': 'Mobile | Flutter',
		'desp': 'A cross-platform Flutter mobile app built to assist with everyday sales tasks on Android.',
		'icon': '',
		'technologies': ['flutter', 'android', 'github'],
		'github': 'https://github.com/Ray784/sales_helper',
		'deploy': ''
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
		'title': 'Bits and Bytes', 
		'subtitle':'Full Stack | Curriculum', 
		'desp':'Bits and Bytes is intended to create an exploration environment, in which students can learn through and also provide teachers with a good teaching aid. Features such as interview preparation, blogs from college seniors and links to important books are also available.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'angular', 'nodejs', 'mongodb', 'd3js', 'heroku', 'github'], 
		'github': 'https://github.com/Ray784/bitsandbytes', 
		'deploy': 'https://bitsandbytes2020.herokuapp.com'
	},{
		'title': 'Scraped English words', 
		'subtitle':'Scraping', 
		'desp':'A list of 20,000(appx) most used valid english words scraped from wikipedia.', 
		'icon':'',
		'technologies': ['python', 'github'], 
		'github': 'https://github.com/Ray784/english-words', 
		'deploy': ''
	},{
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
		'title': 'Don\'t Forget the Can Opener! - NASA', 
		'subtitle':'Full Stack | Hackathon',
		'desp':'Created an easy-to-use way for people to develop their own, custom checklists – both items and plans – for earthquakes. Used NASA USGS data to illustrate it, to help people understand how to prepare, provide safety measures as well as locations to safeguard themselves.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql', 'github'], 
		'github': 'https://github.com/Ray784/nasa_spaceapps', 
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
		'title': 'Chatbot - Tensorflow', 
		'subtitle':'RNN | Tensorflow', 
		'desp':'A chat-bot made using recurrent neural networks with the help of Tensorflow module.', 
		'icon':'',
		'technologies': ['python','github'], 
		'github': 'https://github.com/Ray784/chatbot', 
		'deploy': ''
	},{
		'title': 'Exploring Feature reduction techniques for Indic scripts', 
		'subtitle': 'Research | JNTUH | Curriculum',
		'desp':'Indic languages create a great challenge in text mining due to high dimensionality thus we explored the effects of feature reduction techniques on such languages.', 
		'icon':'',
		'technologies': ['python', 'github'], 
		'github': 'https://github.com/Ray784/mini_project', 
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
		'title': 'Event Management System', 
		'subtitle': 'Full Stack | Curriculum',
		'desp':'Event management is the application of project management to the creation and development of small and/or large-scale personal or corporate events such as festivals, conferences, ceremonies, weddings, formal parties, concerts, or conventions. It involves coordinating the technical aspects before actually launching the event. Created this website under Database System curriculum.', 
		'icon':'',
		'technologies': ['html', 'css', 'js', 'bootstrap', 'php', 'mysql', 'github'], 
		'github': 'https://github.com/Ray784/event_management', 
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
		'title': 'Paint', 
		'subtitle':'Android | Thunkable', 
		'desp':'An android application with basic drawing options line, brush, circle, color-picker etc., that helps users to show their creativity without a pen/ paper.', 
		'icon':'',
		'technologies': ['android','github'], 
		'github': 'https://github.com/Ray784/paint', 
		'deploy': 'https://github.com/Ray784/paint/releases'
	}
];

const SKILL_LABELS = {
	'java': 'Java',
	'python': 'Python',
	'html': 'HTML5',
	'css': 'CSS3',
	'c': 'C / C++',
	'bootstrap': 'Bootstrap',
	'php': 'PHP',
	'github': 'GitHub / All',
	'mongodb': 'MongoDB',
	'angular': 'Angular',
	'js': 'JavaScript',
	'mysql': 'SQL / Spanner',
	'nodejs': 'Node.js',
	'flutter': 'Flutter / Dart'
};

// Mirrors the active filter in the prompt label and on its hexagon.
function markActiveSkill(skill){
	let label = document.getElementById('activeSkillName');
	if(label)
		label.textContent = SKILL_LABELS[skill] || skill;
	let cells = document.querySelectorAll('.hex-cell');
	for(let i = 0; i < cells.length; i++)
		cells[i].classList.toggle('active-hex', cells[i].getAttribute('data-skill-key') === skill);
}

// Lets keyboard users activate a focused hexagon with Enter or Space.
function hexCellKey(event, cell){
	if(event.key !== 'Enter' && event.key !== ' ')
		return;
	event.preventDefault();
	cell.click();
}

function getProjects(skill){
	markActiveSkill(skill);
	let projectContainer = document.getElementById('project-cards');
	projectContainer.innerHTML = '';
	let result = projects.filter(project => project['technologies'].includes(skill));
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
		if(window.screen && window.screen.width > 0 && window.screen.width < 720){
			hideNav();
		}
	}, 500);
	setTimeout(()=>{
		document.getElementsByTagName('body')[0].classList.remove('prebody');
		document.getElementsByClassName('body')[0].classList.add('fade');
		document.getElementsByClassName('init')[0].classList.add('hide');
		document.getElementById('age').innerText = age;
		collageImageAbout();
		resetCollageTimer();
		shuffle(idx);
		setInterval(()=>{
			idx+=1; 
			idx%=portfolios1.length; 
			shuffle(idx);
		}, 5000);
		getProjects('github');

		renderPlaylist();
		setTimeout(showPeek, 2000);
		scheduleRandomPeek();
		max_imgs = images.length;
		preloadCollageImages(3);
		discoverRemoteCollageImages();
		discoverRemoteSongs();
		perchCatOnHelloDot();
		setTimeout(perchCatOnHelloDot, 1650);
		scheduleCatBehavior();
		setTimeout(function(){
			if(!catPetted && catStep % 3 !== 2)
				showCatHint(CAT_PET_ME_HINT);
		}, 600);
		setSong(song_idx);
	}, 1000);
}

//preloading images - images optimised using http://jpeg-optimizer.com/ - settings: compression-level: 70, image-size: 1024px.
function preloadCollageImages(i){
	if(i < max_imgs){
		image.src = resolveCollageSrc(images[i]);
		image.onload = () => {
			n = i+1;
			return preloadCollageImages(i + 1);
		}
	}else
		return;
}

preloadCollageImages(0);





// Easter eggs: shared toast, Bhatman mode, age unit cycler and runnable reach-out labels.
const EASTER_TOAST_MS = 3200;
let easterToastTimer = null;

function showEasterToast(text, mode){
	let toast = document.getElementById('easterToast');
	if(!toast)
		return false;
	toast.textContent = text;
	toast.setAttribute('data-mode', mode || 'default');
	toast.classList.add('visible');
	if(easterToastTimer)
		clearTimeout(easterToastTimer);
	easterToastTimer = setTimeout(()=>{
		toast.classList.remove('visible');
		easterToastTimer = null;
	}, EASTER_TOAST_MS);
	return true;
}

const BHATMAN_HERO_HTML = 'Bhatman <img src="/static/images/batman-icon.svg" alt="Batman emblem" class="batman-inline-icon">';

// Outside Bhatman mode the hero is always Abhay Bhat. Inside it, activation
// shows Bhatman and every shuffle tick flips a coin between both identities.
function syncHeroIdentity(preferBhatman){
	let heroName = document.getElementById('heroName');
	if(!heroName)
		return null;
	if(!isBhatmanMode()){
		heroName.textContent = 'Abhay Bhat';
		return 'Abhay Bhat';
	}
	let html = preferBhatman === true || Math.random() < 0.5 ? BHATMAN_HERO_HTML : 'Abhay Bhat';
	heroName.innerHTML = html;
	return html;
}

const BAT_SIGNAL_STAGE_IDS = ['batStageSource', 'batStageBeam', 'batStageSignal'];

// Replays the source, beam and signal stages by clearing their animation and forcing a reflow.
function restartBatSignalStages(){
	let stages = BAT_SIGNAL_STAGE_IDS.map(id => document.getElementById(id)).filter(Boolean);
	stages.forEach(stage => stage.style.animation = 'none');
	if(stages.length)
		void document.body.offsetWidth;
	stages.forEach(stage => stage.style.animation = '');
	return stages.length;
}

function toggleBhatmanMode(){
	let active = document.body.classList.toggle('bhatman-mode');
	if(active)
		restartBatSignalStages();
	syncHeroIdentity(true);
	let toggleBtn = document.getElementById('themeToggleBtn');
	if(toggleBtn)
		toggleBtn.setAttribute('aria-pressed', String(active));
	let heroPrefix = document.getElementById('heroPrefix');
	if(heroPrefix)
		heroPrefix.style.color = active ? '#d4af37' : 'black';
	showEasterToast(active ? 'BHATMAN PROTOCOL ACTIVE · Night-watch theme engaged' : '☀️ Bhatman protocol standby · Standard theme restored', 'bhatman');
	return active;
}

// HELLO dot click, which sometimes breaks the website instead of toggling Bhatman mode.
let helloDotClicks = 0;
let brokenBannerTimer = null;

function shouldBreakOnDotClick(clicks, rand){
	return clicks >= 2 && (clicks % 3 === 0 || rand < 0.45);
}

function triggerSiteBreak(){
	document.body.classList.add('site-broken');
	let banner = document.getElementById('siteBrokenBanner');
	if(banner)
		banner.classList.add('visible');
	clearTimeout(brokenBannerTimer);
	brokenBannerTimer = setTimeout(function(){
		if(banner)
			banner.classList.remove('visible');
	}, 2600);
	showCatHint('🙀 MEOW! You broke the website!');
	catDropItem();
}

function repairSite(){
	clearTimeout(brokenBannerTimer);
	document.body.classList.remove('site-broken');
	let banner = document.getElementById('siteBrokenBanner');
	if(banner)
		banner.classList.remove('visible');
	showEasterToast('🔧 Crisis averted · Website taped back together', 'default');
}

function onHelloDotClick(){
	if(document.body.classList.contains('site-broken')){
		repairSite();
		return 'repaired';
	}
	helloDotClicks++;
	if(shouldBreakOnDotClick(helloDotClicks, Math.random())){
		triggerSiteBreak();
		return 'broken';
	}
	toggleBhatmanMode();
	return 'toggled';
}

const BHATMAN_CODE = 'bhatman';
let bhatmanBuffer = '';
function bhatmanKey(e){
	if(e.ctrlKey || e.metaKey || e.altKey || typeof e.key !== 'string' || !/^[a-z]$/i.test(e.key))
		return;
	bhatmanBuffer = (bhatmanBuffer + e.key.toLowerCase()).slice(-BHATMAN_CODE.length);
	if(bhatmanBuffer === BHATMAN_CODE){
		bhatmanBuffer = '';
		toggleBhatmanMode();
	}
}
window.addEventListener('keydown', bhatmanKey);

// Opens or closes the secret egg vault and returns the resulting open state.
function toggleEasterEggModal(show){
	let modal = document.getElementById('easterEggModal');
	if(!modal)
		return false;
	let open = typeof show === 'boolean' ? show : !modal.classList.contains('is-open');
	modal.classList.toggle('is-open', open);
	modal.setAttribute('aria-hidden', open ? 'false' : 'true');
	let focusEl = document.getElementById(open ? 'eggModalCloseBtn' : 'secretEggBtn');
	if(focusEl && typeof focusEl.focus === 'function')
		focusEl.focus();
	return open;
}

// Closes the vault only when the dimmed backdrop itself is clicked.
function onEggModalBackdropClick(e){
	if(!e || e.target !== e.currentTarget)
		return false;
	toggleEasterEggModal(false);
	return true;
}

// Escape dismisses the vault while it is open.
function eggModalKey(e){
	if(!e || e.key !== 'Escape')
		return false;
	let modal = document.getElementById('easterEggModal');
	if(!modal || !modal.classList.contains('is-open'))
		return false;
	toggleEasterEggModal(false);
	return true;
}
window.addEventListener('keydown', eggModalKey);

// Companion cat that wanders over to Easter eggs, grooms, and knocks things over.
const CAT_STATES = ['cat-idle', 'cat-walking', 'cat-licking', 'cat-dropping'];
const CAT_DROP_ITEMS = ['🧶', '☕', '🧩', '🌙', '👟'];
const CAT_NAME = 'Billiam Catsby II';
const CAT_PET_ME_HINT = '🐾 Meow! Pet me?';
const CAT_PERCH_HINT = '🐾 Billiam Catsby II: Click here for a surprise!';
const CAT_MUSIC_TARGET = {id: 'playButton', hint: '🐾 tap here to play some music! 🎵'};
const CAT_WALK_MS = 2400;
const CAT_LICK_MS = 3200;
const CAT_DROP_MS = 1400;
const CAT_BUBBLE_MS = 3800;
const CAT_REST_MIN_MS = 5000;
const CAT_REST_JITTER_MS = 6000;
const CAT_WIDTH = 64;
const CAT_MIN_BOTTOM = 18;
let catTimer = null;
let catIdleTimer = null;
let catBubbleTimer = null;
let catStep = 0;
let catPetted = false;

function isBhatmanMode(){
	return !!(document.body && document.body.classList.contains('bhatman-mode'));
}

// Easter eggs on whichever page is visible, Page 1 until sections unlock, plus the music player everywhere.
function catTargets(){
	if(!sectionsUnlocked)
		return [{id: 'helloDot', hint: CAT_PERCH_HINT}, CAT_MUSIC_TARGET];
	if(activeSectionId === 'about')
		return [{id: 'age', hint: '🐾 tap ' + age + '!'}, {id: 'collage-slot-0', hint: '🐾 click a travel photo!'}, {id: 'portraitCard', hint: '🐾 tap Abhay\'s photo — bet he runs!'}, {selector: '#nameCard', hint: '🐾 ' + CAT_NAME + ': Click the name card for 5 languages!'}, CAT_MUSIC_TARGET];
	if(activeSectionId === 'reach-out')
		return [{selector: '#reach-out .fn-trigger', hint: '🐾 psst — try clicking eat(), code(), or solve()!'}, CAT_MUSIC_TARGET];
	return [{selector: '.hex-cell', hint: '🐾 tap a hexagon to sniff out projects!'}, CAT_MUSIC_TARGET];
}

function catPickTarget(){
	let targets = catTargets();
	let target = targets[Math.floor(catStep / 3) % targets.length];
	let el = target.id ? document.getElementById(target.id) : document.querySelector(target.selector);
	return {el: el, hint: target.hint};
}

function setCatState(state){
	let cat = document.getElementById('pageCat');
	if(!cat)
		return;
	CAT_STATES.forEach((s)=>cat.classList.remove(s));
	cat.classList.add(state);
}

// Settles the cat back to idle once the current action has played out.
function settleCat(ms){
	clearTimeout(catIdleTimer);
	catIdleTimer = setTimeout(()=>setCatState('cat-idle'), ms);
}

function showCatHint(text){
	let bubble = document.getElementById('catBubble');
	if(!bubble)
		return;
	bubble.textContent = text;
	bubble.classList.add('show');
	clearTimeout(catBubbleTimer);
	catBubbleTimer = setTimeout(()=>bubble.classList.remove('show'), CAT_BUBBLE_MS);
}

function clampNumber(value, min, max){
	return Math.max(min, Math.min(max, value));
}

// Walks to sit on top of the target, or to a random floor spot when there is none.
function walkCatTo(target){
	let cat = document.getElementById('pageCat');
	if(!cat)
		return null;
	let maxLeft = Math.max(8, window.innerWidth - CAT_WIDTH - 16);
	let left = 8 + Math.random() * (maxLeft - 8);
	let bottom = CAT_MIN_BOTTOM;
	if(target && target.el && target.el.getBoundingClientRect){
		let rect = target.el.getBoundingClientRect();
		left = rect.left + rect.width / 2 - CAT_WIDTH / 2;
		bottom = window.innerHeight - rect.top;
	}
	left = Math.round(clampNumber(left, 8, maxLeft));
	bottom = Math.round(clampNumber(bottom, CAT_MIN_BOTTOM, Math.max(CAT_MIN_BOTTOM, window.innerHeight - 90)));
	let previous = parseFloat(cat.style.left);
	cat.classList.toggle('cat-facing-left', isFinite(previous) && left < previous);
	cat.style.left = left + 'px';
	cat.style.bottom = bottom + 'px';
	setCatState('cat-walking');
	settleCat(CAT_WALK_MS);
	return {left: left, bottom: bottom};
}

// Starts the cat sitting on the HELLO dot, inviting the first click.
function perchCatOnHelloDot(){
	let pos = walkCatTo({el: document.getElementById('helloDot')});
	setCatState('cat-idle');
	showCatHint(CAT_PERCH_HINT);
	return pos;
}

function catDropItem(){
	let item = CAT_DROP_ITEMS[Math.floor(Math.random() * CAT_DROP_ITEMS.length)];
	let drop = document.getElementById('catDrop');
	if(drop){
		drop.textContent = item;
		drop.classList.remove('falling');
		void drop.offsetWidth;
		drop.classList.add('falling');
	}
	setCatState('cat-dropping');
	settleCat(CAT_DROP_MS);
	return item;
}

// Cycles walk to an Easter egg with a hint, then groom, then drop something.
function stepCatBehavior(){
	if(!document.getElementById('pageCat'))
		return null;
	let phase = catStep % 3;
	let state;
	if(phase === 0){
		let target = catPickTarget();
		walkCatTo(target);
		showCatHint(target.hint);
		state = 'cat-walking';
	}else if(phase === 1){
		setCatState('cat-licking');
		showCatHint(CAT_PET_ME_HINT);
		settleCat(CAT_LICK_MS);
		state = 'cat-licking';
	}else{
		catDropItem();
		state = 'cat-dropping';
	}
	catStep++;
	return state;
}

function scheduleCatBehavior(){
	clearTimeout(catTimer);
	catTimer = setTimeout(()=>{
		stepCatBehavior();
		scheduleCatBehavior();
	}, CAT_REST_MIN_MS + Math.random() * CAT_REST_JITTER_MS);
}

// Petting purrs, knocks an item over, then leads the visitor to an Easter egg.
function petCat(){
	catPetted = true;
	showCatHint(isBhatmanMode() ? '🌙 ' + CAT_NAME + ': purrr... in the dark' : '🐾 ' + CAT_NAME + ': purrrr...');
	let item = catDropItem();
	clearTimeout(catTimer);
	catTimer = setTimeout(()=>{
		// Moves to the next Easter egg on every pet while keeping the walk, groom, drop phase.
		catStep += 3;
		let target = catPickTarget();
		walkCatTo(target);
		showCatHint(target.hint);
		scheduleCatBehavior();
	}, CAT_DROP_MS);
	return item;
}

function catKey(e){
	if(e.key !== 'Enter' && e.key !== ' ')
		return;
	e.preventDefault();
	petCat();
}

const AGE_MODES = 5;
const DAY_MS = 24 * 60 * 60 * 1000;
function ageText(mode, now){
	now = now || new Date();
	let lived = now - new Date(BIRTH_DATE);
	let years = new Date(lived).getFullYear() - 1970;
	switch(mode){
		case 1: return '0x' + years.toString(16).toUpperCase() + ' years old · hex';
		case 2: return '0b' + years.toString(2) + ' yrs · binary';
		case 3: return '~' + Math.round(lived / 1000 / 1e6) + 'M sec uptime';
		case 4: return Math.floor(lived / DAY_MS) + ' orbits · 5K / 10K / Trail / Half-Marathoner 🏃';
		default: return years + ' years old';
	}
}

function cycleAgeMode(){
	ageModeIdx = (ageModeIdx + 1) % AGE_MODES;
	let text = ageText(ageModeIdx);
	let el = document.getElementById('age');
	if(el)
		el.innerText = text;
	showEasterToast('⏱️ Age unit -> ' + text);
	return text;
}

function isActivateKey(e){
	return e.key === 'Enter' || e.key === ' ';
}

const PORTRAIT_GONE_MESSAGES = [
	'BRB — sprinted out of this frame for a quick 21.1 km half marathon. Check back in 1 hr 45 min!',
	'404 Abhay Not Found: Currently chasing a new 10K personal record on the trails.',
	'He heard someone mention a weekend trail run and bolted right out of his own portfolio.',
	'Out logging miles! Left this empty div in charge until the finisher medal arrives.'
];
let portraitLastIdx = -1;

// Picks a random gone message, never repeating the previous one.
function pickPortraitGoneMessage(){
	let n = PORTRAIT_GONE_MESSAGES.length;
	let idx = Math.floor(Math.random() * n);
	if(n > 1 && idx === portraitLastIdx)
		idx = (idx + 1 + Math.floor(Math.random() * (n - 1))) % n;
	portraitLastIdx = idx;
	return PORTRAIT_GONE_MESSAGES[idx];
}

// Toggles the runner easter egg and returns true when Abhay is out running.
function togglePortraitRun(){
	let card = document.getElementById('portraitCard');
	if(!card)
		return false;
	if(card.classList.contains('is-escaped')){
		card.classList.remove('is-escaped');
		showEasterToast('🏅 Back from the run · Hydrated & ready');
		return false;
	}
	let text = document.getElementById('portraitGoneText');
	if(text)
		text.textContent = pickPortraitGoneMessage();
	let runner = document.getElementById('portraitRunner');
	if(runner){
		runner.style.animation = 'none';
		void runner.offsetWidth;
		runner.style.animation = '';
	}
	card.classList.add('is-escaped');
	showEasterToast('🏃💨 Abhay sprinted off the page!');
	return true;
}

function portraitCardKey(e){
	if(!isActivateKey(e))
		return;
	e.preventDefault();
	togglePortraitRun();
}

const NAME_CARD_LANGUAGES = [
	{code: 'en', badge: 'EN · English ↻', title: 'Abhay A Bhat', subtitle: 'Software Engineer (L4) | Google', join: 'Pune · 6+ Yrs Cloud & Systems', bio: 'Building cloud storage & VM migration infrastructure at Google. Shipped Filestore & NetApp NFS datastores for Google Cloud VMware Engine and package-free Linux OS adaptation for Migrate to VMs.', resume: 'View Resume'},
	{code: 'hi', badge: 'HI · हिन्दी ↻', title: 'अभय ए भट', subtitle: 'सॉफ़्टवेयर इंजीनियर (L4) | Google', join: 'पुणे · 6+ साल क्लाउड और सिस्टम्स', bio: 'Google में क्लाउड स्टोरेज और वर्चुअल मशीन (VM) माइग्रेशन सिस्टम बनाता हूँ। यहाँ मैंने Google Cloud VMware Engine के लिए Filestore और NetApp NFS स्टोरेज, तथा Linux VM माइग्रेशन टूल्स बनाए और लॉन्च किए हैं।', resume: 'रेज़्यूमे देखें'},
	{code: 'kok', badge: 'KOK · कोंकणी ↻', title: 'अभय ए भट', subtitle: 'सॉफ्टवेअर इंजिनियर (L4) | Google', join: 'पुणे · 6+ वर्सां क्लाउड आनी सिस्टम्स', bio: 'Google आंतु क्लाउड स्टोरेज आनी VM मायग्रेशन सिस्टम्स बांदतां. हांगा हांवें Google Cloud VMware Engine खातीर Filestore आनी NetApp NFS स्टोरेज, तशेंच Linux VM मायग्रेशन टूल्स तयार कोर्न सुरु केलां.', resume: 'रेझ्युम पळया'},
	{code: 'kn', badge: 'KN · ಕನ್ನಡ ↻', title: 'ಅಭಯ್ ಎ ಭಟ್', subtitle: 'ಸಾಫ್ಟ್‌ವೇರ್ ಇಂಜಿನಿಯರ್ (L4) | Google', join: 'ಪುಣೆ · 6+ ವರ್ಷ ಕ್ಲೌಡ್ ಮತ್ತು ಸಿಸ್ಟಮ್ಸ್', bio: 'Google ನಲ್ಲಿ ಕ್ಲೌಡ್ ಸ್ಟೋರೇಜ್ ಮತ್ತು VM ಮೈಗ್ರೇಷನ್ ಸಿಸ್ಟಮ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇನೆ. ಇಲ್ಲಿ Google Cloud VMware Engine ಗಾಗಿ Filestore ಮತ್ತು NetApp NFS ಸ್ಟೋರೇಜ್ ಹಾಗೂ Linux VM ಮೈಗ್ರೇಷನ್ ಟೂಲ್‌ಗಳನ್ನು ನಿರ್ಮಿಸಿ ಬಿಡುಗಡೆ ಮಾಡಿದ್ದೇನೆ.', resume: 'ರೆಸ್ಯೂಮ್ ನೋಡಿ'},
	{code: 'te', badge: 'TE · తెలుగు ↻', title: 'అభయ్ ఎ భట్', subtitle: 'సాఫ్ట్‌వేర్ ఇంజనీర్ (L4) | Google', join: 'పుణె · 6+ సం. క్లౌడ్ & సిస్టమ్స్', bio: 'Google లో క్లౌడ్ స్టోరేజ్ మరియు VM మైగ్రేషన్ సిస్టమ్స్ నిర్మిస్తున్నాను. ఇక్కడ Google Cloud VMware Engine కోసం Filestore మరియు NetApp NFS స్టోరేజ్, అలాగే Linux VM మైగ్రేషన్ టూల్స్ నిర్మించి విడుదల చేశాను.', resume: 'రెజ్యూమ్ చూడండి'},
];
let nameCardLangIdx = 0;

function isInsideLink(e){
	return !!(e && e.target && e.target.closest && e.target.closest('a'));
}

function setNameCardText(id, text){
	let node = document.getElementById(id);
	if(node)
		node.textContent = text;
}

// Clicking the bio card rotates through the five languages Abhay speaks; the resume link stays a plain link.
function cycleNameCardLanguage(event){
	if(isInsideLink(event))
		return false;
	let card = document.getElementById('nameCard');
	if(!card)
		return false;
	nameCardLangIdx = (nameCardLangIdx + 1) % NAME_CARD_LANGUAGES.length;
	let lang = NAME_CARD_LANGUAGES[nameCardLangIdx];
	setNameCardText('nameCardLang', lang.badge);
	setNameCardText('nameCardTitle', lang.title);
	setNameCardText('nameCardSubtitle', lang.subtitle);
	setNameCardText('nameCardJoin', lang.join);
	setNameCardText('nameCardBio', lang.bio);
	setNameCardText('nameCardResumeBtn', lang.resume);
	card.setAttribute('lang', lang.code);
	card.classList.add('is-lang-unlocked');
	card.classList.add('is-switching');
	setTimeout(()=>card.classList.remove('is-switching'), 220);
	return lang.code;
}

function nameCardKey(e){
	if(!isActivateKey(e) || isInsideLink(e))
		return;
	e.preventDefault();
	cycleNameCardLanguage(e);
}

function ageCardKey(e){
	if(!isActivateKey(e))
		return;
	e.preventDefault();
	cycleAgeMode();
}

const REACH_OUT_OUTPUTS = {
	'eat': [
		'Masala dosa + filter coffee ☕ [200 OK]',
		'Post-half-marathon masala dosa + filter coffee ☕ [200 OK]',
		'Carb loading before a 10K 🍝 [202 Accepted]',
		'Banana at the 5K water station 🍌 [200 OK]',
		'Biryani overflow · portion limit exceeded 🍛'
	],
	'sleep': [
		'Error 418: Preempted by late-night debugging',
		'Alarm set for 5 AM · trail run awaits 🌄',
		'sleep(8h) returned after 5h · race day nerves',
		'Snoozed 3 times · still made the 10K start line ⏰'
	],
	'code': [
		'It works on my machine 🤷',
		'git commit -m "fix typo in the typo fix"',
		'Rubber duck consulted · bug found in 2 min 🦆',
		'0 warnings, 0 errors, 1 coffee ☕',
		'Tabs vs spaces settled with a coin toss 🪙'
	],
	'solve': [
		'AC · Runtime Beats 99.4% in Java',
		'Mirror Cube solved · shape-shifted back to a cube ✅',
		'Dynamic programming · memoized my way out 🧠',
		'Wrong Answer on test 42 · retrying with fresh eyes',
		'Trail map solved · took the scenic switchback 🗺️'
	],
	'repeat': [
		'while (alive) { eat(); sleep(); run(21.1km); code(); }',
		'5K -> 10K -> Trail Run -> 21.1K Half Marathon 🏃',
		'for (km = 1; km <= 21.1; km++) { breathe(); }',
		'do { learn(); } while (curious);'
	]
};
let reachOutLastIdx = {};
const REACH_OUT_CONSOLE_PULSE_MS = 1200;
let reachOutConsoleTimer = null;

// Picks a random line, never the same one twice in a row for a function.
function pickReachOutOutput(name){
	let options = REACH_OUT_OUTPUTS[name];
	let idx = Math.floor(Math.random() * options.length);
	if(options.length > 1 && idx === reachOutLastIdx[name])
		idx = (idx + 1 + Math.floor(Math.random() * (options.length - 1))) % options.length;
	reachOutLastIdx[name] = idx;
	return options[idx];
}

function runReachOutFn(name){
	if(!REACH_OUT_OUTPUTS.hasOwnProperty(name))
		return false;
	let out = pickReachOutOutput(name);
	let line = name + '() => "' + out + '"';
	let outputText = document.getElementById('reachOutOutputText');
	if(outputText)
		outputText.textContent = line;
	let consoleEl = document.getElementById('reachOutConsole');
	if(consoleEl){
		consoleEl.classList.add('is-visible');
		consoleEl.classList.remove('is-active');
		void consoleEl.offsetWidth;
		consoleEl.classList.add('is-active');
		if(reachOutConsoleTimer)
			clearTimeout(reachOutConsoleTimer);
		reachOutConsoleTimer = setTimeout(()=>{
			consoleEl.classList.remove('is-active');
			reachOutConsoleTimer = null;
		}, REACH_OUT_CONSOLE_PULSE_MS);
	}
	return Boolean(consoleEl && outputText);
}

function reachOutFnKey(e, name){
	if(!isActivateKey(e))
		return;
	e.preventDefault();
	runReachOutFn(name);
}
