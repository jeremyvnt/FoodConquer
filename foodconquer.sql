#Resources
INSERT INTO Resource(name) VALUES ('cereal');
INSERT INTO Resource(name) VALUES ('meat');
INSERT INTO Resource(name) VALUES ('water');
INSERT INTO Resource(name) VALUES ('money');

#Requirement
INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'Betail',
  'Betail',
  'BUILDING',
  'Elevage de bétail. Bâtiment permettant de la production de viande',
  50
);

INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'Champs',
  'Champs',
  'BUILDING',
  'Champs de céreals',
  50
);

INSERT INTO Requirement(id, name, type, description, levelMax) VALUES (
  'Puit',
  'Puit',
  'BUILDING',
  'Reserve d''eau',
  50
);

#RequirementResource
##Champs
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Champs', 'meat', 15);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Champs', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Champs', 'cereal', 60);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Champs', 'money', 0);
##Elevage
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Betail', 'meat ', 24);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Betail', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Betail', 'cereal', 48);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Betail', 'money', 0);
##Puit
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Puit', 'meat ', 75);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Puit', 'water', 0);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Puit', 'cereal', 225);
INSERT INTO RequirementResource(requirementId, resourceId, cost) VALUES ('Puit', 'money', 0);

#User 1
INSERT INTO User(pseudo, email, password) VALUES ('Jerem','jeremy.vnt@gmail.com', 'password');
SET @user_id = (SELECT LAST_INSERT_ID());


##UserResources
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('cereal', @user_id, 2000, LOCALTIMESTAMP);
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('meat', @user_id, 2000, LOCALTIMESTAMP);
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('water', @user_id, 2000, LOCALTIMESTAMP);
INSERT INTO UserResource(resource, userId, quantity, updatedAt) VALUES ('money', @user_id, 2000, LOCALTIMESTAMP);

##UserRequirement
INSERT INTO UserRequirement(requirementId, userId, level, updatedAt) VALUES ('Champs', @user_id, 0, LOCALTIMESTAMP);
INSERT INTO UserRequirement(requirementId, userId, level, updatedAt) VALUES ('Betail', @user_id, 0, LOCALTIMESTAMP);
INSERT INTO UserRequirement(requirementId, userId, level, updatedAt) VALUES ('Puit', @user_id, 0, LOCALTIMESTAMP);


##UserUnit
