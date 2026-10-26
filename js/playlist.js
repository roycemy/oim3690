const songs = [
  "Blinding Lights",
  "Levitating",
  "Good 4 U",
  "Heat Waves",
  "As It Was"
];

const playlist = document.querySelector("#playlist");
const songInput = document.querySelector("#song");

function addToPage(song) {
  const item = document.createElement("li");
  item.textContent = song;
  playlist.appendChild(item);
}

for (const song of songs) {
  addToPage(song);
}

function addSong() {
  const title = songInput.value.trim();
  if (title === "") {
    return;
  }
  songs.push(title);
  addToPage(title);
  songInput.value = "";
  songInput.focus();
}

document.querySelector("#add").addEventListener("click", addSong);
songInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addSong();
  }
});
