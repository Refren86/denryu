export interface ValidationErrors {
  message: string;
  field_errors: Record<string, string>;
}
