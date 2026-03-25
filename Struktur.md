# Komponenten

## Wiederverwendbare UI-Bausteine

- `AppHeader` → Titel + optional Back-Button
- `PinInput` → PIN Eingabe (Setup + Login)
- `PrimaryButton` → Save, Login
- `SecondaryButton` → Delete, Cancel
- `NoteListItem` → einzelne Notiz (Titel + Preview)
- `NoteForm` → Titel + Inhalt (Create + Edit)
- `FloatingActionButton` → neue Notiz
- `ErrorMessage` → Fehlermeldungen
- `ScreenContainer` → Layout + Padding

---

# Navigation

## Schema

**Stack Navigation**

## Hierarchie

```
RootStack
├─ SetupScreen
├─ LoginScreen
├─ NotesOverviewScreen
├─ CreateNoteScreen
└─ EditNoteScreen
```

## Flow

```
First Start:
Setup → Login → Overview

Normal:
Login → Overview

Overview:
→ Create
→ Edit

Create/Edit:
→ Save/Delete → Overview

Auto-Lock:
→ Login
```

## Verhalten

- `push` → Overview → Create/Edit
- `replace/reset` → Setup/Login/Auto-Lock
- `back` → zurück zur Übersicht

---

# Datenmodell

## Note

```ts
type Note = {
  id: string;
  title: string;
  content: string;
};
```

## Security

```ts
type SecuritySettings = {
  pinHash: string | null;
  failedLoginAttempts: number;
  isBlockedUntil?: string | null;
};
```

## Session

```ts
type SessionState = {
  isUnlocked: boolean;
  lastInteractionAt: string | null;
};
```

---

# Zustand & Side-Effekte

## Lokal (pro Screen)

- Setup: `pin`, `confirmPin`, `error`
- Login: `enteredPin`, `attempts`, `error`
- Create/Edit: `title`, `content`, `validation`
- Overview: optional `search`, `refresh`

---

## Global (Context)

### NotesContext

- `notes`
- `addNote()`
- `updateNote()`
- `deleteNote()`
- `loadNotes()`

### AuthContext

- `isUnlocked`
- `setupPin()`
- `unlock()`
- `lock()`
- `failedAttempts`

---

## Persistenz

- Notizen → `AsyncStorage`
- PIN → `SecureStore` (hashed)

---

## Side-Effekte

- **Setup**
  - PIN hashen + speichern

- **Login**
  - Hash vergleichen
  - Fehlversuche zählen

- **Notes**
  - Laden beim Start
  - Auto-Save bei Änderung

- **Auto-Lock**
  - Inaktivität (Timer)
  - AppState (Background)
  - optional Sensor

---

# Struktur

```
/app
  SetupScreen
  LoginScreen
  Index
  EditNoteScreen

/components
  NoteForm
  NoteListItem
  PinInput
  Buttons

/context
  NotesContext
  AuthContext

/services
  storage
  security
```
