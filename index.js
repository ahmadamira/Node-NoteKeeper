const apiUrl = "http://127.0.0.1:3000/notes";

async function fetchNotes() {
  const response = await fetch(apiUrl);
  const notes = await response.json();

  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${note._id}, Title: ${note.title}, Content: ${note.content}`;
    notesList.appendChild(li);
  });
}

async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (response.status === 201) {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    alert("Note added successfully!");

    fetchNotes();
  }
}

async function updateNote() {
  const id = document.getElementById("updateId").value;
  const title = document.getElementById("updateTitle").value;
  const content = document.getElementById("updateContent").value;
  const response = await fetch(`${apiUrl}/${id}`.replace(/\s/g, ""), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (response.status === 200) {
    document.getElementById("updateId").value = "";
    document.getElementById("updateTitle").value = "";
    document.getElementById("updateContent").value = "";

    alert("Note updated successfully!");

    fetchNotes();
  }
}

async function deleteNote() {
  const id = document.getElementById("deleteId").value;

  const response = await fetch(`${apiUrl}/${id}`.replace(/\s/g, ""), {
    method: "DELETE",
  });

  if (response.status === 204) {
    document.getElementById("deleteId").value = "";

    alert("Note deleted successfully!");

    fetchNotes();
  }
}

document.getElementById("addNoteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  addNote();
});

document
  .getElementById("updateNoteForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    updateNote();
  });

document
  .getElementById("deleteNoteForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    deleteNote();
  });

fetchNotes();
