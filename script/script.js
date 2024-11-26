const fighters = [
    {
        name: 'Freezer',
        power: 8000
    },
    {
        name: 'Vegeta',
        power: 8500
    },
    {
        name: 'Crilin',
        power: 500
    },
    {
        name: 'Mr Satan',
        power: 50
    },
    {
        name: 'Junior',
        power: 6000
    },
    {
        name: 'Goku',
        power: 9001
    },
    {
        name: 'Tensing',
        power: 450
    },
    {
        name: 'Videl',
        power: 300
    },
    {
        name: 'Bulma',
        power: 20
    },
    {
        name: 'C-18',
        power: 7800
    },
    {
        name: 'Gohan',
        power: 8900
    },
    {
        name: 'Trunks',
        power: 1250
    }
];
  
const weapons = [
    { 
        name: "Ventaglio della Musa", 
        power: 15 
    },
    { 
        name: "Scouter", 
        power: 30 
    },
    { 
        name: "Bastone Roshi", 
        power: 60 
    },
    { 
        name: "Fagioli Magici", 
        power: 70 
    },
    { 
        name: "Katana di Yajirobei", 
        power: 85 
    },
    { 
        name: "Spada del Dragone Azzurro", 
        power: 115 
    },
    { 
        name: "Armatura Saiyan", 
        power: 145 
    },
    { 
        name: "Cannone da braccio", 
        power: 170 
    },
    { 
        name: "Nuvola d'oro", 
        power: 200 
    },
    { 
        name: "Bastone Nyoi", 
        power: 220
    },
    { 
        name: "Spada Z", 
        power: 235 
    },
    { 
        name: "Orecchini Potara", 
        power: 250 
    }
];

// **Milestone 1 - Scelta dell’arma:**
// ogni combattente sceglierà casualmente un'arma dalla relativa lista. Una volta scelta, un'arma non sarà più disponibile per i successivi combattenti.

// Funzione per ottenere un numero casuale nell'intervallo specificato
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Assegniamo un'arma a ogni combattente
fighters.forEach(fighter => {
    if (weapons.length > 0) {
        // Ottieni un indice casuale dalla lista di armi disponibili
        const randomIndex = getRandomInt(weapons.length);
        // Assegna l'arma al combattente
        const selectedWeapon = weapons[randomIndex];
        fighter.weapon = selectedWeapon;
        // Rimuovi l'arma dalla lista
        weapons.splice(randomIndex, 1);
    } else {
        // Se non ci sono più armi disponibili, segnala che il combattente è senza arma
        fighter.weapon = { name: "Nessuna arma", power: 0 };
    }
});

// Mostra i combattenti con le armi assegnate
console.log(fighters);


// **Milestone 2 - Allenamento:**
// ogni combattente si sottoporrà ad un allenamento che incrementerà (o forse no) la sua potenza, moltiplicandola per un numero casuale tra 1 e 100.

// Funzione per ottenere un numero casuale tra 0 e 100
function getRandomMultiplier() {
    return Math.random() < 0.2 ? 1 : Math.floor(Math.random() * 100) + 1; 
    // 20% di probabilità che sia 1, altrimenti tra 1 e 100
}

// Itera sui combattenti per applicare l'allenamento
fighters.forEach(fighter => {
    // Genera un moltiplicatore casuale
    const multiplier = getRandomMultiplier();
    // Aggiorna la potenza del combattente
    fighter.power *= multiplier;
    // Arrotonda la potenza a un numero intero
    fighter.power = Math.round(fighter.power);
});

// Mostra i combattenti dopo l'allenamento
console.log(fighters);


// **Milestone 3 - Qualificazione:**
// escludiamo dal torneo chi, dopo l'allenamento non è riuscito a raggiungere una potenza di almeno 2000.

// Filtra i combattenti che hanno una potenza di almeno 2000
const qualifiedFighters = fighters.filter(fighter => fighter.power >= 2000);

// Mostra i combattenti qualificati per il torneo
console.log("Combattenti qualificati:", qualifiedFighters);

// Mostra i combattenti eliminati
const eliminatedFighters = fighters.filter(fighter => fighter.power < 2000);
console.log("Combattenti eliminati:", eliminatedFighters);


// **Milestone 4 - Combattimento:**
// i combattimenti si svolgeranno tra un partecipante e il successivo dell'elenco, assicurandosi che ognuno combatta una sola volta. 
// In ogni scontro vincerà il combattente con la potenza più alta. In caso di parità vincerà chi "gioca in casa", ossia chi viene prima nell'elenco.
// **NB:** bisogna assicurarsi che l'elenco contenga un numero pari di combattenti, altrimenti l'ultimo non avrebbe un avversario. Potrebbe essere necessario aggiungere un combattente "Robot" con potenza "4000" all'ultimo minuto.

// Controlla se il numero di combattenti è pari, altrimenti aggiungi "Robot"
if (qualifiedFighters.length % 2 !== 0) {
    qualifiedFighters.push({ name: 'Robot', power: 4000 });
    console.log("Aggiunto Robot per completare i partecipanti.");
}

// Array per i vincitori
const winners = [];

// Combattimenti tra i partecipanti
for (let i = 0; i < qualifiedFighters.length; i += 2) {
    const fighter1 = qualifiedFighters[i];
    const fighter2 = qualifiedFighters[i + 1];

    // Assicurati che il secondo combattente esista
    if (!fighter2) {
        console.error(`Errore: Nessun avversario trovato per ${fighter1.name}`);
        break;
    }

    // Determina il vincitore
    if (fighter1.power > fighter2.power) {
        winners.push(fighter1);
        console.log(`${fighter1.name} vince contro ${fighter2.name}`);
    } else if (fighter1.power < fighter2.power) {
        winners.push(fighter2);
        console.log(`${fighter2.name} vince contro ${fighter1.name}`);
    } else {
        // In caso di parità, vince chi è "in casa" (il primo nell'elenco)
        winners.push(fighter1);
        console.log(`${fighter1.name} vince contro ${fighter2.name} per parità di potenza`);
    }
}

// Mostra i vincitori
console.log("Vincitori della prima fase di combattimenti:", winners);


// **Milestone 5 - Premiazione:**
// tra tutti i vincitori degli scontri, saliranno sul podio i 3 combattenti con la potenza più alta, in ordine decrescente.

// Ordinare i vincitori per potenza in ordine decrescente
// const podium = winners.sort((a, b) => b.power - a.power).slice(0, 3);

// Stampa i vincitori del podio
// console.log("Podio della competizione:");

// podium.forEach((fighter, index) => {
//     let position;
//     switch (index) {
//         case 0:
//             position = "1° posto";
//             break;
//         case 1:
//             position = "2° posto";
//             break;
//         case 2:
//             position = "3° posto";
//             break;
//     }
//     console.log(`${position}: ${fighter.name} con potenza ${fighter.power}`);
// });


// **Bonus:**
// Il torneo non finisce qui! Dopo il primo girone di scontri, non passiamo subito alla premiazione, ma facciamo in modo che i vincitori si scontrino ancora e ancora, finchè non ne resterà solo uno!

// Funzione per i combattimenti
function battle(fighter1, fighter2) {
    if (fighter1.power > fighter2.power) {
        return fighter1;
    } else if (fighter1.power < fighter2.power) {
        return fighter2;
    } else {
        // In caso di parità, vince chi viene prima
        return fighter1;
    }
}

// Funzione per il torneo fino al vincitore finale
function tournament(fighters) {
    while (fighters.length > 1) {
        // Se il numero di combattenti è dispari, aggiungi "Robot"
        if (fighters.length % 2 !== 0) {
            fighters.push({ name: 'Robot', power: 4000 });
            console.log("Aggiunto Robot per completare i combattenti.");
        }

        const nextRoundFighters = [];
        
        // Scontri tra combattenti
        for (let i = 0; i < fighters.length; i += 2) {
            const fighter1 = fighters[i];
            const fighter2 = fighters[i + 1];
            const winner = battle(fighter1, fighter2);
            nextRoundFighters.push(winner);
            console.log(`${winner.name} vince contro ${fighter1.name === winner.name ? fighter2.name : fighter1.name}`);
        }

        // Aggiorna l'elenco dei combattenti con i vincitori del round
        fighters = nextRoundFighters;
        console.log("Prossimo round di combattimenti:");
    }

    // Ritorna il vincitore finale
    return fighters[0];
}

// Esegui il torneo
const finalWinner = tournament(winners);

console.log("Il vincitore finale è:", finalWinner.name, "con potenza", finalWinner.power);