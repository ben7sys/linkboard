# PROMPT_V2 ist die Beschreibung für den nächsten Step
Das Linkboard funktioniert prinzipiell.
Jede weitere Änderung muss sorgfältig geplant und durchgeführt werden.

Als ersten Schritt wäre vermutlich das splitten der app.js am sinnvollsten.
Unsere gesamte App soll möglichst Modular und wiedervendbar aufgebaut sein.

Modularisierung JS
UI-Modul (ui.js): Handhabt DOM-Elemente und Event-Listener.
API-Modul (api.js): Handhabt API-Interaktionen.
Rendering-Modul (render.js): Handhabt das Rendering der Links.
Formular- und Tag-Modul (form.js): Handhabt die Formular- und Tag-Verwaltung.