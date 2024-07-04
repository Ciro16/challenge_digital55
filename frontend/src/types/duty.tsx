export type Duty = {
  id: string;
  name: string;
}

export type DutyEdited = Omit<Duty, 'id'>