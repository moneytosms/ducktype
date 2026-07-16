export type CharacterState = "correct" | "wrong" | "pending";

export function getCharacterState(target: string, typed: string, index: number): CharacterState {
  if (index >= typed.length) return "pending";
  return typed[index] === target[index] ? "correct" : "wrong";
}

export function countErrors(target: string, typed: string) {
  let errors = 0;

  for (let index = 0; index < typed.length; index++) {
    if (typed[index] !== target[index]) errors += 1;
  }

  return errors;
}
