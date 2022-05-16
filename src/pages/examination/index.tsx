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
import WorkTabPane from '@/pages/examination/components/ExaminationTabPane';
import { teachingOutline, examination as GroupWorkUtils } from '@/api/service';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const GroupWork: React.FC = () => {
  const [workTabArr, setWorkTabArr] = useState<any[]>([]);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<any[]>([]);
  const [selectedTabKey, setSelectedTabKey] = useState<string>('-1');
  const [searchCondition, setSearchCondition] = useState({
    page: 1,
    pageSize: 1000,
    name: '',
    id: -1,
  });

  useEffect(() => {
    getTeachingOutlineList();
  }, []);

  useEffect(() => {
    getGroupList();
  }, [searchCondition, selectedTabKey]);

  return (
    <PageContainer>
      <div className={styles['top-wrap']}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="-1" onChange={onTabChange}>
              <TabPane tab="全部" key="-1">
                <WorkTabPane
                  selectData={selectData}
                  setSearchCondition={setSearchCondition}
                  workTabArr={workTabArr}
                  getGroupList={getGroupList}
                />
              </TabPane>
              <TabPane tab="未发布" key="0">
                <WorkTabPane
                  selectData={selectData}
                  setSearchCondition={setSearchCondition}
                  workTabArr={workTabArr}
                  getGroupList={getGroupList}
                />
              </TabPane>
              <TabPane tab="进行中" key="1">
                <WorkTabPane
                  selectData={selectData}
                  setSearchCondition={setSearchCondition}
                  workTabArr={workTabArr}
                  getGroupList={getGroupList}
                />
              </TabPane>
              <TabPane tab="已截止" key="2">
                <WorkTabPane
                  selectData={selectData}
                  setSearchCondition={setSearchCondition}
                  workTabArr={workTabArr}
                  getGroupList={getGroupList}
                />
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
            新建考试
          </Button>
        </div>
      </div>

      <Modal
        visible={editVisible}
        maskClosable={false}
        title="新建考试"
        onCancel={() => setEditVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={addGroupWork}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="创建人"
            name="author"
            rules={[{ required: true, message: '请输入创建人名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="考试名称"
            name="name"
            rules={[{ required: true, message: '请输入考试名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="考试描述"
            name="description"
            rules={[{ required: true, message: '请输入考试描述' }]}
          >
            <TextArea rows={4} placeholder="请输入考试描述" maxLength={300} />
          </Form.Item>
          <Form.Item
            label="所属大纲"
            name="teachingOutlineId"
            rules={[{ required: true, message: '请选择习题所属大纲' }]}
          >
            <Select style={{ width: 300 }} onChange={() => {}}>
              {selectData.map((item) => (
                <Option id={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="难易程度"
            name="difficultyLevel"
            rules={[{ required: true, message: '请输入难易程度' }]}
          >
            <Select style={{ width: 120 }} onChange={() => {}}>
              <Option value="简单">简单</Option>
              <Option value="一般">一般</Option>
              <Option value="偏难">偏难</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="建议时长"
            name="suggestFinishTime"
            rules={[{ required: true, message: '请输入建议完成时长' }]}
          >
            <Space>
              <InputNumber min={60} max={120} />
              <span>分钟(60-120)</span>
            </Space>
          </Form.Item>
          <Form.Item
            label="成绩占比"
            name="proportion"
            rules={[{ required: true, message: '请输入考试成绩占比(0-1)' }]}
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

  async function addGroupWork(value: any) {
    setUpLoading(true);
    value.proportion = String(value.proportion);
    value.suggestFinishTime = Number(value.suggestFinishTime);
    const res = await GroupWorkUtils.addGroupWork(value);
    if (res && res.code === 200) {
      setUpLoading(false);
      setEditVisible(false);
      message.success('创建成功');
      getGroupList();
    }
  }

  async function getGroupList() {
    const res = await GroupWorkUtils.groupWorkList(searchCondition);
    if (res && res.code === 200) {
      // 过滤数据
      if (selectedTabKey !== '-1') {
        res.data = res.data.filter((item: any) => {
          return item.status === selectedTabKey;
        });
      }
      setWorkTabArr(res.data);
    }
  }

  function onTabChange(key: string) {
    setSelectedTabKey(key);
  }

  function createWorkGroup() {
    setEditVisible(true);
  }
  function onFinishFailed() {}

  async function getTeachingOutlineList() {
    const res = await teachingOutline.getTeachingOutlineList({
      page: 1,
      pageSize: 1000,
      id: -1,
    });
    if (res && res.code === 200) {
      // 构造出下拉列表需要的数据
      if (selectData.length !== 0) return;
      const result: { id: number; title: string }[] = res.data.map((item: any) => {
        return {
          id: item.id,
          title: `${item.title}(${item.version})`,
        };
      });
      setSelectData(result);
    }
  }
};

export default GroupWork;
