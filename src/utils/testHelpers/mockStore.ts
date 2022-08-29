import {
  NEW_ACCELERATE_SELECTION,
  NEW_BENCHMARK_SELECTION,
  NEW_HARDWARE_SELECTION,
} from "../../configs/config";

export const mockConfigData = {
  data: {
    entityTitle: "Test Title",
    entityAuthor: "Test Author",
    entityCreatedAt: "2022-08-23T20:09:17.924Z",
  },
};

export const mockStore = {
  allData: {
    accelerateCurrent: {},
    accelerateSelection: NEW_ACCELERATE_SELECTION,
    benchmarkData: {},
    benchmarkCurrent: NEW_BENCHMARK_SELECTION,
    benchmarkDataSelections: [NEW_BENCHMARK_SELECTION],
    configData: mockConfigData,
    hardwareTargetApiData: {},
    hardwareTargetCurrent: NEW_HARDWARE_SELECTION,
    hardwareTargetSelections: [NEW_HARDWARE_SELECTION],
    aggregateHardwareTargets: {},
  },
  aggregateHardwareTargets: {},
  totalRuns: 0,
};
