import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { Button, Col, Divider, InputNumber, message, Modal, Radio, Row, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { noop } from '@/utils/common';
import { useLocation, history } from 'umi';
import {
  GroupWork as GroupWorkUtils,
  Exercise as ExerciseUtils,
  knowledgePoint as knowledgePointUtils,
  workStatistics as workStatisticsUtils,
  exerciseComplete as exerciseCompleteUtils,
  UserUtils,
} from '@/api/service';
import dayjs from 'dayjs';

const CorrectWork: React.FC = () => {
  const workGroupId = useLocation().query?.work_id;
  const staticsId = useLocation().query?.statics_id;
  const userId = useLocation().query?.user_id;

  const [workList, setWorkList] = useState<any[]>([]);
  const [correctModalVisible, setCorrectModalVisible] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [knowledgePointList, setKnowledgePointList] = useState<any[]>([]);
  const [workGroupObj, setWorkGroupObj] = useState<any>({});
  const [workStaticsObj, setWorkStaticsObj] = useState<any>({});
  const [exerciseCompleteList, setExerciseCompleteList] = useState<any>([]);
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    getGroupWorkInfo();
    getExerciseList();
    getworkStatics();
    getExerciseCompleteList();
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
    (async () => {
      const res = (await UserUtils.userList({
        type: 'student',
      })) as any;
      if (res && res.code === 200) {
        setUserList(res.data);
      }
    })();
  }, []);

  return (
    <PageContainer>
      <div className={styles['correct-work-wrap']}>
        <Row>
          <Col span={10}>
            <Space>
              <div className={styles['title']}>{workGroupObj.name}</div>
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
                ???????????????{workGroupObj.suggestFinishTime}??????
              </span>
            </Space>
          </Col>
        </Row>
        <div style={{ marginTop: '10px' }}>???????????????{workGroupObj.description}</div>
        <Row style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Space>
              <span className={styles['submit-info']}>
                ????????????{getUserName(workStaticsObj.userId)}
              </span>
              <span className={styles['submit-info']}>
                ???????????????{dayjs(workStaticsObj.submitTime).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </Space>
          </Col>
        </Row>
        <Divider />
        <main className={styles['main-container']}>
          <Row>
            <Col span={24}>
              {/* ????????? */}
              {workList.filter((item) => item.type == 0).length > 0 && (
                <div>
                  <Row>
                    <Col span={24}>
                      <Space align="center">
                        <p className={styles['title']}>???????????????</p>
                        <p className={styles['tips']}>
                          (???{workList.filter((item) => item.type == 0).length}?????????
                          {calculateScore(workList, 0)}???)
                        </p>
                      </Space>
                    </Col>
                  </Row>
                  {workList
                    .filter((item) => item.type == 0)
                    .map((item, index) => (
                      <div key={item.id} className={styles['project-item']}>
                        <Row>
                          <Col span={20}>
                            <Space align="start">
                              <pre style={{ marginBottom: '0px' }}>
                                {index + 1}.{item.questionStem}
                              </pre>
                              <span style={{ color: 'green', fontWeight: 600, marginLeft: '10px' }}>
                                (????????????{getExercisePoint(item.knowledgePoint)})
                              </span>
                              <span>({item.score}???)</span>
                            </Space>
                          </Col>
                          <Col span={2} push={2}>
                            {getStudentDoneExercise(item.id).answer === item.correctAnswer && (
                              <CheckCircleOutlined style={{ color: 'green', fontSize: '20px' }} />
                            )}
                            {getStudentDoneExercise(item.id).answer !== item.correctAnswer && (
                              <CloseCircleOutlined style={{ color: 'red', fontSize: '20px' }} />
                            )}
                          </Col>
                        </Row>
                        <div style={{ marginTop: '5px' }}>
                          <Space direction="vertical">
                            <Space>
                              <Radio
                                checked={getStudentDoneExercise(item.id).answer === 'a'}
                                disabled
                              >
                                A
                              </Radio>
                              <pre style={{ marginBottom: '0px' }}>{item.optionA}</pre>
                            </Space>
                            <Space>
                              <Radio
                                checked={getStudentDoneExercise(item.id).answer === 'b'}
                                disabled
                              >
                                B
                              </Radio>
                              <pre style={{ marginBottom: '0px' }}>{item.optionB}</pre>
                            </Space>
                            <Space>
                              <Radio
                                checked={getStudentDoneExercise(item.id).answer === 'c'}
                                disabled
                              >
                                C
                              </Radio>
                              <pre style={{ marginBottom: '0px' }}>{item.optionC}</pre>
                            </Space>
                            <Space>
                              <Radio
                                checked={getStudentDoneExercise(item.id).answer === 'd'}
                                disabled
                              >
                                D
                              </Radio>
                              <pre style={{ marginBottom: '0px' }}>{item.optionD}</pre>
                            </Space>
                            {getStudentDoneExercise(item.id).answer !== item.correctAnswer && (
                              <Space>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>???????????????</span>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                  {item.correctAnswer.toUpperCase()}
                                </span>
                              </Space>
                            )}
                          </Space>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {/* ????????? */}
              {workList.filter((item) => item.type == 1).length > 0 && (
                <div>
                  <Row>
                    <Col span={24}>
                      <Space align="center">
                        <p className={styles['title']}>???????????????</p>
                        <p className={styles['tips']}>
                          (???{workList.filter((item) => item.type == 1).length}???)
                        </p>
                      </Space>
                    </Col>
                  </Row>
                  {workList
                    .filter((item) => item.type == 1)
                    .map((item, index) => (
                      <div key={item.id} className={styles['project-item']}>
                        <Row>
                          <Col span={18}>
                            <Space align="start">
                              <pre style={{ marginBottom: '0px' }}>
                                {index + 1}.{item.questionStem}
                              </pre>
                              <span style={{ color: 'green', fontWeight: 600, marginLeft: '10px' }}>
                                (????????????{getExercisePoint(item.knowledgePoint)})
                              </span>
                              <span>({item.score}???)</span>
                            </Space>
                          </Col>
                          <Col span={6}>
                            <Space>
                              <span style={{ color: 'red', fontWeight: 'bold' }}>??????????????????</span>
                              {/* ????????????????????????????????????????????????????????? */}
                              <InputNumber
                                min={0}
                                max={item.score}
                                // defaultValue={0}
                                onChange={(value: number) =>
                                  handleCorrectWork(value, getStudentDoneExercise(item.id))
                                }
                              />
                            </Space>
                          </Col>
                        </Row>
                        <div style={{ marginTop: '5px' }}>
                          <p style={{ fontWeight: 600, marginBottom: '5px' }}>???????????????</p>
                          <pre
                            style={{ marginBottom: '0px' }}
                            className={styles['select-answer-wrap']}
                          >
                            {getStudentDoneExercise(item.id).answer}
                          </pre>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <p style={{ fontWeight: 600, marginBottom: '5px' }}>???????????????</p>
                          <pre style={{ marginBottom: '0px' }}>{item.correctAnswer}</pre>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={6} push={18}>
              <Space>
                <Button type="primary" onClick={() => setCorrectModalVisible(true)}>
                  ??????
                </Button>
                <Button onClick={() => history.push('/group_work')}>??????</Button>
              </Space>
            </Col>
          </Row>
        </main>
      </div>

      <Modal
        title="????????????"
        maskClosable={false}
        visible={correctModalVisible}
        onCancel={() => setCorrectModalVisible(false)}
        footer={[
          <Button key="back" loading={btnLoading} onClick={() => setCorrectModalVisible(false)}>
            ??????
          </Button>,
          <Button key="submit" type="primary" loading={btnLoading} onClick={handleSubmitCorrect}>
            ??????
          </Button>,
        ]}
      >
        <p>???????????????????????????????????????</p>
        <p>??????????????????</p>
      </Modal>
    </PageContainer>
  );

  async function handleCorrectWork(score: number, object: any) {
    if (!score) score = 0;
    object.score = score;
    const res = await exerciseCompleteUtils.updateExerciseComplete(object);
    // if (res && res.code === 200) {
    //   message.success('success');
    // }
  }

  function calculateScore(workLists: any, projectType: number) {
    return workLists
      .filter((item) => item.type == projectType)
      .reduce((preVal: number, item) => {
        return preVal + Number(item.score);
      }, 0);
  }

  async function handleSubmitCorrect() {
    setBtnLoading(true);
    let score = await calculateScore();
    const data = {
      id: workStaticsObj.id,
      workId: workGroupId,
      userId,
      submitStatus: '1',
      submitTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      correctStatus: '1',
      category: '0',
      score,
    };
    const res = await workStatisticsUtils.updateStatistics(data);
    if (res && res.code === 200) {
      setBtnLoading(false);
      setCorrectModalVisible(false);
      message.success('??????????????????');
      history.push('/group_work');
    }

    /**???????????? */
    async function calculateScore() {
      const res = await exerciseCompleteUtils.exerciseCompleteList({
        userId,
      });
      let score = 0;
      if (res && res.code === 200) {
        // ?????????????????????
        let exerciseIDs: number[] = [];
        for (const value of workList) {
          exerciseIDs.push(value.id);
        }
        for (const value of res.data) {
          if (exerciseIDs.includes(value.exerciseId)) score += value.score;
        }
        return score;
      }
      return 0;
    }
  }

  async function getGroupWorkInfo() {
    const res = await GroupWorkUtils.groupWorkList({
      page: 1,
      pageSize: 1000,
      id: workGroupId,
      name: '',
    });
    if (res && res.code === 200) {
      setWorkGroupObj(res.data[0]);
    }
  }

  async function getExerciseList() {
    const res = await ExerciseUtils.exerciseList({
      page: 1,
      pageSize: 10000,
      category: '0',
      workId: workGroupId,
    });
    if (res && res.code === 200) {
      setWorkList(res.data);
    }
  }

  async function getworkStatics() {
    const res = await workStatisticsUtils.completeList({
      page: 1,
      pageSize: 10000,
      category: '0',
      workId: workGroupId,
      id: Number(staticsId),
    });
    if (res && res.code === 200) {
      setWorkStaticsObj(res.data[0]);
    }
  }

  async function getExerciseCompleteList() {
    const res = await exerciseCompleteUtils.exerciseCompleteList({
      userId,
    });
    if (res && res.code === 200) {
      setExerciseCompleteList(res.data);
    }
  }

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

  function getStudentDoneExercise(exerciseId: number) {
    for (const value of exerciseCompleteList) {
      if (exerciseId === value.exerciseId) {
        return value;
      }
    }
    return {};
  }

  function getUserName(userId: number) {
    for (const value of userList) {
      if (userId === value.id) return value.userName;
    }
  }
};

export default CorrectWork;
