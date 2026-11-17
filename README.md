# Trail Food Planer

Resupply- und Menüplaner für Thru-Hiker (PCT, CDT, AT) auf Basis von **GearSkeptics Hiker Food 2.5**.

**Live:** https://dacat84.github.io/trail-food/

## Was die Seite kann

- **Planer:** Laufrichtung NOBO oder SOBO, Etappe vom Einkaufsort bis zum nächsten Resupply mit Tagesdistanz (km/mi) und Reserve, daraus werden die Tage berechnet (oder 1–14 Tage manuell), kcal- und Protein-Ziel, Einkaufsort (generisch oder Resupply-Stop auf PCT, CDT oder AT; reine Paket-Stops wie Pie Town zeigen, was ins Paket gehört), Kocher / Cold Soak / ohne Kochen.
  Schlägt Frühstück, Mittags-Wrap, Snacks, Abendessen und Öl-/Butter-Bumps vor, optimiert auf kcal pro Gramm und
  GearSkeptics Makro-Bewertung. Regler zwischen „leichtestes Gewicht“ und „Lust & Favoriten“, plus Abwechslung.
  Positionen sperren 🔒, tauschen 🔄, Menge ändern, ❤️ / 👎 merken. Einkaufsliste nach Ladentyp, als Text/CSV/Druck.
- **Lebensmittel:** alle ~1.650 Einträge durchsuchen, filtern, sortieren; ❤️ Favorit, 📌 „muss mit“, 👎 nie wieder.
- **Elektrolyte:** Natriumbedarf nach Temperatur (GearSkeptics NaK-Tabelle) und Produktliste.
- **Methode:** Bewertungsskalen aus der Tabelle (Color Keys) und Erklärung.

Favoriten, Einstellungen und der letzte Plan werden im Browser gespeichert (localStorage).

## Daten

| Datei | Inhalt |
|---|---|
| `data/Hiker_Food_2.5.xlsx` | Original-Tabelle von GearSkeptic (Datenquelle) |
| `data/brands.csv` | Eigene Einschätzung pro Marke: `gas`, `market`, `super`, `outdoor`, `online` |
| `data/item_overrides.csv` | Ausnahmen pro Produkt |
| `data/stops.json` | Resupply-Stops PCT, CDT, AT mit grober Ladengröße (`none` = nur Paket; ohne Gewähr, in FarOut prüfen) |
| `scripts/build_data.py` | Baut `site/data/foods.json` aus den Dateien oben |

Neue Excel-Version einfach ersetzen und pushen: die GitHub Action baut die JSON neu und deployt die Seite.

Lokal: `pip install openpyxl && python3 scripts/build_data.py && cd site && python3 -m http.server`

## Credits

Alle Nährwerte und Bewertungsskalen stammen aus GearSkeptics *Hiker Food 2.5*. Bitte seinen YouTube-Kanal unterstützen.
