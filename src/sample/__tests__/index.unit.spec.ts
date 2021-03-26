import { getAllCreatures, attemptCatch } from "../assembly";
import { PersistentDeque, VMContext, VM } from "near-sdk-as";

const contract = "greeting";
const creaturesContract = "creatures";
const creature1 = "{ 'name': 'scorpion' }";
const creature2 = "{ 'name': 'rat' }";
const creature3 = "{ 'name': 'dog' }";
const alice = "alice";
const message1 = "hooray!";
const message2 = "yaşasın!";
const message3 = "beleza!";

let messages: PersistentDeque<string>;
let creatures: PersistentDeque<string>;

describe("Catcher", () => {
  beforeEach(() => {
    VMContext.setCurrent_account_id(creaturesContract);
    VMContext.setSigner_account_id("ug02fast");
    creatures = new PersistentDeque<string>("creatures");
  });

  it("should respond to getAllCreatures", () => {
    creatures.pushBack(creature1);
    creatures.pushBack(creature2);
    creatures.pushBack(creature3);
    const output = getAllCreatures();
    expect(output).toHaveLength(3);
  });

  it("should respond to catchCreature", () => {
    expect(attemptCatch).not.toThrow();
    expect(VM.logs()).toContainEqual("attempted to catch");
  });
});

// describe("Greeting", () => {
//   beforeEach(() => {
//     VMContext.setCurrent_account_id(contract);
//     VMContext.setSigner_account_id(alice);
//     messages = new PersistentDeque<string>("messages");
//   });

//   it("should respond to showYouKnow()", () => {
//     expect(showYouKnow).not.toThrow();
//     expect(VM.logs()).toContainEqual("showYouKnow() was called");
//   });

//   it("should respond to showYouKnow2()", () => {
//     expect(showYouKnow2()).toBeTruthy();
//     expect(VM.logs()).toContainEqual("showYouKnow2() was called");
//   });

//   it("should respond to sayHello()", () => {
//     expect(sayHello()).toStrictEqual("Hello!");
//     expect(VM.logs()).toContainEqual("sayHello() was called");
//   });

//   it("should respond to sayMyName()", () => {
//     expect(sayMyName()).toStrictEqual("Hello, " + alice + "!");
//     expect(VM.logs()).toContainEqual("sayMyName() was called");
//   });

//   it("should respond to saveMyName()", () => {
//     expect(saveMyName).not.toThrow();
//     expect(storage.getString("last_sender")).toStrictEqual(alice);
//     expect(VM.logs()).toContainEqual("saveMyName() was called");
//   });

//   it("should respond to saveMyMessage()", () => {
//     const expected = alice + " says " + message1;
//     expect(saveMyMessage(message1)).toBeTruthy();
//     expect(messages.first).toStrictEqual(expected);
//     expect(VM.logs()).toContainEqual("saveMyMessage() was called");
//   });

//   it("should respond to getAllMessages()", () => {
//     messages.pushFront(message1);
//     messages.pushFront(message2);
//     messages.pushFront(message3);

//     const output = getAllMessages();
//     expect(output).toHaveLength(3);
//     expect(messages).toHaveLength(0);

//     expect(VM.logs()).toContainEqual("getAllMessages() was called");
//   });
// });
