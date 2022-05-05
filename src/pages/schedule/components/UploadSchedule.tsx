import React, { useState } from 'react';
import { Button, Form, Input, message, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import * as teachingSchedule from '@/api/service/teachingSchedule';

const UploadSchedule: React.FC = (props: any) => {
  let fileName = '';
  let filePath = '';

  const loadProps = {
    name: 'file',
    maxCount: 1,
    action: '/api/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        fileName = info.file.response.data.fileName;
        filePath = info.file.response.data.filePath;
      }
    },
  };

  const { closeUploadModal, getTeachingScheduleList, initialValues = {}, isUpdate = false } = props;

  const [upLoading, setUpLoading] = useState<boolean>(false);

  return (
    <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="版本" name="version" rules={[{ required: true, message: '请输入版本' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="负责人"
        name="principal"
        rules={[{ required: true, message: '请输入负责人' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="file">
        <Space style={{ paddingLeft: '17px' }}>
          <Upload {...loadProps}>
            <Button icon={<UploadOutlined />}>文件上传</Button>
          </Upload>
          <span>(单个文件最大50M)</span>
        </Space>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit" loading={upLoading}>
            上传
          </Button>
          <Button loading={upLoading} onClick={closeUploadModal}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  async function onFinish(value: any) {
    if (fileName && filePath) {
      value.fileName = fileName;
      value.filePath = filePath;
    } else {
      value.fileName = initialValues.fileName;
      value.filePath = initialValues.filePath;
    }
    if (initialValues.id) {
      value.id = initialValues.id;
    }
    value.uploadingTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    // console.log('value....', value);
    setUpLoading(true);
    // 开始上传
    let res = null;
    if (isUpdate) {
      res = await teachingSchedule.updateSchedule(value);
    } else {
      res = await teachingSchedule.uploadSchedule(value);
    }
    if (res && res.code === 200) {
      closeUploadModal();
      message.success('上传成功');
      setUpLoading(false);
      getTeachingScheduleList();
    }
  }

  function onFinishFailed() {}
};

export default UploadSchedule;
