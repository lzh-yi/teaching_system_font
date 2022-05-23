import { PageContainer } from '@ant-design/pro-layout';
import { Table, Divider, Row, Col, Select, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import tableStyles from '@/assets/styles/table.less';
import { workColumnConfig, examColumnConfig, endColumnConfig } from './constant';
import {
  workStatistics as workStatisticsUtils,
  scoreManagement,
  teachingOutline,
  examination as examinationUtils,
  GroupWork as GroupWorkUtils,
} from '@/api/service';
import { getGlobalUser } from '../../../constant/index';

const ScoreManage: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [totalData1, setTotalData1] = useState<number>(0);
  const [totalData2, setTotalData2] = useState<number>(0);
  const [tableDataVal, setTableDataVal] = useState<any[]>([]);
  const [tableDataVal1, setTableDataVal1] = useState<any[]>([]);
  const [tableDataVal3, setTableDataVal3] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any[]>([]);
  const [teachingOutlineId, setTeachingOutlineId] = useState<number>(-1);

  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    current: searchCondition?.page,
    pageSize: searchCondition?.pageSize,
    total: totalData,
    showTotal: (total: number) => `共${total}条记录`,
    onChange: (page: any, size: number) => {
      // setSearchCondition({
      //   page,
      //   page_size: size
      // })
    },
  };
  const pagination1 = {
    showSizeChanger: true,
    showQuickJumper: true,
    current: searchCondition?.page,
    pageSize: searchCondition?.pageSize,
    total: totalData1,
    showTotal: (total: number) => `共${total}条记录`,
    onChange: (page: any, size: number) => {
      // setSearchCondition({
      //   page,
      //   page_size: size
      // })
    },
  };
  const pagination2 = {
    showSizeChanger: true,
    showQuickJumper: true,
    current: searchCondition?.page,
    pageSize: searchCondition?.pageSize,
    total: totalData2,
    showTotal: (total: number) => `共${total}条记录`,
    onChange: (page: any, size: number) => {
      // setSearchCondition({
      //   page,
      //   page_size: size
      // })
    },
  };

  useEffect(() => {
    getTeachingOutlineList();
  }, []);

  useEffect(() => {
    getScore();
  }, [teachingOutlineId]);

  return (
    <PageContainer>
      <Row justify="end" style={{ marginBottom: '15px' }}>
        <Col span={9}>
          <Space>
            <span>教学大纲检索：</span>
            <Select
              showSearch
              style={{ width: 250 }}
              placeholder="请选择教学大纲"
              optionFilterProp="children"
              onChange={(value: number) => {
                setTeachingOutlineId(value);
              }}
            >
              {selectData.map((item) => (
                <Select.Option id={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Col>
      </Row>
      <h3>习题成绩</h3>
      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 800 }}
          // className={tableStyles['log-tab']}
          columns={workColumnConfig as any}
          dataSource={tableDataVal}
          pagination={pagination as any}
        />
      </div>
      <Divider />
      <h3>考试成绩</h3>
      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 800 }}
          // className={tableStyles['log-tab']}
          columns={examColumnConfig as any}
          dataSource={tableDataVal1}
          pagination={pagination1 as any}
        />
      </div>
      <Divider />
      <h3>最终成绩</h3>
      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 800 }}
          // className={tableStyles['log-tab']}
          columns={endColumnConfig as any}
          dataSource={tableDataVal3}
          pagination={pagination2 as any}
        />
      </div>
    </PageContainer>
  );

  async function getTeachingOutlineList() {
    const res = await teachingOutline.getTeachingOutlineList({
      page: 1,
      pageSize: 1000,
      id: -1,
    });
    if (res && res.code === 200) {
      // 构造出下拉列表需要的数据
      if (selectData.length !== 0) return;
      const result: { id: number; title: string }[] = res.data.map((item: any) => {
        return {
          id: item.id,
          title: `${item.title}(${item.version})`,
        };
      });
      setSelectData(result);
    }
  }

  async function getScore() {
    let res = await workStatisticsUtils.completeList({
      category: '0',
      userId: getGlobalUser().id,
    });
    if (res && res.code === 200) {
      res.data = res.data.filter((item) => item.submitStatus === '1');
      setTableDataVal((await handleFilterWorkScore(res.data)) as any);
    }
    res = await workStatisticsUtils.completeList({
      category: '1',
      userId: getGlobalUser().id,
    });
    if (res && res.code === 200) {
      res.data = res.data.filter((item) => item.submitStatus === '1');
      setTableDataVal1((await handleFilterExamScore(res.data)) as any);
    }
    res = await scoreManagement.finalScoreList({ teachingOutlineId });
    if (res && res.code === 200) {
      res.data = res.data.filter((item) => item.id === getGlobalUser().id);
      setTableDataVal3(res.data);
    }
  }

  async function handleFilterWorkScore(workList: any[]) {
    const result: any[] = [];
    const res = await GroupWorkUtils.groupWorkList({
      teachingOutlineId,
    });
    let ids: number[] = [];
    if (res && res.code === 200) {
      for (const value of res.data) {
        ids.push(value.id);
      }
    }
    for (const value of workList) {
      if (ids.includes(value.workId)) result.push(value);
    }
    console.log('lzh.........', result);
    return result;
  }
  async function handleFilterExamScore(workList: any[]) {
    const result: any[] = [];
    const res = await examinationUtils.groupWorkList({
      teachingOutlineId,
    });
    let ids: number[] = [];
    if (res && res.code === 200) {
      for (const value of res.data) {
        ids.push(value.id);
      }
    }
    for (const value of workList) {
      if (ids.includes(value.workId)) result.push(value);
    }
    return result;
  }
};

export default ScoreManage;
