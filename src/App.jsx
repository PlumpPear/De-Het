import React, { useState, useEffect, useCallback } from 'react';

const dutchNouns = [
// People & Family
  { word: 'man', article: 'de', translation: 'man' },
  { word: 'vrouw', article: 'de', translation: 'woman' },
  { word: 'kind', article: 'het', translation: 'child' },
  { word: 'meisje', article: 'het', translation: 'girl' },
  { word: 'jongen', article: 'de', translation: 'boy' },
  { word: 'baby', article: 'de', translation: 'baby' },
  { word: 'vader', article: 'de', translation: 'father' },
  { word: 'moeder', article: 'de', translation: 'mother' },
  { word: 'broer', article: 'de', translation: 'brother' },
  { word: 'zus', article: 'de', translation: 'sister' },
  { word: 'opa', article: 'de', translation: 'grandfather' },
  { word: 'oma', article: 'de', translation: 'grandmother' },
  { word: 'oom', article: 'de', translation: 'uncle' },
  { word: 'tante', article: 'de', translation: 'aunt' },
  { word: 'neef', article: 'de', translation: 'nephew/cousin (male)' },
  { word: 'nicht', article: 'de', translation: 'niece/cousin (female)' },
  { word: 'vriend', article: 'de', translation: 'friend (male)' },
  { word: 'vriendin', article: 'de', translation: 'friend (female)' },
  { word: 'buurman', article: 'de', translation: 'neighbor (male)' },
  { word: 'buurvrouw', article: 'de', translation: 'neighbor (female)' },
  { word: 'persoon', article: 'de', translation: 'person' },
  { word: 'mens', article: 'de', translation: 'human' },
  { word: 'gezin', article: 'het', translation: 'family (nuclear)' },
  { word: 'familie', article: 'de', translation: 'family (extended)' },
  { word: 'echtgenoot', article: 'de', translation: 'husband' },
  { word: 'echtgenote', article: 'de', translation: 'wife' },
  { word: 'kleinkind', article: 'het', translation: 'grandchild' },
  { word: 'stiefvader', article: 'de', translation: 'stepfather' },
  { word: 'stiefmoeder', article: 'de', translation: 'stepmother' },
  { word: 'schoonvader', article: 'de', translation: 'father-in-law' },
  { word: 'schoonmoeder', article: 'de', translation: 'mother-in-law' },

  // Body parts
  { word: 'hoofd', article: 'het', translation: 'head' },
  { word: 'haar', article: 'het', translation: 'hair' },
  { word: 'gezicht', article: 'het', translation: 'face' },
  { word: 'oog', article: 'het', translation: 'eye' },
  { word: 'oor', article: 'het', translation: 'ear' },
  { word: 'neus', article: 'de', translation: 'nose' },
  { word: 'mond', article: 'de', translation: 'mouth' },
  { word: 'tand', article: 'de', translation: 'tooth' },
  { word: 'tong', article: 'de', translation: 'tongue' },
  { word: 'lip', article: 'de', translation: 'lip' },
  { word: 'nek', article: 'de', translation: 'neck' },
  { word: 'schouder', article: 'de', translation: 'shoulder' },
  { word: 'arm', article: 'de', translation: 'arm' },
  { word: 'elleboog', article: 'de', translation: 'elbow' },
  { word: 'hand', article: 'de', translation: 'hand' },
  { word: 'vinger', article: 'de', translation: 'finger' },
  { word: 'duim', article: 'de', translation: 'thumb' },
  { word: 'nagel', article: 'de', translation: 'nail' },
  { word: 'borst', article: 'de', translation: 'chest' },
  { word: 'buik', article: 'de', translation: 'belly' },
  { word: 'rug', article: 'de', translation: 'back' },
  { word: 'been', article: 'het', translation: 'leg' },
  { word: 'knie', article: 'de', translation: 'knee' },
  { word: 'voet', article: 'de', translation: 'foot' },
  { word: 'teen', article: 'de', translation: 'toe' },
  { word: 'huid', article: 'de', translation: 'skin' },
  { word: 'hart', article: 'het', translation: 'heart' },
  { word: 'bloed', article: 'het', translation: 'blood' },
  { word: 'bot', article: 'het', translation: 'bone' },
  { word: 'spier', article: 'de', translation: 'muscle' },
  { word: 'hersenen', article: 'de', translation: 'brain' },
  { word: 'long', article: 'de', translation: 'lung' },
  { word: 'maag', article: 'de', translation: 'stomach' },
  { word: 'lever', article: 'de', translation: 'liver' },
  { word: 'nier', article: 'de', translation: 'kidney' },

  // House & Furniture
  { word: 'huis', article: 'het', translation: 'house' },
  { word: 'woning', article: 'de', translation: 'dwelling' },
  { word: 'appartement', article: 'het', translation: 'apartment' },
  { word: 'kamer', article: 'de', translation: 'room' },
  { word: 'slaapkamer', article: 'de', translation: 'bedroom' },
  { word: 'woonkamer', article: 'de', translation: 'living room' },
  { word: 'keuken', article: 'de', translation: 'kitchen' },
  { word: 'badkamer', article: 'de', translation: 'bathroom' },
  { word: 'toilet', article: 'het', translation: 'toilet' },
  { word: 'gang', article: 'de', translation: 'hallway' },
  { word: 'zolder', article: 'de', translation: 'attic' },
  { word: 'kelder', article: 'de', translation: 'basement' },
  { word: 'tuin', article: 'de', translation: 'garden' },
  { word: 'balkon', article: 'het', translation: 'balcony' },
  { word: 'dak', article: 'het', translation: 'roof' },
  { word: 'muur', article: 'de', translation: 'wall' },
  { word: 'vloer', article: 'de', translation: 'floor' },
  { word: 'plafond', article: 'het', translation: 'ceiling' },
  { word: 'deur', article: 'de', translation: 'door' },
  { word: 'raam', article: 'het', translation: 'window' },
  { word: 'trap', article: 'de', translation: 'stairs' },
  { word: 'tafel', article: 'de', translation: 'table' },
  { word: 'stoel', article: 'de', translation: 'chair' },
  { word: 'bank', article: 'de', translation: 'couch' },
  { word: 'bed', article: 'het', translation: 'bed' },
  { word: 'kast', article: 'de', translation: 'closet/cabinet' },
  { word: 'bureau', article: 'het', translation: 'desk' },
  { word: 'lamp', article: 'de', translation: 'lamp' },
  { word: 'spiegel', article: 'de', translation: 'mirror' },
  { word: 'gordijn', article: 'het', translation: 'curtain' },
  { word: 'tapijt', article: 'het', translation: 'carpet' },
  { word: 'kussen', article: 'het', translation: 'pillow/cushion' },
  { word: 'deken', article: 'de', translation: 'blanket' },
  { word: 'lakens', article: 'het', translation: 'sheets' },
  { word: 'matras', article: 'de', translation: 'mattress' },
  { word: 'boekenkast', article: 'de', translation: 'bookcase' },
  { word: 'nachtkastje', article: 'het', translation: 'nightstand' },
  { word: 'fauteuil', article: 'de', translation: 'armchair' },
  { word: 'kruk', article: 'de', translation: 'stool' },

  // Kitchen items
  { word: 'bord', article: 'het', translation: 'plate' },
  { word: 'kom', article: 'de', translation: 'bowl' },
  { word: 'kopje', article: 'het', translation: 'cup' },
  { word: 'glas', article: 'het', translation: 'glass' },
  { word: 'fles', article: 'de', translation: 'bottle' },
  { word: 'mes', article: 'het', translation: 'knife' },
  { word: 'vork', article: 'de', translation: 'fork' },
  { word: 'lepel', article: 'de', translation: 'spoon' },
  { word: 'pan', article: 'de', translation: 'pan' },
  { word: 'pot', article: 'de', translation: 'pot' },
  { word: 'koelkast', article: 'de', translation: 'refrigerator' },
  { word: 'fornuis', article: 'het', translation: 'stove' },
  { word: 'oven', article: 'de', translation: 'oven' },
  { word: 'magnetron', article: 'de', translation: 'microwave' },
  { word: 'vaatwasser', article: 'de', translation: 'dishwasher' },
  { word: 'wasmachine', article: 'de', translation: 'washing machine' },
  { word: 'droger', article: 'de', translation: 'dryer' },
  { word: 'waterkoker', article: 'de', translation: 'kettle' },
  { word: 'broodrooster', article: 'de', translation: 'toaster' },
  { word: 'mixer', article: 'de', translation: 'mixer' },
  { word: 'koffiezetapparaat', article: 'het', translation: 'coffee maker' },
  { word: 'snijplank', article: 'de', translation: 'cutting board' },
  { word: 'vergiet', article: 'het', translation: 'colander' },
  { word: 'schaal', article: 'de', translation: 'dish/bowl' },
  { word: 'dienblad', article: 'het', translation: 'tray' },
  { word: 'theedoek', article: 'de', translation: 'dish towel' },
  { word: 'spons', article: 'de', translation: 'sponge' },

  // Food & Drinks
  { word: 'brood', article: 'het', translation: 'bread' },
  { word: 'boter', article: 'de', translation: 'butter' },
  { word: 'kaas', article: 'de', translation: 'cheese' },
  { word: 'melk', article: 'de', translation: 'milk' },
  { word: 'ei', article: 'het', translation: 'egg' },
  { word: 'vlees', article: 'het', translation: 'meat' },
  { word: 'kip', article: 'de', translation: 'chicken' },
  { word: 'vis', article: 'de', translation: 'fish' },
  { word: 'varkensvlees', article: 'het', translation: 'pork' },
  { word: 'rundvlees', article: 'het', translation: 'beef' },
  { word: 'rijst', article: 'de', translation: 'rice' },
  { word: 'pasta', article: 'de', translation: 'pasta' },
  { word: 'aardappel', article: 'de', translation: 'potato' },
  { word: 'groente', article: 'de', translation: 'vegetable' },
  { word: 'fruit', article: 'het', translation: 'fruit' },
  { word: 'appel', article: 'de', translation: 'apple' },
  { word: 'peer', article: 'de', translation: 'pear' },
  { word: 'banaan', article: 'de', translation: 'banana' },
  { word: 'sinaasappel', article: 'de', translation: 'orange' },
  { word: 'citroen', article: 'de', translation: 'lemon' },
  { word: 'aardbei', article: 'de', translation: 'strawberry' },
  { word: 'druif', article: 'de', translation: 'grape' },
  { word: 'wortel', article: 'de', translation: 'carrot' },
  { word: 'ui', article: 'de', translation: 'onion' },
  { word: 'knoflook', article: 'de', translation: 'garlic' },
  { word: 'tomaat', article: 'de', translation: 'tomato' },
  { word: 'sla', article: 'de', translation: 'lettuce' },
  { word: 'komkommer', article: 'de', translation: 'cucumber' },
  { word: 'paprika', article: 'de', translation: 'bell pepper' },
  { word: 'champignon', article: 'de', translation: 'mushroom' },
  { word: 'boon', article: 'de', translation: 'bean' },
  { word: 'erwt', article: 'de', translation: 'pea' },
  { word: 'kool', article: 'de', translation: 'cabbage' },
  { word: 'broccoli', article: 'de', translation: 'broccoli' },
  { word: 'spinazie', article: 'de', translation: 'spinach' },
  { word: 'noot', article: 'de', translation: 'nut' },
  { word: 'suiker', article: 'de', translation: 'sugar' },
  { word: 'zout', article: 'het', translation: 'salt' },
  { word: 'peper', article: 'de', translation: 'pepper' },
  { word: 'olie', article: 'de', translation: 'oil' },
  { word: 'azijn', article: 'de', translation: 'vinegar' },
  { word: 'meel', article: 'het', translation: 'flour' },
  { word: 'water', article: 'het', translation: 'water' },
  { word: 'thee', article: 'de', translation: 'tea' },
  { word: 'koffie', article: 'de', translation: 'coffee' },
  { word: 'sap', article: 'het', translation: 'juice' },
  { word: 'wijn', article: 'de', translation: 'wine' },
  { word: 'bier', article: 'het', translation: 'beer' },
  { word: 'frisdrank', article: 'de', translation: 'soft drink' },
  { word: 'soep', article: 'de', translation: 'soup' },
  { word: 'salade', article: 'de', translation: 'salad' },
  { word: 'sandwich', article: 'de', translation: 'sandwich' },
  { word: 'taart', article: 'de', translation: 'cake/pie' },
  { word: 'koekje', article: 'het', translation: 'cookie' },
  { word: 'chocolade', article: 'de', translation: 'chocolate' },
  { word: 'ijs', article: 'het', translation: 'ice cream/ice' },
  { word: 'snoep', article: 'het', translation: 'candy' },
  { word: 'honing', article: 'de', translation: 'honey' },
  { word: 'jam', article: 'de', translation: 'jam' },
  { word: 'yoghurt', article: 'de', translation: 'yogurt' },
  { word: 'room', article: 'de', translation: 'cream' },

  // Animals
  { word: 'dier', article: 'het', translation: 'animal' },
  { word: 'hond', article: 'de', translation: 'dog' },
  { word: 'kat', article: 'de', translation: 'cat' },
  { word: 'paard', article: 'het', translation: 'horse' },
  { word: 'koe', article: 'de', translation: 'cow' },
  { word: 'varken', article: 'het', translation: 'pig' },
  { word: 'schaap', article: 'het', translation: 'sheep' },
  { word: 'geit', article: 'de', translation: 'goat' },
  { word: 'konijn', article: 'het', translation: 'rabbit' },
  { word: 'muis', article: 'de', translation: 'mouse' },
  { word: 'rat', article: 'de', translation: 'rat' },
  { word: 'vogel', article: 'de', translation: 'bird' },
  { word: 'kip', article: 'de', translation: 'chicken' },
  { word: 'eend', article: 'de', translation: 'duck' },
  { word: 'gans', article: 'de', translation: 'goose' },
  { word: 'zwaan', article: 'de', translation: 'swan' },
  { word: 'uil', article: 'de', translation: 'owl' },
  { word: 'adelaar', article: 'de', translation: 'eagle' },
  { word: 'duif', article: 'de', translation: 'pigeon/dove' },
  { word: 'papegaai', article: 'de', translation: 'parrot' },
  { word: 'vis', article: 'de', translation: 'fish' },
  { word: 'haai', article: 'de', translation: 'shark' },
  { word: 'walvis', article: 'de', translation: 'whale' },
  { word: 'dolfijn', article: 'de', translation: 'dolphin' },
  { word: 'kikker', article: 'de', translation: 'frog' },
  { word: 'slang', article: 'de', translation: 'snake' },
  { word: 'schildpad', article: 'de', translation: 'turtle' },
  { word: 'krokodil', article: 'de', translation: 'crocodile' },
  { word: 'leeuw', article: 'de', translation: 'lion' },
  { word: 'tijger', article: 'de', translation: 'tiger' },
  { word: 'beer', article: 'de', translation: 'bear' },
  { word: 'wolf', article: 'de', translation: 'wolf' },
  { word: 'vos', article: 'de', translation: 'fox' },
  { word: 'hert', article: 'het', translation: 'deer' },
  { word: 'olifant', article: 'de', translation: 'elephant' },
  { word: 'giraffe', article: 'de', translation: 'giraffe' },
  { word: 'zebra', article: 'de', translation: 'zebra' },
  { word: 'aap', article: 'de', translation: 'monkey' },
  { word: 'kangoeroe', article: 'de', translation: 'kangaroo' },
  { word: 'spin', article: 'de', translation: 'spider' },
  { word: 'vlinder', article: 'de', translation: 'butterfly' },
  { word: 'bij', article: 'de', translation: 'bee' },
  { word: 'wesp', article: 'de', translation: 'wasp' },
  { word: 'mier', article: 'de', translation: 'ant' },
  { word: 'vlieg', article: 'de', translation: 'fly' },
  { word: 'mug', article: 'de', translation: 'mosquito' },
  { word: 'kever', article: 'de', translation: 'beetle' },
  { word: 'worm', article: 'de', translation: 'worm' },
  { word: 'slak', article: 'de', translation: 'snail' },

  // Transportation
  { word: 'auto', article: 'de', translation: 'car' },
  { word: 'fiets', article: 'de', translation: 'bicycle' },
  { word: 'trein', article: 'de', translation: 'train' },
  { word: 'bus', article: 'de', translation: 'bus' },
  { word: 'tram', article: 'de', translation: 'tram' },
  { word: 'metro', article: 'de', translation: 'metro/subway' },
  { word: 'vliegtuig', article: 'het', translation: 'airplane' },
  { word: 'boot', article: 'de', translation: 'boat' },
  { word: 'schip', article: 'het', translation: 'ship' },
  { word: 'motor', article: 'de', translation: 'motorcycle' },
  { word: 'scooter', article: 'de', translation: 'scooter' },
  { word: 'taxi', article: 'de', translation: 'taxi' },
  { word: 'vrachtwagen', article: 'de', translation: 'truck' },
  { word: 'bestelwagen', article: 'de', translation: 'van' },
  { word: 'ambulance', article: 'de', translation: 'ambulance' },
  { word: 'helikopter', article: 'de', translation: 'helicopter' },
  { word: 'wiel', article: 'het', translation: 'wheel' },
  { word: 'band', article: 'de', translation: 'tire' },
  { word: 'stuur', article: 'het', translation: 'steering wheel' },
  { word: 'rem', article: 'de', translation: 'brake' },
  { word: 'motor', article: 'de', translation: 'engine' },
  { word: 'benzine', article: 'de', translation: 'gasoline' },
  { word: 'station', article: 'het', translation: 'station' },
  { word: 'luchthaven', article: 'de', translation: 'airport' },
  { word: 'haven', article: 'de', translation: 'harbor/port' },
  { word: 'weg', article: 'de', translation: 'road' },
  { word: 'straat', article: 'de', translation: 'street' },
  { word: 'brug', article: 'de', translation: 'bridge' },
  { word: 'tunnel', article: 'de', translation: 'tunnel' },
  { word: 'snelweg', article: 'de', translation: 'highway' },
  { word: 'kruispunt', article: 'het', translation: 'intersection' },
  { word: 'rotonde', article: 'de', translation: 'roundabout' },
  { word: 'parkeerplaats', article: 'de', translation: 'parking lot' },
  { word: 'verkeerslicht', article: 'het', translation: 'traffic light' },
  { word: 'stoep', article: 'de', translation: 'sidewalk' },
  { word: 'fietspad', article: 'het', translation: 'bike path' },

  // Nature & Weather
  { word: 'natuur', article: 'de', translation: 'nature' },
  { word: 'boom', article: 'de', translation: 'tree' },
  { word: 'bloem', article: 'de', translation: 'flower' },
  { word: 'plant', article: 'de', translation: 'plant' },
  { word: 'gras', article: 'het', translation: 'grass' },
  { word: 'blad', article: 'het', translation: 'leaf' },
  { word: 'tak', article: 'de', translation: 'branch' },
  { word: 'wortel', article: 'de', translation: 'root' },
  { word: 'bos', article: 'het', translation: 'forest' },
  { word: 'park', article: 'het', translation: 'park' },
  { word: 'berg', article: 'de', translation: 'mountain' },
  { word: 'heuvel', article: 'de', translation: 'hill' },
  { word: 'dal', article: 'het', translation: 'valley' },
  { word: 'rivier', article: 'de', translation: 'river' },
  { word: 'meer', article: 'het', translation: 'lake' },
  { word: 'zee', article: 'de', translation: 'sea' },
  { word: 'oceaan', article: 'de', translation: 'ocean' },
  { word: 'strand', article: 'het', translation: 'beach' },
  { word: 'eiland', article: 'het', translation: 'island' },
  { word: 'woestijn', article: 'de', translation: 'desert' },
  { word: 'jungle', article: 'de', translation: 'jungle' },
  { word: 'veld', article: 'het', translation: 'field' },
  { word: 'weide', article: 'de', translation: 'meadow' },
  { word: 'steen', article: 'de', translation: 'stone' },
  { word: 'rots', article: 'de', translation: 'rock' },
  { word: 'zand', article: 'het', translation: 'sand' },
  { word: 'aarde', article: 'de', translation: 'earth/soil' },
  { word: 'lucht', article: 'de', translation: 'air/sky' },
  { word: 'hemel', article: 'de', translation: 'sky/heaven' },
  { word: 'zon', article: 'de', translation: 'sun' },
  { word: 'maan', article: 'de', translation: 'moon' },
  { word: 'ster', article: 'de', translation: 'star' },
  { word: 'wolk', article: 'de', translation: 'cloud' },
  { word: 'regen', article: 'de', translation: 'rain' },
  { word: 'sneeuw', article: 'de', translation: 'snow' },
  { word: 'hagel', article: 'de', translation: 'hail' },
  { word: 'wind', article: 'de', translation: 'wind' },
  { word: 'storm', article: 'de', translation: 'storm' },
  { word: 'onweer', article: 'het', translation: 'thunderstorm' },
  { word: 'bliksem', article: 'de', translation: 'lightning' },
  { word: 'donder', article: 'de', translation: 'thunder' },
  { word: 'mist', article: 'de', translation: 'fog' },
  { word: 'regenboog', article: 'de', translation: 'rainbow' },
  { word: 'temperatuur', article: 'de', translation: 'temperature' },
  { word: 'warmte', article: 'de', translation: 'warmth/heat' },
  { word: 'koude', article: 'de', translation: 'cold' },
  { word: 'vorst', article: 'de', translation: 'frost' },
  { word: 'ijs', article: 'het', translation: 'ice' },

  // Clothing
  { word: 'kleding', article: 'de', translation: 'clothing' },
  { word: 'kleren', article: 'de', translation: 'clothes' },
  { word: 'shirt', article: 'het', translation: 'shirt' },
  { word: 'trui', article: 'de', translation: 'sweater' },
  { word: 'jas', article: 'de', translation: 'jacket/coat' },
  { word: 'broek', article: 'de', translation: 'pants' },
  { word: 'spijkerbroek', article: 'de', translation: 'jeans' },
  { word: 'rok', article: 'de', translation: 'skirt' },
  { word: 'jurk', article: 'de', translation: 'dress' },
  { word: 'pak', article: 'het', translation: 'suit' },
  { word: 'overhemd', article: 'het', translation: 'dress shirt' },
  { word: 'blouse', article: 'de', translation: 'blouse' },
  { word: 'vest', article: 'het', translation: 'cardigan/vest' },
  { word: 'jas', article: 'de', translation: 'coat' },
  { word: 'regenjas', article: 'de', translation: 'raincoat' },
  { word: 'winterjas', article: 'de', translation: 'winter coat' },
  { word: 'schoen', article: 'de', translation: 'shoe' },
  { word: 'laars', article: 'de', translation: 'boot' },
  { word: 'sandaal', article: 'de', translation: 'sandal' },
  { word: 'slipper', article: 'de', translation: 'slipper' },
  { word: 'sok', article: 'de', translation: 'sock' },
  { word: 'muts', article: 'de', translation: 'hat/beanie' },
  { word: 'hoed', article: 'de', translation: 'hat' },
  { word: 'pet', article: 'de', translation: 'cap' },
  { word: 'sjaal', article: 'de', translation: 'scarf' },
  { word: 'handschoen', article: 'de', translation: 'glove' },
  { word: 'das', article: 'de', translation: 'tie' },
  { word: 'riem', article: 'de', translation: 'belt' },
  { word: 'tas', article: 'de', translation: 'bag' },
  { word: 'rugzak', article: 'de', translation: 'backpack' },
  { word: 'portemonnee', article: 'de', translation: 'wallet' },
  { word: 'paraplu', article: 'de', translation: 'umbrella' },
  { word: 'zonnebril', article: 'de', translation: 'sunglasses' },
  { word: 'bril', article: 'de', translation: 'glasses' },
  { word: 'horloge', article: 'het', translation: 'watch' },
  { word: 'ring', article: 'de', translation: 'ring' },
  { word: 'ketting', article: 'de', translation: 'necklace' },
  { word: 'oorbel', article: 'de', translation: 'earring' },
  { word: 'armband', article: 'de', translation: 'bracelet' },
  { word: 'ondergoed', article: 'het', translation: 'underwear' },
  { word: 'zwembroek', article: 'de', translation: 'swimming trunks' },
  { word: 'bikini', article: 'de', translation: 'bikini' },
  { word: 'pyjama', article: 'de', translation: 'pajamas' },

  // Work & Education
  { word: 'werk', article: 'het', translation: 'work' },
  { word: 'baan', article: 'de', translation: 'job' },
  { word: 'kantoor', article: 'het', translation: 'office' },
  { word: 'bedrijf', article: 'het', translation: 'company' },
  { word: 'fabriek', article: 'de', translation: 'factory' },
  { word: 'winkel', article: 'de', translation: 'shop/store' },
  { word: 'restaurant', article: 'het', translation: 'restaurant' },
  { word: 'hotel', article: 'het', translation: 'hotel' },
  { word: 'ziekenhuis', article: 'het', translation: 'hospital' },
  { word: 'school', article: 'de', translation: 'school' },
  { word: 'universiteit', article: 'de', translation: 'university' },
  { word: 'klas', article: 'de', translation: 'class' },
  { word: 'les', article: 'de', translation: 'lesson' },
  { word: 'leraar', article: 'de', translation: 'teacher (male)' },
  { word: 'lerares', article: 'de', translation: 'teacher (female)' },
  { word: 'student', article: 'de', translation: 'student' },
  { word: 'leerling', article: 'de', translation: 'pupil' },
  { word: 'professor', article: 'de', translation: 'professor' },
  { word: 'directeur', article: 'de', translation: 'director' },
  { word: 'baas', article: 'de', translation: 'boss' },
  { word: 'collega', article: 'de', translation: 'colleague' },
  { word: 'klant', article: 'de', translation: 'customer' },
  { word: 'arts', article: 'de', translation: 'doctor' },
  { word: 'verpleegkundige', article: 'de', translation: 'nurse' },
  { word: 'advocaat', article: 'de', translation: 'lawyer' },
  { word: 'politieagent', article: 'de', translation: 'police officer' },
  { word: 'brandweerman', article: 'de', translation: 'firefighter' },
  { word: 'kok', article: 'de', translation: 'cook/chef' },
  { word: 'bakker', article: 'de', translation: 'baker' },
  { word: 'slager', article: 'de', translation: 'butcher' },
  { word: 'monteur', article: 'de', translation: 'mechanic' },
  { word: 'ingenieur', article: 'de', translation: 'engineer' },
  { word: 'architect', article: 'de', translation: 'architect' },
  { word: 'accountant', article: 'de', translation: 'accountant' },
  { word: 'journalist', article: 'de', translation: 'journalist' },
  { word: 'schrijver', article: 'de', translation: 'writer' },
  { word: 'kunstenaar', article: 'de', translation: 'artist' },
  { word: 'muzikant', article: 'de', translation: 'musician' },
  { word: 'acteur', article: 'de', translation: 'actor' },
  { word: 'boek', article: 'het', translation: 'book' },
  { word: 'schrift', article: 'het', translation: 'notebook' },
  { word: 'pen', article: 'de', translation: 'pen' },
  { word: 'potlood', article: 'het', translation: 'pencil' },
  { word: 'papier', article: 'het', translation: 'paper' },
  { word: 'brief', article: 'de', translation: 'letter' },
  { word: 'envelop', article: 'de', translation: 'envelope' },
  { word: 'postzegel', article: 'de', translation: 'stamp' },
  { word: 'examen', article: 'het', translation: 'exam' },
  { word: 'diploma', article: 'het', translation: 'diploma' },
  { word: 'cijfer', article: 'het', translation: 'grade/number' },
  { word: 'huiswerk', article: 'het', translation: 'homework' },
  { word: 'opdracht', article: 'de', translation: 'assignment' },
  { word: 'vergadering', article: 'de', translation: 'meeting' },
  { word: 'contract', article: 'het', translation: 'contract' },
  { word: 'salaris', article: 'het', translation: 'salary' },
  { word: 'vakantie', article: 'de', translation: 'vacation' },

  // Technology
  { word: 'computer', article: 'de', translation: 'computer' },
  { word: 'laptop', article: 'de', translation: 'laptop' },
  { word: 'tablet', article: 'de', translation: 'tablet' },
  { word: 'telefoon', article: 'de', translation: 'phone' },
  { word: 'smartphone', article: 'de', translation: 'smartphone' },
  { word: 'televisie', article: 'de', translation: 'television' },
  { word: 'radio', article: 'de', translation: 'radio' },
  { word: 'camera', article: 'de', translation: 'camera' },
  { word: 'printer', article: 'de', translation: 'printer' },
  { word: 'toetsenbord', article: 'het', translation: 'keyboard' },
  { word: 'muis', article: 'de', translation: 'mouse (computer)' },
  { word: 'scherm', article: 'het', translation: 'screen' },
  { word: 'kabel', article: 'de', translation: 'cable' },
  { word: 'oplader', article: 'de', translation: 'charger' },
  { word: 'batterij', article: 'de', translation: 'battery' },
  { word: 'internet', article: 'het', translation: 'internet' },
  { word: 'website', article: 'de', translation: 'website' },
  { word: 'e-mail', article: 'de', translation: 'email' },
  { word: 'bericht', article: 'het', translation: 'message' },
  { word: 'app', article: 'de', translation: 'app' },
  { word: 'programma', article: 'het', translation: 'program' },
  { word: 'bestand', article: 'het', translation: 'file' },
  { word: 'map', article: 'de', translation: 'folder' },
  { word: 'wachtwoord', article: 'het', translation: 'password' },
  { word: 'gebruikersnaam', article: 'de', translation: 'username' },
  { word: 'koptelefoon', article: 'de', translation: 'headphones' },
  { word: 'luidspreker', article: 'de', translation: 'speaker' },
  { word: 'microfoon', article: 'de', translation: 'microphone' },

  // Time & Calendar
  { word: 'tijd', article: 'de', translation: 'time' },
  { word: 'uur', article: 'het', translation: 'hour' },
  { word: 'minuut', article: 'de', translation: 'minute' },
  { word: 'seconde', article: 'de', translation: 'second' },
  { word: 'dag', article: 'de', translation: 'day' },
  { word: 'week', article: 'de', translation: 'week' },
  { word: 'maand', article: 'de', translation: 'month' },
  { word: 'jaar', article: 'het', translation: 'year' },
  { word: 'eeuw', article: 'de', translation: 'century' },
  { word: 'ochtend', article: 'de', translation: 'morning' },
  { word: 'middag', article: 'de', translation: 'afternoon' },
  { word: 'avond', article: 'de', translation: 'evening' },
  { word: 'nacht', article: 'de', translation: 'night' },
  { word: 'weekend', article: 'het', translation: 'weekend' },
  { word: 'maandag', article: 'de', translation: 'Monday' },
  { word: 'dinsdag', article: 'de', translation: 'Tuesday' },
  { word: 'woensdag', article: 'de', translation: 'Wednesday' },
  { word: 'donderdag', article: 'de', translation: 'Thursday' },
  { word: 'vrijdag', article: 'de', translation: 'Friday' },
  { word: 'zaterdag', article: 'de', translation: 'Saturday' },
  { word: 'zondag', article: 'de', translation: 'Sunday' },
  { word: 'januari', article: 'de', translation: 'January' },
  { word: 'februari', article: 'de', translation: 'February' },
  { word: 'maart', article: 'de', translation: 'March' },
  { word: 'april', article: 'de', translation: 'April' },
  { word: 'mei', article: 'de', translation: 'May' },
  { word: 'juni', article: 'de', translation: 'June' },
  { word: 'juli', article: 'de', translation: 'July' },
  { word: 'augustus', article: 'de', translation: 'August' },
  { word: 'september', article: 'de', translation: 'September' },
  { word: 'oktober', article: 'de', translation: 'October' },
  { word: 'november', article: 'de', translation: 'November' },
  { word: 'december', article: 'de', translation: 'December' },
  { word: 'lente', article: 'de', translation: 'spring' },
  { word: 'zomer', article: 'de', translation: 'summer' },
  { word: 'herfst', article: 'de', translation: 'autumn' },
  { word: 'winter', article: 'de', translation: 'winter' },
  { word: 'verjaardag', article: 'de', translation: 'birthday' },
  { word: 'feestdag', article: 'de', translation: 'holiday' },
  { word: 'Kerstmis', article: 'het', translation: 'Christmas' },
  { word: 'Pasen', article: 'het', translation: 'Easter' },
  { word: 'Nieuwjaar', article: 'het', translation: 'New Year' },
  { word: 'kalender', article: 'de', translation: 'calendar' },
  { word: 'datum', article: 'de', translation: 'date' },
  { word: 'afspraak', article: 'de', translation: 'appointment' },
  { word: 'agenda', article: 'de', translation: 'agenda/planner' },

  // Places & Buildings
  { word: 'stad', article: 'de', translation: 'city' },
  { word: 'dorp', article: 'het', translation: 'village' },
  { word: 'land', article: 'het', translation: 'country' },
  { word: 'wereld', article: 'de', translation: 'world' },
  { word: 'continent', article: 'het', translation: 'continent' },
  { word: 'buurt', article: 'de', translation: 'neighborhood' },
  { word: 'wijk', article: 'de', translation: 'district' },
  { word: 'centrum', article: 'het', translation: 'center' },
  { word: 'plein', article: 'het', translation: 'square' },
  { word: 'markt', article: 'de', translation: 'market' },
  { word: 'gebouw', article: 'het', translation: 'building' },
  { word: 'flat', article: 'de', translation: 'apartment building' },
  { word: 'toren', article: 'de', translation: 'tower' },
  { word: 'kerk', article: 'de', translation: 'church' },
  { word: 'moskee', article: 'de', translation: 'mosque' },
  { word: 'synagoge', article: 'de', translation: 'synagogue' },
  { word: 'tempel', article: 'de', translation: 'temple' },
  { word: 'museum', article: 'het', translation: 'museum' },
  { word: 'theater', article: 'het', translation: 'theater' },
  { word: 'bioscoop', article: 'de', translation: 'cinema' },
  { word: 'bibliotheek', article: 'de', translation: 'library' },
  { word: 'stadion', article: 'het', translation: 'stadium' },
  { word: 'zwembad', article: 'het', translation: 'swimming pool' },
  { word: 'sportschool', article: 'de', translation: 'gym' },
  { word: 'bank', article: 'de', translation: 'bank' },
  { word: 'postkantoor', article: 'het', translation: 'post office' },
  { word: 'gemeentehuis', article: 'het', translation: 'city hall' },
  { word: 'politiebureau', article: 'het', translation: 'police station' },
  { word: 'brandweerkazerne', article: 'de', translation: 'fire station' },
  { word: 'apotheek', article: 'de', translation: 'pharmacy' },
  { word: 'supermarkt', article: 'de', translation: 'supermarket' },
  { word: 'bakkerij', article: 'de', translation: 'bakery' },
  { word: 'slagerij', article: 'de', translation: 'butcher shop' },
  { word: 'kapper', article: 'de', translation: 'hairdresser/barber' },
  { word: 'café', article: 'het', translation: 'café/pub' },
  { word: 'bar', article: 'de', translation: 'bar' },
  { word: 'club', article: 'de', translation: 'club' },
  { word: 'tankstation', article: 'het', translation: 'gas station' },
  { word: 'garage', article: 'de', translation: 'garage' },
  { word: 'boerderij', article: 'de', translation: 'farm' },
  { word: 'molen', article: 'de', translation: 'mill/windmill' },
  { word: 'kasteel', article: 'het', translation: 'castle' },
  { word: 'paleis', article: 'het', translation: 'palace' },
  { word: 'monument', article: 'het', translation: 'monument' },
  { word: 'fontein', article: 'de', translation: 'fountain' },
  { word: 'begraafplaats', article: 'de', translation: 'cemetery' },

  // Sports & Leisure
  { word: 'sport', article: 'de', translation: 'sport' },
  { word: 'voetbal', article: 'het', translation: 'soccer/football' },
  { word: 'basketbal', article: 'het', translation: 'basketball' },
  { word: 'volleybal', article: 'het', translation: 'volleyball' },
  { word: 'tennis', article: 'het', translation: 'tennis' },
  { word: 'golf', article: 'het', translation: 'golf' },
  { word: 'hockey', article: 'het', translation: 'hockey' },
  { word: 'zwemmen', article: 'het', translation: 'swimming' },
  { word: 'hardlopen', article: 'het', translation: 'running' },
  { word: 'fietsen', article: 'het', translation: 'cycling' },
  { word: 'schaatsen', article: 'het', translation: 'skating' },
  { word: 'skiën', article: 'het', translation: 'skiing' },
  { word: 'wedstrijd', article: 'de', translation: 'match/competition' },
  { word: 'team', article: 'het', translation: 'team' },
  { word: 'speler', article: 'de', translation: 'player' },
  { word: 'coach', article: 'de', translation: 'coach' },
  { word: 'bal', article: 'de', translation: 'ball' },
  { word: 'racket', article: 'het', translation: 'racket' },
  { word: 'doel', article: 'het', translation: 'goal' },
  { word: 'punt', article: 'het', translation: 'point' },
  { word: 'score', article: 'de', translation: 'score' },
  { word: 'winnaar', article: 'de', translation: 'winner' },
  { word: 'verliezer', article: 'de', translation: 'loser' },
  { word: 'prijs', article: 'de', translation: 'prize' },
  { word: 'medaille', article: 'de', translation: 'medal' },
  { word: 'hobby', article: 'de', translation: 'hobby' },
  { word: 'spel', article: 'het', translation: 'game' },
  { word: 'speelgoed', article: 'het', translation: 'toy' },
  { word: 'puzzel', article: 'de', translation: 'puzzle' },
  { word: 'kaart', article: 'de', translation: 'card/map' },
  { word: 'film', article: 'de', translation: 'film/movie' },
  { word: 'serie', article: 'de', translation: 'series' },
  { word: 'muziek', article: 'de', translation: 'music' },
  { word: 'lied', article: 'het', translation: 'song' },
  { word: 'concert', article: 'het', translation: 'concert' },
  { word: 'dans', article: 'de', translation: 'dance' },
  { word: 'kunst', article: 'de', translation: 'art' },
  { word: 'schilderij', article: 'het', translation: 'painting' },
  { word: 'foto', article: 'de', translation: 'photo' },
  { word: 'tekening', article: 'de', translation: 'drawing' },
  { word: 'instrument', article: 'het', translation: 'instrument' },
  { word: 'gitaar', article: 'de', translation: 'guitar' },
  { word: 'piano', article: 'de', translation: 'piano' },
  { word: 'viool', article: 'de', translation: 'violin' },
  { word: 'drum', article: 'de', translation: 'drum' },
  { word: 'fluit', article: 'de', translation: 'flute' },

  // Abstract concepts
  { word: 'leven', article: 'het', translation: 'life' },
  { word: 'dood', article: 'de', translation: 'death' },
  { word: 'liefde', article: 'de', translation: 'love' },
  { word: 'haat', article: 'de', translation: 'hate' },
  { word: 'geluk', article: 'het', translation: 'happiness/luck' },
  { word: 'verdriet', article: 'het', translation: 'sadness' },
  { word: 'angst', article: 'de', translation: 'fear' },
  { word: 'woede', article: 'de', translation: 'anger' },
  { word: 'vreugde', article: 'de', translation: 'joy' },
  { word: 'hoop', article: 'de', translation: 'hope' },
  { word: 'vrede', article: 'de', translation: 'peace' },
  { word: 'oorlog', article: 'de', translation: 'war' },
  { word: 'vrijheid', article: 'de', translation: 'freedom' },
  { word: 'waarheid', article: 'de', translation: 'truth' },
  { word: 'leugen', article: 'de', translation: 'lie' },
  { word: 'geheim', article: 'het', translation: 'secret' },
  { word: 'probleem', article: 'het', translation: 'problem' },
  { word: 'oplossing', article: 'de', translation: 'solution' },
  { word: 'vraag', article: 'de', translation: 'question' },
  { word: 'antwoord', article: 'het', translation: 'answer' },
  { word: 'idee', article: 'het', translation: 'idea' },
  { word: 'gedachte', article: 'de', translation: 'thought' },
  { word: 'mening', article: 'de', translation: 'opinion' },
  { word: 'gevoel', article: 'het', translation: 'feeling' },
  { word: 'emotie', article: 'de', translation: 'emotion' },
  { word: 'vertrouwen', article: 'het', translation: 'trust' },
  { word: 'respect', article: 'het', translation: 'respect' },
  { word: 'succes', article: 'het', translation: 'success' },
  { word: 'mislukking', article: 'de', translation: 'failure' },
  { word: 'ervaring', article: 'de', translation: 'experience' },
  { word: 'herinnering', article: 'de', translation: 'memory' },
  { word: 'droom', article: 'de', translation: 'dream' },
  { word: 'nachtmerrie', article: 'de', translation: 'nightmare' },
  { word: 'toekomst', article: 'de', translation: 'future' },
  { word: 'verleden', article: 'het', translation: 'past' },
  { word: 'heden', article: 'het', translation: 'present' },
  { word: 'kans', article: 'de', translation: 'chance/opportunity' },
  { word: 'risico', article: 'het', translation: 'risk' },
  { word: 'verandering', article: 'de', translation: 'change' },
  { word: 'groei', article: 'de', translation: 'growth' },
  { word: 'ontwikkeling', article: 'de', translation: 'development' },
  { word: 'vooruitgang', article: 'de', translation: 'progress' },
  { word: 'kennis', article: 'de', translation: 'knowledge' },
  { word: 'wijsheid', article: 'de', translation: 'wisdom' },
  { word: 'intelligentie', article: 'de', translation: 'intelligence' },
  { word: 'talent', article: 'het', translation: 'talent' },
  { word: 'vaardigheid', article: 'de', translation: 'skill' },
  { word: 'kracht', article: 'de', translation: 'strength/power' },
  { word: 'zwakte', article: 'de', translation: 'weakness' },
  { word: 'moed', article: 'de', translation: 'courage' },
  { word: 'geduld', article: 'het', translation: 'patience' },

  // Money & Shopping
  { word: 'geld', article: 'het', translation: 'money' },
  { word: 'euro', article: 'de', translation: 'euro' },
  { word: 'cent', article: 'de', translation: 'cent' },
  { word: 'munt', article: 'de', translation: 'coin' },
  { word: 'biljet', article: 'het', translation: 'banknote' },
  { word: 'prijs', article: 'de', translation: 'price' },
  { word: 'kosten', article: 'de', translation: 'costs' },
  { word: 'rekening', article: 'de', translation: 'bill/account' },
  { word: 'factuur', article: 'de', translation: 'invoice' },
  { word: 'korting', article: 'de', translation: 'discount' },
  { word: 'uitverkoop', article: 'de', translation: 'sale' },
  { word: 'aanbieding', article: 'de', translation: 'offer/deal' },
  { word: 'bon', article: 'de', translation: 'receipt' },
  { word: 'kassabon', article: 'de', translation: 'receipt' },
  { word: 'kassa', article: 'de', translation: 'cash register' },
  { word: 'pinpas', article: 'de', translation: 'debit card' },
  { word: 'creditcard', article: 'de', translation: 'credit card' },
  { word: 'contant', article: 'het', translation: 'cash' },
  { word: 'wisselgeld', article: 'het', translation: 'change' },
  { word: 'schuld', article: 'de', translation: 'debt' },
  { word: 'lening', article: 'de', translation: 'loan' },
  { word: 'hypotheek', article: 'de', translation: 'mortgage' },
  { word: 'verzekering', article: 'de', translation: 'insurance' },
  { word: 'belasting', article: 'de', translation: 'tax' },
  { word: 'winst', article: 'de', translation: 'profit' },
  { word: 'verlies', article: 'het', translation: 'loss' },
  { word: 'beurs', article: 'de', translation: 'stock market' },
  { word: 'aandeel', article: 'het', translation: 'share/stock' },
  { word: 'investering', article: 'de', translation: 'investment' },
  { word: 'spaargeld', article: 'het', translation: 'savings' },
  { word: 'budget', article: 'het', translation: 'budget' },

  // Health & Medicine
  { word: 'gezondheid', article: 'de', translation: 'health' },
  { word: 'ziekte', article: 'de', translation: 'illness/disease' },
  { word: 'pijn', article: 'de', translation: 'pain' },
  { word: 'hoofdpijn', article: 'de', translation: 'headache' },
  { word: 'buikpijn', article: 'de', translation: 'stomachache' },
  { word: 'rugpijn', article: 'de', translation: 'back pain' },
  { word: 'koorts', article: 'de', translation: 'fever' },
  { word: 'verkoudheid', article: 'de', translation: 'cold' },
  { word: 'griep', article: 'de', translation: 'flu' },
  { word: 'hoest', article: 'de', translation: 'cough' },
  { word: 'allergie', article: 'de', translation: 'allergy' },
  { word: 'wond', article: 'de', translation: 'wound' },
  { word: 'medicijn', article: 'het', translation: 'medicine' },
  { word: 'pil', article: 'de', translation: 'pill' },
  { word: 'tablet', article: 'het', translation: 'tablet' },
  { word: 'recept', article: 'het', translation: 'prescription/recipe' },
  { word: 'spuit', article: 'de', translation: 'injection/syringe' },
  { word: 'verband', article: 'het', translation: 'bandage' },
  { word: 'pleister', article: 'de', translation: 'band-aid' },
  { word: 'thermometer', article: 'de', translation: 'thermometer' },
  { word: 'operatie', article: 'de', translation: 'operation/surgery' },
  { word: 'behandeling', article: 'de', translation: 'treatment' },
  { word: 'onderzoek', article: 'het', translation: 'examination/research' },
  { word: 'diagnose', article: 'de', translation: 'diagnosis' },
  { word: 'therapie', article: 'de', translation: 'therapy' },
  { word: 'revalidatie', article: 'de', translation: 'rehabilitation' },
  { word: 'dieet', article: 'het', translation: 'diet' },
  { word: 'beweging', article: 'de', translation: 'movement/exercise' },
  { word: 'rust', article: 'de', translation: 'rest' },
  { word: 'slaap', article: 'de', translation: 'sleep' },
  { word: 'tandarts', article: 'de', translation: 'dentist' },
  { word: 'huisarts', article: 'de', translation: 'general practitioner' },
  { word: 'specialist', article: 'de', translation: 'specialist' },
  { word: 'psycholoog', article: 'de', translation: 'psychologist' },
  { word: 'fysiotherapeut', article: 'de', translation: 'physiotherapist' },

  // Communication & Language
  { word: 'taal', article: 'de', translation: 'language' },
  { word: 'woord', article: 'het', translation: 'word' },
  { word: 'zin', article: 'de', translation: 'sentence' },
  { word: 'tekst', article: 'de', translation: 'text' },
  { word: 'verhaal', article: 'het', translation: 'story' },
  { word: 'gesprek', article: 'het', translation: 'conversation' },
  { word: 'discussie', article: 'de', translation: 'discussion' },
  { word: 'uitspraak', article: 'de', translation: 'pronunciation' },
  { word: 'spelling', article: 'de', translation: 'spelling' },
  { word: 'grammatica', article: 'de', translation: 'grammar' },
  { word: 'vocabulaire', article: 'het', translation: 'vocabulary' },
  { word: 'woordenboek', article: 'het', translation: 'dictionary' },
  { word: 'vertaling', article: 'de', translation: 'translation' },
  { word: 'betekenis', article: 'de', translation: 'meaning' },
  { word: 'uitleg', article: 'de', translation: 'explanation' },
  { word: 'voorbeeld', article: 'het', translation: 'example' },
  { word: 'stem', article: 'de', translation: 'voice' },
  { word: 'geluid', article: 'het', translation: 'sound' },
  { word: 'stilte', article: 'de', translation: 'silence' },
  { word: 'lawaai', article: 'het', translation: 'noise' },
  { word: 'telefoontje', article: 'het', translation: 'phone call' },
  { word: 'sms', article: 'de', translation: 'text message' },
  { word: 'nieuws', article: 'het', translation: 'news' },
  { word: 'krant', article: 'de', translation: 'newspaper' },
  { word: 'tijdschrift', article: 'het', translation: 'magazine' },
  { word: 'artikel', article: 'het', translation: 'article' },
  { word: 'advertentie', article: 'de', translation: 'advertisement' },
  { word: 'informatie', article: 'de', translation: 'information' },
  { word: 'aankondiging', article: 'de', translation: 'announcement' },
  { word: 'uitnodiging', article: 'de', translation: 'invitation' },

  // Quantities & Measurements
  { word: 'aantal', article: 'het', translation: 'number/quantity' },
  { word: 'hoeveelheid', article: 'de', translation: 'amount' },
  { word: 'helft', article: 'de', translation: 'half' },
  { word: 'deel', article: 'het', translation: 'part' },
  { word: 'geheel', article: 'het', translation: 'whole' },
  { word: 'rest', article: 'de', translation: 'rest/remainder' },
  { word: 'meter', article: 'de', translation: 'meter' },
  { word: 'centimeter', article: 'de', translation: 'centimeter' },
  { word: 'kilometer', article: 'de', translation: 'kilometer' },
  { word: 'gram', article: 'het', translation: 'gram' },
  { word: 'kilogram', article: 'het', translation: 'kilogram' },
  { word: 'liter', article: 'de', translation: 'liter' },
  { word: 'milliliter', article: 'de', translation: 'milliliter' },
  { word: 'graad', article: 'de', translation: 'degree' },
  { word: 'procent', article: 'het', translation: 'percent' },
  { word: 'lengte', article: 'de', translation: 'length' },
  { word: 'breedte', article: 'de', translation: 'width' },
  { word: 'hoogte', article: 'de', translation: 'height' },
  { word: 'diepte', article: 'de', translation: 'depth' },
  { word: 'gewicht', article: 'het', translation: 'weight' },
  { word: 'oppervlakte', article: 'de', translation: 'surface area' },
  { word: 'inhoud', article: 'de', translation: 'content/volume' },
  { word: 'snelheid', article: 'de', translation: 'speed' },
  { word: 'afstand', article: 'de', translation: 'distance' },

  // Colors & Shapes
  { word: 'kleur', article: 'de', translation: 'color' },
  { word: 'vorm', article: 'de', translation: 'shape/form' },
  { word: 'cirkel', article: 'de', translation: 'circle' },
  { word: 'vierkant', article: 'het', translation: 'square' },
  { word: 'rechthoek', article: 'de', translation: 'rectangle' },
  { word: 'driehoek', article: 'de', translation: 'triangle' },
  { word: 'lijn', article: 'de', translation: 'line' },
  { word: 'punt', article: 'het', translation: 'point/dot' },
  { word: 'hoek', article: 'de', translation: 'corner/angle' },
  { word: 'rand', article: 'de', translation: 'edge' },
  { word: 'oppervlak', article: 'het', translation: 'surface' },
  { word: 'patroon', article: 'het', translation: 'pattern' },

  // Miscellaneous common nouns
  { word: 'ding', article: 'het', translation: 'thing' },
  { word: 'iets', article: 'het', translation: 'something' },
  { word: 'niets', article: 'het', translation: 'nothing' },
  { word: 'alles', article: 'het', translation: 'everything' },
  { word: 'plaats', article: 'de', translation: 'place' },
  { word: 'plek', article: 'de', translation: 'spot/place' },
  { word: 'kant', article: 'de', translation: 'side' },
  { word: 'manier', article: 'de', translation: 'way/manner' },
  { word: 'methode', article: 'de', translation: 'method' },
  { word: 'systeem', article: 'het', translation: 'system' },
  { word: 'proces', article: 'het', translation: 'process' },
  { word: 'project', article: 'het', translation: 'project' },
  { word: 'plan', article: 'het', translation: 'plan' },
  { word: 'doel', article: 'het', translation: 'goal/purpose' },
  { word: 'reden', article: 'de', translation: 'reason' },
  { word: 'oorzaak', article: 'de', translation: 'cause' },
  { word: 'gevolg', article: 'het', translation: 'consequence' },
  { word: 'resultaat', article: 'het', translation: 'result' },
  { word: 'effect', article: 'het', translation: 'effect' },
  { word: 'invloed', article: 'de', translation: 'influence' },
  { word: 'rol', article: 'de', translation: 'role' },
  { word: 'functie', article: 'de', translation: 'function' },
  { word: 'taak', article: 'de', translation: 'task' },
  { word: 'verantwoordelijkheid', article: 'de', translation: 'responsibility' },
  { word: 'plicht', article: 'de', translation: 'duty' },
  { word: 'recht', article: 'het', translation: 'right/law' },
  { word: 'wet', article: 'de', translation: 'law' },
  { word: 'regel', article: 'de', translation: 'rule' },
  { word: 'voorwaarde', article: 'de', translation: 'condition' },
  { word: 'uitzondering', article: 'de', translation: 'exception' },
  { word: 'verschil', article: 'het', translation: 'difference' },
  { word: 'overeenkomst', article: 'de', translation: 'agreement/similarity' },
  { word: 'verband', article: 'het', translation: 'connection' },
  { word: 'relatie', article: 'de', translation: 'relationship' },
  { word: 'situatie', article: 'de', translation: 'situation' },
  { word: 'omstandigheid', article: 'de', translation: 'circumstance' },
  { word: 'gebeurtenis', article: 'de', translation: 'event' },
  { word: 'gelegenheid', article: 'de', translation: 'occasion/opportunity' },
  { word: 'moment', article: 'het', translation: 'moment' },
  { word: 'periode', article: 'de', translation: 'period' },
  { word: 'fase', article: 'de', translation: 'phase' },
  { word: 'begin', article: 'het', translation: 'beginning' },
  { word: 'einde', article: 'het', translation: 'end' },
  { word: 'midden', article: 'het', translation: 'middle' },
  { word: 'top', article: 'de', translation: 'top' },
  { word: 'bodem', article: 'de', translation: 'bottom' },
  { word: 'voor', article: 'de', translation: 'front' },
  { word: 'achterkant', article: 'de', translation: 'back' },
  { word: 'binnenkant', article: 'de', translation: 'inside' },
  { word: 'buitenkant', article: 'de', translation: 'outside' },
  { word: 'omgeving', article: 'de', translation: 'surroundings/environment' },
  { word: 'natuur', article: 'de', translation: 'nature' },
  { word: 'milieu', article: 'het', translation: 'environment' },
  { word: 'klimaat', article: 'het', translation: 'climate' },
  { word: 'energie', article: 'de', translation: 'energy' },
  { word: 'elektriciteit', article: 'de', translation: 'electricity' },
  { word: 'gas', article: 'het', translation: 'gas' },
  { word: 'vuur', article: 'het', translation: 'fire' },
  { word: 'vlam', article: 'de', translation: 'flame' },
  { word: 'rook', article: 'de', translation: 'smoke' },
  { word: 'as', article: 'de', translation: 'ash' },
  { word: 'stof', article: 'het', translation: 'dust/substance' },
  { word: 'materiaal', article: 'het', translation: 'material' },
  { word: 'hout', article: 'het', translation: 'wood' },
  { word: 'metaal', article: 'het', translation: 'metal' },
  { word: 'plastic', article: 'het', translation: 'plastic' },
  { word: 'glas', article: 'het', translation: 'glass' },
  { word: 'leer', article: 'het', translation: 'leather' },
  { word: 'stof', article: 'de', translation: 'fabric' },
  { word: 'katoen', article: 'het', translation: 'cotton' },
  { word: 'wol', article: 'de', translation: 'wool' },
  { word: 'zijde', article: 'de', translation: 'silk' },
  { word: 'rubber', article: 'het', translation: 'rubber' },
  { word: 'beton', article: 'het', translation: 'concrete' },
  { word: 'steen', article: 'de', translation: 'stone/brick' },
  { word: 'goud', article: 'het', translation: 'gold' },
  { word: 'zilver', article: 'het', translation: 'silver' },
  { word: 'koper', article: 'het', translation: 'copper' },
  { word: 'ijzer', article: 'het', translation: 'iron' },
  { word: 'staal', article: 'het', translation: 'steel' },
  { word: 'aluminium', article: 'het', translation: 'aluminum' },
  { word: 'diamant', article: 'de', translation: 'diamond' },
  { word: 'parel', article: 'de', translation: 'pearl' }
];

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DutchVocabApp() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = shuffle(dutchNouns);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setCorrectCount(0);
    setTotalAnswered(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = useCallback((article) => {
    if (answered) return;
    
    setSelectedAnswer(article);
    setAnswered(true);
    setTotalAnswered(prev => prev + 1);
    
    const isCorrect = article === questions[currentIndex].article;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      // Auto-advance after correct answer
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      }, 300);
    } else {
      setStreak(0);
    }
  }, [answered, currentIndex, questions]);

  const nextQuestion = () => {
    setCurrentIndex(prev => prev + 1);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'd') {
        handleAnswer('de');
      } else if (e.key.toLowerCase() === 'h') {
        handleAnswer('het');
      } else if ((e.key === 'Enter' || e.key === ' ') && answered && selectedAnswer !== questions[currentIndex]?.article) {
        nextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAnswer, answered, selectedAnswer, questions, currentIndex]);

  const currentWord = questions[currentIndex];
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const totalQuestions = questions.length;

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentWord.article;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          <span className="text-sky-500">de</span>
          <span className="text-slate-300 mx-1">/</span>
          <span className="text-orange-500">het</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Master Dutch articles</p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-slate-400">Accuracy</div>
            <div className="text-lg font-bold text-slate-700">{accuracy}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 23c-3.866 0-7-2.239-7-5 0-1.5.5-3 2-4.5 1.5-1.5 2-3 2-4.5 0-1-1-3-1-3s3 1 3 4c0 1.5-1 3-1 4s1 2 2 2 2-1 2-2-1-2.5-1-4c0-3 3-4 3-4s-1 2-1 3c0 1.5.5 3 2 4.5s2 3 2 4.5c0 2.761-3.134 5-7 5z"/>
            </svg>
          </div>
          <div>
            <div className="text-xs text-slate-400">Streak</div>
            <div className="text-lg font-bold text-orange-500">{streak}</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-2">
        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full flex">
            <div 
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${(correctCount / totalQuestions) * 100}%` }}
            />
            <div 
              className="bg-slate-400 h-full transition-all duration-300"
              style={{ width: `${((totalAnswered - correctCount) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-center text-slate-400 text-sm mt-2">
          {currentIndex + 1} of {totalQuestions}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mt-4 mb-6">
        <div className="text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-4">What article?</p>
          <h2 className="text-5xl font-bold text-slate-800">{currentWord.word}</h2>
        </div>
      </div>

      {/* Feedback for wrong answer */}
      {answered && !isCorrect && (
        <div className="text-center mb-4">
          <p className="text-red-500 font-medium">
            It's "{currentWord.article} {currentWord.word}"
          </p>
          <button
            onClick={nextQuestion}
            className="mt-2 text-slate-500 hover:text-slate-700 text-sm underline"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Answer buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleAnswer('de')}
          disabled={answered}
          className={`w-36 h-24 text-3xl font-bold rounded-xl transition-all ${
            answered
              ? selectedAnswer === 'de'
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-400 text-white'
                : currentWord.article === 'de'
                  ? 'bg-green-500 text-white'
                  : 'bg-sky-500 text-white opacity-50'
              : 'bg-sky-500 hover:bg-sky-600 text-white hover:scale-105 active:scale-95'
          }`}
        >
          de
        </button>
        <button
          onClick={() => handleAnswer('het')}
          disabled={answered}
          className={`w-36 h-24 text-3xl font-bold rounded-xl transition-all ${
            answered
              ? selectedAnswer === 'het'
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-400 text-white'
                : currentWord.article === 'het'
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 text-white opacity-50'
              : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95'
          }`}
        >
          het
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-slate-400 text-sm mb-6">
        Press <kbd className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-500 text-xs mx-1">D</kbd> for de, <kbd className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-500 text-xs mx-1">H</kbd> for het
      </p>

      {/* Start over button */}
      <button
        onClick={startNewGame}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        <span className="text-sm">Start over</span>
      </button>
    </div>
  );
}
