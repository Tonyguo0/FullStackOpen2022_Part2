import Note from "./components/Note";
import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [notestoshow, setNotesToShow] = useState([]);

  const hooks = () => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  };
  useEffect(hooks, []);
  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
      console.log(response);
    });
    // setNotes(notes.concat(noteObject));
    // setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  // ternary operator at render to make note into whatever based on showAll state is true or false by clicking on show important button
  useEffect(() => {
    setNotesToShow(
      showAll ? notes : notes.filter((note) => note.important === true)
    );
  }, [showAll, notes]);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    console.log(note);
    const changedNote = { ...note, important: !note.important };
    console.log(changedNote);
    // when we use put, it already sets the note into the notes url, so when we set the state of notes
    // if it equals to id then it should be the response date else set it to what was in notes before
    axios.put(url, changedNote).then((response) => {
      setNotes(
        notes.map((notee) => {
          console.log(`notee is: `, notee, `response data is: `, response.data);
          return notee.id === id ? response.data : notee;
        })
      );
    });
    console.log(`Importance of ${id} needs to be toggled`);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notestoshow.map((note) => (
          // Note is in component folder
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit"> save</button>
      </form>
    </div>
  );
};

export default App;
