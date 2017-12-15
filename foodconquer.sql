#Resources
INSERT INTO Resource(name) VALUES ('cereal');
INSERT INTO Resource(name) VALUES ('meat');
INSERT INTO Resource(name) VALUES ('water');
INSERT INTO Resource(name) VALUES ('money');

#Requirement
## Resource Building
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'champs',
  'Champs',
  'BUILDING',
  'Champs permettant la production de céreals',
  41
);

###Bétail
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'betail',
  'Betail',
  'BUILDING',
  'Elevage de bétail permettant de la production de viande',
  41
);

###Puits
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'puits',
  'Puits',
  'BUILDING',
  'Puit permettant la production d''eau',
  35
);

###Mine
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'mine',
  'Mine',
  'BUILDING',
  'Mine permettant la production d''argent',
  31
);

## Storage Resource Building
###Silot
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'silot',
  'Silot',
  'BUILDING',
  'Réserve de céréales',
  33
);
###Entrepot
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'entrepot',
  'Entrepot',
  'BUILDING',
  'Réserve de viande',
  33
);
###Citerne
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'citerne',
  'Citerne',
  'BUILDING',
  'Réserve d''eau',
  33
);
## Other Buildings
### Laboratoire
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'laboratoire',
  'Laboratoire',
  'BUILDING',
  'Laboratoire de recherche permettant la découverte et l''améliore des recherches',
  20
);

### Restaurant
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'restaurant',
  'Restaurant',
  'BUILDING',
  'Bâtiment permettant la création de diverses unités',
  20
);

### Portugais
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'portugais',
  'Portugais',
  'BUILDING',
  'Bâtiment permettant la création d''ouvrier',
  30
);

### Artisan
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'artisan',
  'Artisan',
  'BUILDING',
  'Bâtiment permettant d''accélérer la vitesse de construction',
  10
);

### Concession
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'concession',
  'Concession',
  'BUILDING',
  'Bâtiment permettant la création d''unité de transport',
  20
);

# Research
## Espionnage
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'espionnage',
  'Espionnage',
  'RESEARCH',
  'Apprentissage de l''espionnage #NINJA',
  18
);

## Sécurité
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'securite',
  'Securité',
  'RESEARCH',
  'Technologie de défense',
  18
);

## Colonisation
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'colonisation',
  'Colonisation',
  'RESEARCH',
  'Technologie d''exploration',
  18
);

## Bavoire
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'bavoire',
  'Bavoire',
  'RESEARCH',
  'Technologie dediée à la protection',
  18
);

## Cuisine
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'cuisine',
  'Cuisine',
  'RESEARCH',
  'Technologie dediée à l''élaboration d''unités',
  18
);

## Graisse
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'graisse',
  'Graisse',
  'RESEARCH',
  'Technologie dediée à l''élaboration d''unités défensives/protection',
  18
);

## Protéine
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'proteine',
  'Protéine',
  'RESEARCH',
  'Technologie dediée à l''augmentation des dégats des unités défensives',
  18
);

## Riz
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'riz',
  'Riz',
  'RESEARCH',
  'Technologie dediée à la création d''unités offensives de type asiatique',
  18
);

## Poisson
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'poisson',
  'Poisson',
  'RESEARCH',
  'Technologie dediée à la création d''unités offensives japonnaises',
  18
);

#RequirementResource
##Buildings
###Champs
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('champs', 'cereal', 60);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('champs', 'meat', 15);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('champs', 'water', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('champs', 'money', 0);
###Betail
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('betail', 'cereal', 48);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('betail', 'meat ', 24);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('betail', 'water', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('betail', 'money', 0);
###Puit
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('puits', 'cereal', 225);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('puits', 'meat ', 75);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('puits', 'water', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('puits', 'money', 0);

###Entrepot
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('entrepot', 'cereal', 2000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('entrepot', 'meat', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('entrepot', 'water', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('entrepot', 'money', 0);
###Citerne
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('citerne', 'cereal', 2000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('citerne', 'meat ', 1000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('citerne', 'water', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('citerne', 'money', 0);
###Silot
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('silot', 'cereal', 2000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('silot', 'meat ', 2000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('silot', 'water', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('silot', 'money', 0);

###Laboratoire
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('laboratoire', 'cereal', 200);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('laboratoire', 'meat ', 400);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('laboratoire', 'water', 200);
###Restaurant
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('restaurant', 'cereal', 400);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('restaurant', 'meat ', 200);
###Portugais
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('portugais', 'cereal', 400);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('portugais', 'meat ', 200);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('portugais', 'water', 100);
###Artisan
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('artisan', 'cereal', 1000000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('artisan', 'meat ', 500000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('artisan', 'water', 100000);
###Concession
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('concession', 'cereal', 400);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('concession', 'meat ', 200);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('concession', 'water', 100);

##Recherches
###Espionnage
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('espionnage', 'cereal', 200);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('espionnage', 'meat ', 1000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('espionnage', 'water', 200);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('espionnage', 'money', 0);
###Securité
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('securite', 'cereal', 1000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('securite', 'meat ', 300);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('securite', 'water', 100);
###Colonisation
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('colonisation', 'cereal', 4000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('colonisation', 'meat ', 8000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('colonisation', 'water', 4000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('colonisation', 'money', 0);
###Bavoire
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('bavoire', 'cereal', 1000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('bavoire', 'meat ', 8000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('bavoire', 'water', 4000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('bavoire', 'money', 0);
###Cuisine
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('cuisine', 'cereal', 400);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('cuisine', 'meat ', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('cuisine', 'water', 600);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('cuisine', 'money', 0);
###Graisse
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('graisse', 'cereal', 200);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('graisse', 'meat ', 600);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('graisse', 'water', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('graisse', 'money', 0);
###Protéine
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('proteine', 'cereal', 800);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('proteine', 'meat ', 200);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('proteine', 'water', 0);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('proteine', 'money', 0);
###Riz
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('riz', 'cereal', 2000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('riz', 'meat ', 4000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('riz', 'water', 600);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('riz', 'money', 0);
###Poisson
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('poisson', 'cereal', 10000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('poisson', 'meat ', 20000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('poisson', 'water', 6000);
INSERT INTO RequirementResource(requirementId, resource, cost) VALUES ('poisson', 'money', 0);

#Unit
INSERT INTO Unit(id, name, description, armor, strength, health, speed, storage, uptake, type) VALUES (
  'barriere',
  'Barrière',
  'Bouclier de défence',
  2000,
  0,
  20000,
  0,
  0,
  0,
  'DEFENSE'
);
#Vigile
INSERT INTO Unit(id, name, description, health, armor, strength, speed, storage, uptake, type) VALUES (
  'vigile',
  'Vigile',
  'Unité de défense avancée',
  8000,
  100,
  250,
  0,
  0,
  0,
  'DEFENSE'
);
#Chien
INSERT INTO Unit(id, name, description, health, armor, strength, speed, storage, uptake, type) VALUES (
  'chien',
  'Chien',
  'Unité de défense basique',
  2000,
  20,
  80,
  0,
  0,
  0,
  'DEFENSE'
);
#Mirador
INSERT INTO Unit(id, name, description, health, armor, strength, speed, storage, uptake, type) VALUES (
  'mirador',
  'Mirador',
  'Unité de défense expert',
  8000,
  500,
  150,
  0,
  0,
  0,
  'DEFENSE'
);
#Samorai
INSERT INTO Unit(id, name, description, health, armor, strength, speed, storage, uptake, type) VALUES (
  'samorai',
  'Samoraï',
  'Unité de défense ultime',
  100000,
  300,
  3000,
  0,
  0,
  0,
  'DEFENSE'
);


#Colomb
INSERT INTO Unit(id, name, description, health, armor, strength, storage, speed, uptake, type) VALUES (
  'colomb',
  'Colomb',
  'Unité de colonisation',
  30000,
  100,
  50,
  7500,
  2500,
  1000,
  'ATTACK'
);
#Espion
INSERT INTO Unit(id, name, description, health, armor, strength, storage, speed, uptake, type) VALUES (
  'espion',
  'Espion',
  'Unité d''espionnage',
  1000,
  0,
  0,
  5,
  100000000,
  1,
  'ATTACK'
);
#Chinois
INSERT INTO Unit(id, name, description, health, armor, strength, storage, speed, uptake, type) VALUES (
  'chinois',
  'Chinois',
  'Unité offensive',
  10000,
  25,
  150,
  100,
  10000,
  75,
  'ATTACK'
);
#Japonais
INSERT INTO Unit(id, name, description, health, armor, strength, storage, speed, uptake, type) VALUES (
  'japonais',
  'Japonais',
  'Unité offensive avancée',
  60000,
  200,
  1000,
  1500,
  10000,
  500,
  'ATTACK'
);
#Ricain
INSERT INTO Unit(id, name, description, health, armor, strength, storage, speed, uptake, type) VALUES (
  'ricain',
  'Ricain',
  'Unité offensive basique',
  4000,
  10,
  50,
  50,
  12500,
  20,
  'ATTACK'
);
#Sumo
INSERT INTO Unit(id, name, description, health, armor, strength, storage, speed, uptake, type) VALUES (
  'sumo',
  'Sumo',
  'Unité offensive ultime #TMORT',
  9000000,
  50000,
  200000,
  1000000,
  100,
  1,
  'ATTACK'
);
#Trafic
INSERT INTO Unit(id, name, description, health, armor, strength, storage, speed, uptake, type) VALUES (
  'trafic',
  'Trafic',
  'Unité de collecte',
  4000,
  10,
  5,
  5000,
  5000,
  10,
  'ATTACK'
);
#Transporteur
INSERT INTO Unit(id, name, description, health, armor, strength, storage, speed, uptake, type) VALUES (
  'transporteur',
  'Transporteur',
  'Unité de collecte avancée',
  12000,
  25,
  5,
  25000,
  7500,
  50,
  'ATTACK'
);

#UnitResource
##Defence
###Barrière
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('barriere', 'cereal', 10000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('barriere', 'meat', 10000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('barriere', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('barriere', 'money', 0);
###Vigile
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('vigile', 'cereal', 6000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('vigile', 'meat', 2000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('vigile', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('vigile', 'money', 0);
###Chien
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('chien', 'cereal', 2000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('chien', 'meat', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('chien', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('chien', 'money', 0);
###Mirador
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('mirador', 'cereal', 2000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('mirador', 'meat', 6000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('mirador', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('mirador', 'money', 0);
###Samoraï
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('samorai', 'cereal', 50000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('samorai', 'meat', 50000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('samorai', 'water', 30000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('samorai', 'money', 0);
##Attack
###Colomb
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('colomb', 'cereal', 10000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('colomb', 'meat', 20000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('colomb', 'water', 10000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('colomb', 'money', 0);
###Espion
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('espion', 'cereal', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('espion', 'meat', 1000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('espion', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('espion', 'money', 0);
###Chinois
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('chinois', 'cereal', 6000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('chinois', 'meat', 4000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('chinois', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('chinois', 'money', 0);
###Japonnais
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('japonnais', 'cereal', 45000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('japonnais', 'meat', 15000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('japonnais', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('japonnais', 'money', 0);
###Ricain
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('ricain', 'cereal', 3000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('ricain', 'meat', 1000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('ricain', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('ricain', 'money', 0);
###Trafic
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('trafic', 'cereal', 2000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('trafic', 'meat', 2000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('trafic', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('trafic', 'money', 0);
###Transpoteur
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('transporteur', 'cereal', 6000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('transporteur', 'meat', 6000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('transporteur', 'water', 0);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('transporteur', 'money', 0);
###Sumo
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('sumo', 'cereal', 5000000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('sumo', 'meat', 4000000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('sumo', 'water', 1000000);
INSERT INTO UnitResource(unitId, resource, type, cost) VALUES ('sumo', 'money', 0);


#User 1
INSERT INTO User(pseudo, email, password) VALUES ('Jerem','jeremy.vnt@gmail.com', 'password');
SET @user_id = (SELECT LAST_INSERT_ID());

##UserResources
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('cereal', @user_id, 2000, ROUND(UNIX_TIMESTAMP() * 1000));
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('meat', @user_id, 2000, ROUND(UNIX_TIMESTAMP() * 1000));
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('water', @user_id, 2000, ROUND(UNIX_TIMESTAMP() * 1000));
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('money', @user_id, 2000, ROUND(UNIX_TIMESTAMP() * 1000));