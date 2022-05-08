import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Col,
  Row,
  Button,
  Input,
  Table,
  Modal,
  Form,
  Space,
  TreeSelect,
  Select,
  message,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import tableStyles from '@/assets/styles/table.less';
import { columnConfig } from './constant';
import { noop } from '@/utils/common';
import { useAccess, Access } from 'umi';
import { knowledgePoint } from '@/api/service';

const { Search } = Input;
const { TreeNode } = TreeSelect;
const { Option } = Select;

const KnowledgePoint: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({
    page: 1,
    pageSize: 20,
    teachingGoalId: -1,
    id: -1,
  });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [teachingGoalId, steTeachingGoalId] = useState<number | null>(null);
  const [treeNodeData, setTreeNodeData] = useState<any[]>([]);
  const [tableDataVal, setTableDataVal] = useState<any[]>([]);
  const [updateVisible, setUpdateVisible] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<{}>({});

  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    current: searchCondition?.page,
    pageSize: searchCondition?.pageSize,
    total: totalData,
    showTotal: (total: number) => `共${total}条记录`,
    onChange: (page: any, pageSize: number) => {
      setSearchCondition({
        ...searchCondition,
        page,
        pageSize,
      });
    },
  };
  const access = useAccess();
  let colConfig: any[] = columnConfig;

  useEffect(() => {
    (async () => {
      const res = await knowledgePoint.getKnowledgePointSelectData({
        page: 1,
        pageSize: 1000,
      });
      if (res && res.code === 200) {
        setTreeNodeData(res.data);
      }
    })();
  }, []);

  useEffect(() => {
    getKnowledgePointList();
  }, [searchCondition]);

  if (access.canAdmin) {
    colConfig = [].concat(columnConfig, [
      {
        title: '操作',
        align: 'center',
        width: 100,
        dataIndex: 'id',
        render(value: number) {
          return (
            <Button
              type="primary"
              onClick={() => update(value)}
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
              添加知识点
            </Button>
          )}
        </Col>
        <Col>
          <Space>
            <span>教学目标检索：</span>
            <TreeSelect
              // showSearch
              style={{ width: '300px' }}
              value={teachingGoalId}
              dropdownStyle={{ maxHeight: 350, overflow: 'auto' }}
              placeholder="请选择教学目标"
              allowClear
              // treeDefaultExpandAll
              // treeData={treeNodeData}
              onChange={(value: number) => {
                steTeachingGoalId(value);
                setSearchCondition({
                  page: 1,
                  pageSize: 1000,
                  id: -1,
                  teachingGoalId: value,
                });
              }}
            >
              {treeNodeData.map((parent, index: number) => (
                <TreeNode selectable={false} value={parent.value} title={parent.title}>
                  {parent.children.map((child, innerIndex: number) => (
                    <TreeNode value={child.value} title={child.title} />
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
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
        title="添加知识点"
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleAddKnowPoint}
          autoComplete="off"
        >
          {/* <Form.Item
            label="编号"
            name="number"
            rules={[{ required: true, message: '请输入知识点编号' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="知识点名称"
            name="title"
            rules={[{ required: true, message: '请输入知识点名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="知识点内容"
            name="content"
            rules={[{ required: true, message: '请输入知识点内容' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="所属章节"
            name="chapter"
            rules={[{ required: true, message: '请输入知识点所属章节' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="教学目标"
            name="teachingGoalId"
            rules={[{ required: true, message: '请选择教学目标' }]}
          >
            <TreeSelect
              // showSearch
              style={{ width: '100%' }}
              value={teachingGoalId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择教学目标"
              allowClear
              // treeDefaultExpandAll
              onChange={(value: number) => {
                steTeachingGoalId(value);
              }}
            >
              {treeNodeData.map((parent, index: number) => (
                <TreeNode selectable={false} value={parent.value} title={parent.title}>
                  {parent.children.map((child, innerIndex: number) => (
                    <TreeNode value={child.value} title={child.title} />
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
          </Form.Item>
          <Form.Item
            label="支撑强度"
            name="supportStrength"
            rules={[{ required: true, message: '请选择支撑强度' }]}
          >
            <Select style={{ width: 150 }} onChange={noop}>
              <Option value="high">高</Option>
              <Option value="middle">中</Option>
              <Option value="low">低</Option>
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

      <Modal
        visible={updateVisible}
        maskClosable={false}
        title="更新知识点"
        onCancel={() => setUpdateVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={updateKnowledgePoint}
          autoComplete="off"
          initialValues={initialValues}
        >
          {/* <Form.Item
            label="编号"
            name="number"
            rules={[{ required: true, message: '请输入知识点编号' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="知识点名称"
            name="title"
            rules={[{ required: true, message: '请输入知识点名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="知识点内容"
            name="content"
            rules={[{ required: true, message: '请输入知识点内容' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="所属章节"
            name="chapter"
            rules={[{ required: true, message: '请输入知识点所属章节' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="教学目标"
            name="teachingGoalId"
            rules={[{ required: true, message: '请选择教学目标' }]}
          >
            <TreeSelect
              // showSearch
              style={{ width: '100%' }}
              value={teachingGoalId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择教学目标"
              allowClear
              // treeDefaultExpandAll
              onChange={(value: number) => {
                steTeachingGoalId(value);
              }}
            >
              {treeNodeData.map((parent, index: number) => (
                <TreeNode selectable={false} value={parent.value} title={parent.title}>
                  {parent.children.map((child, innerIndex: number) => (
                    <TreeNode value={child.value} title={child.title} />
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
          </Form.Item>
          <Form.Item
            label="支撑强度"
            name="supportStrength"
            rules={[{ required: true, message: '请选择支撑强度' }]}
          >
            <Select style={{ width: 150 }} onChange={noop}>
              <Option value="high">高</Option>
              <Option value="middle">中</Option>
              <Option value="low">低</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={upLoading}>
                添加
              </Button>
              <Button loading={upLoading} onClick={() => setUpdateVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );

  async function update(id: number) {
    const res = await knowledgePoint.knowledgePointList({
      id,
      page: 1,
      pageSize: 1000,
      teachingGoalId: -1,
    });
    if (res && res.code === 200) {
      // console.log(res.data[0]);
      setInitialValues(res.data[0]);
      setUpdateVisible(true);
    }
  }

  async function updateKnowledgePoint(value: any) {
    setUpLoading(true);
    value.id = initialValues.id;
    const res = await knowledgePoint.updateKnowledgePoint(value);
    if (res && res.code === 200) {
      message.success('修改成功');
      setUpLoading(false);
      setUpdateVisible(false);
      getKnowledgePointList();
    }
  }

  async function getKnowledgePointList() {
    setTableLoading(true);
    const res = await knowledgePoint.knowledgePointList(searchCondition);
    if (res && res.code === 200) {
      setTableLoading(false);
      setTableDataVal(res.data);
    }
  }

  async function handleAddKnowPoint(value: any) {
    setUpLoading(true);

    const res = await knowledgePoint.addKnowledgePoint(value);
    if (res && res.code === 200) {
      setUpLoading(false);
      setVisible(false);
      setTotalData(res.total);
      message.success('添加成功');
      getKnowledgePointList();
    }
  }
};

export default KnowledgePoint;
