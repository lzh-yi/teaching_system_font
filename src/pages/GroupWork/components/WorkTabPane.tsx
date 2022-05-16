import { BarsOutlined, EditOutlined, FieldTimeOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Input,
  Empty,
  Form,
  message,
  Modal,
  Popover,
  Row,
  Space,
  Select,
  InputNumber,
} from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { GroupWork } from '@/api/service';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const WorkTabPane: React.FC = (props: any) => {
  const { workTabArr, setSearchCondition, selectData, getGroupList } = props;
  const [publishVisible, setPublishVisible] = useState<boolean>(false);
  const [deadlineVisible, setDeadlineVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<{}>({});

  const bgColor = {
    '0': {
      color: '#C6CED6',
      label: '未发布',
    },
    '1': {
      color: '#0253D9',
      label: '进行中',
    },
    '2': {
      color: '#E53434',
      label: '已截止',
    },
  };

  let workList = null;

  if (Array.isArray(workTabArr) && workTabArr.length === 0) {
    return (
      <div>
        <Row style={{ marginBottom: '15px' }}>
          <Col push={18} span={6}>
            <Search
              placeholder="请输入习题分组名称"
              enterButton
              onSearch={(value: string) => searchGroupWorkByName(value)}
            />
          </Col>
        </Row>
        <Empty />
      </div>
    );
  }

  if (Array.isArray(workTabArr) && workTabArr.length > 0) {
    workList = workTabArr.map((item) => {
      return (
        <div key={item.id} className={styles['item-wrap']}>
          <Row>
            <Col
              span={18}
              onClick={() =>
                history.push(
                  `/group_work/detail?work_status=${item.status}&work_id=${item.id}&outline_id=${item.teachingOutlineId}`,
                )
              }
            >
              <div className={styles['status-name']}>
                <div>
                  <Space>
                    <Button
                      shape="round"
                      size="small"
                      style={{ backgroundColor: bgColor[item.status].color, color: 'white' }}
                    >
                      {bgColor[item.status].label}
                    </Button>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</span>
                  </Space>
                </div>
                <div>
                  <Space align="center">
                    <p style={{ fontSize: '13px' }}>{item.author}</p>
                    {item.status != '0' && (
                      <p style={{ color: '#BBBBBB' }}>
                        <span>
                          发布时间 {dayjs(item.publishTime).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                          截止时间 {dayjs(item.deadlineTime).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                      </p>
                    )}
                  </Space>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className={styles['right-wrap']}>
                {item.status === '0' && (
                  <div className={styles['left']} onClick={() => editWorkGroup(item.id)}>
                    <EditOutlined style={{ fontSize: '18px' }} />
                    <span>编辑</span>
                  </div>
                )}
                {item.status === '0' && (
                  <div className={styles['left']} onClick={() => publishWorkGroup(item.id)}>
                    <FieldTimeOutlined style={{ fontSize: '18px' }} />
                    <span>发布</span>
                  </div>
                )}
                {item.status !== '2' && (
                  <Popover
                    content={
                      <div>
                        {/* {item.status == 0 && (
                          <p style={{ cursor: 'pointer' }} onClick={() => setPublishVisible(true)}>
                            立即发布
                          </p>
                        )} */}
                        {item.status == 1 && (
                          <p
                            style={{ cursor: 'pointer' }}
                            onClick={() => deadlineGroupWork(item.id)}
                          >
                            立即截止
                          </p>
                        )}
                        <p style={{ cursor: 'pointer' }} onClick={() => setDeleteVisible(true)}>
                          立即删除
                        </p>
                      </div>
                    }
                  >
                    <div className={styles['right']}>
                      <BarsOutlined style={{ fontSize: '18px' }} />
                      <span>更多</span>
                    </div>
                  </Popover>
                )}
              </div>
            </Col>
          </Row>
        </div>
      );
    });
  }

  return (
    <div>
      <Row style={{ marginBottom: '15px' }}>
        <Col push={18} span={6}>
          <Search
            placeholder="请输入习题分组名称"
            enterButton
            onSearch={(value: string) => searchGroupWorkByName(value)}
          />
        </Col>
      </Row>
      <Space direction="vertical" size={15} style={{ width: '100%', paddingBottom: '20px' }}>
        {workList}
      </Space>
      <Modal
        title="发布作业"
        width={600}
        maskClosable={false}
        visible={publishVisible}
        onCancel={() => setPublishVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <div>
          <div className={styles['publish-modal-top']}>
            <p>学生将立即收到作业</p>
            <p>本操作只对"未发布"的作业有效</p>
          </div>
          <div className={styles['publish-modal-bottom']}>
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              onFinish={publishWork}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row>
                <Col span={12}>
                  <Space align="baseline">
                    <p>发布时间：</p>
                    <Form.Item
                      name="publish_time"
                      rules={[{ required: true, message: '请输入发布时间' }]}
                    >
                      <DatePicker style={{ width: '150px' }} showTime />
                    </Form.Item>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space align="baseline">
                    <p>截止时间：</p>
                    <Form.Item
                      name="deadline_time"
                      rules={[{ required: true, message: '请输入截止时间' }]}
                    >
                      <DatePicker style={{ width: '150px' }} showTime />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={upLoading}>
                    发布作业
                  </Button>
                  <Button loading={upLoading} onClick={() => setPublishVisible(false)}>
                    暂不发布
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      <Modal
        title="截止作业"
        width={600}
        maskClosable={false}
        visible={deadlineVisible}
        onCancel={() => setDeadlineVisible(false)}
        // footer={null}
        onOk={deadlineWork}
        destroyOnClose={true}
      >
        <div>
          <div className={styles['publish-modal-top']}>
            <p>学生将不能再提交作业</p>
            <p>本操作只对"进行中"的作业有效</p>
          </div>
        </div>
      </Modal>
      <Modal
        title="提示"
        visible={deleteVisible}
        footer={[
          <Button key="back" onClick={() => setDeleteVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={upLoading} onClick={deleteWork}>
            确定
          </Button>,
        ]}
        onCancel={() => setDeleteVisible(false)}
      >
        <p>提交作品将全部被删除，不可恢复</p>
        <p>是否确认删除？</p>
      </Modal>
      <Modal
        visible={editVisible}
        maskClosable={false}
        title="编辑作业分组"
        onCancel={() => setEditVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="basic"
          onFinish={updateGroupWork}
          autoComplete="off"
          initialValues={initialValues}
        >
          <Form.Item
            label="创建人"
            name="author"
            rules={[{ required: true, message: '请输入创建人名称' }]}
          >
            <Input />
          </Form.Item>
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
            label="建议时长(60-120 min)"
            name="suggestFinishTime"
            rules={[{ required: true, message: '请输入建议完成时长' }]}
          >
            <InputNumber min={60} max={120} />
          </Form.Item>
          <Form.Item
            label="成绩占比(0-1)"
            name="proportion"
            rules={[{ required: true, message: '请输入作业成绩占比(0-1)' }]}
          >
            <InputNumber min={0} max={1} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={upLoading}>
                确认
              </Button>
              <Button loading={upLoading} onClick={() => setEditVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );

  async function editWorkGroup(id: number) {
    const res = await GroupWork.groupWorkList({
      page: 1,
      pageSize: 1000,
      id,
      name: '',
    });
    if (res && res.code === 200) {
      setInitialValues(res.data[0]);
      setEditVisible(true);
    }
  }

  async function deadlineGroupWork(id: number) {
    const res = await GroupWork.groupWorkList({
      page: 1,
      pageSize: 1000,
      id,
      name: '',
    });
    if (res && res.code === 200) {
      setInitialValues(res.data[0]);
      setDeadlineVisible(true);
    }
  }

  async function updateGroupWork(value: any) {
    setUpLoading(true);
    value.id = initialValues.id;
    value.proportion = String(value.proportion);
    value.suggestFinishTime = Number(value.suggestFinishTime);
    const res = await GroupWork.updateGroupWork(value);
    if (res && res.code === 200) {
      setUpLoading(false);
      message.success('编辑成功');
      setEditVisible(false);
      getGroupList();
    }
  }

  function searchGroupWorkByName(value: string) {
    setSearchCondition({
      page: 1,
      pageSize: 1000,
      id: -1,
      name: value,
    });
  }

  function deleteWork() {
    setUpLoading(true);
    setTimeout(() => {
      setUpLoading(false);
      setDeleteVisible(false);
      message.success('删除成功');
    }, 2000);
  }

  async function deadlineWork() {
    setUpLoading(true);
    const value: any = {};
    value.status = '2';
    value.publishTime = dayjs(initialValues.publishTime).format('YYYY-MM-DD HH:mm:ss');
    value.deadlineTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const res = await GroupWork.updateGroupWork({
      ...initialValues,
      ...value,
    });
    if (res && res.code === 200) {
      // 为每个学生创建一条数据
      const result = await GroupWork.updateCompleteList({
        workId: initialValues.id,
        submitStatus: '1',
      });
      if (result && result.code === 200) {
        setUpLoading(false);
        message.success('截止成功');
        setDeadlineVisible(false);
        getGroupList();
      }
    }
  }

  async function publishWorkGroup(id: number) {
    const res = await GroupWork.groupWorkList({
      page: 1,
      pageSize: 1000,
      id,
      name: '',
    });
    if (res && res.code === 200) {
      setInitialValues(res.data[0]);
      setPublishVisible(true);
    }
  }

  async function publishWork(value: any) {
    setUpLoading(true);
    value.status = '1';
    value.publishTime = value.publish_time.format('YYYY-MM-DD HH:mm:ss');
    value.deadlineTime = value.deadline_time.format('YYYY-MM-DD HH:mm:ss');
    // console.log({
    //   ...initialValues,
    //   ...value,
    // });
    const res = await GroupWork.updateGroupWork({
      ...initialValues,
      ...value,
    });
    if (res && res.code === 200) {
      // 为每个学生创建一条数据
      const result = await GroupWork.insertCompleteList({
        workId: initialValues.id,
        submitStatus: '0',
      });
      if (result && result.code === 200) {
        setUpLoading(false);
        message.success('发布成功');
        setPublishVisible(false);
        getGroupList();
      }
    }
  }

  function onFinishFailed() {}
};

export default WorkTabPane;
