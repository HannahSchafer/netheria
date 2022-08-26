export const data = {
  // hardware targets (i.e. all data fro api) - formatted
  hardwareTargets: {
    AWS: [
      {
        provider: "AWS",
        instance: "large",
        cpu: 1,
        memory: 1,
      },
    ],
  },
  // user hardware target selections (as a liist for display)
  hardwareTargetSelections: [
    {
      provider: "AWS",
      instance: "large",
      cpu: 1,
      memory: 1,
    },
  ],
  // user hardware target selection aggregates
  hardwareTargetSelectionAggregates: {
    large: {
      provider: "AWS",
      instance: "large",
      cpu: 1,
      memory: 1,
    },
  },

  // benchmark data (i.e. all data fro api) -formatted
  benchmarks: {
    ONNX: {
      1: [1, 3, 4],
      2: [1, 2, 4],
    },
    TVM: {
      1: [1, 3, 4],
      3: [1, 2, 4],
    },
  },
  // user benchmark  selections (as a liist for display)
  benchmarkSelections: [
    {
      provider: "ONX",
      num_trials: 1,
      runs_per_trial: 2,
    },
  ],

  // accelerate data fro api, formaatted
  accelerate: [{ engine: "ONX" }, { engine: "TVM" }],

  // user selection of accelerate data
  accelerateSelection: { engine: "ONX" },
};
