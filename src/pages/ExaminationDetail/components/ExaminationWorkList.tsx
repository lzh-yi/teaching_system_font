import React, { useState } from 'react';
import {
  Row,
  Col,
  Space,
  Button,
  Divider,
  Empty,
  Radio,
  Popconfirm,
  Form,
  DatePicker,
  Modal,
  message,
} from 'antd';
import styles from './index.less';
import {
  DeleteOutlined,
  FieldTimeOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import CreateSelectWork from '@/pages/ExaminationDetail/components/CreateSelectWork';
import CreateSubjectiveWork from '@/pages/ExaminationDetail/components/CreateSubjectiveWork';

type workItemType = {
  id: number;
  question_stems: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  question_answer: string;
  score: string | number;
  knowledgePoint: string;
  type: number;
};

const ExaminationWorkList: React.FC = (props: any) => {
  const [selectWorkVisible, setSelectWorkVisible] = useState<boolean>(false);
  const [subjectiveWorkVisible, setSubjectiveWorkVisible] = useState<boolean>(false);
  const [publishVisible, setPublishVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [workList, setWorkList] = useState<workItemType[]>([
    {
      id: 0,
      question_stems: '下面哪个是Java中表示类的关键字',
      answer_a: 'class',
      answer_b: 'static',
      answer_c: 'public',
      answer_d: 'int',
      question_answer: 'a',
      score: 5,
      knowledgePoint: '知识点1',
      type: 0,
    },
    {
      id: 1,
      question_stems: '下面哪个是Java中表示类的修饰符',
      answer_a: 'int',
      answer_b: 'public',
      answer_c: 'double',
      answer_d: 'for',
      question_answer: 'b',
      score: 5,
      knowledgePoint: '知识点2',
      type: 0,
    },
    {
      id: 2,
      question_stems: 'Java中创建对象的关键字是',
      answer_a: 'for',
      answer_b: 'create',
      answer_c: 'double',
      answer_d: 'new',
      question_answer: 'd',
      score: 5,
      knowledgePoint: '知识点3',
      type: 0,
    },
    {
      id: 3,
      question_stems: '简述Java的类机制',
      answer_a: '',
      answer_b: '',
      answer_c: '',
      answer_d: '',
      question_answer: 'Java的类机制...',
      score: 20,
      knowledgePoint: '知识点1',
      type: 1,
    },
    {
      id: 4,
      question_stems: 'Java中创建对象的关键字是',
      answer_a: 'for',
      answer_b: 'create',
      answer_c: 'double',
      answer_d: 'new',
      question_answer: 'd',
      score: 5,
      knowledgePoint: '知识点1',
      type: 0,
    },
    {
      id: 5,
      question_stems: '简述Java类的几种修饰符',
      answer_a: '',
      answer_b: '',
      answer_c: '',
      answer_d: '',
      question_answer:
        '在 Java 语言中提供了多个作用域修饰符，其中常用的有 public、private、protected、final、abstract、static、transient 和 volatile，这些修饰符有类修饰符、变量修饰符和方法修饰符。',
      score: 20,
      knowledgePoint: '知识点1',
      type: 1,
    },
  ]);

  // 标记当前习题组是否是未发布状态
  const { workGroupStatus } = props;

  return (
    <div>
      <Row>
        <Col span={21}>
          <Row>
            <Col span={10}>
              <Space>
                <div className={styles['title']}>期末考试一</div>
                <Button
                  shape="round"
                  size="small"
                  style={{ backgroundColor: '#C6CED6', color: 'white' }}
                >
                  未发布
                </Button>
              </Space>
            </Col>
          </Row>
          <Row style={{ marginTop: '15px' }}>
            <Col>
              <Space align="center">
                <Button type="primary" shape="round" size="small">
                  简单
                </Button>
                <span style={{ color: '#99B5D7' }}>建议时长：120分钟</span>
              </Space>
            </Col>
          </Row>
          <div style={{ marginTop: '10px' }}>
            考试描述：本场考试是对Java对象掌握情况的一次考察...
          </div>
        </Col>
        {workGroupStatus == '0' && (
          <Col span={3}>
            <Button
              onClick={() => setPublishVisible(true)}
              icon={<FieldTimeOutlined />}
              type="primary"
            >
              立即发布
            </Button>
          </Col>
        )}
      </Row>
      <Divider />

      <main className={styles['main-container']}>
        <Row>
          <Col span={24}>
            {!workList.length && !selectWorkVisible && !subjectiveWorkVisible && <Empty />}
            {/* 单选题 */}
            {workList.filter((item) => item.type === 0).length > 0 && (
              <div>
                <Row>
                  <Col span={24}>
                    <Space align="center">
                      <p className={styles['title']}>一、单选题</p>
                      <p className={styles['tips']}>
                        (共{workList.filter((item) => item.type === 0).length}题；共
                        {calculateScore(workList, 0)}分)
                      </p>
                    </Space>
                  </Col>
                </Row>
                {workList
                  .filter((item) => item.type === 0)
                  .map((item, index) => (
                    <div key={item.id} className={styles['project-item']}>
                      <Space>
                        <span>
                          {index + 1}.{item.question_stems}
                        </span>
                        <span>({item.score}分)</span>
                        <span style={{ color: 'green', fontWeight: 600 }}>
                          (知识点：{item.knowledgePoint})
                        </span>
                      </Space>
                      <div style={{ marginTop: '5px' }}>
                        <Space direction="vertical">
                          <Space>
                            <Radio checked={item.question_answer === 'a'} disabled>
                              A
                            </Radio>
                            <span>{item.answer_a}</span>
                          </Space>
                          <Space>
                            <Radio checked={item.question_answer === 'b'} disabled>
                              B
                            </Radio>
                            <span>{item.answer_b}</span>
                          </Space>
                          <Space>
                            <Radio checked={item.question_answer === 'c'} disabled>
                              C
                            </Radio>
                            <span>{item.answer_c}</span>
                          </Space>
                          <Space>
                            <Radio checked={item.question_answer === 'd'} disabled>
                              D
                            </Radio>
                            <span>{item.answer_d}</span>
                          </Space>
                        </Space>
                      </div>
                      {workGroupStatus == '0' && (
                        <Row>
                          <Col span={2} push={22}>
                            <Space>
                              <Popconfirm
                                title="确认要删除这个试题吗？"
                                onConfirm={() => {}}
                                onCancel={() => {}}
                                okText="是"
                                cancelText="否"
                              >
                                <DeleteOutlined
                                  style={{ color: 'red' }}
                                  className={styles['icon']}
                                />
                              </Popconfirm>
                              <FormOutlined
                                style={{ color: '#5C7D9B' }}
                                className={styles['icon']}
                              />
                            </Space>
                          </Col>
                        </Row>
                      )}
                    </div>
                  ))}
              </div>
            )}
            {/* 主观题 */}
            {workList.filter((item) => item.type === 1).length > 0 && (
              <div>
                <Row>
                  <Col span={24}>
                    <Space align="center">
                      <p className={styles['title']}>二、主观题</p>
                      <p className={styles['tips']}>
                        (共{workList.filter((item) => item.type === 1).length}题；共
                        {calculateScore(workList, 1)}分)
                      </p>
                    </Space>
                  </Col>
                </Row>
                {workList
                  .filter((item) => item.type === 1)
                  .map((item, index) => (
                    <div key={item.id} className={styles['project-item']}>
                      <Space>
                        <span>
                          {index + 1}.{item.question_stems}
                        </span>
                        <span>({item.score}分)</span>
                        <span style={{ color: 'green', fontWeight: 600 }}>
                          (知识点：{item.knowledgePoint})
                        </span>
                      </Space>
                      <div style={{ marginTop: '5px' }}>
                        <p style={{ fontWeight: 600 }}>参考答案：</p>
                        <p>{item.question_answer}</p>
                      </div>
                      {workGroupStatus == '0' && (
                        <Row>
                          <Col span={2} push={22}>
                            <Space>
                              <Popconfirm
                                title="确认要删除这个试题吗？"
                                onConfirm={() => {}}
                                onCancel={() => {}}
                                okText="是"
                                cancelText="否"
                              >
                                <DeleteOutlined
                                  style={{ color: 'red' }}
                                  className={styles['icon']}
                                />
                              </Popconfirm>
                              <FormOutlined
                                style={{ color: '#5C7D9B' }}
                                className={styles['icon']}
                              />
                            </Space>
                          </Col>
                        </Row>
                      )}
                    </div>
                  ))}
              </div>
            )}
            {selectWorkVisible && (
              <CreateSelectWork closeModal={() => setSelectWorkVisible(false)} />
            )}
            {subjectiveWorkVisible && (
              <CreateSubjectiveWork closeModal={() => setSubjectiveWorkVisible(false)} />
            )}
          </Col>
        </Row>
      </main>
      {workGroupStatus == '0' && (
        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Space>
              <Button onClick={handleEditSelectWork} type="primary" icon={<PlusCircleOutlined />}>
                单选题
              </Button>
              <Button onClick={handleEditSubjectWork} type="primary" icon={<PlusCircleOutlined />}>
                主观题
              </Button>
            </Space>
          </Col>
        </Row>
      )}

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
    </div>
  );

  function handleEditSelectWork() {
    setSelectWorkVisible(true);
  }
  function handleEditSubjectWork() {
    setSubjectiveWorkVisible(true);
  }

  function calculateScore(workLists: workItemType[], projectType: number) {
    return workLists
      .filter((item) => item.type === projectType)
      .reduce((preVal: number, item) => {
        return preVal + Number(item.score);
      }, 0);
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

export default ExaminationWorkList;
