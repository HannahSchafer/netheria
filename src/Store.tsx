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
      return {
        ...state,
        aggregateHardwareTargets: action.payload,
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
      selectionsType: string,
      selectionIndex?: number
    ) => void;
    setRemoveTarget: (index: number, targetType: string) => void;
    setHardwareTargetInstance: (
      data: any,
      index: number,
      selectionIndex: number
    ) => void;
    setAggregateHardwareTargetData: (prevTarget: any, newTarget?: any) => void;
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
        let newArr = [...state.allData[targetType]];
        const removedTarget = newArr[index];
        console.log("removedTargett", removedTarget);

        newArr.splice(index, 1);
        dispatch({
          type: ActionTypes.SET_ALL_DATA,
          payload: { data: newArr, key: targetType },
        });
        store.actions.setAggregateHardwareTargetData(removedTarget, null);
      },
      updateData: (
        data,
        propToChange,
        currentType,
        selectionsType,
        selectionIndex = 0
      ) => {
        const newObj = {
          ...state.allData[currentType],
          [propToChange]: data,
        };
        let newArr = [...state.allData[selectionsType]];
        const indexOfSelection = selectionIndex ?? 0;
        newArr[indexOfSelection] = newObj;
        store.actions.setAllData(newObj, currentType);
        store.actions.setAllData(newArr, selectionsType);
      },
      setHardwareTargetInstance: (data, index, selecionIndex) => {
        const instanceObject =
          hardwareTargetApiData[state.allData.hardwareTargetCurrent.provider][
            index
          ];
        const newObj = {
          ...state.allData.hardwareTargetSelections[selecionIndex],
          instance: data,
          cpu: instanceObject.cpu,
          memory: instanceObject.memory,
        };
        const prevTarget =
          state.allData.hardwareTargetSelections[selecionIndex];
        const newInstance = newObj;
        store.actions.setAggregateHardwareTargetData(prevTarget, newInstance);

        let newArr = [...state.allData.hardwareTargetSelections];
        newArr[selecionIndex] = newObj;
        store.actions.setAllData(newArr, "hardwareTargetSelections");
        // store.actions.setTotalRuns();
      },
      setAggregateHardwareTargetData: (prevTarget, newTarget) => {
        if (prevTarget.instance === newTarget?.instance) {
          return;
        }
        // let instanceAggregate;
        let prevInstanceAggregate =
          state.aggregateHardwareTargets[prevTarget.instance];
        // update existing value
        if (prevTarget.instance in state.aggregateHardwareTargets) {
          // if prev instance count is > 1, decrease count by 1, and remultiply values,
          if (prevInstanceAggregate.count > 1) {
            const multiplier = prevInstanceAggregate.count - 1;
            prevInstanceAggregate = {
              ...prevInstanceAggregate,
              count: multiplier,
              cpu: prevInstanceAggregate.cpu / prevInstanceAggregate.count,
              memory:
                prevInstanceAggregate.memory / prevInstanceAggregate.count,
            };
            const aggregatesCopy = state.aggregateHardwareTargets;
            aggregatesCopy[prevInstanceAggregate.instance] =
              prevInstanceAggregate;
            dispatch({
              type: ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS,
              payload: aggregatesCopy,
            });
          } else {
            // if prev instance count is 1, remove instance
            const aggregatesCopy = state.aggregateHardwareTargets;
            delete aggregatesCopy[prevInstanceAggregate.instance];
            dispatch({
              type: ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS,
              payload: aggregatesCopy,
            });
          }
        }

        if (!newTarget) {
          return;
        }

        // if new instance is in aggregae, increae count by 1, and mulittply
        if (newTarget.instance in state.aggregateHardwareTargets) {
          const existingInstance =
            state.aggregateHardwareTargets[newTarget.instance];
          const multiplier = existingInstance.count + 1;
          const updatedInstanceAggregate = {
            ...existingInstance,
            count: multiplier,
            cpu: existingInstance.cpu * multiplier,
            memory: existingInstance.memory * multiplier,
          };
          const aggregatesCopy = state.aggregateHardwareTargets;
          aggregatesCopy[existingInstance.instance] = updatedInstanceAggregate;
          dispatch({
            type: ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS,
            payload: aggregatesCopy,
          });
        } else {
          // if new instance is not in aggregate, add instance to aggregate
          const aggregatesCopy = state.aggregateHardwareTargets;
          aggregatesCopy[newTarget.instance] = { ...newTarget, count: 1 };
          dispatch({
            type: ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS,
            payload: aggregatesCopy,
          });
        }
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
