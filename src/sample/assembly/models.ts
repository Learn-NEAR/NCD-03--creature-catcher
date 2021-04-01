import { context, u128, PersistentVector } from "near-sdk-as";

@nearBindgen
export class Specimen {
  premium: boolean;
  sender: string;
  constructor(public name: string, public rarity: i32) {
    this.premium = context.attachedDeposit >= u128.from("10000000000000000000000");
    this.sender = context.sender;
    this.name = name;
    this.rarity = rarity;
  }
}

export const specimen = new PersistentVector<Specimen>("specimen");
