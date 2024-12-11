// Game variables
let timeRemaining = 300;
let score = 0;
let hintCount = 0;
const maxHints = 4;
let correctSuspect = Math.floor(Math.random() * 8); // Randomly select a culprit
let currentClueIndex = 0;

// Backstory
const backstory = `
It’s 1968, a time of political unrest and social change. The Union Trust Bank, once a symbol of security and stability, has been shattered by a daring heist. The robbery took place on a quiet Sunday morning when the bank was closed to the public, but the security systems were still operational. The thieves bypassed the sophisticated vaults and made off with an astonishing $2 million in cash and valuables.

Eight suspects, all of whom were once part of the carefully orchestrated heist, are now under suspicion. Each one was involved in some way, whether as a mastermind, a planner, or a member of the execution team. However, one of them has betrayed the others—either by tipping off the police, taking a larger share of the loot, or leaving behind a trail of evidence that points directly to their involvement.

As the lead investigator, you are tasked with piecing together the clues. The evidence is scattered across the city—hidden in various safehouses, the suspects' apartments, and even inside the vault itself. It’s up to you to interrogate the suspects, analyze their alibis, and carefully sift through the conflicting stories. Each one has a motive, a secret, and a piece of the puzzle.

Time is running out, and with every passing minute, the mastermind could slip further into the shadows. Can you uncover who betrayed the team and recover the stolen fortune before they vanish forever?
`;
document.getElementById("story").textContent = backstory;

// Suspects and clues
const suspects = [
  {
    name: "Gabe 'Quick-Draw' Malone",
    backstory: `
      Gabe, a former street racer, became the go-to getaway driver for heists across the state. 
      Known for his cool demeanor and sharp instincts, Gabe's ability to vanish into thin air made him a legend.
      But rumors surfaced about his mounting debts to a shady bookie—debts that might push anyone to betray their crew.
    `,
    clues: [
      "A cigarette butt found near the loading dock smelled faintly of menthol.",
      "A tire tread was imprinted near the alley exit.",
      "The sound of screeching tires was reported by witnesses, but no vehicle was seen.",
      "A keychain with a charm from a Las Vegas racing event was found in the getaway car."
    ]
  },
  {
    name: "Deb 'Locks' O'Hara",
    backstory: `
      Deb is a seasoned safecracker with a knack for finding vulnerabilities in any security system. 
      A small-time thief turned expert, she built her reputation on precision and patience. 
      However, whispers about her secret meetings with a rival gang cast doubt on her loyalty.
    `,
    clues: [
      "A faint scent of lavender perfume lingered in the bank's main vault.",
      "A torn piece of fabric caught on the vault door matched no known uniforms.",
      "Lockpicking tools were found abandoned in an unexpected location.",
      "The security system was disabled, but no fingerprints were recovered from the control panel."
    ]
  },
  {
    name: "Josh 'Brains' Kaufman",
    backstory: `
      Josh, the mastermind behind the heist, had spent months meticulously planning every detail. 
      His obsession with control made him indispensable—but it also earned him enemies within the crew. 
      Recently, Josh's obsession with perfection turned into paranoia, causing rifts among the team.
    `,
    clues: [
      "An empty coffee cup with traces was left in the bank manager's office.",
      "Blueprints with cryptic notes were discovered in a trash bin far from the crime scene.",
      "A series of calls to an untraceable number were made from a burner phone.",
      "Handwriting on the stolen vault plan didn’t perfectly match Josh's usual script."
    ]
  },
  {
    name: "Krystal 'Red' Rivera",
    backstory: `
      Krystal, a con artist with a flair for the dramatic, handled disguises and misdirection during the heist. 
      Her charm was her weapon, and she had a knack for making people look the other way. 
      Yet, Krystal's growing frustration with her role in the crew—and her frequent disappearances—raised suspicions.
    `,
    clues: [
      "A theater ticket stub was found crumpled in the bank’s hallway.",
      "A crimson lipstick stain was found on an unmarked envelope left near the crime scene.",
      "A disguise kit with several missing items was recovered from a nearby dumpster.",
      "Witnesses reported seeing a woman in a red coat who vanished without a trace."
    ]
  },
  {
    name: "Q 'Muscles' Torino",
    backstory: `
      Q, the enforcer of the group, was responsible for keeping the guards and any resistance in check. 
      A former boxer with a notorious temper, Q's loyalty to the crew had never been questioned—until rumors of a personal vendetta against Josh surfaced.
    `,
    clues: [
      "A torn guard uniform was found in the staff locker room.",
      "A threatening note, written in shorthand, was discovered in the break room.",
      "Blood traces on a discarded handkerchief matched no injuries reported by the crew.",
      "A pair of leather gloves with scuffed knuckles was found near the guard post."
    ]
  },
  {
    name: "Chris 'The Inside Man' Banks",
    backstory: `
      Chris, a disgruntled bank employee, was the one who leaked critical details about the vault layout. 
      Though his insider knowledge was invaluable, Chris' erratic behavior in the days leading up to the heist made others wary of him.
    `,
    clues: [
      "A handwritten note with vague instructions was found in the bank’s restroom.",
      "The security footage showed a figure entering the vault area after hours, but the face was obscured.",
      "A duplicate vault key was found hidden in a drawer in the manager’s office.",
      "A bank-issued ID badge with the photo scratched off was discovered outside."
    ]
  },
  {
    name: "Jen 'The Planner' Sharp",
    backstory: `
      Jen, a brilliant tactician, orchestrated the crew's escape routes and contingency plans. 
      She was always three steps ahead—except when it came to dealing with pressure. 
      Lately, Jen's behavior had become erratic, sparking rumors of a secret agenda.
    `,
    clues: [
      "A pen with a leaking cartridge was left on the bank's surveillance desk.",
      "A hastily scribbled note about meeting times was discovered in the backseat of a taxi.",
      "A crumpled map with several alternative escape routes was found in a parking lot.",
      "The final escape route was altered at the last minute, causing confusion among the crew."
    ]
  },
  {
    name: "Abel 'The Decoy' West",
    backstory: `
      Abel was the distraction, creating chaos to draw attention away from the heist. 
      A former street performer, his flair for theatrics was unmatched. 
      But Abel's habit of improvising during critical moments left the crew on edge.
    `,
    clues: [
      "A discarded mask with a small tear was found near the back entrance.",
      "Stage makeup smudges were found on a door near the fire escape.",
      "A partially burned flyer for a local carnival was retrieved from a trash can.",
      "Witnesses reported seeing a man juggling outside the bank minutes before the heist."
    ]
  }
];

// Game elements
const suspectsList = document.getElementById("suspects-list");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const hintText = document.getElementById("hint-text");
const endScreen = document.getElementById("end-screen");
const endMessage = document.getElementById("end-message");
const mainMenu = document.getElementById("game-container");
const suspectsPage = document.getElementById("suspects-page");

// Create suspect cards
suspects.forEach((suspect, index) => {
  const suspectDiv = document.createElement("div");
  suspectDiv.classList.add("suspect");
  suspectDiv.innerHTML = `
    <h4>${suspect.name}</h4>
    <p>${suspect.backstory}</p>
    <button class="suspect-button" data-index="${index}">Accuse</button>
  `;
  suspectsList.appendChild(suspectDiv);
});

// Timer
const timer = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
  } else {
    clearInterval(timer);
    endGame(false);
  }
}, 1000);

// Buttons
document.getElementById("suspects-button").addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  suspectsPage.classList.remove("hidden");
});

document.getElementById("back-button").addEventListener("click", () => {
  suspectsPage.classList.add("hidden");
  mainMenu.classList.remove("hidden");
});

document.getElementById("hint-button").addEventListener("click", () => {
  if (hintCount < maxHints) {
    const hint = suspects[correctSuspect].clues[currentClueIndex];
    hintText.textContent = `Hint ${hintCount + 1}: ${hint}`;
    currentClueIndex = (currentClueIndex + 1) % suspects[correctSuspect].clues.length;
    hintCount++;
    score -= 5;
    scoreDisplay.textContent = score;
  } else {
    hintText.textContent = "No more hints available!";
  }
});

document.querySelectorAll(".suspect-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const suspectIndex = parseInt(event.target.dataset.index);
    if (suspectIndex === correctSuspect) {
      score += 15;
      endGame(true);
    } else {
      score -= 10;
      scoreDisplay.textContent = score;
      alert("Incorrect suspect! Try again.");
    }
  });
});

// End game function
function endGame(won) {
  clearInterval(timer);
  mainMenu.classList.add("hidden");
  suspectsPage.classList.add("hidden");
  endScreen.classList.remove("hidden");
  const suspect = suspects[correctSuspect];
  endMessage.innerHTML = won
    ? `Congratulations! The traitor was ${suspect.name}. Final Score: ${score}`
    : `Time's up! The traitor was ${suspect.name}. Final Score: ${score}`;
}
