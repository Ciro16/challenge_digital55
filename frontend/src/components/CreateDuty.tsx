import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { Duty } from '../types/duty';
import { API_URL } from '../utilities/configVariables';
import { NoticeType } from 'antd/es/message/interface';

type Props = {
  duties: Duty[],
  setDuties: (duties: Duty[]) => void
  notify: (type: NoticeType, content: string) => void
}

type FormValues = {
  name: string;
}

type ResponseDuty = {
  data: Duty
}

type ResponseDutyError = {
  error: true
  message: string
}

const CreateDuty = (props: Props) => {
  const { duties, setDuties, notify } = props
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const onCreate = async (values: FormValues) => {
    try {
      const response = await fetch(`${API_URL}v1/duties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      let result: unknown = await response.json()

      if (!response.ok) {
        throw new Error((result as ResponseDutyError).message)
      }

      setDuties([...duties, (result as ResponseDuty).data])
      setOpen(false);
      notify('success', 'Duty created!')
    } catch (error) {
      notify('error', (error as Error).message)
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: '20px' }}>
        Create Duty
      </Button>

      <Modal
        open={open}
        title="Create a new Duty"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of duty!'
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal >
    </>
  );
};

export default CreateDuty;