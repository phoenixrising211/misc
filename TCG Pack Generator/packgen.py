import random
import math

with open('cardtypes.txt') as f:
    cardtypes = f.read().splitlines()
with open('permanents.txt') as f:
    permanents = f.read().splitlines()
with open('effects.txt') as f:
    effects = f.read().splitlines()
with open('statics.txt') as f:
    statics = f.read().splitlines()
with open('conditions.txt') as f:
    conditions = f.read().splitlines()
with open('triggers.txt') as f:
    triggers = f.read().splitlines()
    
def getRarity(num):
    if num == 1:
        return "Common"
    elif num == 2:
        return "Uncommon"
    elif num == 3:
        return "Rare"
    elif num == 4:
        return "Mythic Rare"
    
def generatePermanent():
    rng = random.randint(0,5)
    if rng == 0:
        [static, value] = random.choice(statics).split("|")
        return static.capitalize() + ".", value
    elif rng == 1:
        [condition, cvalue] = random.choice(conditions).split("|")
        [static, svalue] = random.choice(statics).split("|")
        return "As long as " + condition + ", " + static + ".", float(cvalue) * float(svalue)
    elif rng == 2:
        [trigger, tvalue] = random.choice(triggers).split("|")
        [effect, evalue] = random.choice(effects).split("|")
        return trigger + ", " + effect + ".", float(tvalue) * float(evalue)
    elif rng == 3:
        [trigger, tvalue] = random.choice(triggers).split("|")
        [condition, cvalue] = random.choice(conditions).split("|")
        [effect, evalue] = random.choice(effects).split("|")
        return trigger + ", if " + condition + ", " + effect + ".", float(tvalue) * float(cvalue) * float(evalue)
    elif rng == 4:
        [effect, evalue] = random.choice(effects).split("|")
        cost = getCost(float(evalue) + 3.5)
        return cost + ": " + effect.capitalize() + ".", 1.5
    elif rng == 5:
        [condition, cvalue] = random.choice(conditions).split("|")
        [effect, evalue] = random.choice(effects).split("|")
        cost = getCost((float(cvalue) * float(evalue)) + 3.5)
        return cost + ": " + "If " + condition + ", " + effect + ".", 1.5

def generateEffect():
    [effect, value] = random.choice(effects).split("|")
    #do stuff
    return effect.capitalize() + ".", value

def generatePT():
    power = random.randint(0,9)
    toughness = random.randint(1,9)
    pt = str(power) + "/" + str(toughness)
    value = (power + toughness)/2
    return pt, value
    
def translateCost(value):
    return round(math.log(value, math.sqrt(math.sqrt(2))))/2

def getColorlessCost(value):
    return round(translateCost(value))

def getCost(value):
    cost = translateCost(value)
    if cost < 0:
        cost = 0
    elif cost == 0.5:
        cost = 1
    elif cost == 1.5:
        cost = "$c"
    elif cost == 2:
        cost = "1$c"
    elif cost == 3:
        cost = "$c$c"
    elif cost > 1.5 and int(cost) == cost:
        cost = str(int(cost - 3)) + "$c$c"
    elif cost > 1.5:
        cost = str(int(cost - 1.5)) + "$c"
    else:
        cost = int(cost)
    cost = str(cost).replace("$c", random.choice(["W","U","B","R","G"]))
    return cost

def generateCard(rarity, isFoil=False):
    card = "$f$n - $manacost\n"
    card += "$t - $r\n"
        
    if isFoil:
        card = card.replace("$f", "Foil ")
    else:
        card = card.replace("$f", "")
        
    cardtype = random.choice(cardtypes)
    card = card.replace("$t", cardtype)
    card = card.replace("$r", getRarity(rarity))
    cardvalue = 0
    if cardtype == "Artifact":
        for _ in range(rarity):
            [ability, value] = generatePermanent()
            card += ability + "\n"
            cardvalue += float(value)
        card = card.replace("$manacost", str(getColorlessCost(cardvalue)))
    elif cardtype == "Creature":
        for _ in range(rarity-1):
            [ability, value] = generatePermanent()
            card += ability + "\n"
            cardvalue += int(value)
        [pt, value] = generatePT()
        card += pt + "\n"
        cardvalue += float(value)
        card = card.replace("$manacost", str(getCost(cardvalue)))
    elif cardtype == "Enchantment":
        for _ in range(rarity):
            [ability, value] = generatePermanent()
            card += ability + "\n"
            cardvalue += float(value)
        card = card.replace("$manacost", str(getCost(cardvalue)))
    elif cardtype == "Instant":
        for _ in range(rarity):
            [ability, value] = generateEffect()
            card += ability + "\n"
            cardvalue += float(value)
        cardvalue += 1
        card = card.replace("$manacost", str(getCost(cardvalue)))
    elif cardtype == "Sorcery":
        for _ in range(rarity):
            [ability, value] = generateEffect()
            card += ability + "\n"
            cardvalue += float(value)
        card = card.replace("$manacost", str(getCost(cardvalue)))
    
    #Do a whole card name generator here
    card = card.replace("$n", "CARDNAME")
    return card
    
def generateCommon():
    return generateCard(1)

def generateUncommon():
    return generateCard(2)

def generateRare():
    return generateCard(3)

def generateMythic():
    return generateCard(4)

def generateFoil():
    rarity = random.randint(1,4)
    return generateCard(rarity, True)

#main
if(random.randint(1,3) < 3):
    print(generateCommon())
else:
    print(generateFoil())

for i in range(9):
    print(generateCommon())
    
for i in range(3):
    print(generateUncommon())
    
if random.randint(1,8) < 8:
    print(generateRare())
else:
    print(generateMythic())