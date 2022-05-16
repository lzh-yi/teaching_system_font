import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Tabs, Select, Row, Col } from 'antd';
import WorkTabPane from '@/pages/Student/Examination/components/WorkTabPane';
import styles from './index.less';
import { examination as GroupWorkUtils, workStatistics } from '@/api/service';
import { getGlobalUser } from '@/constant';

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
  const [workstatisticsList, setWorkStatisticsList] = useState<any[]>([]);
  const [searchCondition, setSearchCondition] = useState({
    page: 1,
    pageSize: 1000,
    name: '',
    id: -1,
  });

  useEffect(() => {
    getGroupList();
    getWorkStatisticsList();
  }, []);

  return (
    <PageContainer>
      <div className={styles['top-wrap']}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="-1" onChange={onTabChange}>
              <TabPane tab="全部" key="-1">
                <WorkTabPane workTabArr={generateWorkTab()} />
              </TabPane>
              <TabPane tab="进行中" key="0">
                <WorkTabPane workTabArr={generateWorkTab('0')} />
              </TabPane>
              <TabPane tab="已提交" key="1">
                <WorkTabPane workTabArr={generateWorkTab('1')} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );

  function onTabChange() {
    // console.log('tab改变');
  }

  async function getGroupList() {
    const res = await GroupWorkUtils.groupWorkList({
      page: 1,
      pageSize: 10000,
      name: '',
      id: -1,
    });
    if (res && res.code === 200) {
      setWorkTabArr(res.data);
    }
  }

  async function getWorkStatisticsList() {
    const res = await workStatistics.completeList({
      page: 1,
      pageSize: 10000,
      category: '1',
      userId: getGlobalUser().id,
      workId: -1,
    });

    if (res && res.code === 200) {
      setWorkStatisticsList(res.data);
    }
  }

  function generateWorkTab(status?: string) {
    let copyArr = workstatisticsList;
    if (status) {
      copyArr = workstatisticsList?.filter((item) => {
        return item.submitStatus === status;
      });
    }
    return copyArr?.map((item) => {
      // 找到指定的题组
      let workGroup = findWork(item.workId);
      return {
        workGroup,
        workstatistics: item,
      };
    });

    function findWork(workId: number): any {
      let result = null;
      try {
        workTabArr.forEach((item) => {
          if (item.id === workId) {
            result = item;
            throw new Error();
          }
        });
      } catch {
      } finally {
        return result;
      }
    }
  }
};

export default GroupWork;
