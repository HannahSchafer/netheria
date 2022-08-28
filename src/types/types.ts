export interface DisplayDdata {
  description?: string;
  styles?: any;
  title: string;
}

export interface PaneStyles {
  padding: string;
}

export interface IHardwareTarget {
  provider: string;
  instance: string;
  cpu: number;
  memory: number;
}

export interface IBenchmark {
  engine: string;
  numTrials: number;
  runsPerTrial: number;
}

export enum Engine {
  "AWS",
  "GCP",
}
