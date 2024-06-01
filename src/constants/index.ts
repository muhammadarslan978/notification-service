export enum EVENT_ENUM {
  EMAIL = 'EMAIL',
  TEXT = 'TEXT',
  PUSH = 'PUSH',
}

export enum SUB_TYPE {
  SIGNUP = 'SIGNUP',
  RESEND = 'RESEND',
}

export type QUEUE_EVENT = {
  type: EVENT_ENUM;
  sub_type: SUB_TYPE;
  data: any;
};

export type SIGNUP_EMAIL_TYPE = {
  to: string;
  subject: string;
  html: string;
};
