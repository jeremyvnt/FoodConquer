const LABORATOIRE_TECH: Map<string, number> = new Map()
const RESTAURANT_TECH: Map<string, number> = new Map()
const BETAIL_TECH: Map<string, number> = new Map()
const PUITS_TECH: Map<string, number> = new Map()
const CHAMPS_TECH: Map<string, number> = new Map()
const MINE_TECH: Map<string, number> = new Map()
const ENTREPOT_TECH: Map<string, number> = new Map()
const CITERNE_TECH: Map<string, number> = new Map()
const SILOT_TECH: Map<string, number> = new Map()
const PORTUGAIS_TECH: Map<string, number> = new Map()

const ESPIONNAGE_TECH: Map<string, number> = new Map([['laboratoire', 1]])
const ESPION_TECH: Map<string, number> = new Map([['restaurant', 1], ['espionnage', 1]])
const SECURITE_TECH: Map<string, number> = new Map([['espionnage', 4]])
const CHIEN_TECH: Map<string, number> = new Map([['restaurant', 1], ['securite', 3]])
const BARRIERE_TECH: Map<string, number> = new Map([['securite', 4]])
const CAMERA_TECH: Map<string, number> = new Map([['securite', 6]])
const VIGILE_TECH: Map<string, number> = new Map([['restaurant', 3],
  ['securite', 4], ['proteine', 3]])

const SAMOURAI_TECH: Map<string, number> = new Map([['restaurant', 5], 
  ['securite', 6], ['proteine', 6], ['poisson', 4]])

const COLONISATION_TECH: Map<string, number> = new Map([['laboratoire', 5]])
const COLON_TECH: Map<string, number> = new Map([['colonisation', 1]])

const BAVOIRE_TECH: Map<string, number> = new Map([['laboratoire', 1]])
const PROTEINE_TECH: Map<string, number> = new Map([['bavoire', 4], ['cuisine', 3]])
const GRAISSE_TECH: Map<string, number> = new Map([['bavoire', 6], ['proteine', 3]])

const CUISINE_TECH: Map<string, number> = new Map([['laboratoire', 1]])
const RIZ_TECH: Map<string, number> = new Map([['cuisine', 2]])
const POISSON_TECH: Map<string, number> = new Map([['cuisine', 4]])
const AMERICAIN_TECH: Map<string, number> = new Map([['restaurant', 1], ['cuisine', 1]])
const SUMO_TECH: Map<string, number> = new Map([['restaurant', 10], 
  ['graisse', 8], ['proteine', 10], ['riz', 10], ['poisson', 8]])

const CHINOIS_TECH: Map<string, number> = new Map([['restaurant', 2], ['riz', 1]])
const JAPONAIS_TECH: Map<string, number> = new Map([['restaurant', 4], 
  ['riz', 3], ['poisson', 2]])

const CONCESSION_TECH: Map<string, number> = new Map([['laboratoire', 1]])
const TRAFIC_TECH: Map<string, number> = new Map([['concession', 4]])
const TRANSPORTEUR_TECH: Map<string, number> = new Map([['concession', 8]])
const ARTISANT_TECH: Map<string, number> = new Map([['portugais', 10], ['concession', 10]])
  
export const TECH_TREE: Map<string, Map<string, number>>  = new Map([
  ['laboratoire', LABORATOIRE_TECH],
  ['restaurant', RESTAURANT_TECH],
  ['betail', BETAIL_TECH],
  ['puits', PUITS_TECH],
  ['champs', CHAMPS_TECH],
  ['mine', MINE_TECH],
  ['entrepot', ENTREPOT_TECH],
  ['citerne', CITERNE_TECH],
  ['silot', SILOT_TECH],
  ['portugais', PORTUGAIS_TECH],
  ['espionnage', ESPIONNAGE_TECH],
  ['securite', SECURITE_TECH],
  ['chien', CHIEN_TECH],
  ['barriere', BARRIERE_TECH],
  ['camera', CAMERA_TECH],
  ['vigile', VIGILE_TECH],
  ['samourai', SAMOURAI_TECH],
  ['colonisation', COLONISATION_TECH],
  ['colon', COLON_TECH],
  ['espion', ESPION_TECH],
  ['bavoire', BAVOIRE_TECH],
  ['proteine', PROTEINE_TECH],
  ['graisse', GRAISSE_TECH],
  ['cuisine', CUISINE_TECH],
  ['riz', RIZ_TECH],
  ['poisson', POISSON_TECH],
  ['americain', AMERICAIN_TECH],
  ['sumo', SUMO_TECH],
  ['chinois', CHINOIS_TECH],
  ['japonais', JAPONAIS_TECH],
  ['concession', CONCESSION_TECH],
  ['trafic', TRAFIC_TECH],
  ['transporteur', TRANSPORTEUR_TECH],
  ['artisant', ARTISANT_TECH],
])
