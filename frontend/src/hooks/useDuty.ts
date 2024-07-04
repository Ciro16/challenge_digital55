import { FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import { Duty, DutyEdited } from "../types/duty";
import { API_URL } from "../utilities/configVariables";
import { NoticeType } from "antd/es/message/interface";

type ResponseDuties = {
  data: Duty[]
}

type Notify = (type: NoticeType, content: string) => void

export function useDuty(form: FormInstance<any>, notify: Notify) {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const getDuties = async () => {
      try {
        const response = await fetch(`${API_URL}v1/duties`, { signal })
        const duties: ResponseDuties = await response.json()
        setDuties(duties.data)
      } catch (error) {
        console.log(error)
      }
    }

    getDuties()

    return () => controller.abort()
  }, [])

  const isEditing = (record: Duty) => record.id === editingKey;

  const edit = (record: Partial<Duty> & { id: React.Key }) => {
    form.setFieldsValue({ name: '', ...record });
    setEditingKey(record.id);
  };

  const save = async (id: React.Key) => {
    try {
      const editedDuty = (await form.validateFields()) as DutyEdited;

      const response = await fetch(`${API_URL}v1/duties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedDuty)
      })

      if (!response.ok) {
        const result = await response.json()

        const { message } = result
        throw new Error(message)
      }

      const newDuties = duties.map(duty => {
        if (duty.id === id) {
          return { ...duty, name: editedDuty.name }
        }
        return duty
      })

      setDuties(newDuties)
      setEditingKey('')
      notify('success', 'Duty updated!')
    } catch (errInfo) {
      notify('error', (errInfo as Error).message)
    }
  };

  const cancel = () => {
    setEditingKey('');
  };

  return {
    duties,
    setDuties,
    editingKey,
    setEditingKey,
    isEditing,
    edit,
    save,
    cancel
  }
}