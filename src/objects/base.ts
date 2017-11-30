export interface BaseDefinition {
  id: string
  baseCost: Map<Resources, number>
  baseDuration: number
  name: string
  description: string
}