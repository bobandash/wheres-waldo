export interface GameTypeProps {
  _id: string,
  gameType: string,
  image: {
    filename: string,
    path: string
  },
  dimensions: {
    width: number,
    height: number
  }
}

export const exampleGameType = {
  _id: '',
  gameType: '',
  image: {
    filename: '',
    path: '',
  },
  dimensions: {
    width: 1,
    height: 1
  }
}
