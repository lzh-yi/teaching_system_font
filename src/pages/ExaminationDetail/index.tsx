import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Tabs } from 'antd';
import styles from './index.less';
import { useLocation } from 'umi';
import ExaminationCompleteList from '@/pages/ExaminationDetail/components/ExaminationCompleteList';
import ExaminationWorkList from '@/pages/ExaminationDetail/components/ExaminationWorkList';

const { TabPane } = Tabs;

const ExaminationDetail: React.FC = () => {
  // 标记当前习题组是否是未发布状态
  const workGroupStatus = useLocation().query?.examination_status;

  return (
    <PageContainer>
      <div className={styles['top-wrap']}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
              <TabPane tab="题目列表" key="1">
                <ExaminationWorkList workGroupStatus={workGroupStatus} />
              </TabPane>
              {Number(workGroupStatus) !== 0 && (
                <TabPane tab="完成情况" key="2">
                  <ExaminationCompleteList />
                </TabPane>
              )}
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

export default ExaminationDetail;
