import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row, Button, Input, Table, Modal, Form, Space, TreeSelect, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import tableStyles from '@/assets/styles/table.less';
import { columnConfig, tableDataVal } from './constant';
import { noop } from '@/utils/common';
import { useAccess, Access } from 'umi';

const { Search } = Input;
const { TreeNode } = TreeSelect;
const { Option } = Select;

const TeachingGoal: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [teachingGoalId, steTeachingGoalId] = useState<number | null>(null);

  const access = useAccess();
  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    current: searchCondition?.page,
    pageSize: searchCondition?.pageSize,
    total: totalData,
    showTotal: (total: number) => `共${total}条记录`,
    onChange: (page: any, size: number) => {
      // setSearchCondition({
      //   page,
      //   page_size: size
      // })
    },
  };
  let colConfig: any[] = columnConfig;
  if (access.canAdmin) {
    colConfig = [].concat(columnConfig, [
      {
        title: '操作',
        align: 'center',
        width: 150,
        dataIndex: 'id',
        render(text: string) {
          return (
            <Button
              type="primary"
              onClick={() => setVisible(true)}
              style={{ backgroundColor: '#66AF77', border: 'none' }}
            >
              更新
            </Button>
          );
        },
      },
    ]);
  }

  return (
    <PageContainer>
      <Row justify="space-between">
        <Col span={4}>
          {access.canAdmin && (
            <Button icon={<PlusCircleOutlined />} type="primary" onClick={() => setVisible(true)}>
              添加教学目标
            </Button>
          )}
        </Col>
        <Col>
          <Space>
            <span>教学大纲检索：</span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择教学大纲"
              optionFilterProp="children"
            >
              <Option value={1}>教学大纲一</Option>
              <Option value={2}>教学大纲二</Option>
              <Option value={3}>教学大纲三</Option>
              <Option value={4}>教学大纲四</Option>
              <Option value={5}>教学大纲五</Option>
              <Option value={6}>教学大纲六</Option>
            </Select>
          </Space>
        </Col>
      </Row>
      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 900 }}
          // className={tableStyles['log-tab']}
          columns={colConfig as any}
          dataSource={tableDataVal}
          pagination={pagination as any}
          loading={tableLoading}
        />
      </div>

      <Modal
        visible={visible}
        maskClosable={false}
        title="添加/更新教学目标"
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleAddKnowPoint}
          autoComplete="off"
        >
          <Form.Item
            label="教学名称"
            name="name"
            rules={[{ required: true, message: '请输入教学目标名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="教学内容"
            name="content"
            rules={[{ required: true, message: '请输入教学目标内容' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="教学大纲"
            name="outline_id"
            rules={[{ required: true, message: '请选择教学大纲' }]}
          >
            <Select style={{ width: 150 }} onChange={noop}>
              <Option value={2}>教学大纲一</Option>
              <Option value={1}>教学大纲二</Option>
              <Option value={0}>教学大纲三</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={upLoading}>
                添加
              </Button>
              <Button loading={upLoading} onClick={() => setVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );

  function updateKnowledgePoint() {}
  function handleAddKnowPoint(value: any) {
    setUpLoading(true);
    setTimeout(() => {
      console.log(value);
      setUpLoading(false);
      setVisible(false);
    }, 1000);
  }
};

export default TeachingGoal;
