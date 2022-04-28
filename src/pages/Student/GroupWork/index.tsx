import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Tabs, Select, Row, Col } from 'antd';
import WorkTabPane from '@/pages/Student/GroupWork/components/WorkTabPane';
import styles from './index.less';

const { TabPane } = Tabs;
const { Option } = Select;

type WorkGroupType = {
  id: number;
  status: number;
  name: string;
  start_time: string;
  end_time: string;
  author: string;
};

const GroupWork: React.FC = () => {
  const [workTabArr, setWorkTabArr] = useState<WorkGroupType[]>([]);

  useEffect(() => {
    setWorkTabArr([
      {
        id: 0,
        status: 0,
        name: 'Java对象练习',
        start_time: '2022-04-21',
        end_time: '2022-05-01',
        author: '李志豪',
      },
      {
        id: 1,
        status: 0,
        name: '二叉树练习',
        start_time: '2022-04-21',
        end_time: '2022-05-01',
        author: '李志豪',
      },
      {
        id: 2,
        status: 1,
        name: '算法习题',
        start_time: '2022-04-18',
        end_time: '2022-04-23',
        author: '李志豪',
      },
    ]);
  }, []);

  return (
    <PageContainer>
      <div className={styles['top-wrap']}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
              <TabPane tab="全部" key="1">
                <WorkTabPane workTabArr={workTabArr} />
              </TabPane>
              <TabPane tab="进行中" key="2">
                <WorkTabPane workTabArr={workTabArr} />
              </TabPane>
              <TabPane tab="已提交" key="3">
                <WorkTabPane workTabArr={workTabArr} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );

  function onTabChange() {
    console.log('tab改变');
  }
};

export default GroupWork;
