export enum GameState {
  Active,
  Lost,
  Won,
}

export enum CellState {
  Hidden,
  Triggered,
  Flagged,
}

export interface CellValue {
  state: CellState;
  neighbourMines: number;
  isMine?: boolean;
}

export interface Game {
  fields: CellValue[];
  mines: Set<number>;
  flags: number;
}
