import hardwareTargetsResponse from "../db/hardwareTargets.json";
import configResponse from "../db/config.json";
import benchmarkResponse from "../db/benchmark.json";
import accelerateResponse from "../db/accelerate.json";

export function getTargetData() {
  let targetMap = {} as any;
  hardwareTargetsResponse.data.map((target) => {
    if (target.provider in targetMap) {
      targetMap[target.provider] = [...targetMap[target.provider], target];
    } else {
      targetMap[target.provider] = [target];
    }
  });

  return targetMap;
}

export function getConfigData() {
  return configResponse.data;
}

export function getBenchmarkData() {
  let benchmarkMap = {} as any;

  benchmarkResponse.data.map((benchmark) => {
    if (!(benchmark.engine in benchmarkMap)) {
      benchmarkMap[benchmark.engine] = {};
    }
    if (benchmark.num_trials in benchmarkMap[benchmark.engine]) {
      if (
        !benchmarkMap[benchmark.engine][benchmark.num_trials].includes(
          benchmark.runs_per_trial
        )
      ) {
        benchmarkMap[benchmark.engine][benchmark.num_trials].push(
          benchmark.runs_per_trial
        );
      }
    } else {
      const source = benchmarkMap[benchmark.engine];
      const target = { [benchmark.num_trials]: [benchmark.runs_per_trial] };
      benchmarkMap[benchmark.engine] = Object.assign(target, source);
    }
  });

  return benchmarkMap;
}

export function getAccelerateData() {
  let accelerateData = [] as any;
  accelerateResponse.data.map((accelerate) => {
    if (!accelerateData.hasOwnProperty(accelerate.engine)) {
      accelerateData.push(accelerate.engine);
    }
  });
  return accelerateData;
}
