document.addEventListener("DOMContentLoaded", function () {
  const addNoteForm = document.getElementById("addNoteForm");
  const notesContainer = document.getElementById("notesContainer");

  addNoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const noteTitle = addNoteForm.querySelector(".noteTitle").value;
    const noteContent = addNoteForm.querySelector(".noteContent").value;
    const noteColor = addNoteForm.querySelector(".noteColor").value;
    const noteTags = addNoteForm.querySelector(".noteTags").value.split(",");

    const note = {
      title: noteTitle,
      content: noteContent,
      color: noteColor,
      tags: noteTags,
    };

    saveNoteToLocalStorage(note);
    displayNotes();
    addNoteForm.reset();
  });

  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function createNoteElement(note, index) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.style.backgroundColor = note.color;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("note-title");
    titleElement.textContent = note.title;

    const contentElement = document.createElement("div");
    contentElement.classList.add("note-content");
    contentElement.textContent = note.content;

    const tagsElement = document.createElement("div");
    tagsElement.textContent = "Tagi: " + (note.tags || []).join(", ");

    noteElement.appendChild(titleElement);
    noteElement.appendChild(contentElement);
    noteElement.appendChild(tagsElement);

    return noteElement;
  }

  function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesContainer.innerHTML = "";

    notes.forEach(function (note, index) {
      const noteElement = createNoteElement(note, index);
      notesContainer.appendChild(noteElement);
    });
  }

  displayNotes();

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", searchNotes);

  function searchNotes() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = notes.filter((note) => {
      const noteValues = {
        title: note.title.toLowerCase(),
        content: note.content.toLowerCase(),
        tags: (note.tags || []).join(" ").toLowerCase(),
      };

      return Object.values(noteValues).some((value) =>
        value.includes(searchTerm)
      );
    });

    notesContainer.innerHTML = "";
    filteredNotes.forEach(function (note, index) {
      const noteElement = createNoteElement(note, index);
      notesContainer.appendChild(noteElement);
    });
  }
});
