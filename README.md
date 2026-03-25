# README & Pitch

## App-Idee

Eine Notizen-App mit integriertem Auto-Lock. Inhalte werden automatisch gesperrt, wenn das Gerät nicht aktiv genutzt wird oder die App in den Hintergrund wechselt.

## Zielgruppe

Personen, die schnell Notizen erstellen möchten und gleichzeitig Wert auf Datenschutz legen, z. B. Studierende oder Berufstätige.

## Hauptfunktionen

- Notizen erstellen, bearbeiten und löschen
- Automatischer Lock bei Inaktivität oder App-Wechsel
- PIN-basierter Zugriffsschutz
- Übersicht aller Notizen

## One-Pager

Hier den One-Pager verlinken (z. B. PDF oder Dokument)

## Tech-Stack

- React Native (Expo)
- TypeScript
- React Navigation (Stack)
- AsyncStorage (Notizen)
- SecureStore (PIN)
- expo-crypto (Hashing)

---

# Ordnerstruktur

/assets
images/

/components
AppHeader.tsx
NoteListItem.tsx
NoteForm.tsx
PrimaryButton.tsx

/app
SetupScreen.tsx
LoginScreen.tsx
NotesOverviewScreen.tsx
CreateNoteScreen.tsx
EditNoteScreen.tsx
index.tsx

/context
NotesContext.tsx
AuthContext.tsx

/services
storage.ts
security.ts

## Starten der App

```bash
npm install
npx expo start
```

oder

(Benötigt die Android SDK und Java)

```bash
npm install
npx expo run:android
```
