import React, { createContext, useContext, useEffect, useReducer } from "react";

const NEW_SELECTION = {
  provider: "Select Provider",
  instance: "Select Instance",
  cpu: 0,
  memory: 0,
};

export const NEW_BENCHMARK_SELECTION = {
  engine: "Select Engine",
  numTrials: 0,
  runsPerTrial: 0,
};

export const NEW_ACCELERATE_SELECTION = "Select Engine";

export enum ActionTypes {
  SET_ALL_DATA = "SET_ALL_DATA",
  SET_AGGREGATE_HARDWARE_TARGETS = "SET_AGGREGATE_HARDWARE_TARGETS",
  SET_TOTAL_RUNS = "SET_TOTAL_RUNS",
}

export const StoreContext = createContext<any | undefined>(undefined);

type StoreState = {
  allData?: any;
  aggregateHardwareTargets?: any;
  totalRuns: number;
};

type ActionType = {
  type: ActionTypes;
  payload?: any;
};

type StoreContextProviderProps = {
  accelerateData?: any;
  benchmarkData?: any;
  children: React.ReactNode;
  configData?: any;
  hardwareTargetApiData?: any;
};

const reducer = (state: StoreState, action: ActionType): StoreState => {
  switch (action.type) {
    case ActionTypes.SET_ALL_DATA: {
      const updatedData = {
        ...state.allData,
        [action.payload.key]: action.payload.data,
      };
      const data = action.payload.key ? updatedData : state.allData;

      return {
        ...state,
        allData: data,
      };
    }
    case ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS: {
      const updatedAggregates = {
        ...state.aggregateHardwareTargets,
        [action.payload.instance]: action.payload,
      };
      const aggregates = action.payload.instance
        ? updatedAggregates
        : state.aggregateHardwareTargets;

      return {
        ...state,
        aggregateHardwareTargets: aggregates,
      };
    }
    case ActionTypes.SET_TOTAL_RUNS: {
      const total = (state.totalRuns += 1);
      return {
        ...state,
        totalRuns: total,
      };
    }
    default:
      console.warn("Not a valid action type");
      return state;
  }
};

const defaultStoreState: StoreState = {
  allData: {
    accelerateCurrent: {},
    accelerateSelection: NEW_ACCELERATE_SELECTION,
    benchmarkData: {},
    benchmarkCurrent: NEW_BENCHMARK_SELECTION,
    benchmarkDataSelections: [NEW_BENCHMARK_SELECTION],
    configData: {},
    hardwareTargetApiData: {},
    hardwareTargetCurrent: NEW_SELECTION,
    hardwareTargetSelections: [NEW_SELECTION],
    aggregateHardwareTargets: {},
  },
  aggregateHardwareTargets: {},
  totalRuns: 0,
};

type ContextStore = {
  state: StoreState;
  actions: {
    setAllData: (data: any, key: string) => void;
    updateData: (
      data: any,
      propToChange: string,
      currentType: string,
      selectionsType: string
    ) => void;
    setRemoveTarget: (index: number, targetType: string) => void;
    setHardwareTargetInstance: (data: any, index: number) => void;
    setAggregateHardwareTargetData: (data: any, obj: any) => void;
    setTotalRuns: () => void;
  };
};

export function StoreContextProvider({
  accelerateData,
  benchmarkData,
  children,
  configData,
  hardwareTargetApiData,
}: StoreContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, defaultStoreState);

  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_ALL_DATA,
      payload: { data: benchmarkData, key: "benchmarkData" },
    });
    dispatch({
      type: ActionTypes.SET_ALL_DATA,
      payload: { data: accelerateData, key: "accelerateData" },
    });
    dispatch({
      type: ActionTypes.SET_ALL_DATA,
      payload: { data: configData, key: "configData" },
    });
    dispatch({
      type: ActionTypes.SET_ALL_DATA,
      payload: { data: hardwareTargetApiData, key: "hardwareTargetApiData" },
    });
  }, [accelerateData, benchmarkData, configData, hardwareTargetApiData]);

  const store: ContextStore = {
    state: {
      allData: state.allData,
      aggregateHardwareTargets: state.aggregateHardwareTargets,
      totalRuns: state.totalRuns,
    },
    actions: {
      setAllData: (data, key) => {
        const payloadObj = { data: data, key: key };
        dispatch({
          type: ActionTypes.SET_ALL_DATA,
          payload: payloadObj,
        });
      },
      setRemoveTarget: (index, targetType) => {
        console.log("targetType", targetType);
        let newArr = [...state.allData[targetType]];
        newArr.splice(index, 1);
        dispatch({
          type: ActionTypes.SET_ALL_DATA,
          payload: { data: newArr, key: targetType },
        });
      },
      updateData: (data, propToChange, currentType, selectionsType) => {
        console.log("propToChange", propToChange);
        console.log("state.allData[currentType]", state.allData[currentType]);
        const newObj = {
          ...state.allData[currentType],
          [propToChange]: data,
        };
        console.log("newObj", newObj);
        let newArr = [...state.allData[selectionsType]];
        const lastSelectionIndex = state.allData[selectionsType].length - 1;
        newArr[lastSelectionIndex] = newObj;
        store.actions.setAllData(newArr, selectionsType);
        store.actions.setAllData(newObj, currentType);
      },
      setHardwareTargetInstance: (data, index) => {
        const instanceObject =
          hardwareTargetApiData[state.allData.hardwareTargetCurrent.provider][
            index
          ];
        const newObj = {
          ...state.allData.hardwareTargetCurrent,
          instance: data,
          cpu: instanceObject.cpu,
          memory: instanceObject.memory,
        };
        let newArr = [...state.allData.hardwareTargetSelections];
        const lastSelectionIndex =
          state.allData.hardwareTargetSelections.length - 1;
        newArr[lastSelectionIndex] = newObj;
        store.actions.setAllData(newObj, "hardwareTargetCurrent");
        store.actions.setAllData(newArr, "hardwareTargetSelections");
        store.actions.setAllData(NEW_SELECTION, "hardwareTargetCurrent");
        store.actions.setAggregateHardwareTargetData(data, newObj);
        store.actions.setTotalRuns();
      },
      setAggregateHardwareTargetData: (data, obj) => {
        let instanceAggregate;
        if (data in state.aggregateHardwareTargets) {
          const multiplier = state.aggregateHardwareTargets[data].count + 1;
          const cpu = state.aggregateHardwareTargets[data].cpu;
          const memory = state.aggregateHardwareTargets[data].memory;

          instanceAggregate = {
            ...obj,
            count: multiplier,
            cpu: cpu * multiplier,
            memory: memory * multiplier,
          };
        } else {
          instanceAggregate = { ...obj, count: 1 };
        }

        dispatch({
          type: ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS,
          payload: instanceAggregate,
        });
      },
      setTotalRuns: () => {
        dispatch({
          type: ActionTypes.SET_TOTAL_RUNS,
        });
      },
    },
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useStoreContext(): ContextStore {
  const context = useContext(StoreContext);

  if (context === undefined) {
    console.warn(
      "useStorecontext has to be used within the StoreContextProvider"
    );
  }

  return context;
}
