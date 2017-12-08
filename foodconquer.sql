#Resources
INSERT INTO Resource(name) VALUES ('cereal');
INSERT INTO Resource(name) VALUES ('meat');
INSERT INTO Resource(name) VALUES ('water');
INSERT INTO Resource(name) VALUES ('money');

#Requirement
## Resource Building
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'champs',
  'champs',
  'BUILDING',
  'Champs permettant la production de céreals',
  41
);

###Bétail
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'betail',
  'betail',
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

## Laboratoire
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'laboratoire',
  'Laboratoire',
  'BUILDING',
  'Laboratoire de recherche permettant la découverte et l''améliore des recherches',
  20
);

## Restaurant
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'restaurant',
  'Restaurant',
  'BUILDING',
  'Bâtiment permettant la création de diverses unités',
  20
);

## Portugais
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'portugais',
  'Portugais',
  'BUILDING',
  'Bâtiment permettant la création d''ouvrier',
  30
);

#RequirementResource
##Champs
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('champs', 'cereal', 60);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('champs', 'meat', 15);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('champs', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('champs', 'money', 0);
##Betail
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('betail', 'cereal', 48);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('betail', 'meat ', 24);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('betail', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('betail', 'money', 0);
##Puit
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('puits', 'cereal', 225);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('puits', 'meat ', 75);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('puits', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('puits', 'money', 0);

##Entrepot
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('entrepot', 'cereal', 2000);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('entrepot', 'meat', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('entrepot', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('entrepot', 'money', 0);
##Citerne
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('citerne', 'cereal', 2000);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('citerne', 'meat ', 1000);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('citerne', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('citerne', 'money', 0);
##Silot
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('silot', 'cereal', 2000);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('silot', 'meat ', 2000);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('silot', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('silot', 'money', 0);

##Laboratoire
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('laboratoire', 'cereal', 200);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('laboratoire', 'meat ', 400);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VAfindLUES ('laboratoire', 'water', 200);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('laboratoire', 'money', 0);

##Restaurant
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('restaurant', 'cereal', 400);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('restaurant', 'meat ', 200);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('restaurant', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('restaurant', 'money', 0);

##Portugais
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('portugais', 'cereal', 400);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('portugais', 'meat ', 200);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('portugais', 'water', 100);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('portugais', 'money', 0);


#User 1
INSERT INTO User(pseudo, email, password) VALUES ('Jerem','jeremy.vnt@gmail.com', 'password');
SET @user_id = (SELECT LAST_INSERT_ID());

##UserResources
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('cereal', @user_id, 2000, ROUND(UNIX_TIMESTAMP() * 1000));
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('meat', @user_id, 2000, ROUND(UNIX_TIMESTAMP() * 1000));
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('water', @user_id, 2000, ROUND(UNIX_TIMESTAMP() * 1000));
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('money', @user_id, 2000, ROUND(UNIX_TIMESTAMP() * 1000));
