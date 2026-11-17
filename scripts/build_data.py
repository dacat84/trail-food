#!/usr/bin/env python3
"""Baut site/data/foods.json aus GearSkeptics Hiker_Food_2.5.xlsx.

Aufruf:  python3 scripts/build_data.py
Quellen: data/Hiker_Food_2.5.xlsx, data/brands.csv, data/item_overrides.csv, data/stops.json
"""
import csv
import json
import re
import sys
import warnings
from pathlib import Path

import openpyxl

warnings.filterwarnings("ignore")
ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
OUT = ROOT / "site" / "data"

TIERS = {"gas", "market", "super", "outdoor", "online"}

# Klassen aus GearSkeptics Tabelle -> Mahlzeit-Slot im Planer
HF_SLOT = {
    "Cereal": "breakfast", "Pastry": "breakfast",
    "Sides": "dinner", "Soup": "dinner",
    "Bump": "bump", "Drink": "drink",
    "Bar 911": "other", "Can": "other",
}
DM_SLOT = {"Breakfast": "breakfast", "Entrée": "dinner", "Side": "dinner",
           "Dessert": "dessert", "Bump": "bump", "Drink": "drink"}
LUNCH_CLASSES = {"Bread", "Cheese", "Meat", "Nut Butter", "Cracker", "Jerky"}

CLASS_DE = {
    "Bar": "Riegel", "Bar Savory": "Riegel herzhaft", "Bar 911": "Notfallriegel", "Candy": "Süßigkeiten",
    "Cereal": "Müsli/Granola", "Sides": "Beilagen/Instant", "Meat": "Fleisch/Wurst", "Nuts/Seeds": "Nüsse/Samen",
    "Trail Mix": "Trail Mix", "Fruit": "Obst", "Drink": "Getränk", "Bump": "Booster (Bump)",
    "Nut Butter": "Nussbutter", "Pastry": "Gebäck", "Cracker": "Cracker/Chips", "Cookie": "Kekse",
    "Bread": "Brot/Tortilla", "Jerky": "Jerky", "Cheese": "Käse", "Gel": "Gel/Chews", "Can": "Dose",
    "Soup": "Suppe", "Breakfast": "Frühstück (Trockenmahlzeit)", "Entrée": "Hauptgericht (Trockenmahlzeit)",
    "Side": "Beilage (Trockenmahlzeit)", "Dessert": "Dessert (Trockenmahlzeit)",
}

CLASS_EN = {"Breakfast": "Breakfast (dried meal)", "Entrée": "Entrée (dried meal)", "Side": "Side (dried meal)",
            "Dessert": "Dessert (dried meal)", "Bar 911": "Emergency bar", "Bump": "Bump (booster)", "Sides": "Sides / instant"}

TAGS = {
    "schoko": r"chocolat|cocoa|cacao|brownie|fudge|mocha|m&m|snickers|twix|reese|hershey|kitkat|nutella|oreo|milky way|3 musketeers|butterfinger|ghirardelli|lindt|dove",
    "erdnuss": r"peanut|reese|pb2|jif|skippy|nutter",
    "nuss": r"almond|cashew|hazelnut|pecan|walnut|macadamia|pistach|nut\b|nuts\b|trail mix",
    "käse": r"chees|cheddar|parmesan|mozzarella|mac &|mac and|alfredo|queso|gouda|babybel|brie",
    "fleisch": r"beef|chicken|pork|turkey|bacon|salami|sausage|jerky|venison|bison|meat|pepperoni|ham\b|chorizo|lamb|elk|tuna|salmon|sardine|spam|prosciutto|meat stick|slim jim|carne|pollo",
    "scharf": r"spicy|chili|chile|jalape|\bhot\b|sriracha|buffalo|chipotle|cajun|habanero|curry|kung pao|szechuan|diablo",
    "frucht": r"berry|apple|cherry|mango|banana|fruit|raisin|\bdate|fig\b|figs|peach|apricot|pineapple|strawberr|blueberr|lemon|cranberr|orange|raspberr|pomegran",
    "kaffee": r"coffee|espresso|mocha|starbucks|latte",
    "asiatisch": r"pad thai|teriyaki|curry|ramen|asian|kung pao|sweet and sour|szechuan|orange chicken|lo mein|pho\b|thai|korean|bibimbap|noodle bowl",
    "mexikanisch": r"burrito|taco|mexic|fiesta|enchilada|chili|fajita|santa fe|tex|black bean|quesadilla|salsa",
    "pasta": r"pasta|mac &|mac and|lasagna|spaghetti|alfredo|noodle|penne|rotini|stroganoff|ramen",
    "reis": r"\brice\b|risotto|jambalaya|paella|biryani",
    "kartoffel": r"potato|mashed|hash brown|idahoan",
    "kokos": r"coconut",
}
MEAT_CLASSES = {"Meat", "Jerky"}

# Allergene/Unverträglichkeiten: Heuristik über Name + Kategorie (keine Zutatenlisten in der Quelle!)
ALLERGENS = {
    "gluten": (r"wheat|flour|tortilla|bread|\bbuns?\b|bagel|pasta|noodle|ramen|macaroni|mac &|mac and|spaghetti|penne|rotini|lasagna|couscous|"
               r"cracker|pretzel|cookie|wafer|waffle|biscuit|pizza|crust|pop.?tart|oreo|graham|barley|\brye\b|seitan|stuffing|stove top|"
               r"cereal|granola|\boats?\b|oatmeal|muesli|teriyaki|soy sauce|brownie|cake|\bpie\b|donut|danish|pastry|croissant|newton|ritz|"
               r"triscuit|cheez-it|\bwraps?\b|pita|kit ?kat|twix|malt|clif|nature valley|pocky|ravioli|dumpling|gravy|breaded|crisp rice|"
               r"rice krispies|special k|kashi|honey stinger waffle|stroopwafel|bulgur|farro|orzo|udon|lo mein|chow mein|fiber one|nutri-grain|"
               r"little debbie|hostess|keebler|nabisco|lance|pepperidge|club\b|saltine|goldfish|wheat thins|fig",
               {"Bread", "Cracker", "Cookie", "Pastry", "Cereal"},
               r"gluten.?free|grain.?free|\bgf\b|paleo|keto|almond flour"),
    "erdnuss": (r"peanut|\bpb2\b|pb ?& ?j|reese|\bjif\b|skippy|nutter|snickers|payday|butterfinger|satay|trail mix|goober|boost|planters", set(), None),
    "schalenfruechte": (r"almond|cashew|hazelnut|filbert|pecan|walnut|macadamia|pistach|brazil|nutella|praline|marzipan|trail mix|mixed nuts|"
                        r"\bnuts?\b|pesto|larabar|nut butter|nut bar|kind\b|justin|frangipane|gianduja|ferrero|baklava", {"Nuts/Seeds", "Nut Butter", "Trail Mix"},
                        None),
    "laktose": (r"milk|cheese|chees|cheddar|parmesan|mozzarella|monterey|queso|gouda|brie|whey|casein|butter(?! ?(?:fly|scotch))|\bcream|creamy|"
                r"yogurt|yoghurt|alfredo|stroganoff|lasagna|\bmac\b|mac &|enchilada|quesadilla|pizza|gravy|ghee|nido|carnation|swiss miss|latte|mocha|"
                r"cappuccino|chocolate|choc\b|cocoa|caramel|toffee|nougat|fudge|truffle|snickers|m&m|twix|milky way|3 musketeers|kit ?kat|hershey|"
                r"reese|butterfinger|almond joy|heath\b|dove|lindt|ghirardelli|cadbury|babybel|laughing cow|tillamook|cheez|cheetos|doritos|sour cream|"
                r"ranch|protein bar|quest|pure protein|premier protein|power crunch|muscle milk|met-rx|atkins|think ?thin|builder|ice cream|custard|"
                r"pudding|cheesecake|white chocolate|biscuits",
                {"Cheese"},
                r"dairy.?free|lactose.?free|vegan|non.?dairy|plant.?based|oat milk|coconut milk|almond milk|cocoa butter|peanut butter|nut butter|"
                r"almond butter|cashew butter|sun ?butter|seed butter|apple butter|wow butter"),
    "ei": (r"\beggs?\b|mayo|ovaeasy|scramble|meringue|custard|carbonara|pad thai|frittata|omelet|quiche|egg noodle", set(), r"eggless|egg.?free|vegan"),
    "soja": (r"\bsoy|tofu|edamame|\btvp\b|textured vegetable|miso|tempeh|teriyaki|builder|vegan protein|plant protein", set(), r"soy.?free"),
    "fisch": (r"tuna|salmon|sardine|anchov|\bcod\b|fish|shrimp|prawn|crab|lobster|clam|oyster|mussel|seafood|mackerel|pollock|bonito|paella|"
              r"chicken of the sea|starkist|kipper|herring|scallop", set(), None),
    "sesam": (r"sesame|tahini|hummus|halva|halwa|furikake|bagel", set(), r"sesame.?free"),
}



def num(v):
    if v is None or v == "" or isinstance(v, str):
        return None
    try:
        f = float(v)
    except (TypeError, ValueError):
        return None
    return f


def load_brands():
    m = {}
    with open(DATA / "brands.csv", newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            t = r["tier"].strip()
            if t in TIERS:
                m[r["brand"].strip()] = t
    return m


def load_overrides():
    m = {}
    p = DATA / "item_overrides.csv"
    if p.exists():
        with open(p, newline="", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                m[(r["brand"].strip(), r["flavor"].strip())] = r["tier"].strip()
    return m


def allergens_for(brand, flavor, cls):
    text = f"{brand} {flavor}".lower()
    out = []
    for key, (rx, classes, exempt) in ALLERGENS.items():
        hit = bool(re.search(rx, text)) or cls in classes
        if key == "schalenfruechte" and cls == "Nuts/Seeds" and re.search(r"sunflower|pumpkin|pepita|chia|hemp|flax|sesame|seeds?\b", text) \
                and not re.search(r"almond|cashew|hazelnut|pecan|walnut|macadamia|pistach|brazil|mixed nuts", text):
            hit = False
        if key == "schalenfruechte" and re.search(r"peanut", text) and not re.search(r"almond|cashew|hazelnut|pecan|walnut|macadamia|pistach|mixed|trail", text):
            hit = bool(cls in {"Trail Mix"})
        if hit and exempt and re.search(exempt, text):
            # dunkle/vegane Schokolade usw. nur befreien, wenn keine eindeutigen Milchwörter drinstehen
            if not (key == "laktose" and re.search(r"milk chocolate|cheese|whey|cream cheese|yogurt", text)):
                hit = False
        if hit:
            out.append(key)
    return out


def load_allergen_overrides():
    rules = []
    p = DATA / "allergen_overrides.csv"
    if p.exists():
        with open(p, newline="", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                rules.append((r["brand"].strip(), r["flavor"].strip() or "*", (r["add"] or "").split(), (r["remove"] or "").split()))
    return rules


ALLERGEN_RULES = None


def apply_allergen_overrides(brand, flavor, al):
    global ALLERGEN_RULES
    if ALLERGEN_RULES is None:
        ALLERGEN_RULES = load_allergen_overrides()
    s = list(al)
    for b, fl, add, rem in ALLERGEN_RULES:
        if b == brand and (fl == "*" or fl == flavor):
            s = [a for a in s if a not in rem] + [a for a in add if a not in s]
    return s


LAC_CHOC = (r"milk chocolate|white chocolate|chocolate|choc\b|cocoa|cacao|caramel|toffee|nougat|fudge|truffle|mocha|snickers|m&m|twix|milky way|"
            r"3 musketeers|kit ?kat|hershey|reese|butterfinger|almond joy|heath\b|dove|lindt|ghirardelli|cadbury|carob")
LAC_POWDER = (r"whole milk powder|milk powder|powdered milk|dry milk|nonfat milk|nido|heavy cream powder|cream powder|butter powder|"
              r"carnation|swiss miss|instant breakfast|sour cream powder|cheese powder|cheddar cheese powder")
LAC_OTHER = (r"milk|cheese|chees|cheddar|parmesan|mozzarella|monterey|queso|gouda|brie|whey|casein|butter(?! ?(?:fly|scotch))|\bcream|creamy|"
             r"yogurt|yoghurt|alfredo|stroganoff|lasagna|\bmac\b|mac &|enchilada|quesadilla|pizza|gravy|ghee|latte|cappuccino|babybel|laughing cow|"
             r"tillamook|cheez|cheetos|doritos|ranch|protein bar|quest|pure protein|premier protein|power crunch|muscle milk|met-rx|atkins|"
             r"think ?thin|builder|ice cream|custard|pudding|cheesecake|biscuits")
NON_DAIRY = r"peanut butter|nut butter|almond butter|cashew butter|sun ?butter|seed butter|apple butter|wow butter|cocoa butter|coconut milk|coconut cream|almond milk|oat milk"


def lactose_reasons(brand, flavor, cls):
    """Warum ein Produkt als laktosehaltig gilt: choc (nur Schokolade), powder (Milchpulver), other (sonstige Milchprodukte)."""
    text = f"{brand} {flavor}".lower()
    text = re.sub(NON_DAIRY, " ", text)
    reasons = set()
    if re.search(LAC_POWDER, text):
        reasons.add("powder")
        text = re.sub(LAC_POWDER, " ", text)
    if re.search(LAC_CHOC, text):
        reasons.add("choc")
        text = re.sub(LAC_CHOC, " ", text)
    if cls == "Cheese" or re.search(LAC_OTHER, text):
        reasons.add("other")
    return sorted(reasons)


def tags_for(brand, flavor, cls):
    text = f"{brand} {flavor}".lower()
    t = [k for k, rx in TAGS.items() if re.search(rx, text)]
    if cls in MEAT_CLASSES and "fleisch" not in t:
        t.append("fleisch")
    return t


def r1(x):
    return None if x is None else round(x, 1)


def main():
    xlsx = DATA / "Hiker_Food_2.5.xlsx"
    wb = openpyxl.load_workbook(xlsx, data_only=True)
    brands = load_brands()
    overrides = load_overrides()
    unknown = set()
    foods = []

    def add(src, row, h, servings=1, prep=None, slot=None):
        g = lambda k: row[h[k]] if k in h else None
        brand = (g("Brand") or "").strip()
        flavor = (str(g("Flavor") or "")).strip()
        cls = (g("Class") or "").strip()
        sg = num(g("Serv(g)"))
        kcal = num(g("Cal/Serv"))
        if not brand or not sg or not kcal or sg <= 0 or kcal <= 0:
            return
        # Trockenmahlzeiten: ganze Packung als Einheit, außer bei Großgebinden
        unit_serv = 1
        if src == "dm" and servings and servings > 1 and kcal * servings <= 1600:
            unit_serv = servings
        tier = overrides.get((brand, flavor)) or brands.get(brand)
        if not tier:
            unknown.add(brand)
            tier = "online"
        if slot is None:
            if src == "hf":
                slot = HF_SLOT.get(cls, "lunch" if cls in LUNCH_CLASSES else "snack")
            else:
                slot = DM_SLOT.get(cls, "other")
        if prep is None:
            prep = "hot" if cls in ("Sides", "Soup") else ("cold" if cls == "Cereal" else "none")
        f = lambda k: r1((num(g(k)) or 0) * unit_serv) if num(g(k)) is not None else None
        foods.append({
            "id": f"{src}{len(foods)}",
            "src": src,
            "b": brand,
            "n": flavor,
            "c": cls,
            "cde": CLASS_DE.get(cls, cls),
            "cen": CLASS_EN.get(cls, cls),
            "slot": slot,
            "prep": prep,
            "g": r1(sg * unit_serv),
            "kcal": r1(kcal * unit_serv),
            "fat": f("Fat"), "carb": f("Carbs"), "fib": f("Fiber"), "sug": f("Sugar"),
            "pro": f("Protein"), "na": f("Na"), "k": f("K"),
            "us": unit_serv,
            "unit": "Packung" if unit_serv > 1 or src == "dm" else "Portion",
            "tier": tier,
            "tags": tags_for(brand, flavor, cls),
            "al": apply_allergen_overrides(brand, flavor, allergens_for(brand, flavor, cls)),
            "lac": lactose_reasons(brand, flavor, cls),
        })

    def finish():
        for f in foods:
            if "laktose" not in f["al"]:
                f["lac"] = []
            elif not f["lac"]:
                f["lac"] = ["other"]

    ws = wb["Hiker Food"]
    rows = list(ws.iter_rows(values_only=True))
    h = {v: i for i, v in enumerate(rows[0]) if v}
    for row in rows[1:]:
        add("hf", row, h)

    ws = wb["Dried Meals"]
    rows = list(ws.iter_rows(values_only=True))
    h = {v: i for i, v in enumerate(rows[0]) if v}
    for row in rows[1:]:
        prep = (row[h["Prep"]] or "hot").strip().lower()
        add("dm", row, h, servings=num(row[h["Servings"]]) or 1, prep=prep)

    finish()
    electrolytes = []
    ws = wb["Electrolytes"]
    rows = list(ws.iter_rows(values_only=True))
    h = {v: i for i, v in enumerate(rows[0]) if v}
    for row in rows[1:]:
        if not row[h["Brand"]]:
            continue
        electrolytes.append({
            "b": row[h["Brand"]].strip(), "n": str(row[h["Flavor"]] or "").strip(),
            "g": r1(num(row[h["Serv (g)"]])), "kcal": r1(num(row[h["Cal/Serv"]])),
            "na": r1(num(row[h["Na+"]])), "k": r1(num(row[h["K+"]])),
            "mg": r1(num(row[h["Mg"]])), "caf": r1(num(row[h["Caffeine"]])),
            "tier": brands.get(row[h["Brand"]].strip(), "online"),
        })

    stops = json.loads((DATA / "stops.json").read_text(encoding="utf-8"))
    trails = json.loads((DATA / "trails.json").read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    payload = {
        "source": "GearSkeptic – Hiker Food 2.5",
        "foods": foods,
        "electrolytes": electrolytes,
        "stops": stops,
        "trails": trails,
    }
    (OUT / "foods.json").write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{len(foods)} Lebensmittel, {len(electrolytes)} Elektrolyte, {len(stops)} Stops -> {OUT/'foods.json'}")
    if unknown:
        print("Marken ohne Eintrag in brands.csv (als 'online' gewertet):", ", ".join(sorted(unknown)), file=sys.stderr)


if __name__ == "__main__":
    main()
