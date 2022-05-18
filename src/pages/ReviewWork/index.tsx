import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { Button, Col, Divider, InputNumber, Radio, Row, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'umi';
import {
  GroupWork as GroupWorkUtils,
  Exercise as ExerciseUtils,
  knowledgePoint as knowledgePointUtils,
  workStatistics as workStatisticsUtils,
  exerciseComplete as exerciseCompleteUtils,
  UserUtils,
} from '@/api/service';
import dayjs from 'dayjs';
/** 学生-题目 对应表 */

const CorrectWork: React.FC = () => {
  const workGroupId = useLocation().query?.work_id;
  const staticsId = useLocation().query?.statics_id;
  const userId = useLocation().query?.user_id;

  const [workList, setWorkList] = useState<any[]>([]);
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
                建议时长：{workGroupObj.suggestFinishTime}分钟
              </span>
            </Space>
          </Col>
        </Row>
        <div style={{ marginTop: '10px' }}>习题描述：{workGroupObj.description}</div>
        <Row style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Space>
              <span className={styles['submit-info']}>
                提交人：{getUserName(workStaticsObj.userId)}
              </span>
              <span className={styles['submit-info']}>
                提交时间：{dayjs(workStaticsObj.submitTime).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </Space>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px', fontSize: '18px' }}>
          <Col span={24}>
            <Space style={{ fontWeight: 'bold' }}>
              <span>最终得分</span>
              <span>{workStaticsObj.score}</span>
            </Space>
          </Col>
        </Row>
        <Divider />
        <main className={styles['main-container']}>
          <Row>
            <Col span={24}>
              {/* 单选题 */}
              {workList.filter((item) => item.type == 0).length > 0 && (
                <div>
                  <Row>
                    <Col span={24}>
                      <Space align="center">
                        <p className={styles['title']}>一、单选题</p>
                        <p className={styles['tips']}>
                          (共{workList.filter((item) => item.type == 0).length}题；共
                          {calculateScore(workList, 0)}分)
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
                            <Space>
                              <pre style={{ marginBottom: '0px' }}>
                                {index + 1}.{item.questionStem}
                              </pre>
                              <span>({item.score}分)</span>
                              <span style={{ color: 'green', fontWeight: 600 }}>
                                (知识点：{getExercisePoint(item.knowledgePoint)})
                              </span>
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
                                <span style={{ color: 'red', fontWeight: 'bold' }}>正确答案：</span>
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
              {/* 主观题 */}
              {workList.filter((item) => item.type == 1).length > 0 && (
                <div>
                  <Row>
                    <Col span={24}>
                      <Space align="center">
                        <p className={styles['title']}>二、主观题</p>
                        <p className={styles['tips']}>
                          (共{workList.filter((item) => item.type == 1).length}题；共
                          {calculateScore(workList, 1)}分)
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
                            <Space>
                              <pre style={{ marginBottom: '0px' }}>
                                {index + 1}.{item.questionStem}
                              </pre>
                              <span>({item.score}分)</span>
                              <span style={{ color: 'green', fontWeight: 600 }}>
                                (知识点：{getExercisePoint(item.knowledgePoint)})
                              </span>
                            </Space>
                          </Col>
                          <Col span={6}>
                            <Space>
                              <span style={{ color: 'green', fontWeight: 'bold' }}>得分：</span>
                              <InputNumber readOnly value={getStudentDoneExercise(item.id).score} />
                            </Space>
                          </Col>
                        </Row>
                        <div style={{ marginTop: '5px' }}>
                          <p style={{ fontWeight: 600, marginBottom: '5px' }}>提交答案：</p>
                          <pre
                            style={{ marginBottom: '0px' }}
                            className={styles['select-answer-wrap']}
                          >
                            {getStudentDoneExercise(item.id).answer}
                          </pre>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <p style={{ fontWeight: 600, marginBottom: '5px' }}>参考答案：</p>
                          <pre style={{ marginBottom: '0px' }}>{item.correctAnswer}</pre>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Col>
          </Row>
        </main>
      </div>
    </PageContainer>
  );

  function calculateScore(workLists: any, projectType: number) {
    return workLists
      .filter((item) => item.type == projectType)
      .reduce((preVal: number, item) => {
        return preVal + Number(item.score);
      }, 0);
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

  function getUserName(userId: number) {
    for (const value of userList) {
      if (userId === value.id) return value.userName;
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
};

export default CorrectWork;
