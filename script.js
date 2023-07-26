console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/music1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Zihaal e Miskin", filePath: "songs/music1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Tu Mera Koi Na Hoke Bhi Kuch Lage", filePath: "songs/music2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Kali Kali Zulfon Ke", filePath: "songs/music3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Udd Jaa Kaale Kaava", filePath: "songs/music4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Piya O Re Piya", filePath: "songs/music5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "Zihaal e Miskin", filePath: "songs/music1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Tu Mera Koi Na Hoke Bhi Kuch Lage", filePath: "songs/music2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Kali Kali Zulfon Ke", filePath: "songs/music3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Udd Jaa Kaale Kaava", filePath: "songs/music4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Piya O Re Piya", filePath: "songs/music5.mp3", coverPath: "covers/cover5.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
  
      // Show the music.gif for the currently playing song and hide it for others
      const musicGifs = document.getElementsByClassName('musicGif');
      for (let i = 0; i < musicGifs.length; i++) {
        if (i === songIndex) {
          musicGifs[i].style.display = 'block';
        } else {
          musicGifs[i].style.display = 'none';
        }
      }
    });
  });

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})