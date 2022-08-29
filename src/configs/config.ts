export const DROPDOWN_PANES = [
  {
    title: "Benchmark",
    type: "benchmark",
    description: "This is some subcontent to explain benchmarking.",
    styles: {
      padding: "20px",
    },
  },
  {
    title: "Accelerate",
    type: "accelerate",
    description: "Could even open this accordian for a paragraph of text.",
    styles: {
      padding: "20px",
    },
  },
];
export const SIDEBAR_ICONS: string[] = ["home", "chart bar", "circle"];

export const NEW_ACCELERATE_SELECTION = "Select Engine";

export const NEW_BENCHMARK_SELECTION = {
  engine: "Select Engine",
  numTrials: 0,
  runsPerTrial: 0,
};
export const NEW_HARDWARE_SELECTION = {
  provider: "Select Provider",
  instance: "Select Instance",
  cpu: 0,
  memory: 0,
};
