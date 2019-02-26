import React from "react";
import { Bonus } from "../../store";
import { BonusCard } from "../bonus-card";

export interface BonusListProps {
  bonuses: Bonus[];
}

export function BonusList({ bonuses }: BonusListProps) {
  return bonuses.map((bonus, i) =>
    <BonusCard key={i} bonus={bonus}/>
  );
}
