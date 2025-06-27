# 🔗 Linkboard - Link Dashboard

Ein modernes, benutzerfreundliches Dashboard zum Verwalten von Links mit verbesserter Bedienbarkeit und robuster Funktionalität.

## ✨ Neue Features & Verbesserungen

[[preview1.png]]

### 🎯 **Drastisch verbesserte Bedienbarkeit**
- **Vereinfachte Benutzeroberfläche**: Nur noch 3 statt 4+ Buttons pro Kachel
- **Intelligente Formular-Steuerung**: Schließt automatisch mit Escape oder Klick außerhalb
- **Sofortiges Feedback**: Success/Error-Benachrichtigungen mit Animationen
- **Bestätigungsdialoge**: Sicherheitsabfrage vor dem Löschen
- **Loading-States**: Visuelles Feedback bei API-Operationen

### 🏷️ **Repariertes Tag-System**
- **Robuste Tag-Verarbeitung**: Keine Crashes mehr bei leeren/undefined Tags
- **Verbesserte Tag-Filter**: Funktioniert jetzt zuverlässig
- **Schöne Tag-Darstellung**: Farbverläufe und bessere Typografie
- **Tag-Suggestions**: Autocomplete funktioniert einwandfrei

### 🎨 **Modernes Design**
- **Neue Kachel-Optik**: Hover-Effekte, Schatten, bessere Hierarchie
- **Responsive Layout**: Optimiert für alle Bildschirmgrößen
- **Verbesserte Typografie**: Moderne Schriftarten und bessere Lesbarkeit
- **Konsistente Farbgebung**: Harmonische Farben in Dark/Light Mode

### 🔧 **Technische Verbesserungen**
- **Robuste Fehlerbehandlung**: Keine unbehandelten Exceptions mehr
- **Input-Validierung**: Server-seitige Validierung für Datenintegrität
- **Relative URLs**: Funktioniert jetzt auch ohne localhost
- **Bessere Performance**: Optimierte API-Calls und Rendering

## 🚀 Installation & Start

### Voraussetzungen
- Node.js (Version 14 oder höher)
- npm

### Schnellstart
```bash
# Repository klonen oder herunterladen
cd linkboard

# Abhängigkeiten installieren
npm install

# Server starten
npm start
```

Die Anwendung ist dann unter **http://localhost:3000** verfügbar.

## 📋 Funktionen

### Grundfunktionen
- ✅ Links hinzufügen, bearbeiten und löschen
- ✅ Tags für Kategorisierung
- ✅ Volltext-Suche (Titel, URL, Beschreibung, Tags)
- ✅ Tag-Filter
- ✅ Zwei Ansichten: Kachel- und Listen-Ansicht
- ✅ Dark/Light Mode mit Speicherung der Präferenz
- ✅ Notizen zu Links
- ✅ Favicon-Anzeige
- ✅ Detailansicht mit Modal

### Neue Verbesserungen
- 🆕 **Intelligente Benutzerführung**: Formulare schließen automatisch
- 🆕 **Sofort-Feedback**: Success/Error-Benachrichtigungen
- 🆕 **Bestätigungsdialoge**: Schutz vor versehentlichem Löschen
- 🆕 **Keyboard-Navigation**: Escape zum Schließen, Enter zum Bestätigen
- 🆕 **Loading-Indikatoren**: Visuelles Feedback bei Operationen
- 🆕 **Robuste Tag-Behandlung**: Keine Crashes mehr
- 🆕 **Responsive Design**: Optimiert für Mobile und Desktop

## 🎯 Bedienung

### Links verwalten
1. **Hinzufügen**: Plus-Button → Formular ausfüllen → Speichern
2. **Bearbeiten**: Edit-Button auf Kachel → Daten ändern → Aktualisieren
3. **Löschen**: Trash-Button → Bestätigen
4. **Details**: Info-Button für Detailansicht

### Tags verwenden
- **Hinzufügen**: Im Formular Tags eingeben (Enter oder Komma zum Trennen)
- **Filtern**: Tag-Dropdown zum Filtern nach spezifischen Tags
- **Autocomplete**: Beim Tippen werden vorhandene Tags vorgeschlagen

### Suchen & Filtern
- **Volltext-Suche**: Sucht in Titel, URL, Beschreibung und Tags
- **Tag-Filter**: Dropdown zum Filtern nach spezifischen Tags
- **Kombinierbar**: Suche und Tag-Filter können kombiniert werden

## 🛠️ Technische Details

### Backend
- **Node.js** mit Express.js
- **SQLite** Datenbank (automatisch erstellt)
- **CORS** aktiviert
- **Input-Validierung** implementiert
- **Robuste Fehlerbehandlung**

### Frontend
- **Vanilla JavaScript** (keine Frameworks)
- **Moderne CSS** mit Flexbox/Grid
- **Responsive Design**
- **Local Storage** für Präferenzen
- **Fetch API** für Backend-Kommunikation

### Dateistruktur
```
linkboard/
├── server.js              # Express Server
├── package.json           # Dependencies
├── index.html            # Hauptseite
├── css/
│   ├── base.css          # Grundstyles
│   ├── layout.css        # Layout & Grid
│   ├── components.css    # UI-Komponenten
│   ├── dark-mode.css     # Dark Mode
│   └── light-mode.css    # Light Mode
├── js/
│   └── app.js           # Frontend-Logik
└── links.db             # SQLite Datenbank (auto-generiert)
```

## 🔄 Changelog

### Version 2.0 (Aktuelle Verbesserungen)
- ✅ **Tag-System komplett repariert**
- ✅ **Bedienbarkeit drastisch verbessert**
- ✅ **Modernes UI-Design implementiert**
- ✅ **Robuste Fehlerbehandlung hinzugefügt**
- ✅ **Responsive Design optimiert**
- ✅ **Performance-Verbesserungen**
- ✅ **Input-Validierung implementiert**
- ✅ **Benutzerführung verbessert**

### Vorherige Version
- Grundfunktionalität
- Basis UI
- Tag-System (mit Bugs)
- Einfache CRUD-Operationen

## 🎨 Screenshots

Die Anwendung bietet jetzt:
- **Moderne Kachel-Ansicht** mit Hover-Effekten
- **Farbige Tags** mit Verläufen
- **Saubere Button-Anordnung**
- **Responsive Layout** für alle Geräte
- **Konsistente Dark/Light Modes**

## 🤝 Beitragen

Das Projekt ist bereit für weitere Verbesserungen:
- Import/Export-Funktionalität
- Kategorien zusätzlich zu Tags
- Benutzer-Authentifizierung
- Link-Vorschau
- Bulk-Operationen

---

**Entwickelt mit ❤️ für bessere Link-Verwaltung**
