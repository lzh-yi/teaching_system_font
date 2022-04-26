import { Row, Col, Space, InputNumber, Select, Button, message } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import Editor from 'for-editor';

const { Option } = Select;

const CreateSelectWork: React.FC = (props: any) => {
  const [questionsStems, setQuestionsStems] = useState<any>('');
  const [answerA, setAnswerA] = useState<any>('');
  const [answerB, setAnswerB] = useState<any>('');
  const [answerC, setAnswerC] = useState<any>('');
  const [answerD, setAnswerD] = useState<any>('');
  const [questionAnswer, setQuestionAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(5);
  const [knowledgePoint, setKnowledgePoint] = useState<string>('');
  const [projectType, setProjectType] = useState<number>(0);

  const { closeModal } = props;

  return (
    <div className={styles['edit-work-wrap']}>
      <Row>
        <Col span={24}>
          <Space align="center">
            <p className={styles['title']}>单选题</p>
            <p className={styles['tips']}>(客观题，由系统自动评分，请设置标准答案)</p>
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
      {/* 答案选项 */}
      <div style={{ paddingLeft: '25px', marginTop: '20px' }}>
        <p>
          <span style={{ color: 'red' }}>*</span>&nbsp;答案选项：
        </p>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row>
            <Col span={1.5}>
              <div className={styles['answer-tag']}>A</div>
            </Col>
            <Col span={22}>
              <Editor
                height="200px"
                value={answerA}
                onChange={(value: any) => {
                  setAnswerA(value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={1.5}>
              <div className={styles['answer-tag']}>B</div>
            </Col>
            <Col span={22}>
              <Editor
                height="200px"
                value={answerB}
                onChange={(value: any) => {
                  setAnswerB(value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={1.5}>
              <div className={styles['answer-tag']}>C</div>
            </Col>
            <Col span={22}>
              <Editor
                height="200px"
                value={answerC}
                onChange={(value: any) => {
                  setAnswerC(value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={1.5}>
              <div className={styles['answer-tag']}>D</div>
            </Col>
            <Col span={22}>
              <Editor
                height="200px"
                value={answerD}
                onChange={(value: any) => {
                  setAnswerD(value);
                }}
              />
            </Col>
          </Row>
        </Space>
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
      {/* 参考答案 */}
      <div style={{ paddingLeft: '25px', marginTop: '20px' }}>
        <Space align="center">
          <span>参考答案：</span>
          <Select style={{ width: 150 }} onChange={(value: string) => setQuestionAnswer(value)}>
            <Option value="a">A</Option>
            <Option value="b">B</Option>
            <Option value="c">C</Option>
            <Option value="d">D</Option>
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
    if (!answerA) return message.info('请完善A选项');
    if (!answerB) return message.info('请完善B选项');
    if (!answerC) return message.info('请完善C选项');
    if (!answerD) return message.info('请完善D选项');
    if (!score) return message.info('请完善分数');
    if (!knowledgePoint) return message.info('请完善知识点');
    if (!questionAnswer) return message.info('请完善参考答案');
    const obj = {
      questionsStems,
      answerA,
      answerB,
      answerC,
      answerD,
      score,
      knowledgePoint,
      projectType,
    };
    console.log(obj);
  }
};

export default CreateSelectWork;
