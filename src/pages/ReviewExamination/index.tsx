import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { Button, Col, Divider, InputNumber, Radio, Row, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { noop } from '@/utils/common';
import { history } from 'umi';

/** 学生-考试 对应表 */
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
  user_name: string;
  get_score: number;
  select_answer: string;
};

const CorrectWork: React.FC = () => {
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
      select_answer: 'a',
      user_name: '张三',
      get_score: 5,
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
      select_answer: 'c',
      user_name: '李四',
      get_score: 0,
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
      select_answer: 'a',
      user_name: '张三',
      get_score: 0,
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
      select_answer: 'Java的类机制是...',
      user_name: '张三',
      get_score: 15,
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
      select_answer: 'd',
      user_name: '张三',
      get_score: 5,
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
      select_answer: 'Java的修饰符...',
      user_name: '张三',
      get_score: 10,
    },
  ]);

  return (
    <PageContainer>
      <div className={styles['correct-work-wrap']}>
        <Row>
          <Col span={10}>
            <Space>
              <div className={styles['title']}>期末考试一</div>
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
        <div style={{ marginTop: '10px' }}>考试描述：该组习题主要是熟悉Java的类机制...</div>
        <Row style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Space>
              <span className={styles['submit-info']}>提交人：张三</span>
              <span className={styles['submit-info']}>提交时间：2022-04-23 12:00:08</span>
            </Space>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px', fontSize: '18px' }}>
          <Col span={24}>
            <Space style={{ fontWeight: 'bold' }}>
              <span>最终得分</span>
              <span>{calculateScore(workList, 0) + calculateScore(workList, 1)}</span>
            </Space>
          </Col>
        </Row>
        <Divider />
        <main className={styles['main-container']}>
          <Row>
            <Col span={24}>
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
                        <Row>
                          <Col span={20}>
                            <Space>
                              <span>
                                {index + 1}.{item.question_stems}
                              </span>
                              <span>({item.score}分)</span>
                              <span style={{ color: 'green', fontWeight: 600 }}>
                                (知识点：{item.knowledgePoint})
                              </span>
                            </Space>
                          </Col>
                          <Col span={2} push={2}>
                            {item.select_answer === item.question_answer && (
                              <CheckCircleOutlined style={{ color: 'green', fontSize: '20px' }} />
                            )}
                            {item.select_answer !== item.question_answer && (
                              <CloseCircleOutlined style={{ color: 'red', fontSize: '20px' }} />
                            )}
                          </Col>
                        </Row>
                        <div style={{ marginTop: '5px' }}>
                          <Space direction="vertical">
                            <Space>
                              <Radio checked={item.select_answer === 'a'} disabled>
                                A
                              </Radio>
                              <span>{item.answer_a}</span>
                            </Space>
                            <Space>
                              <Radio checked={item.select_answer === 'b'} disabled>
                                B
                              </Radio>
                              <span>{item.answer_b}</span>
                            </Space>
                            <Space>
                              <Radio checked={item.select_answer === 'c'} disabled>
                                C
                              </Radio>
                              <span>{item.answer_c}</span>
                            </Space>
                            <Space>
                              <Radio checked={item.select_answer === 'd'} disabled>
                                D
                              </Radio>
                              <span>{item.answer_d}</span>
                            </Space>
                            {item.question_answer !== item.select_answer && (
                              <Space>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>正确答案：</span>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                  {item.question_answer.toUpperCase()}
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
                        <Row>
                          <Col span={18}>
                            <Space>
                              <span>
                                {index + 1}.{item.question_stems}
                              </span>
                              <span>({item.score}分)</span>
                              <span style={{ color: 'green', fontWeight: 600 }}>
                                (知识点：{item.knowledgePoint})
                              </span>
                            </Space>
                          </Col>
                          <Col span={6}>
                            <Space>
                              <span style={{ color: 'green', fontWeight: 'bold' }}>得分：</span>
                              <InputNumber readOnly value={item.get_score} />
                            </Space>
                          </Col>
                        </Row>
                        <div style={{ marginTop: '5px' }}>
                          <p style={{ fontWeight: 600, marginBottom: '5px' }}>提交答案：</p>
                          <div className={styles['select-answer-wrap']}>{item.select_answer}</div>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <p style={{ fontWeight: 600, marginBottom: '5px' }}>参考答案：</p>
                          <p>{item.question_answer}</p>
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

  function calculateScore(workLists: workItemType[], projectType: number) {
    return workLists
      .filter((item) => item.type === projectType)
      .reduce((preVal: number, item) => {
        return preVal + Number(item.get_score);
      }, 0);
  }
};

export default CorrectWork;
