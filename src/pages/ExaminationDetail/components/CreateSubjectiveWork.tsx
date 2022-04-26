import { Button, Col, InputNumber, message, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import Editor from 'for-editor';
import { noop } from '@/utils/common';

const { Option } = Select;

const CreateSubjectiveWork: React.FC = (props: any) => {
  const [questionsStems, setQuestionsStems] = useState<any>('');
  const [questionAnswer, setQuestionAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(5);
  const [knowledgePoint, setKnowledgePoint] = useState<string>('');
  const [projectType, setProjectType] = useState<number>(1);

  const { closeModal = noop } = props;

  return (
    <div className={styles['edit-work-wrap']}>
      <Row>
        <Col span={24}>
          <Space align="center">
            <p className={styles['title']}>主观题</p>
            <p className={styles['tips']}>(主观题，未作答的情况下自动评为零分)</p>
          </Space>
        </Col>
      </Row>
      {/* 题干 */}
      <div style={{ paddingLeft: '25px' }}>
        <p>
          <span style={{ color: 'red' }}>*</span>&nbsp;题干：
        </p>
        <Row>
          <Col span={24}>
            <Editor
              height="250px"
              value={questionsStems}
              onChange={(value: any) => {
                setQuestionsStems(value);
              }}
            />
          </Col>
        </Row>
      </div>
      {/* 参考答案 */}
      <div style={{ paddingLeft: '25px' }}>
        <p>
          <span style={{ color: 'red' }}>*</span>&nbsp;参考答案：
        </p>
        <Row>
          <Col span={24}>
            <Editor
              height="250px"
              value={questionAnswer}
              onChange={(value: any) => {
                setQuestionAnswer(value);
              }}
            />
          </Col>
        </Row>
      </div>
      {/* 分值 */}
      <div style={{ paddingLeft: '25px', marginTop: '20px' }}>
        <Space align="center">
          <span>分值：</span>
          <InputNumber
            min={5}
            max={10}
            defaultValue={5}
            onChange={(value: number) => setScore(value)}
          />
          <span>分</span>
        </Space>
      </div>
      {/* 知识点 */}
      <div style={{ paddingLeft: '25px', marginTop: '20px' }}>
        <Space align="center">
          <span>知识点：</span>
          <Select style={{ width: 150 }} onChange={(value: string) => setKnowledgePoint(value)}>
            <Option value="1.1">知识点1</Option>
            <Option value="1.2">知识点2</Option>
            <Option value="1.3">知识点3</Option>
          </Select>
        </Space>
      </div>
      <Row>
        <Col span={4} push={20}>
          <Space>
            <Button type="primary" onClick={saveProject}>
              保存
            </Button>
            <Button onClick={closeModal}>取消</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );

  /** 保存创建的习题 */
  function saveProject() {
    // 完整度校验
    if (!questionsStems) return message.info('请输入完整的题干');
    if (!score) return message.info('请完善分数');
    if (!knowledgePoint) return message.info('请完善知识点');
    if (!questionAnswer) return message.info('请完善参考答案');
    const obj = {
      questionsStems,
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
      score: '',
      knowledgePoint,
      projectType,
    };
    console.log(obj);
  }
};

export default CreateSubjectiveWork;
