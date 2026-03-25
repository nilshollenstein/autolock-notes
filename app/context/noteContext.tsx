import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Note from "../models/note";

const noteStorage = useAsyncStorage("notes");

interface NoteContextType {
  noteList: Note[];
  saveNote: (note: Note) => void;
  removeNote: (id: string) => void;
}

const VociContext = createContext<NoteContextType | undefined>(undefined);

export function NoteProvider({ children }: { children: ReactNode }) {
  let [noteList, setNoteList] = useState<Note[]>([
    {
      id: Crypto.randomUUID(),
      title: "TestNote",
    },
  ]);

  function saveNote(note: Note) {
    setNoteList((prev) => {
      const existingNote = prev.find((n) => n.id === note.id);

      if (existingNote) {
        return prev.map((n) => (n.id === note.id ? note : n));
      }

      return [...prev, note];
    });
  }

  function removeNote(id: string) {
    setNoteList((prev) => prev.filter((prevNote) => prevNote.id !== id));
  }

  async function loadNotesFromStorage() {
    let jsonFromStorage = await noteStorage.getItem();
    if (jsonFromStorage == null) {
      return;
    }
    try {
      var list: Note[] = JSON.parse(jsonFromStorage);
      if (list) setNoteList(list);
      return;
    } catch {
      console.log("Error beim laden der Daten");
      return;
    }
  }

  async function saveNotesInStorage() {
    if (!noteList || noteList.length === 0) return;
    let jsonList = JSON.stringify(noteList);
    try {
      await noteStorage.setItem(jsonList);
      console.log("Vocis gespeichert");
    } catch (err) {
      console.log("Fehler beim Speichern der Liste", err);
    }
  }

  useEffect(() => {
    loadNotesFromStorage();
  }, []);

  useEffect(() => {
    saveNotesInStorage();
  }, [noteList]);

  return (
    <VociContext.Provider value={{ noteList, saveNote, removeNote }}>
      {children}
    </VociContext.Provider>
  );
}

export function useNote() {
  const context = useContext(VociContext);
  if (!context) {
    throw new Error("useNote muss innerhalb von VociProvider verwendet werden");
  }
  return context;
}
