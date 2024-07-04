import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";

export function useNotification() {
  const [messageApi, contextHolder] = message.useMessage();

  const notify = (type: NoticeType, content: string) => {
    messageApi.open({
      duration: 8,
      type,
      content,
    });
  };

  return {
    contextHolder,
    notify
  }
}