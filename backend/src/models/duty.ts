export type Duty = {
  id: string,
  name: string
}

export type NewDuty = Omit<Duty, "id">
export type UpdateDuty = Omit<Duty, "id">