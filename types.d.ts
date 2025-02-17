export interface WidgetModel {
  /* Data model of the widget */
  inputData?: any;

  /* Configuration of the EHR Studio */
  config?: any;

  /* This is the representation of the widget data model which can be configured inside the Widget confiruator in
   * EHR Studio */
  descriptor: WidgetDescriptor;

  /* this flag is provided from the EHR Studio, and it indicates that the mocked data should be populated to widget so
   * it can be shown in various editors e.g.: Form builder */
  useDefaultData?: boolean;

  /* This is primarily used only for widgets that are representing any field that should be represented with a value in
   * an openEHR composition. When outputEvent data is emitted the value is automatically assigned to composition */
  outputData?: Event;

  /* This is the event that is sent to the form-renderer where you can react to it */
  outputAction?: Event;
}

export type BaseValueModel = {
  type: ValueModelType;
  alias?: string;
  defaultValue?: ValueModelType;
  metadata?: Metadata;
  required?: boolean;
  input?: string[];
};

export type PrimitiveValueModel = BaseValueModel & {
  values?: Array<string | number | boolean | bigint | symbol | null | undefined>;
};

export type ObjectValueModel = BaseValueModel & {
  objectModel?: Record<string, ValueModel>;
}

export type ListValueModel = BaseValueModel & {
  listModel?: ValueModel;
}

export type ValueModel = PrimitiveValueModel | ObjectValueModel | ListValueModel;

export type Configuration = {
  [key: string]: {
    type: ConfigurationType;
    defaultValue: unknown;
    values?:  string[] | number[] | boolean[];
    metadata?: Metadata;
  };
};

export interface Condition {
  field: string;
  targets: string[];
  actions: ConditionAction[];
}

export interface ConditionAction {
  eq?: string | boolean;
  state: string[];
}

export type Metadata = {
  title: string;
  description?: string
};

export type WidgetDescriptor = {
  valueModel?: ValueModel;
  configuration?: Configuration;
  $conditions?: Condition[];
};

export type ValueModelType = 'object' | 'list' | 'string' | 'number';
export type ConfigurationType = 'boolean' | 'enum' | 'number' | 'string';
