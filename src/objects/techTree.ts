const LABORATOIRE_TECH: {[index: string]: number} = {}
const RESTAURANT_TECH: {[index: string]: number} = {}
const BETAIL_TECH: {[index: string]: number} = {}
const PUITS_TECH: {[index: string]: number} = {}
const CHAMPS_TECH: {[index: string]: number} = {}
const MINE_TECH: {[index: string]: number} = {}
const ENTREPOT_TECH: {[index: string]: number} = {}
const CITERNE_TECH: {[index: string]: number} = {}
const SILOT_TECH: {[index: string]: number} = {}
const PORTUGAIS_TECH: {[index: string]: number} = {}

const ESPIONNAGE_TECH: {[index: string]: number} = { laboratoire: 1 }
const ESPION_TECH: {[index: string]: number} = { restaurant: 1, espionnage: 1 }
const SECURITE_TECH: {[index: string]: number} = { espionnage: 4 }
const CHIEN_TECH: {[index: string]: number} = { restaurant: 1, securite: 3 }
const BARRIERE_TECH: {[index: string]: number} = { securite: 4 }
const CAMERA_TECH: {[index: string]: number} = { securite: 6 }
const VIGILE_TECH: {[index: string]: number} = { restaurant: 3, securite: 4, proteine: 3 }

const SAMOURAI_TECH: {[index: string]: number} = { 
  restaurant: 5, 
  securite: 6, 
  proteine: 6, 
  poisson: 4,
}

const COLONISATION_TECH: {[index: string]: number} = { laboratoire: 5 }
const COLON_TECH: {[index: string]: number} = { colonisation: 1 }

const BAVOIRE_TECH: {[index: string]: number} = { laboratoire: 1 }
const PROTEINE_TECH: {[index: string]: number} = { bavoire: 4, cuisine: 3 }
const GRAISSE_TECH: {[index: string]: number} = { bavoire: 6, proteine: 3 }

const CUISINE_TECH: {[index: string]: number} = { laboratoire: 1 }
const RIZ_TECH: {[index: string]: number} = { cuisine: 2 }
const POISSON_TECH: {[index: string]: number} = { cuisine: 4 }
const AMERICAIN_TECH: {[index: string]: number} = { restaurant: 1, cuisine: 1 }
const SUMO_TECH: {[index: string]: number} = { 
  restaurant: 10, 
  graisse: 8, 
  proteine: 10, 
  riz: 10, 
  poisson: 8,
}

const CHINOIS_TECH: {[index: string]: number} = { restaurant: 2, riz: 1 }
const JAPONAIS_TECH: {[index: string]: number} = { 
  restaurant: 4, 
  riz: 3, 
  poisson: 2,
}

const CONCESSION_TECH: {[index: string]: number} = { laboratoire: 1 }
const TRAFIC_TECH: {[index: string]: number} = { concession: 4 }
const TRANSPORTEUR_TECH: {[index: string]: number} = { concession: 8 }
const ARTISANT_TECH: {[index: string]: number} = { portugais: 10, concession: 10 }
  
export const TECH_TREE: {[index: string]: {[index: string]: number}}  = {
  laboratoire: LABORATOIRE_TECH,
  restaurant: RESTAURANT_TECH,
  betail: BETAIL_TECH,
  puits: PUITS_TECH,
  champs: CHAMPS_TECH,
  mine: MINE_TECH,
  entrepot: ENTREPOT_TECH,
  citerne: CITERNE_TECH,
  silot: SILOT_TECH,
  portugais: PORTUGAIS_TECH,
  espionnage: ESPIONNAGE_TECH,
  securite: SECURITE_TECH,
  chien: CHIEN_TECH,
  barriere: BARRIERE_TECH,
  camera: CAMERA_TECH,
  vigile: VIGILE_TECH,
  samourai: SAMOURAI_TECH,
  colonisation: COLONISATION_TECH,
  colon: COLON_TECH,
  espion: ESPION_TECH,
  bavoire: BAVOIRE_TECH,
  proteine: PROTEINE_TECH,
  graisse: GRAISSE_TECH,
  cuisine: CUISINE_TECH,
  riz: RIZ_TECH,
  poisson: POISSON_TECH,
  ricain: AMERICAIN_TECH,
  sumo: SUMO_TECH,
  chinois: CHINOIS_TECH,
  japonais: JAPONAIS_TECH,
  concession: CONCESSION_TECH,
  trafic: TRAFIC_TECH,
  transporteur: TRANSPORTEUR_TECH,
  artisant: ARTISANT_TECH,
}
