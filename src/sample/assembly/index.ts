import { logging, math } from "near-sdk-as";
import { Specimen, specimen } from "./models";

export function getAllCreatures(): Array<Specimen> {
  logging.log("called getTotalCreatures");
  let results = new Array<Specimen>();
  while (!specimen.isEmpty) {
    results.push(specimen.pop());
  }

  return results;
}

function _randomNum(maxNumber: u32): u32 {
  let buf = math.randomBuffer(4);

  return (
    (((0xff & buf[0]) << 24) |
      ((0xff & buf[1]) << 16) |
      ((0xff & buf[2]) << 8) |
      ((0xff & buf[3]) << 0)) %
    maxNumber
  );
}

export function attemptCatch(): void {
  const creature1 = new Specimen("scorpion", 3);
  const creature2 = new Specimen("rat", 2);
  const creature3 = new Specimen("dog", 1);

  const wildCreatures = new Array<Specimen>();
  wildCreatures.push(creature1);
  wildCreatures.push(creature2);
  wildCreatures.push(creature3);
  const attempt = _randomNum(2);
  const randomCreatureSelectIndex = _randomNum(3);
  if (attempt > 0) {
    const caughtCreature = wildCreatures[randomCreatureSelectIndex];
    logging.log(caughtCreature);
    specimen.push(caughtCreature);
  } else {
    logging.log("Failed to catch creature");
  }
  logging.log("attempted to catch");
  logging.log(attempt);
  logging.log(randomCreatureSelectIndex);
}
