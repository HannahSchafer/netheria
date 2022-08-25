import React, { createContext, useContext, useEffect, useReducer } from "react";


const NEW_SELECTION = {
  provider: "Select Provider",
  instance: "Select Instance",
  cpu: 0,
  memory: 0,
}

const HARDWARE_CONFIG = {
  AWS: [{
    instance: "m4.large",
    cpu: 2,
    memory: 8,
  },
  {
    instance: "m4.xlarge",
    cpu: 4,
    memory: 16,
  },
  {
    instance: "m4.2xlarge",
    cpu: 8,
    memory: 32,
  },
  {
    instance: "m4.4xlarge",
    cpu: 16,
    memory: 64,
  },
],
  GCP: [{
    instance: "n2-standard-2",
    cpu: 2,
    memory: 8,
  }]
}

export enum ActionTypes {
  SET_HARDWARE_TARGET_OBJECT = 'SET_HARDWARE_TARGET_OBJECT',
  SET_HARDWARE_TARGET_DATA = 'SET_HARDWARE_TARGET_DATA',
  SET_AGGREGATE_HARDWARE_TARGETS = 'SET_AGGREGATE_HARDWARE_TARGETS',
  SET_TOTAL_RUNS = 'SET_TOTAL_RUNS',
}

export const StoreContext = createContext<any | undefined>(undefined);


type StoreState = {
  hardwareTargetObject?: any;
  hardwareTargetData?: any;
  aggregateHardwareTargets?: any;
  totalRuns: number;
}

type ActionType = {
  type: ActionTypes;
  payload?: any;
}

type StoreContextProviderProps = {
  children: React.ReactNode;
  hardwareTargetObject?: any;
  hardwareTargetData?: any;
  aggregateHardwareTargets?: any;
  totalRuns?: number;
}

const reducer = (
  state: StoreState,
  action: ActionType,
): StoreState => {
  switch (action.type) {
    case ActionTypes.SET_HARDWARE_TARGET_OBJECT: {
      return {
        ...state,
        hardwareTargetObject: action.payload
      }
    } 
    case ActionTypes.SET_HARDWARE_TARGET_DATA: {
      return {
        ...state,
        hardwareTargetData: action.payload
      }
    } 
    case ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS: {
      const updatedAggregates = {
        ...state.aggregateHardwareTargets,
        [action.payload.instance]: action.payload,
      }
      const aggregates = action.payload.instance ? updatedAggregates : state.aggregateHardwareTargets;

      return {
        ...state,
        aggregateHardwareTargets: aggregates
      }
    } 
    case ActionTypes.SET_TOTAL_RUNS: {
      const total =  state.totalRuns += 1;
      return {
        ...state,
        totalRuns: total
      }
    } 
    default:
      console.warn('Not a valid action type');
      return state;
  }
}

const defaultStoreState: StoreState = {
  hardwareTargetObject: NEW_SELECTION,
  hardwareTargetData: [ NEW_SELECTION ],
  aggregateHardwareTargets: {},
  totalRuns: 0,
}

type ContextStore = {
  state: StoreState;
  actions: {
    setHardwareTargetProvider: (data: any) => void;
    setHardwareTargetInstance: (data: any, index: number) => void;
    setHardwareTargetData: (targets: any) => void;
    setAggregateHardwareTargetData: (data: any, obj: any) => void;
    setTotalRuns: () => void;
  }
}

export function StoreContextProvider({
  children,
  hardwareTargetObject,
  hardwareTargetData,
  aggregateHardwareTargets,
  totalRuns,
}: StoreContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, defaultStoreState);

  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_HARDWARE_TARGET_OBJECT,
      payload: state.hardwareTargetObject
    })
    dispatch({
      type: ActionTypes.SET_HARDWARE_TARGET_DATA,
      payload: state.hardwareTargetData
    })
    dispatch({
      type: ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS,
      payload: state.aggregateHardwareTargets
    })
  }, [state.hardwareTargetObject, state.hardwareTargetData, state.aggregateHardwareTargets])

  const store: ContextStore = {
    state: {
      hardwareTargetObject: state.hardwareTargetObject,
      hardwareTargetData: state.hardwareTargetData,
      aggregateHardwareTargets: state.aggregateHardwareTargets,
      totalRuns: state.totalRuns,
    },
    actions: {
      setHardwareTargetProvider: data => {
        const newObj = {
          ...state.hardwareTargetObject,
          provider: data
        }
        let newArr = [...state.hardwareTargetData];
        const lastSelectionIndex = state.hardwareTargetData.length - 1;
        newArr[lastSelectionIndex] = newObj;
        store.actions.setHardwareTargetData(newArr)

        dispatch({
          type: ActionTypes.SET_HARDWARE_TARGET_OBJECT,
          payload: newObj,
        })
      },
      setHardwareTargetInstance: (data, index) => {
        console.log("setHardwareTargetInstance111111")
        // @ts-expect-error
        const instanceObject = HARDWARE_CONFIG[state.hardwareTargetObject.provider][index];
        const newObj = {
           ...state.hardwareTargetObject,
           instance: data,
           cpu: instanceObject.cpu,
           memory: instanceObject.memory,
         }
         let newArr = [...state.hardwareTargetData];
         const lastSelectionIndex = state.hardwareTargetData.length - 1;
         newArr[lastSelectionIndex] = newObj;
         store.actions.setHardwareTargetData(newArr);
         store.actions.setAggregateHardwareTargetData(data, newObj);
         store.actions.setTotalRuns();

         dispatch({
          type: ActionTypes.SET_HARDWARE_TARGET_OBJECT,
          payload: NEW_SELECTION,
        })
       },
      setHardwareTargetData: data => {
        dispatch({
          type: ActionTypes.SET_HARDWARE_TARGET_DATA,
          payload: data,
        })
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
          }
        } else {
          instanceAggregate = {...obj, count: 1}
        }

        dispatch({
          type: ActionTypes.SET_AGGREGATE_HARDWARE_TARGETS,
          payload: instanceAggregate,
        })
      },
      setTotalRuns: () => {
        dispatch({
          type: ActionTypes.SET_TOTAL_RUNS,
        })
      },
    }
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStoreContext(): ContextStore {
  const context = useContext(StoreContext);

  if (context === undefined) {
    console.warn("useStorecontext has to be used within the StoreContextProvider")
  }

  return context;
}