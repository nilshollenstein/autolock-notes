import * as Crypto from "expo-crypto";
import { createContext, ReactNode, useContext } from "react";
import Note from "../models/note";

interface NoteContextType {
  noteList: Note[];
}

const VociContext = createContext<NoteContextType | undefined>(undefined);

export function NoteProvider({ children }: { children: ReactNode }) {
  let noteList = [
    {
      id: Crypto.randomUUID(),
      title: "TestNote",
      text: "TestNotitz für den Start der App",
    },
  ];

  return (
    <VociContext.Provider value={{ noteList }}>{children}</VociContext.Provider>
  );
}

export function useNote() {
  const context = useContext(VociContext);
  if (!context) {
    throw new Error("useNote muss innerhalb von VociProvider verwendet werden");
  }
  return context;
}
