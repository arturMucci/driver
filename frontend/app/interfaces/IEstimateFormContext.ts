export interface IEstimateForm {
  customerId: string;
  origin: string;
  destination: string;
}

export interface IEstimateFormContext {
  formData: IEstimateForm;
  setFormData: (estimateForm: IEstimateForm) => void;
  message: string;
  setMessage: (message: string) => void;
  error: boolean;
  setError: (error: boolean) => void;
  resData: unknown;
  setResData: (data: unknown) => void;
}
