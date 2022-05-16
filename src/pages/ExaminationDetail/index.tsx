import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Tabs } from 'antd';
import styles from './index.less';
import { useLocation } from 'umi';
import GroupWorkList from '@/pages/ExaminationDetail/components/ExaminationWorkList';
import WorkCompleteList from '@/pages/ExaminationDetail/components/ExaminationCompleteList';

const { TabPane } = Tabs;

const GroupWorkDetail: React.FC = () => {
  // 标记当前习题组是否是未发布状态
  const workGroupStatus = useLocation().query?.work_status;
  const workId = useLocation().query?.work_id;
  const outlineId = useLocation().query?.outline_id;

  return (
    <PageContainer>
      <div className={styles['top-wrap']}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
              <TabPane tab="题目列表" key="1">
                <GroupWorkList
                  workGroupStatus={workGroupStatus}
                  workId={workId}
                  outlineId={outlineId}
                />
              </TabPane>
              {Number(workGroupStatus) !== 0 && (
                <TabPane tab="完成情况" key="2">
                  <WorkCompleteList workId={workId} />
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

export default GroupWorkDetail;
