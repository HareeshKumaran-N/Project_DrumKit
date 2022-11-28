//theme 1

const changeBackgroundImage = (bg_source) => {
  console.log(`url(${bg_source})`);
  // let x=`url(${bg_source})`;
  let bg_color = getComputedStyle(document.documentElement).getPropertyValue(
    "--background_low"
  );
  let container = document.getElementsByClassName("container")[0];

  container.style.background = `linear-gradient(300deg,${bg_color},${bg_color}),url(${bg_source})`;

  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
};

const bg_changer_btn = document.getElementById("chageBackground");
bg_changer_btn.addEventListener("click", () => {
  api_call();
});

async function api_call() {
  const url = "https://api.unsplash.com/photos/random?query=drum";

  const fetchResponse = await fetch(url, {
    headers: {
      Authorization: "Client-ID jtYgjWlOoon9fqHv12Y2PkOPHgmOK-Jf1uRlDFJnKR0",
    },
  });
  const parsedResponse = await fetchResponse.json();

  // console.log(  parsedResponse.urls.full);
  changeBackgroundImage(parsedResponse.urls.regular);
}

api_call();

let theme1_obj = {
  theme_1_bg: "rgb(0, 0, 0)",
  theme_1_text: "rgb(147, 102, 184)",
  theme_1_low: "rgba(153, 0, 255, 0.5)",
};

//theme 2

let theme2_obj = {
  theme_2_bg: "#c9c8c5",
  theme_2_text: "#080b0d",
  theme_2_low: "rgba(142, 142, 142, 0.747)",
};

let current_theme = 1;

let theme_changer_btn = document.getElementById("changeTheme");

let changeTheme = () => {
  let root = document.documentElement;

  if (current_theme === 1) {
    root.style.setProperty("--background", theme1_obj.theme_1_bg);
    root.style.setProperty("--text", theme1_obj.theme_1_text);
    root.style.setProperty("--background_low", theme1_obj.theme_1_low);
    // changeBackgroundImage();
    api_call();
  } else {
    root.style.setProperty("--background", theme2_obj.theme_2_bg);
    root.style.setProperty("--text", theme2_obj.theme_2_text);
    root.style.setProperty("--background_low", theme2_obj.theme_2_low);
    // changeBackgroundImage();
    api_call();
  }
};

theme_changer_btn.addEventListener("click", (e) => {
  if (current_theme === 1) {
    current_theme = 2;
    changeTheme();
  } else {
    current_theme = 1;
    changeTheme();
  }
});

let drums = document.querySelectorAll(".beat");
let audioVolume = 0.6;

let isAutoMusicOn = false;
let auto_music_id;
const start_auto_music = () => {
  const arr = ["w", "a", "s", "d", "j", "k", "l"];

  auto_music_id = setInterval(() => {
    const randomKey = arr[Math.floor(Math.random() * arr.length)];
    makeSound(randomKey);
    animate(randomKey);
  }, 300);
};

let auto_music_button = document.getElementById("autoPlay");
auto_music_button.addEventListener("click", () => {
  if (isAutoMusicOn) {
    clearInterval(auto_music_id);
    isAutoMusicOn = false;
    auto_music_button.innerText = "start Music";
    auto_music_button.classList.remove("pressed_btn");
  } else {
    start_auto_music();
    isAutoMusicOn = true;
    auto_music_button.innerText = "Stop Music";
    auto_music_button.classList.add("pressed_btn");
  }
});

const animate = (key) => {
  console.log(key);
  const currentKey = document.querySelector(`.${key}`);

  currentKey.classList.add("pressed");

  setTimeout(() => {
    currentKey.classList.remove("pressed");
  }, 250);

  document
    .getElementsByClassName("container")[0]
    .classList.add("animate__shakeY");

  setTimeout(() => {
    document
      .getElementsByClassName("container")[0]
      .classList.remove("animate__shakeY");
  }, 350);
};

const playMusic = (path) => {
  audio = new Audio(path);
  audio.volume = audioVolume;
  audio.play();
};

const makeSound = (key) => {
  switch (key) {
    case "w":
      playMusic("Sounds/sounds_sound-1.mp3");
      break;

    case "a":
      playMusic("Sounds/sounds_sound-2.mp3");
      break;

    case "s":
      playMusic("Sounds/sounds_sound-3.mp3");
      break;

    case "d":
      playMusic("Sounds/sounds_sound-4.mp3");
      break;

    case "j":
      playMusic("Sounds/sounds_sound-5.mp3");
      break;

    case "k":
      playMusic("Sounds/sounds_sound-6.mp3");
      break;

    case "l":
      playMusic("Sounds/sounds_sound-7.mp3");
      break;

    default:
      console.log("Wrong button");
  }
};

const handleDrumClick = (event) => {
  var keyPressed = event.target.innerHTML;
  //    console.log(keyPressed);
  animate(keyPressed);
  makeSound(keyPressed);
};

for (let i = 0; i < drums.length; i++) {
  drums[i].addEventListener("click", handleDrumClick);
}

const slider = document.getElementById("volume_slider");
slider.oninput = (event) => {
  audioVolume = event.target.value / 100;
};

document.addEventListener("keypress", (event) => {
  console.log("@hk", event.key);

  makeSound(event.key);

  animate(event.key);
});
