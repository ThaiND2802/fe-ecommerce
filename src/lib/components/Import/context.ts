import { create } from 'zustand'

import { createZustandContext } from '../../hooks/zustand-context'
import { EImportType } from '../../entities/import/types'
import { IValidateImportResponse } from '../../entities/import/api'

import { IMPORT_STEP, IImportOptions } from './types'

type StepDefinition = { key: IMPORT_STEP | string; title?: string }

type StepHandler = {
  onNext?: () => Promise<boolean>
  onBack?: () => Promise<boolean>
  onClear?: () => void
}

interface ContextState {
  setState: (state: Partial<ContextState>) => void
  getState: () => ContextState

  featureId: string
  steps: StepDefinition[]
  stepIndex: number
  currentStep: IMPORT_STEP | string
  isLoading: boolean

  sheets: string[]
  setSheets: (sheets: string[]) => void

  importOptions: IImportOptions
  setImportOptions: (importOptions: IImportOptions) => void

  sessionId?: string
  setSessionId: (sessionId: string) => void

  sheetName?: string
  setSheetName: (sheetName: string) => void

  headerIndex?: number
  setHeaderIndex: (headerIndex: number) => void

  fieldMapping: {
    input_field: string
    target_field: string
    is_required: boolean
    data_type: string
  }[]
  setFieldMapping: (
    fieldMapping: {
      input_field: string
      target_field: string
      is_required: boolean
      data_type: string
    }[],
  ) => void

  isSubmittingImport: boolean
  setIsSubmittingImport: (isSubmittingImport: boolean) => void

  validateResult: IValidateImportResponse
  setValidateResult: (validateResult: IValidateImportResponse) => void

  setLoading: (value: boolean) => void
  next: () => Promise<void>
  back: () => void
  registerStepHandler: (stepKey: IMPORT_STEP | string, handler: StepHandler) => void
  unregisterStepHandler: (stepKey: IMPORT_STEP | string) => void

  reset: () => void
}

const getInitialStep = (steps: StepDefinition[]) => steps[0]?.key || IMPORT_STEP.SELECT_FILE

export const createContextStore = (initialState?: {
  featureId?: string
  steps?: StepDefinition[]
}) => {
  const initialSteps = initialState?.steps || []
  const stepHandlers = new Map<string, StepHandler>()

  return create<ContextState>((set, get) => ({
    setState: (state) => set(state),
    getState: () => get(),

    featureId: initialState?.featureId || '',
    steps: initialSteps,
    stepIndex: 0,
    currentStep: getInitialStep(initialSteps),
    isLoading: false,

    sheets: [],
    setSheets: (sheets: string[]) => set({ sheets }),

    sheetName: undefined,
    setSheetName: (sheetName: string) => set({ sheetName }),

    headerIndex: undefined,
    setHeaderIndex: (headerIndex: number) => set({ headerIndex }),

    fieldMapping: [],
    setFieldMapping: (
      fieldMapping: {
        input_field: string
        target_field: string
        is_required: boolean
        data_type: string
      }[],
    ) => set({ fieldMapping }),

    importOptions: {
      importType: EImportType.INSERT_AND_UPDATE,
      emptyData: false,
      defaultLanguage: false,
    },
    setImportOptions: (importOptions: IImportOptions) => set({ importOptions }),

    sessionId: undefined,
    setSessionId: (sessionId: string) => set({ sessionId }),

    isSubmittingImport: false,
    setIsSubmittingImport: (isSubmittingImport: boolean) => set({ isSubmittingImport }),

    validateResult: undefined,
    setValidateResult: (validateResult: IValidateImportResponse) => set({ validateResult }),

    setLoading: (value: boolean) => set({ isLoading: value }),
    next: async () => {
      const { currentStep, stepIndex, steps, setLoading } = get()
      const handler = stepHandlers.get(currentStep)

      try {
        let shouldAdvance = false

        if (handler?.onNext) {
          shouldAdvance = (await handler.onNext().catch(() => false)) === true
        } else if (stepIndex < steps.length - 1) {
          shouldAdvance = true
        }

        if (shouldAdvance && stepIndex < steps.length - 1) {
          set((state) => {
            const nextIndex = Math.min(state.stepIndex + 1, state.steps.length - 1)
            return {
              stepIndex: nextIndex,
              currentStep: state.steps[nextIndex]?.key || state.currentStep,
            }
          })
        }
      } finally {
        setLoading(false)
      }
    },
    back: () => {
      set((state) => {
        if (state.stepIndex === 0) {
          return state
        }
        const previousIndex = state.stepIndex - 1
        return {
          stepIndex: previousIndex,
          currentStep: state.steps[previousIndex]?.key || state.currentStep,
        }
      })
    },
    registerStepHandler: (stepKey: IMPORT_STEP | string, handler: StepHandler) => {
      stepHandlers.set(stepKey, handler)
    },
    unregisterStepHandler: (stepKey: IMPORT_STEP | string) => {
      stepHandlers.delete(stepKey)
    },

    reset: () => {
      set({
        stepIndex: 0,
        currentStep: getInitialStep(initialSteps),
        sessionId: undefined,
        sheets: [],
        sheetName: undefined,
        headerIndex: undefined,
        fieldMapping: [],
        importOptions: {
          importType: EImportType.INSERT_AND_UPDATE,
          emptyData: false,
          defaultLanguage: false,
        },
      })
      stepHandlers.forEach((handler) => {
        handler.onClear?.()
      })
    },
  }))
}

export const [Provider, useContextStore] = createZustandContext(createContextStore)
