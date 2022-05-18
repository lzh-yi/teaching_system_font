import React, { useState, useEffect } from 'react';
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
import { teachingOutline, teachingGoal } from '@/api/service';

const { Search } = Input;
const { TreeNode } = TreeSelect;
const { Option } = Select;

const TeachingGoal: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({
    page: 1,
    pageSize: 20,
    teachingOutlineId: -1,
    id: -1,
  });

  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<any[]>([]);
  const [tableDataVal, setTableDataVal] = useState<any[]>([]);
  const [updateVisible, setUpdateVisible] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<{}>({});

  const access = useAccess();
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
  let colConfig: any[] = columnConfig;
  if (access.canAdmin) {
    colConfig = [].concat(columnConfig, [
      {
        title: '操作',
        align: 'center',
        width: 50,
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

  useEffect(() => {
    getTeachingOutlineList();
  }, []);

  useEffect(() => {
    getTeachingGoalList();
  }, [searchCondition]);

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
              style={{ width: 250 }}
              placeholder="请选择教学大纲"
              optionFilterProp="children"
              onChange={(value: number) => {
                setSearchCondition({
                  ...searchCondition,
                  teachingOutlineId: value,
                });
              }}
            >
              {selectData.map((item) => (
                <Option id={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
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
        title="添加教学目标"
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
          <Form.Item
            label="教学目标名称"
            name="title"
            rules={[{ required: true, message: '请输入教学目标名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="教学目标内容"
            name="content"
            rules={[{ required: true, message: '请输入教学目标内容' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="教学大纲"
            name="teachingOutlineId"
            rules={[{ required: true, message: '请选择教学大纲' }]}
          >
            <Select style={{ width: 250 }} onChange={noop}>
              {selectData.map((item) => (
                <Option id={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
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
        title="更新教学目标"
        onCancel={() => setUpdateVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleUpdateKnowPoint}
          autoComplete="off"
          initialValues={initialValues}
        >
          <Form.Item
            label="教学目标名称"
            name="title"
            rules={[{ required: true, message: '请输入教学目标名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="教学目标内容"
            name="content"
            rules={[{ required: true, message: '请输入教学目标内容' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="教学大纲"
            name="teachingOutlineId"
            rules={[{ required: true, message: '请选择教学大纲' }]}
          >
            <Select style={{ width: 250 }} onChange={noop}>
              {selectData.map((item) => (
                <Option id={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
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

  async function update(teachingGoalId: number) {
    const res = await teachingGoal.getTeachingGoalList({
      ...searchCondition,
      id: teachingGoalId,
    });
    if (res && res.code === 200) {
      // console.log(res.data[0]);
      setInitialValues(res.data[0]);
      setUpdateVisible(true);
    }
  }

  async function handleUpdateKnowPoint(value: any) {
    setUpLoading(true);
    value.id = initialValues.id;
    const res = await teachingGoal.updateTeachingGoal(value);
    if (res && res.code === 200) {
      message.success('修改成功');
      setUpLoading(false);
      setUpdateVisible(false);
      getTeachingGoalList();
    }
  }

  async function handleAddKnowPoint(value: any) {
    setUpLoading(true);
    // console.log('value...', value);
    const res = await teachingGoal.addTeachingGoal(value);
    if (res && res.code === 200) {
      message.success('添加成功');
      setUpLoading(false);
      setVisible(false);
      getTeachingGoalList();
    }
  }

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

  async function getTeachingGoalList() {
    setTableLoading(true);
    const res = await teachingGoal.getTeachingGoalList({
      ...searchCondition,
    });
    if (res && res.code === 200) {
      setTableLoading(false);
      setTableDataVal(res.data);
      setTotalData(res.total);
    }
  }
};

export default TeachingGoal;
