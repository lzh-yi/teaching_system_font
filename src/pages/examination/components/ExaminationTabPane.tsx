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
} from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { history } from 'umi';

const { Search } = Input;

const ExaminationTabPane: React.FC = (props: any) => {
  const { workTabArr, editWorkGroup } = props;
  const [publishVisible, setPublishVisible] = useState<boolean>(false);
  const [deadlineVisible, setDeadlineVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);

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

  if (Array.isArray(workTabArr) && workTabArr.length > 0) {
    const workList = workTabArr.map((item) => {
      return (
        <div key={item.id} className={styles['item-wrap']}>
          <Row>
            <Col
              span={18}
              onClick={() => history.push(`/examination/detail?examination_status=${item.status}`)}
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
                    {item.status !== 0 && (
                      <p style={{ color: '#BBBBBB' }}>
                        <span>发布时间 2022-04-24 14:50</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>截止时间 2022-04-28 14:50</span>
                      </p>
                    )}
                  </Space>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className={styles['right-wrap']}>
                {item.status === 0 && (
                  <div className={styles['left']} onClick={editWorkGroup}>
                    <EditOutlined style={{ fontSize: '18px' }} />
                    <span>编辑</span>
                  </div>
                )}
                {item.status === 0 && (
                  <div className={styles['left']} onClick={() => setPublishVisible(true)}>
                    <FieldTimeOutlined style={{ fontSize: '18px' }} />
                    <span>发布</span>
                  </div>
                )}
                {item.status !== 2 && (
                  <Popover
                    content={
                      <div>
                        {item.status == 0 && (
                          <p style={{ cursor: 'pointer' }} onClick={() => setPublishVisible(true)}>
                            立即发布
                          </p>
                        )}
                        {item.status == 1 && (
                          <p style={{ cursor: 'pointer' }} onClick={() => setDeadlineVisible(true)}>
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
    return (
      <div>
        <Row style={{ marginBottom: '15px' }}>
          <Col push={18} span={6}>
            <Search placeholder="请输入考试名称" enterButton />
          </Col>
        </Row>
        <Space direction="vertical" size={15} style={{ width: '100%', paddingBottom: '20px' }}>
          {workList}
        </Space>
        <Modal
          title="发布考试"
          width={600}
          maskClosable={false}
          visible={publishVisible}
          onCancel={() => setPublishVisible(false)}
          footer={null}
        >
          <div>
            <div className={styles['publish-modal-top']}>
              <p>学生将立即收到考试</p>
              <p>本操作只对"未发布"的考试有效</p>
            </div>
            <div className={styles['publish-modal-bottom']}>
              <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
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
                        name="end_time"
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
                      发布考试
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
          title="截止考试"
          width={600}
          maskClosable={false}
          visible={deadlineVisible}
          onCancel={() => setDeadlineVisible(false)}
          footer={null}
        >
          <div>
            <div className={styles['publish-modal-top']}>
              <p>学生将不能再提交考试</p>
              <p>本操作只对"进行中"的考试有效</p>
            </div>
            <div className={styles['publish-modal-bottom']}>
              <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={deadlineWork}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Row>
                  <Col span={24}>
                    <Space align="baseline">
                      <span>截止时间：</span>
                      <Form.Item
                        name="end_time"
                        rules={[{ required: true, message: '请输入截止时间' }]}
                      >
                        <DatePicker showTime />
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={upLoading}>
                      截止考试
                    </Button>
                    <Button loading={upLoading} onClick={() => setDeadlineVisible(false)}>
                      暂不截止
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
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
      </div>
    );
  }

  return <Empty />;

  function deleteWork() {
    setUpLoading(true);
    setTimeout(() => {
      setUpLoading(false);
      setDeleteVisible(false);
      message.success('删除成功');
    }, 2000);
  }

  function deadlineWork() {
    setUpLoading(true);
    setTimeout(() => {
      setUpLoading(false);
      setDeadlineVisible(false);
      message.success('截止成功');
    }, 2000);
  }

  function publishWork() {
    setUpLoading(true);
    setTimeout(() => {
      setUpLoading(false);
      setPublishVisible(false);
      message.success('发布成功');
    }, 2000);
  }

  function onFinishFailed() {}
};

export default ExaminationTabPane;
