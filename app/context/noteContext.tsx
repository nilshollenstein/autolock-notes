import * as Crypto from "expo-crypto";
import { createContext, ReactNode, useContext, useState } from "react";
import Note from "../models/note";

interface NoteContextType {
  noteList: Note[];
  saveNote: (note: Note) => void;
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

  return (
    <VociContext.Provider value={{ noteList, saveNote }}>
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
