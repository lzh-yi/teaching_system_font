import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Space,
  Empty,
  Radio,
  Divider,
  Button,
  Input,
  Modal,
  message,
} from 'antd';
import styles from './index.less';
import { getGlobalUser } from '../../../../constant/index';
import {
  GroupWork,
  Exercise as ExerciseUtils,
  workStatistics as workStatisticsUtils,
  exerciseComplete as exerciseCompleteUtils,
} from '@/api/service';
import dayjs from 'dayjs';
import { history } from 'umi';

const WorkDoing: React.FC = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [workList, setWorkList] = useState<any[]>([]);
  const [exerciseTotal, setExerciseTotal] = useState<number>(0);
  const [workGroupObj, setWorkGroupObj] = useState<any>({});
  const [completeResultObj, setCompleteResultObj] = useState<any>({});

  const { workGroup, workStatisticsId } = props;

  useEffect(() => {
    getGroupWorkInfo();
    getExerciseList();
  }, []);

  return (
    <PageContainer>
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
                    style={{ backgroundColor: '#0253D9', color: 'white' }}
                  >
                    进行中
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
          <Col span={3}>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              立即提交
            </Button>
          </Col>
        </Row>
        <Divider />
        <main className={styles['main-container']}>
          <Row>
            <Col span={24}>
              {!workList.length && <Empty />}
              {/* 单选题 */}
              {workList.filter((item) => Number(item.type) === 0).length > 0 && (
                <div>
                  <Row>
                    <Col span={24}>
                      <Space align="center">
                        <p className={styles['title']}>一、单选题</p>
                        <p className={styles['tips']}>
                          (共{workList.filter((item) => Number(item.type) === 0).length}题；共
                          {calculateScore(workList, 0)}分)
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
                          {/* <span style={{ color: 'green', fontWeight: 600 }}>
                            (知识点：{item.knowledgePoint})
                          </span> */}
                        </Space>
                        <div style={{ marginTop: '5px' }}>
                          <Radio.Group
                            onChange={(e) =>
                              handleEditWork(
                                item.id,
                                e.target.value,
                                item.correctAnswer,
                                item.score,
                              )
                            }
                          >
                            <Space direction="vertical">
                              <Radio value="a">A</Radio>
                              <Radio value="b">B</Radio>
                              <Radio value="c">C</Radio>
                              <Radio value="d">D</Radio>
                            </Space>
                          </Radio.Group>
                        </div>
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
                          {calculateScore(workList, 1)}分)
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
                          {/* <span style={{ color: 'green', fontWeight: 600 }}>
                            (知识点：{item.knowledgePoint})
                          </span> */}
                        </Space>
                        <div style={{ marginTop: '5px' }}>
                          <p style={{ fontWeight: 600 }}>回答：</p>
                          {/* <p>{item.question_answer}</p> */}
                          <Input.TextArea
                            showCount
                            allowClear
                            placeholder="请填写答案"
                            onChange={(e) => handleEditWork(item.id, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Col>
          </Row>
        </main>
        <Modal
          title="提交作业"
          maskClosable={false}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="back" loading={btnLoading} onClick={() => setIsModalVisible(false)}>
              取消
            </Button>,
            <Button key="submit" type="primary" loading={btnLoading} onClick={handleSubmitWork}>
              确定
            </Button>,
          ]}
        >
          <p>提交作业之后不可修改</p>
          <p>确认要提交吗？</p>
        </Modal>
      </div>
    </PageContainer>
  );

  function calculateScore(workLists: any[], projectType: number) {
    return workLists
      .filter((item) => item.type == projectType)
      .reduce((preVal: number, item) => {
        return preVal + Number(item.score);
      }, 0);
  }

  function handleEditWork(
    workID: number,
    workValue: String,
    questionAnswer?: String,
    workScore?: number,
  ) {
    if (!workValue) {
      const copy = completeResultObj;
      delete copy[workID];
      return setCompleteResultObj(copy);
    }
    setCompleteResultObj({
      ...completeResultObj,
      [workID]: {
        exerciseId: workID,
        userId: getGlobalUser().id,
        answer: workValue,
        score: questionAnswer === workValue ? workScore : 0,
      },
    });
  }

  async function handleSubmitWork() {
    if (exerciseTotal !== Object.keys(completeResultObj).length) {
      return message.warn('请完成所有习题之后再提交');
    }
    setIsModalVisible(true);
    setBtnLoading(true);
    // 提交习题
    for (const value of Object.values(completeResultObj)) {
      console.log('xxxxxxxxxxxxxxxxxxx');
      const res = await exerciseCompleteUtils.addExerciseComplete(value);
      if (res && res.code !== 200) {
        return message.warn('提交失败');
      }
    }

    const obj = {
      id: workStatisticsId,
      workId: workGroup,
      userId: getGlobalUser().id,
      submitStatus: '1',
      submitTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      correctStatus: '0',
      score: 0,
      category: '0',
    };
    const res = await workStatisticsUtils.updateStatistics(obj);
    if (res && res.code === 200) {
      setBtnLoading(false);
      setIsModalVisible(false);
      message.success('提交成功');
      history.push('/student/group_work');
    }
  }

  // 获取题组下的所有习题
  async function getExerciseList() {
    const res = await ExerciseUtils.exerciseList({
      page: 1,
      pageSize: 10000,
      category: '0',
      workId: workGroup,
    });
    if (res && res.code === 200) {
      setExerciseTotal(res.data.length);
      setWorkList(res.data);
    }
  }

  async function getGroupWorkInfo() {
    const res = await GroupWork.groupWorkList({
      page: 1,
      pageSize: 1000,
      id: workGroup,
      name: '',
    });
    if (res && res.code === 200) {
      setWorkGroupObj(res.data[0]);
    }
  }
};

export default WorkDoing;
