// Your exact timetable
const timetable = {
    "Monday": {
        "Foundation English-III": 1,
        "Statistical Methods": 1,
        "Java Programming": 1,
        "Web Technology": 1,
        "Tamil": 1
    },
    "Tuesday": {
        "Statistical Methods": 1,
        "Foundation English-III": 1,
        "Web Technology": 1,
        "Tamil": 1,
        "Java Programming": 1
    },
    "Wednesday": {
        "JAVA and Web Technology Lab": 2,
        "Essentials of Communication Skills": 1,
        "Java Programming": 2,
        "Tamil": 1
    },
    "Thursday": {
        "Tamil": 1,
        "Statistical Methods": 2,
        "Web Technology": 1,
        "Foundation English-III": 1
    },
    "Friday": {
        "JAVA and Web Technology Lab": 2,
        "Foundation English-III": 1,
        "Web Technology": 1,
        "Tamil": 1
    },
    "Saturday": {
        "Essentials of Communication Skills": 1,
        "Statistical Methods": 2,
        "Tamil": 1,
        "Java Programming": 1
    }
};

// Calculate total classes per subject
const subjectTotals = {};
Object.values(timetable).forEach(day => {
    for (const [subject, periods] of Object.entries(day)) {
        subjectTotals[subject] = (subjectTotals[subject] || 0) + periods;
    }
});

// Initialize inputs
function initInputs() {
    const container = document.getElementById('subjectInputs');

    for (const subject in subjectTotals) {
        const div = document.createElement('div');
        div.className = 'subject-row';
        div.innerHTML = `
            <span>${subject} (${subjectTotals[subject]} total classes):</span>
            <input type="number" id="${subject}" placeholder="Attended" min="0" max="${subjectTotals[subject]}">
        `;
        container.appendChild(div);
    }
}

// Main calculation
function calculate() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Results</h2>';

    let allSafe = true;

    for (const subject in subjectTotals) {
        const attended = parseInt(document.getElementById(subject).value) || 0;
        const total = subjectTotals[subject];
        const percentage = (attended / total) * 100;
        const goal = 75; // Default goal percentage
        const needed = Math.max(0, Math.ceil((goal / 100 * total) - attended));

        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <h3>${subject}</h3>
            <p>Attended: ${attended}/${total} (${percentage.toFixed(1)}%)</p>
            ${percentage < goal ?
                `<p class="critical">⚠️ Attend ${needed} more classes to reach 75%</p>` :
                `<p>✅ Safe (above 75%)</p>`
            }
        `;

        if (percentage < goal) allSafe = false;
        resultsDiv.appendChild(card);
    }

    if (allSafe) {
        resultsDiv.innerHTML += `<p class="success">🎉 All subjects meet 75% attendance!</p>`;
    }
}

// Initialize on load
window.onload = initInputs;