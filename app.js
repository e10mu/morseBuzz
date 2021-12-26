// e10mu 20211226

let woord = 'esther';

woord = ' ' + woord.toUpperCase(); // for use as consts
let woordInMorse = '';
g.clear(); // clear screen
g.setFont('6x8', 3); 
Bangle.setLCDPower(1); // turn on backlight

const bron = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:?-/()!';
const morse = ['.-', '-...', '-.-.', '-..', '.', '..-.', '.--', '....', '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-', '-.--', '--..', '-----', '.----', '..---', '...--', '....-', '.....', '-....', '--...', '---..', '----.', '.-.-.-', '--..--', '---...', '..--..', '-....-', '-..-.', '-.--.-', '-.--.-', '..--.'];

// convert word into morse code
function maakMorse(woord) {
  for (let t=0; t<woord.length; t++) {
    if (woord[t] === ' ') {
      woordInMorse += '   '; //create 3x pauze between words
    } else {
      woordInMorse += morse[bron.indexOf(woord[t])] + ' ';
      g.drawString(morse[bron.indexOf(woord[t])] + '\n',0,(t-1)*20);
      console.log(morse[bron.indexOf(woord[t])]);
    }
  }
  console.log(woordInMorse);
}

// construct duration of buzzes and pauzes
function task(i, woordInMorse) {
  let j = i;
  let bzz = true;
  setTimeout(function() {
    let buzzFactor = 1;
    switch (woordInMorse[i]) {
      case '.': buzzFactor = 1; break; // for dot
      case '-': buzzFactor = 3; break; // for dash
      case ' ': j = j + 3; bzz = false; // don't buzz for a space
    }
    console.log(woordInMorse[i]);
    // g.drawString(woordInMorse[i],30*i,0);
    if (bzz) {Bangle.buzz(buzzFactor*130);}
  }, 500*j);
}

// start
maakMorse(woord);

for (let i=0; i<woordInMorse.length; i++) {
  task(i, woordInMorse);
}
