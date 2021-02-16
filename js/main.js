//Init SpeechSynth API
const synth = window.speechSynthesis;

//Dom Elements

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const VoiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

//init voices array
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  //loop through voices and crete an option for each one
  voices.forEach((voice) => {
    const option = document.createElement("option");
    //fill options  with voices
    option.textContent = voice.name + (voice.lang);
    //set needed option attribuute
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    VoiceSelect.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {
  //check if speaking
  if (synth.speaking) {
    console.error("Already speaking ...");
    return;
  }
  if (textInput.value !== "") {
    //get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //speak end
    speakText.onend = (e) => {
      console.log("Done Speaking...");
    };
    //speak err
    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };
    //selected voice
    const selectedVoice = VoiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    //loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //set rate and pitch
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //speak
    synth.speak(speakText);
  }
};

//event listeners

//text form submit

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//rate and pitch value change

rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

//voice select change
VoiceSelect.addEventListener("change", (e) => speak());
