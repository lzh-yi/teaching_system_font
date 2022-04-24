import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Row, Tabs } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import WorkTabPane from '@/pages/GroupWork/components/WorkTabPane';

const { TabPane } = Tabs;

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
        status: 1,
        name: '二叉树练习',
        start_time: '2022-04-21',
        end_time: '2022-05-01',
        author: '李志豪',
      },
      {
        id: 2,
        status: 2,
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
              <TabPane tab="未发布" key="2">
                <WorkTabPane workTabArr={workTabArr} />
              </TabPane>
              <TabPane tab="进行中" key="3">
                <WorkTabPane workTabArr={workTabArr} />
              </TabPane>
              <TabPane tab="已截止" key="4">
                <WorkTabPane workTabArr={workTabArr} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <div className={styles['btn-wrap']}>
          <Button
            icon={<PlusOutlined />}
            style={{ backgroundColor: '#0152D9', border: 'none', color: 'white' }}
          >
            新建分组
          </Button>
        </div>
      </div>
    </PageContainer>
  );

  function onTabChange() {
    console.log('tab改变');
  }
};

export default GroupWork;
