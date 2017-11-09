const LABORATOIRE_TECH = new Map()
const RESTAURANT_TECH = new Map()
const BETAGE_TECH = new Map()
const PUIT_TECH = new Map()
const CHAMPS_TECH = new Map()
const MINE_TECH = new Map()
const ENTREPOT_TECH = new Map()
const CITERNE_TECH = new Map()
const SILOT_TECH = new Map()
const PORTUGAIS_TECH = new Map()

const ESPIONNAGE_TECH : Map<string, number> = new Map([['Laboratoire', 1]])
const ESPION_TECH : Map<string, number> = new Map([['Restaurant', 1], ['Espionnage', 1]])
const SECURITE_TECH : Map<string, number> = new Map([['Espionnage', 4]])
const CHIEN_TECH : Map<string, number> = new Map([['Restaurant', 1], ['Securite', 3]])
const BARRIERE_TECH : Map<string, number> = new Map([['Securite', 4]])
const CAMERA_TECH : Map<string, number> = new Map([['Securite', 6]])
const VIGILE_TECH : Map<string, number> = new Map([['Restaurant', 3],
  ['Securite', 4], ['Proteine', 3]])

const SAMOURAI_TECH : Map<string, number> = new Map([['Restaurant', 5], 
  ['Securite', 6], ['Proteine', 6], ['Poisson', 4]])

const COLONISATION_TECH : Map<string, number> = new Map([['Laboratoire', 5]])
const COLON_TECH : Map<string, number> = new Map([['Colonisation', 1]])

const BAVOIRE_TECH : Map<string, number> = new Map([['Laboratoire', 1]])
const PROTEINE_TECH : Map<string, number> = new Map([['Bavoire', 4], ['Cuisine', 3]])
const GRAISSE_TECH : Map<string, number> = new Map([['Bavoire', 6], ['Proteine', 3]])

const CUISINE_TECH : Map<string, number> = new Map([['Laboratoire', 1]])
const RIZ_TECH : Map<string, number> = new Map([['Cuisine', 2]])
const POISSON_TECH : Map<string, number> = new Map([['Cuisine', 4]])
const AMERICAIN_TECH : Map<string, number> = new Map([['Restaurant', 1], ['Cuisine', 1]])
const SUMO_TECH : Map<string, number> = new Map([['Restaurant', 10], 
  ['Graisse', 8], ['Proteine', 10], ['Riz', 10], ['Poisson', 8]])

const CHINOIS_TECH : Map<string, number> = new Map([['Restaurant', 2], ['Riz', 1]])
const JAPONAIS_TECH : Map<string, number> = new Map([['Restaurant', 4], 
  ['Riz', 3], ['Poisson', 2]])

const CONCESSION_TECH : Map<string, number> = new Map([['Laboratoire', 1]])
const TRAFIC_TECH : Map<string, number> = new Map([['Concession', 4]])
const TRANSPORTEUR_TECH : Map<string, number> = new Map([['Concession', 8]])
const ARTISANT_TECH : Map<string, number> = new Map([['Portugais', 10], ['Concession', 10]])
  
export class TechTree {

  static TECH_TREE: Map<string, Map<string, number>>  = new Map([
  	['Laboratoire', LABORATOIRE_TECH],
  	['Restaurant', RESTAURANT_TECH],
  	['Betage', BETAGE_TECH],
  	['Puit', PUIT_TECH],
  	['Champs', CHAMPS_TECH],
  	['Mine', MINE_TECH],
  	['Entrepot', ENTREPOT_TECH],
  	['Citerne', CITERNE_TECH],
  	['Silot', SILOT_TECH],
  	['Portugais', PORTUGAIS_TECH],
  	['Espionnage', ESPIONNAGE_TECH],
  	['Securite', SECURITE_TECH],
  	['Chien', CHIEN_TECH],
  	['Barriere', BARRIERE_TECH],
  	['Camera', CAMERA_TECH],
  	['Vigile', VIGILE_TECH],
  	['Samourai', SAMOURAI_TECH],
  	['Colonisation', COLONISATION_TECH],
  	['Colon', COLON_TECH],
  	['Espion', ESPION_TECH],
  	['Bavoire', BAVOIRE_TECH],
  	['Proteine', PROTEINE_TECH],
  	['Graisse', GRAISSE_TECH],
  	['Cuisine', CUISINE_TECH],
  	['Riz', RIZ_TECH],
  	['Poisson', POISSON_TECH],
  	['Americain', AMERICAIN_TECH],
  	['Sumo', SUMO_TECH],
  	['Chinois', CHINOIS_TECH],
  	['Japonais', JAPONAIS_TECH],
  	['Concession', CONCESSION_TECH],
  	['Trafic', TRAFIC_TECH],
  	['Transporteur', TRANSPORTEUR_TECH],
  	['Artisant', ARTISANT_TECH],
  ])
}
