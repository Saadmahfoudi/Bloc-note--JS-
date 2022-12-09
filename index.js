"strict-mode"

const addBtn = document.querySelector("#addBtn");
const text = document.querySelector("#text");
const title = document.querySelector("#title");
const notesContainer = document.querySelector("#notes");

if (localStorage.notes == null) localStorage.notes = "[]";

document.onload = showNotes();

addBtn.onclick = () => {
    if (text.value === "") {
        alert("Text empty");
    } else {
        const notes = JSON.parse(localStorage.notes);
        notes.push({ text: text.value, title: title.value == "" ? "No title" : title.value });
        localStorage.notes = JSON.stringify(notes);
        console.log(notes);
    }
    showNotes();
}
if (notesContainer.innerHTML === "No notes yet") {
    notesContainer.style.justifyContent = "center";
} else {
    notesContainer.style.justifyContent = "flex-start";
}
function showNotes() {
    const receivedNotes = JSON.parse(localStorage.notes);
    receivedNotes.forEach((note, index) => {
        const newNoteTemplate = `<div class="note-item">
            <strong>${note.title}</strong>
            <p>${note.text}</p>
            <button onclick="deleteNote(${index})" class="material-icons delete-btn">delete</button>
        </div>`;
        if (index == 0) {
            notesContainer.innerHTML = newNoteTemplate;
        } else {
            notesContainer.innerHTML += newNoteTemplate;
        }
    });
}

function deleteNote(index) {
    const receivedNotes = JSON.parse(localStorage.notes);
    const notesOptimised = [];
    for (let i = 0; i<receivedNotes.length; i++) {
        if (i == index) {
            continue;
        }
        notesOptimised.push(receivedNotes[i]);
    }
    localStorage.notes = JSON.stringify(notesOptimised);
    showNotes();
}


