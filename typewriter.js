// typewriter.js

document.addEventListener("DOMContentLoaded", () => {
    const phrases = [
        "Wintec IT Student",
        "Web Developer",
        "IT Support Technician"
    ];

    const typingElement = document.querySelector(".typing");
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenPhrases = 2000;
    let phraseIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < phrases[phraseIndex].length) {
            typingElement.textContent += phrases[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenPhrases);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, typingSpeed);
        }
    }

    if (typingElement) {
        type(); // start typing
    }
});
