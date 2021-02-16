// window.SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition = new SpeechRecognition(); //build in fun => window

// let words = document.querySelector("#mic"); //con html element
// let p = document.createElement("p"); //create html element by using dom
// words.appendChild(p);
// //words.append(p);
// //p.textContent = "hello";

// recognition.addEventListener("result", (e) => {
//     // console.log(e.results);
//     // const transcript = e.results[0][0].transcript;

//   console.log(e.results);
//   let transcript = [...e.results]
//     .map((result) => result[0])
//     .map((result) => transcript)
//     .join(" ");
//   p.textContent = transcript;

// });
// recognition.addEventListener("end", recognition.start);
// recognition.start();

////Init window.SpeechRecognition API
window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

let recognition = new window.SpeechRecognition();
let finalTranscript = "";
//recognition.maxAlternatives = 10;
recognition.continuous = true;

recognition.onresult = (event) => {
  for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript = finalTranscript + transcript;
    }
  }

  document.querySelector("#text-input").innerHTML = finalTranscript;
};
recognition.addEventListener("end", recognition.start);
recognition.start();
