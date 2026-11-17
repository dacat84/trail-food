/* Trail Food Planner – data: GearSkeptic Hiker Food 2.5 */
'use strict';

// ---------- i18n ----------
const I18N = {
  de: {
    title: 'Trail Food Planer', subtitle: 'kcal pro Gewicht, Erreichbarkeit auf PCT, CDT, AT und weiteren US-Trails, Menüs auf die du Lust hast',
    boxOnly: s => `📦 ${s}: Hier gibt es nichts zu kaufen. Der Plan zeigt, was ins Paket gehört (alle Marken inkl. online).`,
    tabPlan: 'Planer', tabFoods: 'Lebensmittel', tabSalt: 'Elektrolyte', tabAbout: 'Methode',
    resupply: 'Resupply', shopAt: 'Einkaufsort', days: 'Tage', kcalDay: 'kcal / Tag', proteinGoal: 'Protein-Ziel g / Tag',
    temp: 'Temperatur (Na-Bedarf)', prep: 'Zubereitung', stove: 'Kocher', nocook: 'Gar nicht', profile: 'Makro-Profil',
    profGsT: 'GearSkeptic: fettbetont, Kohlenhydrat/Protein 3–4, Zucker 5–15 %', profBal: 'Ausgewogen',
    profBalT: 'Klassisch: ca. 35 % Fett, 47 % KH, 18 % Protein', profW: 'Nur Gewicht', profWT: 'Nur kcal pro Gewicht',
    lightest: 'Leichtestes Gewicht', cravings: 'Lust & Favoriten', sameOk: 'Gleiches okay', variety: 'Viel Abwechslung',
    blocks: 'Bausteine', cLunch: 'Mittags-Wrap', cBump: 'Öl/Butter-Bump abends', cDrink: 'Kaffee/Drink morgens',
    cDessert: 'Dessert', cVeg: 'Vegetarisch', cFresh: 'Frisches Obst erlauben', cravingFor: 'Lust auf …',
    cravingHint: '(1× = ja, 2× = bloß nicht)', suggest: 'Menü vorschlagen', lockHint: 'Gesperrte Positionen 🔒 bleiben beim Neu-Vorschlagen erhalten.',
    allergyTitle: 'Allergien / Unverträglichkeiten',
    allergyHint: 'Erkennung nur über Produktname und Kategorie, die Tabelle enthält keine Zutatenlisten. Bei echter Allergie immer das Etikett prüfen, auch auf „kann Spuren enthalten“.',
    hideAllergens: 'meine Allergene ausblenden',
    trail: 'Trail', noTrail: '– kein bestimmter Trail –', customLeg: 'Eigene Strecke (Distanz eingeben)', customDist: 'Strecke bis zum nächsten Resupply',
    hTrail: 'Wähl deinen Trail. Danach stehen nur dessen Resupply-Orte zur Auswahl, und die Distanz zum nächsten Stop wird automatisch berechnet. Für Trails, die hier fehlen, oder einen eigenen Abschnitt: „kein bestimmter Trail“ wählen und bei „Nächster Resupply“ die eigene Strecke eingeben. Bei Trails mit ~ sind die Meilen grobe Werte.',
    dir: 'Laufrichtung',
    hDir: 'NOBO = Richtung Norden (PCT: Mexiko → Kanada, CDT: Mexiko → Kanada, AT: Georgia → Maine). SOBO = Richtung Süden. Bestimmt die Reihenfolge der Stops und welcher Stop als nächster Resupply gilt. Die Meilenangaben bleiben die üblichen NOBO-Meilen, die Distanzen stimmen in beide Richtungen.',
    tipNobo: 'Northbound: von Süden nach Norden. PCT/CDT ab der mexikanischen Grenze, AT ab Springer Mountain.',
    tipSobo: 'Southbound: von Norden nach Süden. PCT/CDT ab der kanadischen Grenze, AT ab Katahdin.',
    nextStop: 'Nächster Resupply', manualDays: '– Tage selbst wählen –', dayDist: 'Tagesdistanz', reserve: 'Reserve (Tage)',
    legInfo: (d, ex, days) => `🥾 ${d} bis dorthin = ${ex} Tage Laufzeit → ${days} Tage Essen eingeplant`,
    hLeg: 'Wähl den nächsten Stop auf demselben Trail. Aus der Meilen-Differenz und deiner Tagesdistanz rechnet der Planer die reine Laufzeit, addiert die Reserve und rundet auf ganze Tage auf. Das setzt den Tage-Regler automatisch. Wege vom Trail in den Ort (Hitch, Side Trail) sind nicht eingerechnet. Wer den Tage-Regler selbst verschiebt, schaltet auf „Tage selbst wählen“.',
    lacChoc: 'Schokolade erlauben', lacPowder: 'Milchpulver erlauben',
    tipLacChoc: 'Erlaubt Produkte, die nur wegen Schokolade, Karamell oder Toffee als laktosehaltig markiert sind. Schokolade hat meist wenig Laktose, viele vertragen kleine Mengen. Käse, Molke, Sahne usw. bleiben ausgeschlossen.',
    tipLacPowder: 'Erlaubt Produkte, die nur wegen Milchpulver markiert sind (z. B. Nido, Carnation, Butter- oder Sahnepulver). Sinnvoll mit Laktase-Tabletten oder laktosefreiem Pulver.',
    al: { gluten: 'Gluten', erdnuss: 'Erdnuss', schalenfruechte: 'Schalenfrüchte (Nüsse)', laktose: 'Laktose / Milch', ei: 'Ei', soja: 'Soja', fisch: 'Fisch / Meeresfrüchte', sesam: 'Sesam' },
    searchPh: 'Suchen: Marke oder Sorte, z. B. snickers, knorr, mountain house …', search: 'Suchen …',
    allMeals: 'Alle Mahlzeiten', m_breakfast: 'Frühstück', m_lunchF: 'Mittag (Wrap/Belag)', m_snackF: 'Snacks', m_dinner: 'Abendessen',
    m_bumpF: 'Booster (Bump)', m_dessert: 'Dessert', m_drinkF: 'Getränke', m_other: 'Sonstiges (Dosen, Notfall)',
    anyPrep: 'Jede Zubereitung', p_none: 'ohne Zubereitung', p_cold: 'kalt anrühren', p_hot: 'heißes Wasser', p_cook: 'kochen',
    allClasses: 'Alle Kategorien', anyTier: 'Erhältlich: egal', upTo: 'bis', onlyFav: 'nur ❤️',
    thBrand: 'Marke', thFlavor: 'Sorte', thClass: 'Kategorie', thFat: 'Fett %', thSugar: 'Zucker %', thPro: 'Prot g', thCp: 'KH/Prot', thAvail: 'Erhältlich',
    more: 'Mehr anzeigen', hits: 'Treffer', nothing: 'Nichts gefunden',
    naTitle: 'Natriumbedarf (GearSkeptic NaK-Rechner)',
    naText: 'GearSkeptic schätzt den Tagesbedarf an Natrium aus der Temperatur, weil der Schweißverlust stark mit der Hitze steigt. Kalium braucht man laut seiner Tabelle deutlich weniger zusätzlich (Schweiß Na:K ≈ 4,5:1).',
    tempCol: 'Temperatur', naCol: 'Na-Bedarf mg/Tag', naHint: 'RDA zum Vergleich: 1500 mg Na, 3400 mg K. Der Planer zeigt, wie viel Natrium die gewählte Verpflegung schon liefert.',
    elecTitle: 'Elektrolyt-Produkte', product: 'Produkt', caffeine: 'Koffein',
    scales: 'Bewertungsskalen (aus Hiker Food 2.5)', availText: 'Die Spalte „Erhältlich“ ist eine eigene Einschätzung pro Marke, nicht aus GearSkeptics Tabelle:',
    stopsHint: 'Die Trail-Stops und ihre Ladengrößen sind grobe Richtwerte. Vor Ort und in FarOut immer gegenchecken, Läden ändern sich jede Saison.',
    updTitle: 'Daten aktualisieren', updText: 'Die Excel liegt im Repo unter <code>data/Hiker_Food_2.5.xlsx</code>. Neue Version reinlegen und pushen, die GitHub Action baut <code>foods.json</code> neu. Marken-Einstufungen stehen in <code>data/brands.csv</code>, Korrekturen zu Allergenen in <code>data/allergen_overrides.csv</code>.',
    footer: 'Daten: GearSkeptic, Hiker Food 2.5',
    meal_breakfast: 'Frühstück', meal_drink: 'Drink', meal_lunch: 'Mittag', meal_snack: 'Snacks über den Tag', meal_dinner: 'Abendessen', meal_bump: 'Bump', meal_dessert: 'Dessert',
    t_gas: 'Tankstelle / General Store', t_market: 'Kleiner Markt / Dollar General', t_super: 'Supermarkt (Safeway, Walmart …)',
    t_outdoor: 'Outdoor-/Hikerladen, Resort-Store', t_online: 'Nur online / Paket (Maildrop)',
    optAll: 'Alles (online bestellt / Paket)', optGeneric: 'Generisch', optPct: 'PCT Resupply (NOBO)', mile: 'Meile',
    infoAll: 'Volle Auswahl inkl. Online-Marken, ideal für Pakete von zu Hause.', infoGeneric: 'Alles, was es typischerweise bis zu dieser Ladengröße gibt.',
    infoFD: 'Trockenmahlzeiten erhältlich',
    kTotal: 'Essen gesamt', perDay: 'pro Tag', kKcal: 'Kalorien', kDens: 'Dichte', kPro: 'Protein', kNa: 'Natrium', goal: 'Ziel', needAt: 'Bedarf bei',
    fat: 'Fett', carbs: 'Kohlenhydrate', ofSugar: 'davon Zucker', protein: 'Protein',
    naGap: (gap, el) => `🧂 Es fehlen ca. ${gap} mg Natrium pro Tag${el ? `, z. B. ${el}` : ''}. Siehe Tab Elektrolyte.`,
    weightFor: k => `Gewicht für ${k} kcal/Tag bei dieser Dichte`, nDays: d => `${d} Tage`,
    fewOptions: (s, b, d, n) => `⚠️ ${s}: wenig Auswahl (${b} Frühstück, ${d} Abendessen, ${n} Snacks im Datensatz). Ein Paket mit Lieblingssachen lohnt sich hier.`,
    day: 'Tag', prot: 'Prot.', addSnack: '+ Snack', pkg: 'Pkg.', serv: 'Port.',
    aLess: 'weniger', aMore: 'mehr', aLock: 'Sperren', aSwap: 'Andere Idee', aFav: 'Favorit', aDis: 'Mag ich nicht, nie wieder vorschlagen', aDel: 'Entfernen', aPin: 'Muss in den Plan', aPrep: 'Zubereitung',
    shopTitle: 'Einkaufsliste', shopHint: 'Portionsangaben laut Nährwerttabelle. Wie viele Packungen das sind, steht auf der Packung (Portionen pro Packung).',
    package: 'Packung', servingOf: w => `Portion à ${w}`, copy: '📋 Als Text kopieren', print: '🖨 Drucken', copied: 'Einkaufsliste kopiert',
    toastFav: 'Als Favorit gemerkt', toastUnfav: 'Favorit entfernt', toastDis: 'Wird nicht mehr vorgeschlagen', noAlt: 'Keine Alternative an diesem Ort',
    toastPin: 'Kommt beim nächsten Vorschlag in den Plan', toastUnpin: 'Pin entfernt', loadErr: 'Daten konnten nicht geladen werden',
    csvHead: ['Tag', 'Mahlzeit', 'Marke', 'Sorte', 'Anzahl', 'Einheit', 'g', 'oz', 'kcal', 'Fett g', 'KH g', 'Protein g', 'Na mg', 'Erhältlich'],
    minDens: 'min',
    keyWeight: 'Gewichtsklasse', keyFat: 'Kalorien aus Fett', keyCp: 'Kohlenhydrate : Protein', keySugar: 'Kalorien aus Zucker', keyNa: 'mg Natrium pro kcal',
    r_w: ['Schwer', 'Mäßig', 'Leicht', 'Sehr leicht', 'Ultraleicht', 'Hyperleicht'],
    r_fat: ['Fett niedrig', 'Fett mäßig', 'Fett gut', 'Fett sehr gut', 'Fett hoch'],
    r_cp: ['KH/Prot unausgewogen', 'KH/Prot gut', 'KH/Prot optimal'],
    r_sug: ['Zucker niedrig', 'Zucker optimal', 'Zucker: kleine Portionen', 'Zucker hoch'],
    r_na: ['Na unter Bedarf', 'Na leicht', 'Na mittel', 'Na hoch'],
    hStop: 'Legt fest, welche Lebensmittel überhaupt in Frage kommen. Jede Marke hat eine geschätzte Ladengröße, ab der man sie findet. Ein Supermarkt hat auch alles aus Tankstelle und kleinem Markt. Trockenmahlzeiten gibt es nur dort, wo ein Outdoor- oder Hikerladen ist. „Alles“ schließt auch reine Online-Marken ein, gedacht für Pakete von zu Hause.',
    hDays: 'Für wie viele Tage bis zum nächsten Resupply geplant wird. Jeder Tag wird einzeln bis zum kcal-Ziel gefüllt. Unter der Übersicht siehst du zusätzlich, was 2 bis 7 Tage bei dieser Dichte wiegen würden.',
    hProtein: 'Der Planer rechnet bei jedem Tag hoch, ob die Kalorien genug Protein liefern, und bevorzugt sonst proteinreichere Lebensmittel. Faustregel für Langstrecke: 1,2–1,6 g pro kg Körpergewicht.',
    hTemp: 'Ändert nur die Auswertung, nicht die Auswahl. Aus der Temperatur schätzt GearSkeptics NaK-Tabelle den Natriumbedarf pro Tag. Die Lücke zum Essen wird angezeigt, mit einem passenden Elektrolytprodukt als Vorschlag.',
    hPrep: 'Kocher: alles erlaubt.\nCold Soak: alles außer Gerichten, die wirklich köcheln müssen.\nGar nicht: nur Sachen ohne Zubereitung oder zum kalt Anrühren.',
    hProfile: 'Woran der Planer die Makros eines Tages misst.\nGearSkeptic: Ziel ca. 60 % der Kalorien aus Fett, Kohlenhydrate zu Protein 3 bis 4, Zucker 5–15 %.\nAusgewogen: klassische Sporternährung, ca. 35 % Fett, 47 % Kohlenhydrate, 18 % Protein.\nNur Gewicht: Makros fast egal, nur das Protein-Ziel zählt noch etwas.',
    hLust: 'Wie der Planer zwischen Gewicht und Genuss abwägt.\nLinks: fast nur kcal pro Gramm zählt. Gewinnen tun die dichtesten Lebensmittel, auch wenn sie langweilig sind.\nRechts: deine ❤️-Favoriten und die gewählten „Lust auf“-Geschmäcker bekommen einen großen Bonus, und es kommt mehr Zufall rein, damit die Vorschläge abwechslungsreicher werden. Der Plan wird dadurch meist etwas schwerer.',
    hVar: 'Wie stark Wiederholungen bestraft werden.\nLinks: dasselbe Produkt darf an mehreren Tagen vorkommen. Das ist einfacher einzukaufen (eine Großpackung statt fünf Sorten).\nRechts: Wiederholungen über die Tage und mehrere Produkte derselben Marke am selben Tag werden stark abgewertet, damit du nicht fünfmal das Gleiche isst.',
    hBlocks: 'Welche Mahlzeiten jeder Tag bekommt. Frühstück und Abendessen sind immer dabei, der Rest wird mit Snacks bis zum kcal-Ziel aufgefüllt.\nBump: ein Schuss Öl, Ghee oder Butterpulver ins Abendessen, extrem leicht pro Kalorie.\nMittags-Wrap: Tortilla plus Belag (Nussbutter, Käse oder Wurst).',
    hCraving: 'Ein Klick: Produkte mit diesem Geschmack bekommen einen Bonus. Je weiter rechts der Regler „Lust & Favoriten“ steht, desto stärker wirkt das.\nZweiter Klick: komplett ausgeschlossen.\nDritter Klick: wieder neutral.',
    hAllergy: 'Ausgewählte Allergene werden im Planer komplett ausgeschlossen und in der Lebensmittelliste ausgeblendet (abschaltbar). Erkannt wird über Produktname und Kategorie, eher zu streng als zu locker, aber ohne Garantie. Korrekturen pflegst du in data/allergen_overrides.csv.',
    tipGs: 'GearSkeptic-Profil: Der Planer peilt ca. 60 % der Kalorien aus Fett an (seine Skala: 60–70 % = „sehr gut“), ein Verhältnis Kohlenhydrate zu Protein von 3 bis 4 und 5–15 % der Kalorien aus Zucker. Ergebnis: sehr leichte Pläne mit vielen Nüssen, Nussbutter, Öl und Schokolade.',
    tipBal: 'Ausgewogen: klassische Ausdauer-Sporternährung mit ca. 35 % Fett, 47 % Kohlenhydraten und 18 % Protein. Mehr Nudeln, Müsli, Riegel und Trockenobst. Spürbar schwerer pro Tag, dafür näher an dem, was viele gewohnt sind.',
    tipW: 'Nur Gewicht: Die Makroverteilung ist fast egal, es zählt hauptsächlich kcal pro Gramm. Nur das Protein-Ziel wird noch leicht berücksichtigt. Ergibt die leichtesten, aber oft sehr fettlastigen und einseitigen Pläne.',
    tipStove: 'Kocher: Alles ist erlaubt, auch Gerichte, die köcheln müssen (z. B. Knorr Pasta Sides, Reis).',
    tipCold: 'Cold Soak: Kein Kocher. Instant-Sachen und Trockenmahlzeiten weichen kalt im Glas ein. Ausgeschlossen sind nur Gerichte, die wirklich gekocht werden müssen.',
    tipNo: 'Gar nicht: Nur Lebensmittel ohne Zubereitung oder zum kalt Anrühren (Müsli mit Milchpulver, Drinks). Keine Trockenmahlzeiten.',
    tipC_lunch: 'Mittags-Wrap: Jeder Tag bekommt eine Tortilla oder ein Brot plus Belag (Nussbutter, Käse oder Wurst).',
    tipC_bump: 'Bump: Ein Schuss Öl, Ghee oder Butterpulver ins Abendessen. Bringt ca. 250 kcal bei extrem wenig Gewicht, einer der stärksten Tricks aus GearSkeptics Videos.',
    tipC_drink: 'Kaffee/Drink: Morgens zusätzlich ein Instant-Kaffee, Kakao oder Milchpulver-Drink.',
    tipC_dessert: 'Dessert: Abends zusätzlich ein Trockenmahlzeit-Dessert (z. B. Cheesecake, Apple Crisp).',
    tipC_veg: 'Vegetarisch: Alles mit Fleisch, Wurst, Jerky oder Fisch im Namen wird ausgeschlossen.',
    tipC_fresh: 'Frisches Obst: Erlaubt rohes Obst wie Bananen oder Avocados. Standardmäßig aus, weil es pro Kalorie sehr schwer ist.',
    tags: { schoko: 'Schoko', erdnuss: 'Erdnuss', nuss: 'Nüsse', 'käse': 'Käse', fleisch: 'Fleisch', scharf: 'Scharf', frucht: 'Fruchtig', kaffee: 'Kaffee', asiatisch: 'Asiatisch', mexikanisch: 'Mexikanisch', pasta: 'Pasta', reis: 'Reis', kartoffel: 'Kartoffel', kokos: 'Kokos' },
  },
  en: {
    title: 'Trail Food Planner', subtitle: 'Calories per weight, availability on the PCT, CDT, AT and more US trails, menus you actually crave',
    boxOnly: s => `📦 ${s}: nothing to buy here. The plan shows what goes in your box (all brands incl. online).`,
    tabPlan: 'Planner', tabFoods: 'Foods', tabSalt: 'Electrolytes', tabAbout: 'Method',
    resupply: 'Resupply', shopAt: 'Shopping at', days: 'Days', kcalDay: 'kcal / day', proteinGoal: 'Protein goal g / day',
    temp: 'Temperature (Na need)', prep: 'Preparation', stove: 'Stove', nocook: 'No prep', profile: 'Macro profile',
    profGsT: 'GearSkeptic: fat-forward, carb/protein 3–4, sugar 5–15 %', profBal: 'Balanced',
    profBalT: 'Classic: approx. 35 % fat, 47 % carbs, 18 % protein', profW: 'Weight only', profWT: 'Calories per weight only',
    lightest: 'Lightest weight', cravings: 'Cravings & favorites', sameOk: 'Repeats OK', variety: 'Lots of variety',
    blocks: 'Building blocks', cLunch: 'Lunch wrap', cBump: 'Oil/butter bump at dinner', cDrink: 'Coffee/drink in the morning',
    cDessert: 'Dessert', cVeg: 'Vegetarian', cFresh: 'Allow fresh fruit', cravingFor: 'Craving …',
    cravingHint: '(1× = yes, 2× = no way)', suggest: 'Suggest menu', lockHint: 'Locked items 🔒 are kept when you regenerate.',
    allergyTitle: 'Allergies / intolerances',
    allergyHint: 'Detected from product name and class only; the sheet has no ingredient lists. With a real allergy always check the label, including "may contain".',
    hideAllergens: 'hide my allergens',
    trail: 'Trail', noTrail: '– no specific trail –', customLeg: 'Custom distance (enter it)', customDist: 'Distance to next resupply',
    hTrail: 'Pick your trail. Only its resupply stops are listed then, and the distance to the next stop is calculated automatically. For trails not listed here, or your own section: choose "no specific trail" and enter a custom distance under "Next resupply". Trails marked ~ have rough mileage.',
    dir: 'Direction',
    hDir: 'NOBO = northbound (PCT and CDT: Mexico → Canada, AT: Georgia → Maine). SOBO = southbound. Sets the order of the stops and which stop counts as the next resupply. Mile numbers stay the usual NOBO miles; distances are correct both ways.',
    tipNobo: 'Northbound: south to north. PCT/CDT from the Mexican border, AT from Springer Mountain.',
    tipSobo: 'Southbound: north to south. PCT/CDT from the Canadian border, AT from Katahdin.',
    nextStop: 'Next resupply', manualDays: '– choose days myself –', dayDist: 'Daily distance', reserve: 'Buffer (days)',
    legInfo: (d, ex, days) => `🥾 ${d} to get there = ${ex} days of hiking → ${days} days of food planned`,
    hLeg: 'Pick the next stop on the same trail. From the mile difference and your daily distance the planner works out the hiking time, adds the buffer and rounds up to whole days. This sets the days slider automatically. Walking or hitching between trail and town is not included. Moving the days slider yourself switches to "choose days myself".',
    lacChoc: 'Allow chocolate', lacPowder: 'Allow milk powder',
    tipLacChoc: 'Allows foods flagged for lactose only because of chocolate, caramel or toffee. Chocolate is usually low in lactose and many people tolerate small amounts. Cheese, whey, cream etc. stay excluded.',
    tipLacPowder: 'Allows foods flagged only because of milk powder (e.g. Nido, Carnation, butter or cream powder). Useful with lactase pills or lactose-free powder.',
    al: { gluten: 'Gluten', erdnuss: 'Peanut', schalenfruechte: 'Tree nuts', laktose: 'Lactose / dairy', ei: 'Egg', soja: 'Soy', fisch: 'Fish / shellfish', sesam: 'Sesame' },
    searchPh: 'Search brand or flavor, e.g. snickers, knorr, mountain house …', search: 'Search …',
    allMeals: 'All meals', m_breakfast: 'Breakfast', m_lunchF: 'Lunch (wrap/filling)', m_snackF: 'Snacks', m_dinner: 'Dinner',
    m_bumpF: 'Bumps (boosters)', m_dessert: 'Dessert', m_drinkF: 'Drinks', m_other: 'Other (cans, emergency)',
    anyPrep: 'Any preparation', p_none: 'no prep', p_cold: 'cold mix', p_hot: 'hot water', p_cook: 'cook',
    allClasses: 'All classes', anyTier: 'Available: anywhere', upTo: 'up to', onlyFav: 'only ❤️',
    thBrand: 'Brand', thFlavor: 'Flavor', thClass: 'Class', thFat: 'Fat %', thSugar: 'Sugar %', thPro: 'Prot g', thCp: 'Carb/Pro', thAvail: 'Available',
    more: 'Show more', hits: 'results', nothing: 'Nothing found',
    naTitle: 'Sodium need (GearSkeptic NaK calculator)',
    naText: 'GearSkeptic estimates daily sodium need from temperature, since sweat losses rise sharply with heat. Per his sheet you need much less extra potassium (sweat Na:K ≈ 4.5:1).',
    tempCol: 'Temperature', naCol: 'Na need mg/day', naHint: 'RDA for comparison: 1500 mg Na, 3400 mg K. The planner shows how much sodium your food already provides.',
    elecTitle: 'Electrolyte products', product: 'Product', caffeine: 'Caffeine',
    scales: 'Rating scales (from Hiker Food 2.5)', availText: 'The "Available" column is my own per-brand estimate, not part of GearSkeptic\'s sheet:',
    stopsHint: 'Trail stops and store sizes are rough guidance. Always double-check on site and in FarOut, stores change every season.',
    updTitle: 'Updating the data', updText: 'The spreadsheet lives in the repo at <code>data/Hiker_Food_2.5.xlsx</code>. Drop in a new version and push; the GitHub Action rebuilds <code>foods.json</code>. Brand ratings are in <code>data/brands.csv</code>, allergen corrections in <code>data/allergen_overrides.csv</code>.',
    footer: 'Data: GearSkeptic, Hiker Food 2.5',
    meal_breakfast: 'Breakfast', meal_drink: 'Drink', meal_lunch: 'Lunch', meal_snack: 'Snacks through the day', meal_dinner: 'Dinner', meal_bump: 'Bump', meal_dessert: 'Dessert',
    t_gas: 'Gas station / general store', t_market: 'Small market / Dollar General', t_super: 'Supermarket (Safeway, Walmart …)',
    t_outdoor: 'Outdoor/hiker shop, resort store', t_online: 'Online only / mail drop',
    optAll: 'Everything (ordered online / mail drop)', optGeneric: 'Generic', optPct: 'PCT resupply (NOBO)', mile: 'Mile',
    infoAll: 'Full selection incl. online-only brands, ideal for boxes from home.', infoGeneric: 'Everything typically found up to this store size.',
    infoFD: 'freeze-dried meals available',
    kTotal: 'Total food', perDay: 'per day', kKcal: 'Calories', kDens: 'Density', kPro: 'Protein', kNa: 'Sodium', goal: 'Goal', needAt: 'Need at',
    fat: 'Fat', carbs: 'Carbs', ofSugar: 'of which sugar', protein: 'Protein',
    naGap: (gap, el) => `🧂 About ${gap} mg sodium per day missing${el ? `, e.g. ${el}` : ''}. See Electrolytes tab.`,
    weightFor: k => `Weight for ${k} kcal/day at this density`, nDays: d => `${d} days`,
    fewOptions: (s, b, d, n) => `⚠️ ${s}: limited selection (${b} breakfasts, ${d} dinners, ${n} snacks in the dataset). A box with your favorites is worth it here.`,
    day: 'Day', prot: 'prot.', addSnack: '+ Snack', pkg: 'pkg.', serv: 'serv.',
    aLess: 'less', aMore: 'more', aLock: 'Lock', aSwap: 'Other idea', aFav: 'Favorite', aDis: 'Don\'t like it, never suggest again', aDel: 'Remove', aPin: 'Must be in the plan', aPrep: 'Preparation',
    shopTitle: 'Shopping list', shopHint: 'Serving sizes per nutrition label. How many packages that is depends on servings per package.',
    package: 'package', servingOf: w => `serving of ${w}`, copy: '📋 Copy as text', print: '🖨 Print', copied: 'Shopping list copied',
    toastFav: 'Saved as favorite', toastUnfav: 'Favorite removed', toastDis: 'Won\'t be suggested again', noAlt: 'No alternative at this location',
    toastPin: 'Will be included in the next suggestion', toastUnpin: 'Pin removed', loadErr: 'Could not load data',
    csvHead: ['Day', 'Meal', 'Brand', 'Flavor', 'Count', 'Unit', 'g', 'oz', 'kcal', 'Fat g', 'Carbs g', 'Protein g', 'Na mg', 'Available'],
    minDens: 'min',
    keyWeight: 'Weight class', keyFat: 'Calories from fat', keyCp: 'Carbs : protein', keySugar: 'Calories from sugar', keyNa: 'mg sodium per kcal',
    r_w: ['Heavy', 'Moderate', 'Lightweight', 'Very light', 'Ultralight', 'Hyperlight'],
    r_fat: ['Fat low', 'Fat moderate', 'Fat good', 'Fat very good', 'Fat high'],
    r_cp: ['Carb/Pro imbalanced', 'Carb/Pro good', 'Carb/Pro optimum'],
    r_sug: ['Sugar low', 'Sugar optimum', 'Sugar: smaller portions', 'Sugar high'],
    r_na: ['Na below RDA', 'Na light', 'Na medium', 'Na heavy'],
    hStop: 'Decides which foods are eligible at all. Each brand has an estimated minimum store size where you can find it. A supermarket also has everything from gas stations and small markets. Freeze-dried meals only show up where there is an outdoor or hiker shop. "Everything" also includes online-only brands, meant for boxes from home.',
    hDays: 'How many days until your next resupply. Each day is filled to the kcal goal on its own. Below the summary you also see what 2 to 7 days would weigh at this density.',
    hProtein: 'For each day the planner projects whether the calories deliver enough protein and otherwise favors protein-rich foods. Rule of thumb for long distance: 1.2–1.6 g per kg of body weight.',
    hTemp: 'Only affects the analysis, not the food choice. GearSkeptic\'s NaK table estimates daily sodium need from temperature. The gap to your food is shown, with a matching electrolyte product as a suggestion.',
    hPrep: 'Stove: everything allowed.\nCold soak: everything except dishes that truly need simmering.\nNo prep: only items with no preparation or a cold mix.',
    hProfile: 'How the planner scores a day\'s macros.\nGearSkeptic: target approx. 60 % of calories from fat, carbs to protein 3 to 4, sugar 5–15 %.\nBalanced: classic sports nutrition, approx. 35 % fat, 47 % carbs, 18 % protein.\nWeight only: macros barely matter, only the protein goal still counts a little.',
    hLust: 'How the planner trades weight against enjoyment.\nLeft: almost only calories per weight count. The densest foods win, even if they are boring.\nRight: your ❤️ favorites and selected cravings get a big bonus, and more randomness is added so suggestions vary more. The plan usually gets a bit heavier.',
    hVar: 'How strongly repeats are penalized.\nLeft: the same product may appear on several days. Easier shopping (one big bag instead of five flavors).\nRight: repeats across days and several products of the same brand on one day are penalized hard, so you don\'t eat the same thing five times.',
    hBlocks: 'Which meals each day gets. Breakfast and dinner are always included, the rest is filled with snacks up to the kcal goal.\nBump: a splash of oil, ghee or butter powder in dinner, extremely light per calorie.\nLunch wrap: tortilla plus filling (nut butter, cheese or cured meat).',
    hCraving: 'One click: foods with this flavor get a bonus. The further right the "Cravings & favorites" slider, the stronger the effect.\nSecond click: excluded completely.\nThird click: neutral again.',
    hAllergy: 'Selected allergens are fully excluded in the planner and hidden in the food list (can be switched off). Detection uses product name and class, rather too strict than too loose, but without guarantee. Corrections go into data/allergen_overrides.csv.',
    tipGs: 'GearSkeptic profile: the planner aims for about 60 % of calories from fat (his scale: 60–70 % = "very good"), a carb-to-protein ratio of 3 to 4 and 5–15 % of calories from sugar. Result: very light plans with lots of nuts, nut butter, oil and chocolate.',
    tipBal: 'Balanced: classic endurance sports nutrition with about 35 % fat, 47 % carbs and 18 % protein. More pasta, granola, bars and dried fruit. Noticeably heavier per day, but closer to what most people are used to.',
    tipW: 'Weight only: macro split barely matters, it is mainly calories per gram. Only the protein goal is still lightly considered. Gives the lightest plans, but often very fat-heavy and one-sided.',
    tipStove: 'Stove: everything is allowed, including dishes that need simmering (e.g. Knorr Pasta Sides, rice).',
    tipCold: 'Cold soak: no stove. Instant items and freeze-dried meals soak cold in a jar. Only dishes that truly need cooking are excluded.',
    tipNo: 'No prep: only foods with no preparation or a cold mix (granola with milk powder, drinks). No freeze-dried meals.',
    tipC_lunch: 'Lunch wrap: each day gets a tortilla or bread plus a filling (nut butter, cheese or cured meat).',
    tipC_bump: 'Bump: a splash of oil, ghee or butter powder in dinner. Adds about 250 kcal at almost no weight, one of the strongest tricks from GearSkeptic\'s videos.',
    tipC_drink: 'Coffee/drink: an extra instant coffee, cocoa or milk powder drink in the morning.',
    tipC_dessert: 'Dessert: an extra freeze-dried dessert in the evening (e.g. cheesecake, apple crisp).',
    tipC_veg: 'Vegetarian: anything with meat, sausage, jerky or fish in its name is excluded.',
    tipC_fresh: 'Fresh fruit: allows raw fruit like bananas or avocados. Off by default because it is very heavy per calorie.',
    tags: { schoko: 'Chocolate', erdnuss: 'Peanut', nuss: 'Nuts', 'käse': 'Cheese', fleisch: 'Meat', scharf: 'Spicy', frucht: 'Fruity', kaffee: 'Coffee', asiatisch: 'Asian', mexikanisch: 'Mexican', pasta: 'Pasta', reis: 'Rice', kartoffel: 'Potato', kokos: 'Coconut' },
  },
};

if (window.I18N_EXTRA) {
  I18N.es = Object.assign({}, I18N.en, window.I18N_EXTRA.es);
  I18N.fr = Object.assign({}, I18N.en, window.I18N_EXTRA.fr);
}
const LANGS = ['de', 'en', 'es', 'fr'];
const LOCALE = { de: 'de-DE', en: 'en-US', es: 'es-ES', fr: 'fr-FR' };
function browserLang() {
  for (const l of (navigator.languages || [navigator.language || 'en'])) {
    const k = String(l).slice(0, 2).toLowerCase();
    if (LANGS.includes(k)) return k;
  }
  return 'en';
}

// ---------- Konstanten ----------
const OZ = 28.3495;
const TIER_ICON = { gas: '⛽', market: '🏪', super: '🛒', outdoor: '🏕', online: '📦' };
const TIER_RANK = { gas: 0, market: 1, super: 2, outdoor: 3, online: 4 };
const MEALS = ['breakfast', 'drink', 'lunch', 'snack', 'dinner', 'bump', 'dessert'];
const NA_BY_TEMP = { 15: 3300, 20: 4100, 25: 5000, 30: 6100, 35: 7500, 40: 9500 };
const W = ['var(--w0)', 'var(--w1)', 'var(--w2)', 'var(--w3)', 'var(--w4)', 'var(--w5)'];

// ---------- Zustand ----------
const LS = 'trailfood-v1';
let D = null;
const BY = new Map();
const S = load() || { settings: {}, fav: [], dis: [], pin: [], tags: {}, plan: null };
S.settings = Object.assign({
  stop: 'all', days: 4, kcal: 3500, protein: 100, temp: 25, prep: 'stove', profile: 'gs',
  lust: 40, variety: 65, lunch: true, bump: true, drink: false, dessert: false, veg: false, fresh: false,
  lang: browserLang(), units: 'metric', trail: null, dir: 'nobo', toStop: 'auto', customMi: 60, dayMi: 20, reserve: 0.5, allergens: [], lacChoc: false, lacPowder: false,
}, S.settings);
S.tags = S.tags || {};
const fav = new Set(S.fav || []), dis = new Set(S.dis || []), pin = new Set(S.pin || []);

function load() { try { return JSON.parse(localStorage.getItem(LS)); } catch (e) { return null; } }
function save() {
  S.fav = [...fav]; S.dis = [...dis]; S.pin = [...pin];
  try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { /* egal */ }
}

// ---------- Helfer ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const L = () => I18N[S.settings.lang] || I18N.en;
const t = k => L()[k] ?? k;
const IMP = () => S.settings.units === 'imperial';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (x, d = 0) => (x == null || !isFinite(x)) ? '–' : x.toLocaleString(LOCALE[S.settings.lang] || 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const pill = ([txt, lvl]) => `<span class="pill" style="background:${W[lvl]}">${esc(txt)}</span>`;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove('show'), 1800); }
const fname = f => `${f.b} ${f.n}`.trim();
const tierLabel = k => t('t_' + k);
const cls = f => { const l = S.settings.lang; if (l === 'de') return f.cde; const m = window.I18N_EXTRA && window.I18N_EXTRA.CLASSES[l]; return (m && m[f.c]) || f.cen; };
const cToF = c => Math.round(c * 9 / 5 + 32);
const lacAllowed = f => f.lac && f.lac.length && f.lac.every(r => (r === 'choc' && S.settings.lacChoc) || (r === 'powder' && S.settings.lacPowder));
const hasAllergen = f => (f.al || []).some(a => S.settings.allergens.includes(a) && !(a === 'laktose' && lacAllowed(f)));

// Einheiten
const wSmall = g => IMP() ? `${fmt(g / OZ, 1)} oz` : `${fmt(g)} g`;
const wBig = g => IMP() ? (g / OZ < 16 ? `${fmt(g / OZ, 1)} oz` : `${fmt(g / OZ / 16, 2)} lb`) : (g < 1000 ? `${fmt(g)} g` : `${fmt(g / 1000, 2)} kg`);
const wBig2 = g => IMP() ? `${fmt(g / 1000 * 2.20462, 1)} lb` : `${fmt(g / 1000, 1)} kg`;
const dens = kg => IMP() ? `${fmt(kg * OZ)} kcal/oz` : `${fmt(kg, 1)} kcal/g`;
const densLong = kg => IMP() ? `${fmt(kg * OZ)} kcal/oz` : `${fmt(kg, 2)} kcal/g`;
const densAlt = kg => IMP() ? `${fmt(kg, 2)} kcal/g` : `${fmt(kg * OZ)} kcal/oz`;
const tempLabel = c => IMP() ? `${cToF(c)} °F` : `${c} °C`;

// GearSkeptic Color Keys
const RATE = {
  weight(koz) { const r = L().r_w; return koz < 110 ? [r[0], 0] : koz < 125 ? [r[1], 1] : koz < 140 ? [r[2], 2] : koz < 155 ? [r[3], 3] : koz < 170 ? [r[4], 4] : [r[5], 5]; },
  fat(p) { const r = L().r_fat; return p < .4 ? [r[0], 0] : p < .5 ? [r[1], 2] : p < .6 ? [r[2], 3] : p < .7 ? [r[3], 5] : [r[4], 4]; },
  cp(x) { const r = L().r_cp; return x < 2.5 ? [r[0], 1] : x < 3 ? [r[1], 3] : x <= 4 ? [r[2], 5] : x <= 4.5 ? [r[1], 3] : [r[0], 1]; },
  sugar(p) { const r = L().r_sug; return p < .05 ? [r[0], 3] : p < .15 ? [r[1], 5] : p < .25 ? [r[2], 2] : [r[3], 0]; },
  na(x) { const r = L().r_na; return x < .64 ? [r[0], 1] : x < 1 ? [r[1], 3] : x <= 1.25 ? [r[2], 5] : [r[3], 2]; },
};

// ---------- Daten laden ----------
fetch('data/foods.json').then(r => r.json()).then(d => {
  D = d;
  for (const f of D.foods) {
    f.kg = f.kcal / f.g;
    f.koz = f.kg * OZ;
    f.fatp = f.fat != null ? f.fat * 9 / f.kcal : null;
    f.sugp = f.sug != null ? f.sug * 4 / f.kcal : null;
    f.cp = (f.carb != null && f.pro) ? f.carb / f.pro : null;
    f.nak = f.na != null ? f.na / f.kcal : null;
    f.tierRank = TIER_RANK[f.tier];
    f.fresh = f.c === 'Fruit' && /\braw\b|fresh/i.test(f.n);
    f.cen = f.cen || f.c;
    f.al = f.al || [];
    BY.set(f.id, f);
  }
  initUI();
  applyLang();
  if (S.plan && S.plan.days && S.plan.days.every(dd => dd.items.every(it => BY.has(it.id)))) renderPlan();
  else generate();
}).catch(err => {
  $('#summary').innerHTML = `<p class="empty">${t('loadErr')} (${esc(err.message)}).</p>`;
});

// ---------- Verfügbarkeit ----------
function currentStop() {
  const v = S.settings.stop;
  if (v === 'all') return null;
  if (v.startsWith('t:')) return { name: tierLabel(v.slice(2)), tier: v.slice(2), outdoor: false, generic: true };
  return D.stops[+v.slice(2)];
}
function availableAt(f, stop) {
  if (!stop || stop.tier === 'none') return true;
  if (f.tier === 'online') return false;
  if (f.tier === 'outdoor') return !!stop.outdoor;
  return TIER_RANK[f.tier] <= TIER_RANK[stop.tier];
}

// ---------- Pools ----------
function prepOk(f) {
  const p = S.settings.prep;
  if (p === 'stove') return true;
  if (p === 'coldsoak') return f.prep !== 'cook';
  return f.prep === 'none' || f.prep === 'cold';
}
function baseOk(f, stop) {
  if (dis.has(f.id) || !availableAt(f, stop) || !prepOk(f) || hasAllergen(f)) return false;
  if (S.settings.veg && f.tags.includes('fleisch')) return false;
  if (f.fresh && !S.settings.fresh) return false;
  if (f.tags.some(x => S.tags[x] === -1)) return false;
  return true;
}
function poolFor(meal, stop) {
  const ok = f => baseOk(f, stop);
  switch (meal) {
    case 'breakfast': return D.foods.filter(f => f.slot === 'breakfast' && ok(f));
    case 'drink': return D.foods.filter(f => f.slot === 'drink' && f.kcal >= 40 && ok(f));
    case 'bread': return D.foods.filter(f => f.c === 'Bread' && ok(f));
    case 'filling': return D.foods.filter(f => ['Nut Butter', 'Cheese', 'Meat'].includes(f.c) && ok(f));
    case 'snack': return D.foods.filter(f => (f.slot === 'snack' || (f.slot === 'lunch' && f.c !== 'Bread')) && ok(f));
    case 'dinner': return D.foods.filter(f => f.slot === 'dinner' && f.kcal >= 150 && ok(f));
    case 'bump': return D.foods.filter(f => f.slot === 'bump' && f.kg >= 6.5 && ok(f));
    case 'dessert': return D.foods.filter(f => f.slot === 'dessert' && ok(f));
  }
  return [];
}

// ---------- Portionen ----------
function defaultN(f, meal) {
  const k = f.kcal;
  switch (meal) {
    case 'breakfast': return f.src === 'dm' ? 1 : clamp(Math.round(450 / k), 1, 4);
    case 'dinner': return f.src === 'dm' ? 1 : clamp(Math.ceil(550 / k), 1, 4);
    case 'drink': return clamp(Math.round(150 / k), 1, 3);
    case 'bump': return clamp(Math.round(250 / k), 1, 4);
    case 'bread': case 'filling': case 'lunch': return clamp(Math.round(300 / k), 1, 4);
    case 'dessert': return 1;
    default: return k > 600 ? 1 : clamp(Math.round(280 / k), 1, 4);
  }
}

// ---------- Bewertung ----------
let DAY_BRANDS = new Map();
function emptyT() { return { kcal: 0, g: 0, fat: 0, carb: 0, pro: 0, sug: 0, fib: 0, na: 0, k: 0 }; }
function addT(T, f, n, sign = 1) {
  for (const key of ['kcal', 'g', 'fat', 'carb', 'pro', 'sug', 'fib', 'na', 'k']) T[key] += sign * n * (f[key] || 0);
  return T;
}
const rangePen = (x, a, b) => x < a ? a - x : (x > b ? x - b : 0);
function penalty(T) {
  const st = S.settings;
  if (T.kcal <= 0) return 0;
  const fatp = T.fat * 9 / T.kcal, sugp = T.sug * 4 / T.kcal, prop = T.pro * 4 / T.kcal, carbp = T.carb * 4 / T.kcal;
  const cp = T.carb / Math.max(T.pro, 1);
  const proPen = Math.max(0, (st.protein - T.pro / T.kcal * st.kcal) / st.protein);
  if (st.profile === 'gs') return Math.abs(fatp - .62) * 1.6 + rangePen(cp, 3, 4) / 3 + rangePen(sugp, .05, .15) * 3 + proPen * 1.2;
  if (st.profile === 'bal') return Math.abs(fatp - .35) * 1.5 + Math.abs(carbp - .47) + Math.abs(prop - .18) * 2 + proPen;
  return proPen * .5;
}
function prefOf(f) {
  let tg = 0;
  for (const x of f.tags) if (S.tags[x] === 1) tg += .7;
  return (fav.has(f.id) ? 1.2 : 0) + Math.min(tg, 1.4);
}
function weights() {
  const l = S.settings.lust / 100, v = S.settings.variety / 100;
  return { wW: .6 + 1.8 * (1 - l), wB: S.settings.profile === 'weight' ? .6 : 1.4, wP: .25 + 1.9 * l, wV: .1 + 1.6 * v, noise: .12 + .55 * l };
}
function value(f, n, T, used, meal, w) {
  const T2 = addT({ ...T }, f, n);
  const cap = { breakfast: .28, dinner: .38, dessert: .15, drink: .1, bump: .1 }[meal];
  const over = cap ? Math.max(0, f.kcal * n - cap * S.settings.kcal) / (cap * S.settings.kcal) : 0;
  return w.wW * (T2.kcal / T2.g - 4) / 2
    - w.wB * (penalty(T2) + over)
    + w.wP * prefOf(f)
    - w.wV * (used.get(f.id) || 0)
    - w.wV * .9 * (DAY_BRANDS.get(f.b) || 0)
    + w.noise * Math.random();
}
function pick(pool, meal, T, used, exclude, w, maxKcal) {
  let best = null, bestV = -Infinity;
  for (const f of pool) {
    if (exclude.has(f.id)) continue;
    let n = defaultN(f, meal === 'bread' || meal === 'filling' ? 'lunch' : meal);
    if (maxKcal && meal === 'snack') n = clamp(Math.min(n, Math.ceil(maxKcal / f.kcal)), 1, 4);
    const v = value(f, n, T, used, meal, w);
    if (v > bestV) { bestV = v; best = { f, n }; }
  }
  return best;
}
function setDayBrands(day, skip = -1) {
  DAY_BRANDS = new Map();
  day.items.forEach((x, k) => { if (k !== skip) { const b = BY.get(x.id).b; DAY_BRANDS.set(b, (DAY_BRANDS.get(b) || 0) + 1); } });
}

// ---------- Planer ----------
function generate() {
  const st = S.settings, stop = currentStop(), w = weights();
  const old = (S.plan && S.plan.days) || [];
  const used = new Map(), days = [], pools = {};
  for (const m of ['breakfast', 'drink', 'bread', 'filling', 'snack', 'dinner', 'bump', 'dessert']) pools[m] = poolFor(m, stop);
  const pinned = [...pin].map(id => BY.get(id)).filter(f => f && availableAt(f, stop) && !hasAllergen(f));
  old.slice(0, st.days).forEach(d => d.items.filter(i => i.locked).forEach(i => used.set(i.id, (used.get(i.id) || 0) + 1)));

  for (let di = 0; di < st.days; di++) {
    const items = (old[di] ? old[di].items.filter(i => i.locked && BY.has(i.id)) : []).map(i => ({ ...i }));
    const T = emptyT();
    items.forEach(i => addT(T, BY.get(i.id), i.n));
    const inDay = new Set(items.map(i => i.id));
    setDayBrands({ items });
    const hasMeal = m => items.some(i => i.meal === m);
    const put = (meal, r) => {
      if (!r) return;
      items.push({ id: r.f.id, n: r.n, meal, locked: false });
      addT(T, r.f, r.n); inDay.add(r.f.id); used.set(r.f.id, (used.get(r.f.id) || 0) + 1);
      DAY_BRANDS.set(r.f.b, (DAY_BRANDS.get(r.f.b) || 0) + 1);
    };
    pinned.forEach((f, i) => {
      if (i % st.days !== di || inDay.has(f.id)) return;
      const meal = ['breakfast', 'dinner', 'drink', 'bump', 'dessert'].includes(f.slot) ? f.slot : 'snack';
      put(meal, { f, n: defaultN(f, meal) });
    });
    if (!hasMeal('breakfast')) put('breakfast', pick(pools.breakfast, 'breakfast', T, used, inDay, w));
    if (st.drink && !hasMeal('drink')) put('drink', pick(pools.drink, 'drink', T, used, inDay, w));
    if (st.lunch && !hasMeal('lunch')) {
      put('lunch', pick(pools.bread, 'bread', T, used, inDay, w));
      put('lunch', pick(pools.filling, 'filling', T, used, inDay, w));
    }
    if (!hasMeal('dinner')) put('dinner', pick(pools.dinner, 'dinner', T, used, inDay, w));
    if (st.bump && !hasMeal('bump')) put('bump', pick(pools.bump, 'bump', T, used, inDay, w));
    if (st.dessert && !hasMeal('dessert')) put('dessert', pick(pools.dessert, 'dessert', T, used, inDay, w));
    let guard = 0;
    while (T.kcal < st.kcal * .97 && guard++ < 16) {
      const rest = st.kcal - T.kcal;
      if (rest < 90) break;
      const r = pick(pools.snack, 'snack', T, used, inDay, w, rest);
      if (!r) break;
      put('snack', r);
    }
    days.push({ items });
  }
  S.plan = { days, stop: st.stop };
  save();
  renderPlan();
}

function swapItem(di, ii) {
  const day = S.plan.days[di], it = day.items[ii], f0 = BY.get(it.id);
  const stop = currentStop(), w = weights();
  const meal = it.meal === 'lunch' ? (f0.c === 'Bread' ? 'bread' : 'filling') : it.meal;
  const pool = poolFor(meal, stop);
  const T = emptyT();
  day.items.forEach((x, k) => { if (k !== ii) addT(T, BY.get(x.id), x.n); });
  const used = new Map();
  S.plan.days.forEach(d => d.items.forEach(x => used.set(x.id, (used.get(x.id) || 0) + 1)));
  const ex = new Set(day.items.map(x => x.id));
  setDayBrands(day, ii);
  const scored = [];
  for (const f of pool) {
    if (ex.has(f.id)) continue;
    let n = defaultN(f, meal === 'bread' || meal === 'filling' ? 'lunch' : meal);
    if (meal === 'snack') n = clamp(Math.round(f0.kcal * it.n / f.kcal), 1, 4);
    scored.push({ f, n, v: value(f, n, T, used, meal, w) });
  }
  if (!scored.length) { toast(t('noAlt')); return; }
  scored.sort((a, b) => b.v - a.v);
  const r = scored[Math.floor(Math.random() * Math.min(5, scored.length))];
  day.items[ii] = { id: r.f.id, n: r.n, meal: it.meal, locked: false };
  save(); renderPlan();
}

// ---------- Rendern: Plan ----------
function planTotals() {
  const T = emptyT();
  S.plan.days.forEach(d => d.items.forEach(i => addT(T, BY.get(i.id), i.n)));
  return T;
}
function bestElectrolyte(stop) {
  const list = (D.electrolytes || []).filter(e => e.na > 100 && (!stop || e.tier !== 'online'));
  list.sort((a, b) => (b.na || 0) - (a.na || 0));
  return list.find(e => /lmnt|liquid i\.?v|nuun|skratch|gatorlyte|salt/i.test(e.b + ' ' + e.n)) || list[0];
}
function renderSummary() {
  const st = S.settings, stop = currentStop();
  const T = planTotals(), nd = S.plan.days.length;
  if (!T.kcal) { $('#summary').innerHTML = `<p class="empty">${t('nothing')}</p>`; return; }
  const kgd = T.kcal / T.g, koz = kgd * OZ;
  const fatp = T.fat * 9 / T.kcal, carbp = T.carb * 4 / T.kcal, prop = T.pro * 4 / T.kcal, sugp = T.sug * 4 / T.kcal;
  const naNeed = NA_BY_TEMP[st.temp], naDay = T.na / nd, proDay = T.pro / nd;
  const naGap = Math.max(0, naNeed - naDay);
  const el = bestElectrolyte(stop);
  const elTxt = el ? `${fmt(naGap / el.na, 1)}× ${esc(el.b)} ${esc(el.n)} (${fmt(el.na)} mg Na)` : '';
  const dayW = T.g / nd;
  let warn = '';
  if (stop && stop.tier === 'none') warn = `<div class="warnbox">${esc(L().boxOnly(stop.name))}</div>`;
  else if (stop) {
    const bf = poolFor('breakfast', stop).length, dn = poolFor('dinner', stop).length, sn = poolFor('snack', stop).length;
    if (bf < 5 || dn < 5 || sn < 40) warn = `<div class="warnbox">${esc(L().fewOptions(stop.name, bf, dn, sn))}</div>`;
  }
  const alSel = st.allergens.length ? `<div class="hint">🚫 ${st.allergens.map(a => esc(L().al[a])).join(', ')}: ${esc(t('allergyHint'))}</div>` : '';
  $('#summary').innerHTML = `
    <div class="kpis">
      <div class="kpi"><span>${t('kTotal')}</span><b>${wBig(T.g)}</b><small>${wSmall(dayW)} ${t('perDay')} · ${IMP() ? `${fmt(dayW / 1000, 2)} kg` : `${fmt(dayW / 453.6, 2)} lb`}</small></div>
      <div class="kpi"><span>${t('kKcal')}</span><b>${fmt(T.kcal)}</b><small>${fmt(T.kcal / nd)} kcal ${t('perDay')}</small></div>
      <div class="kpi"><span>${t('kDens')}</span><b>${densLong(kgd)}</b><small>${densAlt(kgd)} · ${pill(RATE.weight(koz))}</small></div>
      <div class="kpi"><span>${t('kPro')}</span><b>${fmt(proDay)} g</b><small>${t('goal')} ${st.protein} g ${proDay >= st.protein * .95 ? '✅' : '⚠️'}</small></div>
      <div class="kpi"><span>${t('kNa')}</span><b>${fmt(naDay)} mg</b><small>${t('needAt')} ${tempLabel(st.temp)} ≈ ${fmt(naNeed)} mg</small></div>
    </div>
    <div class="macro-bar"><i style="width:${fatp * 100}%;background:#c8752f"></i><i style="width:${carbp * 100}%;background:#d9b23a"></i><i style="width:${prop * 100}%;background:#2f6b4f"></i></div>
    <div class="legend"><span><i style="background:#c8752f"></i>${t('fat')} ${fmt(fatp * 100)} %</span><span><i style="background:#d9b23a"></i>${t('carbs')} ${fmt(carbp * 100)} % (${t('ofSugar')} ${fmt(sugp * 100)} %)</span><span><i style="background:#2f6b4f"></i>${t('protein')} ${fmt(prop * 100)} %</span></div>
    <div class="ratings">${pill(RATE.fat(fatp))}${pill(RATE.cp(T.carb / T.pro))}${pill(RATE.sugar(sugp))}${pill(RATE.na(T.na / T.kcal))}</div>
    ${naGap > 300 ? `<div class="hint">${L().naGap(fmt(naGap), elTxt)}</div>` : ''}
    ${alSel}
    <table class="resupply-table"><tr><th colspan="6">${esc(L().weightFor(fmt(st.kcal)))}</th></tr>
      <tr>${[2, 3, 4, 5, 6, 7].map(d => `<th>${L().nDays(d)}</th>`).join('')}</tr>
      <tr>${[2, 3, 4, 5, 6, 7].map(d => `<td class="${d === nd ? 'cur' : ''}">${wBig2(d * st.kcal / kgd)}</td>`).join('')}</tr></table>
    ${warn}`;
}

function alBadges(f) {
  return (f.al || []).map(a => `<span class="albadge ${S.settings.allergens.includes(a) ? 'hit' : ''}">${esc(L().al[a].split(' ')[0])}</span>`).join('');
}
function itemHTML(it, di, ii) {
  const f = BY.get(it.id);
  return `<div class="item ${it.locked ? 'locked' : ''}" data-d="${di}" data-i="${ii}">
    <div class="nm">${esc(f.b)} <small>${esc(f.n)}</small>${hasAllergen(f) ? alBadges(f) : ''}</div>
    <div class="nums">${wSmall(f.g * it.n)} · ${fmt(f.kcal * it.n)} kcal</div>
    <div class="acts">
      <span class="qty"><button data-a="minus" title="${t('aLess')}">−</button>${it.n}× ${f.unit === 'Packung' ? t('pkg') : t('serv')}<button data-a="plus" title="${t('aMore')}">+</button></span>
      <span class="pill" style="background:${W[RATE.weight(f.koz)[1]]}">${dens(f.kg)}</span>
      <span class="tier" title="${esc(tierLabel(f.tier))}">${TIER_ICON[f.tier]}</span>
      ${f.prep !== 'none' ? `<span class="tier" title="${t('aPrep')}: ${t('p_' + f.prep)}">${f.prep === 'cold' ? '🥣' : '🔥'}</span>` : ''}
      <span style="flex:1"></span>
      <button data-a="lock" title="${t('aLock')}">${it.locked ? '🔒' : '🔓'}</button>
      <button data-a="swap" title="${t('aSwap')}">🔄</button>
      <button data-a="fav" title="${t('aFav')}">${fav.has(f.id) ? '❤️' : '🤍'}</button>
      <button data-a="dis" title="${t('aDis')}">👎</button>
      <button data-a="del" title="${t('aDel')}">✕</button>
    </div>
  </div>`;
}
function renderDays() {
  const st = S.settings;
  $('#days').innerHTML = S.plan.days.map((d, di) => {
    const T = emptyT(); d.items.forEach(i => addT(T, BY.get(i.id), i.n));
    const groups = MEALS.map(m => {
      const its = d.items.map((it, ii) => [it, ii]).filter(([it]) => it.meal === m);
      return its.length ? `<div class="meal">${t('meal_' + m)}</div>` + its.map(([it, ii]) => itemHTML(it, di, ii)).join('') : '';
    }).join('');
    return `<div class="card day">
      <div class="day-head"><h3>${t('day')} ${di + 1}</h3><span class="meta">${fmt(T.kcal)} kcal · ${wBig(T.g)} · ${T.g ? densLong(T.kcal / T.g) : '–'} · ${fmt(T.pro)} g ${t('prot')}</span></div>
      ${groups}
      <div style="display:flex;gap:6px;margin-top:6px"><button class="ghost" data-add="${di}">${t('addSnack')}</button></div>
      <div class="daybar"><i style="width:${clamp(T.kcal / st.kcal * 100, 0, 100)}%"></i></div>
    </div>`;
  }).join('');
}
function shoppingList() {
  const agg = new Map();
  S.plan.days.forEach(d => d.items.forEach(i => agg.set(i.id, (agg.get(i.id) || 0) + i.n)));
  return [...agg.entries()].map(([id, n]) => ({ f: BY.get(id), n }))
    .sort((x, y) => x.f.tierRank - y.f.tierRank || fname(x.f).localeCompare(fname(y.f)));
}
function renderShopping() {
  const list = shoppingList(), byTier = {};
  list.forEach(r => (byTier[r.f.tier] = byTier[r.f.tier] || []).push(r));
  const html = Object.keys(TIER_RANK).filter(k => byTier[k]).map(k => `
    <div class="shop-group"><h3>${TIER_ICON[k]} ${tierLabel(k)}</h3>
    <table class="shop">${byTier[k].map(r => `<tr>
      <td>${esc(r.f.b)} <small>${esc(r.f.n)}</small></td>
      <td class="num">${r.n}× ${r.f.unit === 'Packung' ? t('package') : L().servingOf(wSmall(r.f.g))}</td>
      <td class="num">${wSmall(r.f.g * r.n)}</td><td class="num">${fmt(r.f.kcal * r.n)} kcal</td></tr>`).join('')}
    </table></div>`).join('');
  $('#shopping').innerHTML = `<h2>${t('shopTitle')}</h2><p class="hint">${t('shopHint')}</p>${html}
    <div class="shop-actions"><button class="ghost" id="b-copy">${t('copy')}</button><button class="ghost" id="b-csv">⬇️ CSV</button><button class="ghost" id="b-print">${t('print')}</button></div>`;
  $('#b-copy').onclick = () => {
    const T = planTotals();
    const lines = [`Resupply ${S.plan.days.length} ${t('days')} · ${fmt(T.kcal)} kcal · ${wBig(T.g)}`, ''];
    list.forEach(r => lines.push(`[ ] ${r.n}× ${fname(r.f)} (${wSmall(r.f.g * r.n)}, ${fmt(r.f.kcal * r.n)} kcal) ${TIER_ICON[r.f.tier]}`));
    navigator.clipboard.writeText(lines.join('\n')).then(() => toast(t('copied')));
  };
  $('#b-csv').onclick = () => {
    const rows = [L().csvHead];
    S.plan.days.forEach((d, di) => d.items.forEach(i => {
      const f = BY.get(i.id);
      rows.push([di + 1, t('meal_' + i.meal), f.b, f.n, i.n, f.unit === 'Packung' ? t('package') : t('serv'), Math.round(f.g * i.n), (f.g * i.n / OZ).toFixed(1), Math.round(f.kcal * i.n),
        Math.round((f.fat || 0) * i.n), Math.round((f.carb || 0) * i.n), Math.round((f.pro || 0) * i.n), Math.round((f.na || 0) * i.n), tierLabel(f.tier)]);
    }));
    const sep = S.settings.lang === 'en' ? ',' : ';';
    const csv = rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(sep)).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' }));
    a.download = `resupply-${S.plan.days.length}d.csv`; a.click();
  };
  $('#b-print').onclick = () => window.print();
}
function renderPlan() {
  if (!S.plan || !S.plan.days.length) return;
  renderSummary(); renderDays(); renderShopping();
}

function onPlanClick(e) {
  const add = e.target.closest('[data-add]');
  if (add) {
    const day = S.plan.days[+add.dataset.add];
    const T = emptyT(); day.items.forEach(i => addT(T, BY.get(i.id), i.n));
    const used = new Map(); S.plan.days.forEach(d => d.items.forEach(x => used.set(x.id, (used.get(x.id) || 0) + 1)));
    setDayBrands(day);
    const r = pick(poolFor('snack', currentStop()), 'snack', T, used, new Set(day.items.map(i => i.id)), weights());
    if (r) day.items.push({ id: r.f.id, n: r.n, meal: 'snack', locked: false });
    save(); renderPlan(); return;
  }
  const b = e.target.closest('button[data-a]'); if (!b) return;
  const el = b.closest('.item'), di = +el.dataset.d, ii = +el.dataset.i;
  const day = S.plan.days[di], it = day.items[ii];
  switch (b.dataset.a) {
    case 'lock': it.locked = !it.locked; break;
    case 'swap': return swapItem(di, ii);
    case 'fav': fav.has(it.id) ? fav.delete(it.id) : fav.add(it.id); toast(fav.has(it.id) ? t('toastFav') : t('toastUnfav')); break;
    case 'dis': dis.add(it.id); toast(t('toastDis')); return swapItem(di, ii);
    case 'del': day.items.splice(ii, 1); break;
    case 'plus': it.n++; break;
    case 'minus': if (it.n > 1) it.n--; else day.items.splice(ii, 1); break;
  }
  save(); renderPlan();
}

// ---------- Lebensmittel-Browser ----------
const FB = { sort: 'kg', asc: false, limit: 100 };
function foodRows() {
  const q = $('#f-q').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const slot = $('#f-slot').value, c = $('#f-class').value, tier = $('#f-tier').value, prep = $('#f-prep').value;
  let min = parseFloat($('#f-min').value) || 0;
  if (IMP()) min = min / OZ;
  const onlyFav = $('#f-fav').checked, hideAl = $('#f-al').checked;
  const rows = D.foods.filter(f => {
    if (slot && f.slot !== slot) return false;
    if (c && f.c !== c) return false;
    if (tier) {
      if (tier === 'outdoor' || tier === 'online') { if (f.tier !== tier) return false; }
      else if (!(f.tierRank <= TIER_RANK[tier])) return false;
    }
    if (prep && f.prep !== prep) return false;
    if (f.kg < min) return false;
    if (onlyFav && !fav.has(f.id)) return false;
    if (hideAl && hasAllergen(f)) return false;
    if (q.length) { const s = `${f.b} ${f.n} ${f.cde} ${f.cen}`.toLowerCase(); if (!q.every(x => s.includes(x))) return false; }
    return true;
  });
  const k = FB.sort, dir = FB.asc ? 1 : -1;
  rows.sort((a, b) => {
    const x = k === 'cls' ? cls(a) : a[k], y = k === 'cls' ? cls(b) : b[k];
    if (x == null) return 1; if (y == null) return -1;
    return (typeof x === 'string' ? x.localeCompare(y) : x - y) * dir;
  });
  return rows;
}
function renderFoods() {
  if (!D) return;
  const rows = foodRows();
  $('#f-count').textContent = `${fmt(rows.length)} ${t('hits')}`;
  $('#t-foods tbody').innerHTML = rows.slice(0, FB.limit).map(f => `<tr data-id="${f.id}">
    <td class="rowacts"><button data-a="fav" class="${fav.has(f.id) ? 'on' : ''}" title="${t('aFav')}">❤️</button><button data-a="pin" class="${pin.has(f.id) ? 'on' : ''}" title="${t('aPin')}">📌</button><button data-a="dis" class="${dis.has(f.id) ? 'on' : ''}" title="${t('aDis')}">👎</button></td>
    <td>${esc(f.b)}</td><td>${esc(f.n)} ${alBadges(f)}</td><td>${esc(cls(f))}${f.prep !== 'none' ? ` <small>(${t('p_' + f.prep)})</small>` : ''}</td>
    <td class="num">${IMP() ? fmt(f.g / OZ, 1) : fmt(f.g)}</td><td class="num">${fmt(f.kcal)}</td>
    <td class="num">${IMP() ? fmt(f.kg, 2) : `<span class="cell-dens" style="background:${W[RATE.weight(f.koz)[1]]}">${fmt(f.kg, 2)}</span>`}</td>
    <td class="num">${IMP() ? `<span class="cell-dens" style="background:${W[RATE.weight(f.koz)[1]]}">${fmt(f.koz)}</span>` : fmt(f.koz)}</td>
    <td class="num">${f.fatp == null ? '–' : fmt(f.fatp * 100)}</td>
    <td class="num">${f.sugp == null ? '–' : fmt(f.sugp * 100)}</td>
    <td class="num">${fmt(f.pro, 0)}</td>
    <td class="num">${f.cp == null ? '–' : fmt(f.cp, 1)}</td>
    <td class="num">${f.nak == null ? '–' : fmt(f.nak, 2)}</td>
    <td title="${esc(tierLabel(f.tier))}">${TIER_ICON[f.tier]} <small>${esc(tierLabel(f.tier).split(' (')[0])}</small></td>
  </tr>`).join('') || `<tr><td colspan="14" class="empty">${t('nothing')}</td></tr>`;
  $('#f-more').style.display = rows.length > FB.limit ? '' : 'none';
  $$('#t-foods th').forEach(th => { th.classList.toggle('sorted', th.dataset.k === FB.sort); th.classList.toggle('asc', th.dataset.k === FB.sort && FB.asc); });
}

// ---------- Elektrolyte ----------
function renderElec() {
  const q = $('#e-q').value.trim().toLowerCase();
  const list = D.electrolytes.filter(e => !q || `${e.b} ${e.n}`.toLowerCase().includes(q)).sort((a, b) => (b.na || 0) - (a.na || 0));
  $('#t-elec tbody').innerHTML = list.map(e => `<tr><td>${esc(e.b)} <small>${esc(e.n)}</small></td><td class="num">${e.g == null ? '–' : IMP() ? fmt(e.g / OZ, 2) : fmt(e.g, 1)}</td><td class="num">${fmt(e.kcal)}</td><td class="num">${fmt(e.na)}</td><td class="num">${fmt(e.k)}</td><td class="num">${fmt(e.mg)}</td><td class="num">${e.caf ? fmt(e.caf) + ' mg' : ''}</td><td title="${esc(tierLabel(e.tier))}">${TIER_ICON[e.tier]}</td></tr>`).join('');
}

// ---------- Sprache / Einheiten anwenden ----------
function applyLang() {
  const st = S.settings;
  document.documentElement.lang = st.lang;
  const blocks = new Set($$('[data-lang]').map(el => el.dataset.lang));
  const show = blocks.has(st.lang) ? st.lang : 'en';
  $$('[data-lang]').forEach(el => { el.hidden = el.dataset.lang !== show; });
  document.title = `${t('title')} · PCT · CDT · AT · CT · AZT`;
  $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  $$('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $$('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
  $$('[data-tipkey]').forEach(el => { el.dataset.tip = t(el.dataset.tipkey); });
  $$('[data-help]').forEach(el => { el.dataset.tip = t(el.dataset.help); el.setAttribute('aria-label', t(el.dataset.help)); });
  $$('#s-lang button').forEach(b => b.classList.toggle('on', b.dataset.v === st.lang));
  $$('#s-units button').forEach(b => b.classList.toggle('on', b.dataset.v === st.units));
  $$('#s-dir button').forEach(b => b.classList.toggle('on', b.dataset.v === st.dir));

  drawTrail();

  $('#s-temp').innerHTML = Object.keys(NA_BY_TEMP).map(c => `<option value="${c}">${tempLabel(+c)}</option>`).join('');
  $('#s-temp').value = st.temp;

  drawTags();
  drawAllergens();

  const cur = $('#f-class').value;
  const classes = [...new Set(D.foods.map(f => f.c))];
  const sample = c => D.foods.find(f => f.c === c);
  $('#f-class').innerHTML = `<option value="">${t('allClasses')}</option>` + classes
    .map(c => [c, cls(sample(c))]).sort((a, b) => a[1].localeCompare(b[1])).map(([c, l]) => `<option value="${esc(c)}">${esc(l)}</option>`).join('');
  $('#f-class').value = cur;
  const curT = $('#f-tier').value;
  $('#f-tier').innerHTML = `<option value="">${t('anyTier')}</option>` +
    ['gas', 'market', 'super'].map(k => `<option value="${k}">${TIER_ICON[k]} ${k === 'gas' ? '' : t('upTo') + ' '}${tierLabel(k)}</option>`).join('') +
    ['outdoor', 'online'].map(k => `<option value="${k}">${TIER_ICON[k]} ${tierLabel(k)}</option>`).join('');
  $('#f-tier').value = curT;
  $('#f-min-label').textContent = `${t('minDens')} ${IMP() ? 'kcal/oz' : 'kcal/g'}`;
  $('#f-min').step = IMP() ? '10' : '0.5';
  $('#th-w').textContent = IMP() ? 'oz' : 'g';
  $('#th-ew').textContent = IMP() ? 'oz' : 'g';
  $('#nak-table').innerHTML = Object.entries(NA_BY_TEMP).map(([c, n]) => `<tr><td>${tempLabel(+c)}</td><td>${fmt(n)} mg</td></tr>`).join('');
  renderKeys();
  $('#tierlist').innerHTML = Object.keys(TIER_RANK).map(k => `<li>${TIER_ICON[k]} ${tierLabel(k)}</li>`).join('');

  renderElec();
  if ($('#tab-foods').classList.contains('active')) renderFoods();
  if (S.plan) renderPlan();
}
function stopInfo() {
  const s = currentStop();
  $('#stop-info').innerHTML = !s ? t('infoAll') : s.generic ? t('infoGeneric')
    : `${s.tier === 'none' ? '📦' : TIER_ICON[s.tier]} ${esc(S.settings.lang === 'de' ? s.note : (s.note_en || s.note))}${s.outdoor ? ` · 🏕 ${t('infoFD')}` : ''}`;
}
function drawTags() {
  $('#s-tags').innerHTML = Object.entries(L().tags).map(([k, l]) =>
    `<button class="chip ${S.tags[k] === 1 ? 'yes' : S.tags[k] === -1 ? 'no' : ''}" data-t="${k}">${l}</button>`).join('');
}
function drawAllergens() {
  $('#lac-opts').hidden = !S.settings.allergens.includes('laktose');
  $('#c-lacchoc').checked = !!S.settings.lacChoc; $('#c-lacpowder').checked = !!S.settings.lacPowder;
  $('#s-allergens').innerHTML = Object.entries(L().al).map(([k, l]) =>
    `<button class="chip al ${S.settings.allergens.includes(k) ? 'yes' : ''}" data-al="${k}">${S.settings.allergens.includes(k) ? '🚫 ' : ''}${l}</button>`).join('');
}
function renderKeys() {
  const l = L();
  const n = s => S.settings.lang === 'en' ? s.replace(/,/g, '.') : s;
  const tbl = (head, cols, rows) => `<table class="keytable"><tr>${[head, ...cols].map(h => `<th>${h}</th>`).join('')}</tr>${rows.join('')}</table>`;
  $('#keys').innerHTML =
    tbl(l.keyWeight, ['kcal/oz', 'kcal/g'], [['< 110', '< 3,88'], ['110–125', '3,88–4,41'], ['125–140', '4,41–4,94'], ['140–155', '4,94–5,47'], ['155–170', '5,47–6,00'], ['> 170', '> 6,00']]
      .map((r, i) => `<tr><td>${pill([l.r_w[i], i])}</td><td>${r[0]}</td><td>${n(r[1])}</td></tr>`)) +
    tbl(l.keyFat, [''], [['< 40 %', 0, 0], ['40–50 %', 1, 2], ['50–60 %', 2, 3], ['60–70 %', 3, 5], ['≥ 70 %', 4, 4]].map(r => `<tr><td>${r[0]}</td><td>${pill([l.r_fat[r[1]], r[2]])}</td></tr>`)) +
    tbl(l.keyCp, [''], [['< 2,5', 0, 1], ['2,5–2,9', 1, 3], ['3,0–4,0', 2, 5], ['4,1–4,5', 1, 3], ['> 4,5', 0, 1]].map(r => `<tr><td>${n(r[0])}</td><td>${pill([l.r_cp[r[1]], r[2]])}</td></tr>`)) +
    tbl(l.keySugar, [''], [['< 5 %', 0, 3], ['5–15 %', 1, 5], ['15–25 %', 2, 2], ['≥ 25 %', 3, 0]].map(r => `<tr><td>${r[0]}</td><td>${pill([l.r_sug[r[1]], r[2]])}</td></tr>`)) +
    tbl(l.keyNa, [''], [['< 0,64', 0, 1], ['0,64–1,00', 1, 3], ['1,00–1,25', 2, 5], ['> 1,25', 3, 2]].map(r => `<tr><td>${n(r[0])}</td><td>${pill([l.r_na[r[1]], r[2]])}</td></tr>`));
}

// ---------- Etappe: Start bis nächster Resupply ----------
const KM = 1.609344;
function legCandidates() {
  const s = currentStop();
  if (!s || s.generic || s.mile == null) return [];
  const tr = s.trail || 'PCT';
  const sobo = S.settings.dir === 'sobo';
  return D.stops.map((x, i) => [x, i]).filter(([x]) => (x.trail || 'PCT') === tr && (sobo ? x.mile < s.mile : x.mile > s.mile))
    .sort((a, b) => sobo ? b[0].mile - a[0].mile : a[0].mile - b[0].mile);
}
function trailMeta(id) { return (D.trails || []).find(x => x.id === id); }
function trailStops(id) {
  const sobo = S.settings.dir === 'sobo';
  return D.stops.map((s, i) => [s, i]).filter(([s]) => (s.trail || 'PCT') === id).sort((a, b) => sobo ? b[0].mile - a[0].mile : a[0].mile - b[0].mile);
}
function drawTrail() {
  const st = S.settings;
  if (st.trail === null || st.trail === undefined) {
    const s = st.stop && st.stop.startsWith('s:') ? D.stops[+st.stop.slice(2)] : null;
    st.trail = s ? (s.trail || 'PCT') : '';
  }
  $('#s-trail').innerHTML = `<option value="">${t('noTrail')}</option>` +
    (D.trails || []).map(x => `<option value="${x.id}">${esc(x.name)} · ${x.approx ? '~' : ''}${fmt(x.len)} mi</option>`).join('');
  $('#s-trail').value = st.trail;
  const tm = trailMeta(st.trail);
  $('#dir-box').hidden = !tm;
  if (tm) {
    const [bf, bs] = $$('#s-dir button');
    bf.textContent = `${tm.fwd}${tm.fwd === 'NOBO' ? ' ↑' : tm.fwd === 'SOBO' ? ' ↓' : ''}`;
    bs.textContent = `${tm.rev}${tm.rev === 'SOBO' ? ' ↓' : tm.rev === 'NOBO' ? ' ↑' : ''}`;
    bf.dataset.tip = tm.fwd === 'NOBO' ? t('tipNobo') : tm.fwd === 'SOBO' ? t('tipSobo') : tm.fwd;
    bs.dataset.tip = tm.rev === 'NOBO' ? t('tipNobo') : tm.rev === 'SOBO' ? t('tipSobo') : tm.rev;
  }
  const sel = $('#s-stop');
  if (tm) {
    sel.innerHTML = `<option value="all">📦 ${t('optAll')}</option>` +
      trailStops(tm.id).map(([s, i]) => `<option value="s:${i}">${s.terminus ? '🚩 ' : ''}${t('mile')} ${s.mile} · ${esc(s.name)}${s.tier === 'none' ? ' 📦' : ''}</option>`).join('');
  } else {
    sel.innerHTML = `<option value="all">📦 ${t('optAll')}</option>` +
      ['super', 'market', 'gas'].map(k => `<option value="t:${k}">${TIER_ICON[k]} ${tierLabel(k)}</option>`).join('');
  }
  if (![...sel.options].some(o => o.value === st.stop)) st.stop = 'all';
  sel.value = st.stop;
  stopInfo();
  drawLeg();
}
function drawLeg() {
  const st = S.settings, list = legCandidates();
  const s = currentStop();
  if (st.toStop === 'auto') st.toStop = list.length ? String(list[0][1]) : '';
  if (st.toStop !== '' && st.toStop !== 'custom' && !list.some(([, i]) => String(i) === String(st.toStop))) st.toStop = list.length ? String(list[0][1]) : '';
  const dist = mi => IMP() ? `${fmt(mi)} mi` : `${fmt(mi * KM)} km`;
  $('#s-to').innerHTML = `<option value="">${t('manualDays')}</option><option value="custom">📏 ${t('customLeg')}</option>` + list.map(([x, i]) =>
    `<option value="${i}">${x.terminus ? '🚩 ' : ''}${esc(x.name)} (+${dist(Math.abs(x.mile - s.mile))})${x.tier === 'none' ? ' 📦' : ''}</option>`).join('');
  $('#s-to').value = st.toStop;
  $('#custom-row').hidden = st.toStop !== 'custom';
  $('#l-custom').innerHTML = `${t('customDist')} (${IMP() ? 'mi' : 'km'})`;
  $('#s-custom').value = IMP() ? Math.round(st.customMi) : Math.round(st.customMi * KM);
  $('#l-daydist').innerHTML = `${t('dayDist')} (${IMP() ? 'mi' : 'km'})`;
  $('#s-daydist').value = IMP() ? Math.round(st.dayMi) : Math.round(st.dayMi * KM);
  $('#s-reserve').value = String(st.reserve);
  updateLeg();
}
function updateLeg() {
  const st = S.settings, s = currentStop();
  $('#custom-row').hidden = st.toStop !== 'custom';
  let mi;
  if (st.toStop === 'custom') mi = st.customMi;
  else {
    if (st.toStop === '' || !s || s.generic) { $('#leg-info').textContent = ''; return; }
    const to = D.stops[+st.toStop];
    if (!to) { $('#leg-info').textContent = ''; return; }
    mi = Math.abs(to.mile - s.mile);
  }
  const exact = mi / st.dayMi;
  const days = clamp(Math.ceil(exact + (+st.reserve) - 1e-9), 1, 14);
  st.days = days;
  $('#s-days').value = days; $('#v-days').textContent = days;
  const d = IMP() ? `${fmt(mi)} mi` : `${fmt(mi * KM)} km`;
  $('#leg-info').textContent = L().legInfo(d, fmt(exact, 1), days);
}

// ---------- Init ----------
function initUI() {
  const st = S.settings;
  $$('.tab').forEach(b => b.onclick = () => {
    $$('.tab').forEach(x => x.classList.toggle('active', x === b));
    $$('.panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + b.dataset.tab));
    if (b.dataset.tab === 'foods') renderFoods();
  });

  $$('#s-lang button').forEach(b => b.onclick = () => { st.lang = b.dataset.v; save(); applyLang(); });
  $$('#s-units button').forEach(b => b.onclick = () => {
    if (st.units === b.dataset.v) return;
    const v = parseFloat($('#f-min').value) || 0;
    st.units = b.dataset.v;
    $('#f-min').value = v ? (IMP() ? Math.round(v * OZ) : +(v / OZ).toFixed(1)) : 0;
    save(); applyLang();
  });

  $('#s-stop').onchange = e => { st.stop = e.target.value; if (st.toStop !== 'custom') st.toStop = 'auto'; stopInfo(); drawLeg(); save(); generate(); };
  $$('#s-dir button').forEach(b => b.onclick = () => {
    st.dir = b.dataset.v; if (st.toStop !== 'custom') st.toStop = 'auto';
    if (st.trail && !legCandidates().length) { const first = trailStops(st.trail)[0]; if (first) st.stop = 's:' + first[1]; }
    save(); drawTrail(); $$('#s-dir button').forEach(x => x.classList.toggle('on', x.dataset.v === st.dir)); generate(); });
  $('#s-trail').onchange = e => {
    st.trail = e.target.value;
    const first = st.trail ? trailStops(st.trail)[0] : null;
    st.stop = first ? 's:' + first[1] : 'all';
    if (st.toStop !== 'custom') st.toStop = 'auto';
    save(); drawTrail(); generate();
  };
  $('#s-custom').onchange = e => { const v = +e.target.value; if (v > 0) st.customMi = IMP() ? v : v / KM; updateLeg(); save(); generate(); };
  $('#s-to').onchange = e => { st.toStop = e.target.value; updateLeg(); save(); generate(); };
  $('#s-daydist').onchange = e => { const v = +e.target.value; if (v > 0) st.dayMi = IMP() ? v : v / KM; updateLeg(); save(); generate(); };
  $('#s-reserve').onchange = e => { st.reserve = +e.target.value; updateLeg(); save(); generate(); };
  const bindNum = (id, key) => {
    const el = $(id); el.value = st[key];
    el.onchange = () => { st[key] = +el.value; save(); generate(); };
  };
  const days = $('#s-days'); days.value = st.days; $('#v-days').textContent = st.days;
  days.oninput = () => { $('#v-days').textContent = days.value; };
  days.onchange = () => { st.days = +days.value; if (st.toStop !== '') { st.toStop = ''; $('#s-to').value = ''; $('#leg-info').textContent = ''; } save(); generate(); };
  bindNum('#s-kcal', 'kcal'); bindNum('#s-protein', 'protein'); bindNum('#s-lust', 'lust'); bindNum('#s-var', 'variety');
  $('#s-temp').onchange = e => { st.temp = +e.target.value; save(); renderPlan(); };

  const seg = (id, key) => $$(id + ' button').forEach(b => {
    b.classList.toggle('on', b.dataset.v === st[key]);
    b.onclick = () => { st[key] = b.dataset.v; $$(id + ' button').forEach(x => x.classList.toggle('on', x === b)); save(); generate(); };
  });
  seg('#s-prep', 'prep'); seg('#s-profile', 'profile');

  for (const [id, key] of [['#c-lunch', 'lunch'], ['#c-bump', 'bump'], ['#c-drink', 'drink'], ['#c-dessert', 'dessert'], ['#c-veg', 'veg'], ['#c-fresh', 'fresh']]) {
    const el = $(id); el.checked = !!st[key];
    el.onchange = () => { st[key] = el.checked; save(); generate(); };
  }

  $('#s-tags').onclick = e => {
    const b = e.target.closest('[data-t]'); if (!b) return;
    const k = b.dataset.t, v = S.tags[k];
    if (!v) S.tags[k] = 1; else if (v === 1) S.tags[k] = -1; else delete S.tags[k];
    drawTags(); save();
  };
  $('#s-allergens').onclick = e => {
    const b = e.target.closest('[data-al]'); if (!b) return;
    const k = b.dataset.al, a = st.allergens;
    st.allergens = a.includes(k) ? a.filter(x => x !== k) : [...a, k];
    // gesperrte Positionen mit neuem Allergen entsperren, damit sie ersetzt werden
    if (S.plan) S.plan.days.forEach(d => d.items.forEach(i => { if (hasAllergen(BY.get(i.id))) i.locked = false; }));
    drawAllergens(); save(); generate();
    if ($('#tab-foods').classList.contains('active')) renderFoods();
  };

  for (const [id, key] of [['#c-lacchoc', 'lacChoc'], ['#c-lacpowder', 'lacPowder']]) {
    $(id).onchange = e => { st[key] = e.target.checked; save(); generate(); if ($('#tab-foods').classList.contains('active')) renderFoods(); };
  }
  $('#btn-gen').onclick = () => { generate(); if (innerWidth < 900) $('#summary').scrollIntoView({ behavior: 'smooth' }); };
  $('#tab-plan').addEventListener('click', e => { if (e.target.closest('#days')) onPlanClick(e); });

  ['#f-q', '#f-slot', '#f-class', '#f-tier', '#f-prep', '#f-min', '#f-fav', '#f-al'].forEach(id => $(id).addEventListener('input', () => { FB.limit = 100; renderFoods(); }));
  $('#f-more').onclick = () => { FB.limit += 200; renderFoods(); };
  $$('#t-foods th[data-k]').forEach(th => th.onclick = () => {
    if (FB.sort === th.dataset.k) FB.asc = !FB.asc; else { FB.sort = th.dataset.k; FB.asc = ['b', 'n', 'cls', 'tierRank'].includes(th.dataset.k); }
    renderFoods();
  });
  $('#t-foods tbody').onclick = e => {
    const b = e.target.closest('button[data-a]'); if (!b) return;
    const id = b.closest('tr').dataset.id;
    const set = { fav, pin, dis }[b.dataset.a];
    set.has(id) ? set.delete(id) : set.add(id);
    if (b.dataset.a === 'dis' && dis.has(id)) { fav.delete(id); pin.delete(id); }
    if (b.dataset.a === 'pin') toast(pin.has(id) ? t('toastPin') : t('toastUnpin'));
    save(); renderFoods();
  };
  $('#e-q').oninput = renderElec;
}
