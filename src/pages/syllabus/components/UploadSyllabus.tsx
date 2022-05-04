import React, { useState } from 'react';
import { Button, Form, Input, message, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import * as teachingOutline from '@/api/service/teachingOutline';

const UploadSyllabus: React.FC = (props: any) => {
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
        console.log(info);
        message.success(`${info.file.name} 上传成功`);
        fileName = info.file.response.data.fileName;
        filePath = info.file.response.data.filePath;
      }
    },
  };

  const { closeUploadModal, getTeachingOutlineList } = props;
  const [upLoading, setUpLoading] = useState<boolean>(false);

  return (
    <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* <Form.Item
        label="大纲编号"
        name="number"
        rules={[{ required: true, message: '请输入大纲编号' }]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        label="大纲标题"
        name="title"
        rules={[{ required: true, message: '请输入大纲标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="大纲版本"
        name="version"
        rules={[{ required: true, message: '请输入大纲版本' }]}
      >
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
        <Space style={{ paddingLeft: '17px', maxWidth: '100% !important' }}>
          <Upload {...loadProps}>
            <Button icon={<UploadOutlined />}>大纲上传</Button>
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
    if (!value.fileName && !value.filePath) {
      value.fileName = fileName;
      value.filePath = filePath;
    }
    value.uploadingTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    console.log('value....', value);
    setUpLoading(true);
    // 开始上传
    const res = await teachingOutline.uploadOutline(value);
    if (res && res.code === 200) {
      closeUploadModal();
      message.success('上传成功');
      setUpLoading(false);
      getTeachingOutlineList();
    }
  }

  function onFinishFailed() {}
};

export default UploadSyllabus;
