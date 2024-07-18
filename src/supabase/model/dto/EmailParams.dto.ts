export interface EmailParamsDto {
  email: string;
  subject: string;
  template: string;

  code?: string;
  recoveryLink?: string;
}
