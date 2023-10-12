import { Player } from "../interfaces/Player";
import createBingoCard from "./card";

function _uniqueid(length: number) {
  let idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
  do {
    const ascicode = Math.floor((Math.random() * 42) + 48);
    if (ascicode < 58 || ascicode > 64) {
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < length);

  return (idstr);
}

function _sanitizeName(name: string) {
  return name.trim().replace(/[^\w ]/g, "")
}

function _generatePlayerId(name: string) {
  return `id_${name.toLowerCase()}_${_uniqueid(16)}`
}

export function clearPlayers() {
  localStorage.clear()
}

export function saveInLocalStorage(players: Player[]): void {

  players.forEach((player, i) => {
    const stringifiedPlayer = JSON.stringify(player)
    localStorage.setItem(`p-${i + 1}`, stringifiedPlayer)
  })
}

export function generatePlayer(name: string): Player | null {
  const sanitizedName = _sanitizeName(name)

  if(sanitizedName.length < 3) {
    return null
  }

  const id = _generatePlayerId(sanitizedName)

  const player = {
    id,
    name: sanitizedName,
    card: createBingoCard()
  }

  return player
}