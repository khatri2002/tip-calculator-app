export type Inputs = {
  bill: string;
  tip: string;
  noOfPeople: string;
  customTip: string;
};

export type Result = {
  tipPerPerson: number;
  totalPerPerson: number;
};

export type Tips = Array<number>;
