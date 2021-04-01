import { getAllCreatures, attemptCatch } from "../assembly";
import { VMContext, VM } from "near-sdk-as";
import { Specimen } from "../assembly/models";

const creature1 = new Specimen("scorpion", 3);
const creature2 = new Specimen("rat", 2);
const creature3 = new Specimen("dog", 1);

let specimen: Specimen[];

describe("Catcher", () => {
  beforeEach(() => {
    VMContext.setCurrent_account_id("creatures");
    VMContext.setSigner_account_id("ug02fast");
    specimen = new Array<Specimen>();
  });

  it("should respond to getAllCreatures", () => {
    specimen.push(creature1);
    specimen.push(creature2);
    specimen.push(creature3);
    const output = getAllCreatures();
    expect(output).toHaveLength(3);
  });

  it("should respond to catchCreature", () => {
    expect(attemptCatch).not.toThrow();
    expect(VM.logs()).toContainEqual("attempted to catch");
  });
});
