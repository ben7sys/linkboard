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

Dieser Plan gibt dir eine klare Roadmap für die Umsetzung des Projekts, wobei die grundlegende Funktionalität zuerst hergestellt wird, bevor du schrittweise die Features erweiterst.

## Review
Based on the review of the implemented code, the Link Dashboard project has successfully met most of the core requirements outlined in the original prompt. The application includes:

1. A responsive frontend with tile and list views for links
2. Dark and light mode functionality
3. Add, edit, and delete capabilities for links
4. Search and tag filtering features
5. A detailed view for each link
6. A backend server using Express.js and SQLite for data storage and retrieval

To fully complete the project and enhance its functionality, consider implementing the following improvements:

1. Performance optimization: Implement pagination or lazy loading to handle large numbers of links efficiently.
2. Enhanced error handling: Improve error messages and handling for a better user experience.
3. Input validation: Add server-side validation to ensure data integrity and security.
4. Favicon handling: Implement backend support for storing and retrieving favicons.
5. Automated testing: Develop unit and integration tests for both frontend and backend.
6. Link categorization: Enhance the tagging system or add categories for better organization.
7. User authentication: Implement multi-user support with secure authentication.
8. Import/export functionality: Allow users to backup and restore their link collections.
9. Usage analytics: Add features to track and display link usage statistics.

These enhancements will make the Link Dashboard more robust, secure, and feature-rich, fully realizing the potential of the original project concept.
## Zusätzliche Anweisungen und Verbesserungen

Bitte schau dir den Prompt an und schau dir an was wir bisher geschafft und implementiert haben. Gibt es noch etwas, was fehlt?

#### Designanpassungen
- Darkmode als default setzen
- Austausch der Buttons durch Icons - für jede Aktion passende Icons wählen (Listenansicht, Kachelansicht, Dark/Light Mode, hinzufügen, bearbeiten, löschen, info, etc...)

#### Designanpassungen 2
- Kacheln in der Kachelansicht sollen keinen hover oder glow effekt haben und stattdessen ein ganz leichten dünnen rahmen bekommen
- Die Anordnung der Icons in den Kacheln muss verbessert werden: Alle Icons rechts unten, in der Reihenfolge von Links nach Rechts: Löschen, Bearbeiten, Info
- Alle Icons sollen minimalistisch und vektorartig sein (fab?)
- der Plusbutton um einen Link hinzuzufügen muss nach ganz links in der gleichen Zeile
- der Listenansicht/Kachelansicht  soll ganz nach rechts in der gleichen Zeile
- der Dark/Light Mode Button soll nicht in der gleichen Zeile sondern in die kopfzeile ganz klein platziert werden (befindet sich dann nicht mehr in der gleichen reihe wie plus und ansicht)
- Entferne den Text "Tags" komplett und stelle nur die einzelnen Tags dar.
- Jedes Tag wird mit einer **Raute (#)** dargestellt, gefolgt von dem Tag-Namen.
- Die Tags sollen sich leicht farblich unterscheiden, um sie besser erkennbar zu machen. (Dark/Light Mode beachten)
- Zwischen den einzelnen Tags sollte ein leicht horizontaler Abstand eingefügt werden.
- Die Tags sollten einheitlich in einer Zeile angeordnet sein, auch wenn es mehrere Tags gibt. Maximal 1 Zeile.
- Die Links in den Kacheln sollen eine kleinere Schriftgröße erhalten
- Die Kacheln sollen immer gleich formatiert sein: 1. Überschrift (1 Zeile), 2. Link (2 Zeilen, kleine Schrift), 3. Tags (2 Zeilen)

**Nachtrag:**
- Die Icons sollen eine leichtere und blassere Farbe erhalten damit sie nicht so kontrastreich hervorstechen
- Die Kacheln sind leider noch nicht korrekt eingestellt. Die Zeilenhöhen müssen fix sein so dass jede Kachel gleich aussieht unabhängig davon wie lang der Link ist oder wieviele Tags hinzugefügt wurden.
- Der mittlere Teil mit "Plus, Suche, Tags, Ansicht" muss in einer Reihe sein und das Suchfeld soll breiter sein und sich harmonisch in der Reihenmitte einfügen

## Milestone
Based on the review of the implemented code, the Link Dashboard project has successfully met most of the core requirements outlined in the original prompt. The application includes:

1. A responsive frontend with tile and list views for links
2. Dark and light mode functionality
3. Add, edit, and delete capabilities for links
4. Search and tag filtering features
5. A detailed view for each link
6. A backend server using Express.js and SQLite for data storage and retrieval

To fully complete the project and enhance its functionality, consider implementing the following improvements:

1. Performance optimization: Implement pagination or lazy loading to handle large numbers of links efficiently.
2. Enhanced error handling: Improve error messages and handling for a better user experience.
3. Input validation: Add server-side validation to ensure data integrity and security.
4. Favicon handling: Implement backend support for storing and retrieving favicons.
5. Automated testing: Develop unit and integration tests for both frontend and backend.
6. Link categorization: Enhance the tagging system or add categories for better organization.
7. User authentication: Implement multi-user support with secure authentication.
8. Import/export functionality: Allow users to backup and restore their link collections.
9. Usage analytics: Add features to track and display link usage statistics.

These enhancements will make the Link Dashboard more robust, secure, and feature-rich, fully realizing the potential of the original project concept.

![[img_20241012174516_linkdashboard.png]]
## Weiterentwicklung 1 (12.10.2024)

**Ideen:**
- Ich möchte die Karten direkt editieren können.
- Wenn ich über die Zeilen mit der Maus hovere soll ein Textfeld anklickbar werden und es soll mit dem Cursor direkt bearbeitet werden können.
- Beispiel: Ich steuere mit der Maus über die Karte mit dem Titel: "Localhost Server.js", ich kann nun einmal hineinklicken und den Titel verändern.

Der Lightmode muss etwas angepasst werden. Es ist zu grell und zu hell. (Die styles.css wird gar nicht mehr verwendet. Sie wurde separiert in base, components, dark-mode und layout.)


#### Tag-System:
- Alle Tags sind klickbar und lösen eine Filterung der angezeigten Links aus.
- Wenn ein Tag ausgewählt ist, wird es visuell hervorgehoben, z. B. durch eine Farbänderung.
- Die aktive Filterung kann durch erneutes Klicken auf das Tag wieder deaktiviert werden
- zusätzlich gibt es ein "Filter zurücksetzen"-Button um die Filterung zu entfernen.
- Tags müssen organisiert werden können (umbennen, mergen, löschen, bnearbeiten)
- Benutzer sollen die Tags verwalten können, indem sie sie umbenennen, zusammenführen, löschen oder bearbeiten.


#### Collection-System:
- Kollektionen können aus Links oder ganzen Tags bestehen
- Eine Kollektion ist eine Liste mit vom Benutzer ausgewählten Links

