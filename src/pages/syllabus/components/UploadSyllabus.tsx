import React, { useState } from 'react';
import { Button, Form, Input, message, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadSyllabus: React.FC = (props) => {
  const loadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const { closeUploadModal } = props;

  const [upLoading, setUpLoading] = useState<boolean>(false);

  return (
    <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="file" rules={[{ required: true, message: '请上传大纲文件' }]}>
        <Space style={{ paddingLeft: '17px' }}>
          <Upload {...loadProps}>
            <Button icon={<UploadOutlined />}>大纲上传</Button>
          </Upload>
          <span>(单个文件最大50M)</span>
        </Space>
      </Form.Item>
      <Form.Item
        label="大纲编号"
        name="number"
        rules={[{ required: true, message: '请输入大纲编号' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="大纲标题"
        name="name"
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

  function onFinish() {
    setUpLoading(true);
    setTimeout(() => {
      setUpLoading(false);
      closeUploadModal();
      message.success('上传成功');
    }, 1000);
  }

  function onFinishFailed() {}
};

export default UploadSyllabus;
