import { PageContainer } from '@ant-design/pro-layout';
import { Table, Divider } from 'antd';
import React, { useState } from 'react';
import tableStyles from '@/assets/styles/table.less';
import {
  workColumnConfig,
  tableDataVal,
  examColumnConfig,
  tableDataVal1,
  endColumnConfig,
  tableDataVal2,
} from './constant';

const ScoreManage: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [totalData1, setTotalData1] = useState<number>(0);
  const [totalData2, setTotalData2] = useState<number>(0);

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

  return (
    <PageContainer>
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
          dataSource={tableDataVal2}
          pagination={pagination2 as any}
        />
      </div>
    </PageContainer>
  );
};

export default ScoreManage;
