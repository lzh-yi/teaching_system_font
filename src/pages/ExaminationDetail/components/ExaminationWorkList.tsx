import React, { useEffect, useState } from 'react';
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
import {
  examination as GroupWork,
  Exercise as ExerciseUtils,
  knowledgePoint as knowledgePointUtils,
} from '@/api/service';
import dayjs from 'dayjs';
import { history } from 'umi';

const GroupWorkDetail: React.FC = (props: any) => {
  const [selectWorkVisible, setSelectWorkVisible] = useState<boolean>(false);
  const [subjectiveWorkVisible, setSubjectiveWorkVisible] = useState<boolean>(false);
  const [publishVisible, setPublishVisible] = useState<boolean>(false);
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [workList, setWorkList] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<{}>({});
  const [workGroupObj, setWorkGroupObj] = useState<any>({});
  const [treeNodeData, setTreeNodeData] = useState<any[]>([]);
  const [knowledgePointList, setKnowledgePointList] = useState<any[]>([]);

  // 标记当前习题组是否是未发布状态
  const { workGroupStatus, workId, outlineId } = props;
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

  useEffect(() => {
    getGroupWorkInfo();
    getExerciseList();
    (async () => {
      const res = await knowledgePointUtils.knowledgePointList({
        page: 1,
        pageSize: 10000,
        id: -1,
        teachingGoalId: -1,
      });
      if (res && res.code === 200) {
        setKnowledgePointList(res.data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await GroupWork.knowledgePointSelectData({
        teachingOutlineId: Number(outlineId),
        page: 1,
        pageSize: 1000,
      });
      if (res && res.code === 200) {
        setTreeNodeData(res.data);
      }
    })();
  }, []);

  return (
    <div>
      <Row>
        <Col span={21}>
          <Row>
            <Col span={10}>
              <Space>
                <div className={styles['title']}>{workGroupObj.name}</div>
                <Button
                  shape="round"
                  size="small"
                  style={{ backgroundColor: bgColor[workGroupObj.status]?.color, color: 'white' }}
                >
                  {bgColor[workGroupObj.status]?.label}
                </Button>
              </Space>
            </Col>
          </Row>
          <Row style={{ marginTop: '15px' }}>
            <Col>
              <Space align="center">
                <Button type="primary" shape="round" size="small">
                  {workGroupObj.difficultyLevel}
                </Button>
                <span style={{ color: '#99B5D7' }}>
                  建议时长：{workGroupObj.suggestFinishTime}分钟
                </span>
              </Space>
            </Col>
          </Row>
          <div style={{ marginTop: '10px' }}>习题描述：{workGroupObj.description}</div>
        </Col>
        {workGroupStatus == '0' && (
          <Col span={3}>
            <Button
              onClick={() => publishWorkGroup(workGroupObj.id)}
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
            {workList.filter((item) => Number(item.type) === 0).length > 0 && (
              <div>
                <Row>
                  <Col span={24}>
                    <Space align="center">
                      <p className={styles['title']}>一、单选题</p>
                      <p className={styles['tips']}>
                        (共{workList.filter((item) => Number(item.type) === 0).length}题；共
                        {calculateScore(workList, '0')}分)
                      </p>
                    </Space>
                  </Col>
                </Row>
                {workList
                  .filter((item) => Number(item.type) === 0)
                  .map((item, index) => (
                    <div key={item.id} className={styles['project-item']}>
                      <Space>
                        <span>
                          {index + 1}.{item.questionStem}
                        </span>
                        <span>({item.score}分)</span>
                        <span style={{ color: 'green', fontWeight: 600 }}>
                          (知识点：{getExercisePoint(item.knowledgePoint)})
                        </span>
                      </Space>
                      <div style={{ marginTop: '5px' }}>
                        <Space direction="vertical">
                          <Space>
                            <Radio checked={item.correctAnswer === 'a'} disabled>
                              A
                            </Radio>
                            <span>{item.optionA}</span>
                          </Space>
                          <Space>
                            <Radio checked={item.correctAnswer === 'b'} disabled>
                              B
                            </Radio>
                            <span>{item.optionB}</span>
                          </Space>
                          <Space>
                            <Radio checked={item.correctAnswer === 'c'} disabled>
                              C
                            </Radio>
                            <span>{item.optionC}</span>
                          </Space>
                          <Space>
                            <Radio checked={item.correctAnswer === 'd'} disabled>
                              D
                            </Radio>
                            <span>{item.optionD}</span>
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
            {workList.filter((item) => Number(item.type) === 1).length > 0 && (
              <div>
                <Row>
                  <Col span={24}>
                    <Space align="center">
                      <p className={styles['title']}>二、主观题</p>
                      <p className={styles['tips']}>
                        (共{workList.filter((item) => Number(item.type) === 1).length}题；共
                        {calculateScore(workList, '1')}分)
                      </p>
                    </Space>
                  </Col>
                </Row>
                {workList
                  .filter((item) => Number(item.type) === 1)
                  .map((item, index) => (
                    <div key={item.id} className={styles['project-item']}>
                      <Space>
                        <span>
                          {index + 1}.{item.questionStem}
                        </span>
                        <span>({item.score}分)</span>
                        <span style={{ color: 'green', fontWeight: 600 }}>
                          (知识点：{getExercisePoint(item.knowledgePoint)})
                        </span>
                      </Space>
                      <div style={{ marginTop: '5px' }}>
                        <p style={{ fontWeight: 600 }}>参考答案：</p>
                        <p>{item.correctAnswer}</p>
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
              <CreateSelectWork
                workId={workId}
                treeNodeData={treeNodeData}
                closeModal={() => setSelectWorkVisible(false)}
                getExerciseList={getExerciseList}
              />
            )}
            {subjectiveWorkVisible && (
              <CreateSubjectiveWork
                workId={workId}
                treeNodeData={treeNodeData}
                closeModal={() => setSubjectiveWorkVisible(false)}
                getExerciseList={getExerciseList}
              />
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
              // initialValues={{ remember: true }}
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
    </div>
  );

  function getExercisePoint(pointId: number) {
    let knowledgePointTitle = '';
    try {
      knowledgePointList.forEach((item: any) => {
        if (pointId === item.id) {
          knowledgePointTitle = item.title;
          throw new Error();
        }
      });
    } catch {
    } finally {
      return knowledgePointTitle;
    }
  }

  async function getExerciseList() {
    const res = await ExerciseUtils.exerciseList({
      page: 1,
      pageSize: 10000,
      category: '1',
      workId,
    });
    if (res && res.code === 200) {
      setWorkList(res.data);
    }
  }

  async function getGroupWorkInfo() {
    const res = await GroupWork.groupWorkList({
      page: 1,
      pageSize: 1000,
      id: workId,
      name: '',
    });
    if (res && res.code === 200) {
      setWorkGroupObj(res.data[0]);
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

  function handleEditSelectWork() {
    setSelectWorkVisible(true);
  }
  function handleEditSubjectWork() {
    setSubjectiveWorkVisible(true);
  }

  function calculateScore(workLists: any[], projectType: string) {
    return workLists
      .filter((item) => item.type === projectType)
      .reduce((preVal: number, item) => {
        return preVal + Number(item.score);
      }, 0);
  }

  async function publishWork(value: any) {
    setUpLoading(true);
    value.status = '1';
    value.publishTime = value.publish_time.format('YYYY-MM-DD HH:mm:ss');
    value.deadlineTime = value.deadline_time.format('YYYY-MM-DD HH:mm:ss');
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
        // window.location.reload();
        history.push(`/examination`);
      }
    }
  }

  function onFinishFailed() {}
};

export default GroupWorkDetail;
