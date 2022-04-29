import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Col,
  Row,
  Tabs,
  Input,
  Modal,
  Form,
  Space,
  message,
  Select,
  InputNumber,
} from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import WorkTabPane from '@/pages/GroupWork/components/WorkTabPane';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

type WorkGroupType = {
  id: number;
  status: number;
  name: string;
  start_time: string;
  end_time: string;
  author: string;
};

const GroupWork: React.FC = () => {
  const [workTabArr, setWorkTabArr] = useState<WorkGroupType[]>([]);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);

  useEffect(() => {
    setWorkTabArr([
      {
        id: 0,
        status: 0,
        name: 'Java对象练习',
        start_time: '2022-04-21',
        end_time: '2022-05-01',
        author: '李志豪',
      },
      {
        id: 1,
        status: 1,
        name: '二叉树练习',
        start_time: '2022-04-21',
        end_time: '2022-05-01',
        author: '李志豪',
      },
      {
        id: 2,
        status: 2,
        name: '算法习题',
        start_time: '2022-04-18',
        end_time: '2022-04-23',
        author: '李志豪',
      },
    ]);
  }, []);

  return (
    <PageContainer>
      <div className={styles['top-wrap']}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
              <TabPane tab="全部" key="1">
                <WorkTabPane workTabArr={workTabArr} editWorkGroup={createWorkGroup} />
              </TabPane>
              <TabPane tab="未发布" key="2">
                <WorkTabPane workTabArr={workTabArr} editWorkGroup={createWorkGroup} />
              </TabPane>
              <TabPane tab="进行中" key="3">
                <WorkTabPane workTabArr={workTabArr} editWorkGroup={createWorkGroup} />
              </TabPane>
              <TabPane tab="已截止" key="4">
                <WorkTabPane workTabArr={workTabArr} editWorkGroup={createWorkGroup} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <div className={styles['btn-wrap']}>
          <Button
            icon={<PlusOutlined />}
            style={{ backgroundColor: '#0152D9', border: 'none', color: 'white' }}
            onClick={createWorkGroup}
          >
            新建分组
          </Button>
        </div>
      </div>
      <Modal
        visible={editVisible}
        maskClosable={false}
        title="新建作业分组"
        onCancel={() => setEditVisible(false)}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="分组名称"
            name="name"
            rules={[{ required: true, message: '请输入作业分组名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="作业描述"
            name="description"
            rules={[{ required: true, message: '请输入作业描述' }]}
          >
            <TextArea rows={4} placeholder="请输入作业描述" maxLength={300} />
          </Form.Item>
          <Form.Item
            label="所属大纲"
            name="syllabus"
            rules={[{ required: true, message: '请选择习题所属大纲' }]}
          >
            <Select style={{ width: 300 }} onChange={() => {}}>
              <Option value={0}>教学大纲一(版本一)</Option>
              <Option value={1}>教学大纲二(版本二)</Option>
              <Option value={2}>教学大纲三(版本一)</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="难易程度"
            name="complexity"
            rules={[{ required: true, message: '请输入难易程度' }]}
          >
            <Select style={{ width: 120 }} onChange={() => {}}>
              <Option value="0">简单</Option>
              <Option value="1">一般</Option>
              <Option value="2">偏难</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="建议时长"
            name="finish_time"
            rules={[{ required: true, message: '请输入建议完成时长' }]}
          >
            <Space>
              <InputNumber min={60} max={120} />
              <span>分钟(60-120)</span>
            </Space>
          </Form.Item>
          <Form.Item
            label="成绩占比"
            name="rate"
            rules={[{ required: true, message: '请输入作业成绩占比(0-1)' }]}
          >
            <Space>
              <InputNumber min={0} max={1} />
              <span>成绩占比(0-1)</span>
            </Space>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={upLoading}>
                创建
              </Button>
              <Button loading={upLoading} onClick={() => setEditVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );

  function onTabChange() {
    console.log('tab改变');
  }

  function createWorkGroup() {
    setEditVisible(true);
  }
  function onFinish() {
    setUpLoading(true);
    setTimeout(() => {
      setUpLoading(false);
      setEditVisible(false);
      message.success('创建成功');
    }, 1000);
  }
  function onFinishFailed() {}
};

export default GroupWork;
