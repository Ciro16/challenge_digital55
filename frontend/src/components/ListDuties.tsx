import React from 'react';
import { Form, TableProps, Popconfirm, Table, Typography } from 'antd';
import { EditableCell } from '../types/dutyTableStructure';
import type { Duty } from '../types/duty';
import { useDuty } from '../hooks/useDuty';
import CreateDuty from './CreateDuty';
import { useNotification } from '../hooks/useNotification';

const ListDuties: React.FC = () => {
  const [form] = Form.useForm();
  const { contextHolder, notify } = useNotification()
  const { duties, setDuties, editingKey, isEditing, edit, save, cancel } = useDuty(form, notify)

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '5%',
      editable: false,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '70%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Duty) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Duty) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {contextHolder}
      <h1>Duties App</h1>
      <CreateDuty duties={duties} setDuties={setDuties} notify={notify} />

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={duties}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey="id"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

export default ListDuties;