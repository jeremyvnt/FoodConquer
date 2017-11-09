export default class TechTree {

  static LABORATOIRE_TECH = new Map()
  static RESTAURANT_TECH = new Map()
  static BETAGE_TECH = new Map()
  static PUIT_TECH = new Map()
  static CHAMPS_TECH = new Map()
  static MINE_TECH = new Map()
  static ENTREPOT_TECH = new Map()
  static CITERNE_TECH = new Map()
  static SILOT_TECH = new Map()
  static PORTUGAIS_TECH = new Map()
  
  static ESPIONNAGE_TECH : Map<string, number> = new Map([['Laboratoire', 1]])
  static ESPION_TECH : Map<string, number> = new Map([['Restaurant', 1], ['Espionnage', 1]])
  static SECURITE_TECH : Map<string, number> = new Map([['Espionnage', 4]])
  static CHIEN_TECH : Map<string, number> = new Map([['Restaurant', 1], ['Securite', 3]])
  static BARRIERE_TECH : Map<string, number> = new Map([['Securite', 4]])
  static CAMERA_TECH : Map<string, number> = new Map([['Securite', 6]])
  static VIGILE_TECH : Map<string, number> = new Map([['Restaurant', 3],
  ['Securite', 4], ['Proteine', 3]])

  static SAMOURAI_TECH : Map<string, number> = new Map([['Restaurant', 5], 
  ['Securite', 6], ['Proteine', 6], ['Poisson', 4]])
  
  static COLONISATION_TECH : Map<string, number> = new Map([['Laboratoire', 5]])
  static COLON_TECH : Map<string, number> = new Map([['Colonisation', 1]])
  
  static BAVOIRE_TECH : Map<string, number> = new Map([['Laboratoire', 1]])
  static PROTEINE_TECH : Map<string, number> = new Map([['Bavoire', 4], ['Cuisine', 3]])
  static GRAISSE_TECH : Map<string, number> = new Map([['Bavoire', 6], ['Proteine', 3]])
  
  static CUISINE_TECH : Map<string, number> = new Map([['Laboratoire', 1]])
  static RIZ_TECH : Map<string, number> = new Map([['Cuisine', 2]])
  static POISSON_TECH : Map<string, number> = new Map([['Cuisine', 4]])
  static AMERICAIN_TECH : Map<string, number> = new Map([['Restaurant', 1], ['Cuisine', 1]])
  static SUMO_TECH : Map<string, number> = new Map([['Restaurant', 10], 
  ['Graisse', 8], ['Proteine', 10], ['Riz', 10], ['Poisson', 8]])
  
  static CHINOIS_TECH : Map<string, number> = new Map([['Restaurant', 2], ['Riz', 1]])
  static JAPONAIS_TECH : Map<string, number> = new Map([['Restaurant', 4], 
  ['Riz', 3], ['Poisson', 2]])
  
  static CONCESSION_TECH : Map<string, number> = new Map([['Laboratoire', 1]])
  static TRAFIC_TECH : Map<string, number> = new Map([['Concession', 4]])
  static TRANSPORTEUR_TECH : Map<string, number> = new Map([['Concession', 8]])
  static ARTISANT_TECH : Map<string, number> = new Map([['Portugais', 10], ['Concession', 10]])


  static TECH_TREE: Map<string, Map<string, number>>  = new Map([
  	['Laboratoire', TechTree.LABORATOIRE_TECH],
  	['Restaurant', TechTree.RESTAURANT_TECH],
  	['Betage', TechTree.BETAGE_TECH],
  	['Puit', TechTree.PUIT_TECH],
  	['Champs', TechTree.CHAMPS_TECH],
  	['Mine', TechTree.MINE_TECH],
  	['Entrepot', TechTree.ENTREPOT_TECH],
  	['Citerne', TechTree.CITERNE_TECH],
  	['Silot', TechTree.SILOT_TECH],
  	['Portugais', TechTree.PORTUGAIS_TECH],
  	['Espionnage', TechTree.ESPIONNAGE_TECH],
  	['Securite', TechTree.SECURITE_TECH],
  	['Chien', TechTree.CHIEN_TECH],
  	['Barriere', TechTree.BARRIERE_TECH],
  	['Camera', TechTree.CAMERA_TECH],
  	['Vigile', TechTree.VIGILE_TECH],
  	['Samourai', TechTree.SAMOURAI_TECH],
  	['Colonisation', TechTree.COLONISATION_TECH],
  	['Colon', TechTree.COLON_TECH],
  	['Espion', TechTree.ESPION_TECH],
  	['Bavoire', TechTree.BAVOIRE_TECH],
  	['Proteine', TechTree.PROTEINE_TECH],
  	['Graisse', TechTree.GRAISSE_TECH],
  	['Cuisine', TechTree.CUISINE_TECH],
  	['Riz', TechTree.RIZ_TECH],
  	['Poisson', TechTree.POISSON_TECH],
  	['Americain', TechTree.AMERICAIN_TECH],
  	['Sumo', TechTree.SUMO_TECH],
  	['Chinois', TechTree.CHINOIS_TECH],
  	['Japonais', TechTree.JAPONAIS_TECH],
  	['Concession', TechTree.CONCESSION_TECH],
  	['Trafic', TechTree.TRAFIC_TECH],
  	['Transporteur', TechTree.TRANSPORTEUR_TECH],
  	['Artisant', TechTree.ARTISANT_TECH],
  ])
}
