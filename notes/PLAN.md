# Einfaches Link Dashboard
***
## **Projektbeschreibung: One-Page-Dashboard-Webseite**

Dieses Projekt zielt darauf ab, eine minimalistische und funktionale One-Page-Webanwendung zu entwickeln, die es ermöglicht, Links zu verwalten. 
Die Benutzer können Links in Kachel- oder Listenansicht anzeigen, zwischen beiden Ansichten umschalten und Links 
mit Metadaten wie Titel, URL, Beschreibung, Tags und Notizen hinzufügen, bearbeiten und löschen.

Wesentliche Merkmale:
- Umschaltbare Kachel- und Listenansicht.
- Dark- und Bright-Mode für ein modernes Design.
- Suchfunktion und Tag-Filter zur einfachen Verwaltung von großen Link-Sammlungen.
- Speicherung der Links in einer SQLite-Datenbank, um eine effiziente Handhabung großer Datenmengen zu gewährleisten.
- Großansicht der Links mit Bearbeitungsfunktionen für Metadaten.

Ziel ist es, eine intuitive und leistungsfähige Oberfläche zur Verwaltung von bis zu 10.000 Links zu schaffen.


## Anweisungsplan
Hier ist ein schrittweiser Anweisungsplan, um die grundlegende Funktionalität deines One-Page-Dashboards schrittweise aufzubauen. 
Jeder Schritt baut auf dem vorherigen auf:

### **Schritt 1: Grundlegende HTML-Seite mit CSS**
   - Erstelle eine einfache HTML-Seite mit einem Grundgerüst für die Kachel- und Listenansicht.
   - Implementiere das minimalistische Design mit CSS, das Dark- und Bright-Mode unterstützt.
   - Baue Umschaltmöglichkeiten zwischen Kachel- und Listenansicht (noch ohne Funktionalität).

### **Schritt 2: Listenansicht in HTML**
   - Erstelle ein statisches HTML-Layout für die **Listenansicht**, wo jeder Link mit Titel und URL angezeigt wird.
   - Füge Buttons für das Hinzufügen, Bearbeiten und Löschen von Links hinzu (ohne Funktionalität).

### **Schritt 3: Kachelansicht in HTML**
   - Erstelle das **Kachel-Layout** in HTML, das Links als Kacheln anzeigt.
   - Füge das Infosymbol zu jeder Kachel hinzu, das später die Großansicht der Kachel öffnet.

### **Schritt 4: Umschaltfunktion zwischen Kachel- und Listenansicht mit JavaScript**
   - Implementiere die **Umschaltlogik** in JavaScript, um zwischen Kachel- und Listenansicht zu wechseln.
   - Verwende einfache DOM-Manipulation, um den Inhalt je nach Ansicht umzuschalten.

### **Schritt 5: Dynamisches Hinzufügen von Links mit JavaScript**
   - Erstelle ein Formular, um **neue Links hinzuzufügen** (URL, Titel, Tags).
   - Implementiere die JavaScript-Logik, um den Link in der Liste/Kachelansicht anzuzeigen, wenn er hinzugefügt wird.

### **Schritt 6: Speicherung der Links in einer temporären JavaScript-Datenstruktur**
   - Speichere Links in einem **JavaScript-Array** oder **localStorage** (vorerst ohne Datenbank).
   - Erlaube das **Hinzufügen, Bearbeiten und Löschen** von Links und aktualisiere die Ansicht dynamisch.

### **Schritt 7: Großansicht der Kachel implementieren**
   - Füge die Logik hinzu, um beim Klick auf das Infosymbol die **Großansicht der Kachel** zu öffnen.
   - Zeige hier alle Metadaten an (Titel, URL, Notizen, Tags, Favicon) und ermögliche das Bearbeiten.

### **Schritt 8: Suchfunktion und Tag-Filter implementieren**
   - Füge eine **Suchleiste** hinzu, die die angezeigten Links dynamisch basierend auf Titel, URL oder Beschreibung filtert.
   - Füge die **Tag-Filter-Funktion** hinzu, um nach spezifischen Tags zu filtern.

### **Schritt 9: Speichern der Links in SQLite**
   - Erstelle ein kleines Backend mit SQLite, um Links zu speichern und abzurufen.
   - Implementiere einfache API-Endpunkte (über Node.js oder PHP), um die Links im Frontend anzuzeigen und zu verwalten.

### **Schritt 10: API-Integration für Speichern und Abrufen von Links**
   - Integriere die API-Endpunkte ins Frontend, sodass Links im SQLite gespeichert und abgerufen werden können.
   - Verwende Fetch oder Axios in JavaScript, um die Links von der Datenbank abzurufen und anzuzeigen.

### **Schritt 11: Optimierungen und Erweiterungen**
   - Verbessere die Performance bei vielen Links.
   - Implementiere zusätzliche Funktionen, wie erweiterte Sortieroptionen und Tag-Management.

Mit diesem Plan kannst du die Funktionalität schrittweise aufbauen und in jedem Schritt die Basisfunktionen erweitern.

## Detail Planung

Hier ist eine detaillierte Planung für das One-Page-Dashboard-Projekt:

### **1. Design und Struktur**
   - **Frontend (HTML/CSS)**: 
     - Die Seite wird mit einer **minimalistischen modernen** Ästhetik erstellt, die **Dark- und Bright-Mode** unterstützt.
     - **Umschaltbare Ansichten**: Es wird eine Möglichkeit geben, zwischen einer **Kachel-Ansicht** und einer **Listen-Ansicht** umzuschalten. 
     - Kachel-Ansicht: Links werden in Kacheln mit einem Infosymbol für die Großansicht dargestellt.
     - Listen-Ansicht: Links werden in einer einfachen, übersichtlichen Liste dargestellt.
   - **CSS Framework**: Einfache, maßgeschneiderte CSS-Regeln für Dark/Bright-Mode, oder alternativ eine minimalistische Library wie **TailwindCSS**.

### **2. Kernfunktionalitäten**
   - **Link-Verwaltung**:
     - **Hinzufügen**: Benutzer können über ein Formular Links (Titel, URL, Tags, Beschreibung, Favicon) hinzufügen.
     - **Bearbeiten**: Links können über die Großansicht einer Kachel oder einen Edit-Button in der Listenansicht bearbeitet werden.
     - **Löschen**: Benutzer können Links löschen (mit einer Bestätigungsabfrage).
   - **Kachel-Ansicht**:
     - Beim Klick auf eine Kachel wird der Link in einem neuen Tab geöffnet.
     - Ein **Infosymbol** auf der Kachel öffnet die **Großansicht**, in der der Benutzer die Metadaten (Titel, Beschreibung, Tags, Notizen, Favicon) einsehen und bearbeiten kann.
   - **Suchfunktion**:
     - Eine Suchleiste, die in Echtzeit durch Titel, URL und Beschreibung filtert.
   - **Tag-Filterung**:
     - Möglichkeit, die Links nach Tags zu filtern (z. B. über ein Dropdown-Menü oder eine Liste von Tags).

### **3. Datenstruktur und Speicherung**
   - **Datenstruktur**:
     - Ein Link-Objekt enthält folgende Felder:
       - `id`: Eindeutige Identifikation.
       - `url`: Die URL des Links.
       - `title`: Der Titel des Links.
       - `description`: Beschreibung des Links.
       - `tags`: Eine Liste von Tags, die dem Link zugewiesen sind.
       - `favicon`: URL des Favicons.
       - `notes`: Zusätzliche Notizen oder Informationen zum Link.
   - **Speicherlösung**:
     - **SQLite** wird zur Speicherung von Links genutzt, um mit großen Mengen (10.000+) effizient umzugehen. Die Datenbank wird lokal über eine Backend-API angebunden.
     - **API-Schnittstellen** (Node.js, PHP oder Python Flask):
       - **GET**: Abrufen der Links aus der SQLite-Datenbank.
       - **POST**: Hinzufügen eines neuen Links zur Datenbank.
       - **PUT**: Bearbeiten eines bestehenden Links.
       - **DELETE**: Löschen eines Links.

### **4. Backend-Integration (SQLite)**
   - **SQLite-Datenbank**:
     - Tabelle `links`, die alle Link-Daten speichert (id, title, url, description, tags, favicon, notes).
   - **API-Entwicklung**:
     - Verwende einfache RESTful Endpunkte, um das Speichern, Abrufen und Bearbeiten der Links zu ermöglichen.
     - Das Backend verarbeitet die Anfrage, speichert die Daten in SQLite und sendet die aktualisierten Daten an das Frontend.

### **5. Funktionen und Interaktionen**
   - **Dynamische Umschaltung**:
     - Umschalten zwischen Kachel- und Listenansicht ohne Seitenneuladen (JavaScript für DOM-Manipulation).
   - **Suchfunktion**:
     - Echtzeit-Suche, die Links auf Basis von Titel, URL und Beschreibung filtert.
   - **Tag-Filter**:
     - Filtere Links anhand der zugewiesenen Tags. Dies geschieht entweder über ein Dropdown-Menü oder eine Liste von Tags.

### **6. Erweiterungsideen (spätere Phasen)**
   - **Erweiterte Filter**: Möglichkeit, Links nach Datum des Hinzufügens oder nach Kategorie zu sortieren.
   - **Favoriten-Links**: Markierung von Links als Favoriten.
   - **Import/Export**: CSV-Import und Export der Links.
   - **Benachrichtigungen**: Erinnerungen für bestimmte Links.
   - **Mobile Responsive Design**: Anpassung der Darstellung für mobile Endgeräte.

### **7. Technologische Wahl**
   - **Frontend**: 
     - HTML5, CSS3 (optional mit TailwindCSS für ein minimalistisches Design).
     - JavaScript für die dynamische Manipulation der Links, Umschalten der Ansichten und Interaktionen.
   - **Backend**:
     - **Node.js** oder **PHP** für die API, um SQLite anzubinden und Anfragen zu bearbeiten.
   - **Datenbank**:
     - SQLite zur Speicherung der Links und deren Metadaten.

### **8. Entwicklungsablauf**
   1. **HTML/CSS-Design erstellen** (Grundlayout, Umschaltfunktion für Ansichten).
   2. **Link-Verwaltungslogik mit JavaScript** (Hinzufügen, Bearbeiten, Löschen, dynamische Anzeige).
   3. **API für Datenbankanbindung entwickeln** (Speichern und Abrufen von Links mit SQLite).
   4. **Such- und Filterfunktionen implementieren**.
   5. **Optimierung und Erweiterung** (z. B. Favoriten, Tag-Management, Mobile Design).

