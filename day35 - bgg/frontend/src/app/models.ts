export interface GameInfo {
  gameId: number
  name: string
}

export interface GameDetails {
  gameId: number
  name: string
  year: number
  url: string
  image: string
  comments: GameComment[]
}

export interface GameComment {
  user: string
  comment: string
  rating: number
}