import { logging, math, PersistentDeque } from "near-sdk-as";

export function getAllCreatures(): Array<string> {
  logging.log("called getTotalCreatures");
  const creatures = new PersistentDeque<string>("creatures");
  let results = new Array<string>();
  while (!creatures.isEmpty) {
    results.push(creatures.popBack());
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
  const creature1 = "{ 'name': 'scorpion' }";
  const creature2 = "{ 'name': 'rat' }";
  const creature3 = "{ 'name': 'dog' }";
  const wildCreatures = new PersistentDeque<string>("wild");
  wildCreatures.pushFront(creature1);
  wildCreatures.pushFront(creature2);
  wildCreatures.pushFront(creature3);
  const creatures = new PersistentDeque<string>("creatures");
  const attempt = _randomNum(2);
  const randomCreatureSelectIndex = _randomNum(3);
  if (attempt > 0) {
    const caughtCreature = wildCreatures[randomCreatureSelectIndex];
    logging.log(caughtCreature);
    creatures.pushFront(caughtCreature);
  } else {
    logging.log("Failed to catch creature");
  }
  logging.log("attempted to catch");
  logging.log(attempt);
  logging.log(randomCreatureSelectIndex);
}
