import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import tableStyles from '@/assets/styles/table.less';
import { columnConfig } from './constant';
import { Table } from 'antd';
import { scoreManagement } from '@/api/service';

const EndScoreManagement: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [tableDataVal, setTableDataVal] = useState<boolean>(false);

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

  useEffect(() => {
    getFinalScoreList();
  }, []);

  return (
    <PageContainer>
      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 800 }}
          // className={tableStyles['log-tab']}
          columns={columnConfig as any}
          dataSource={tableDataVal}
          pagination={pagination as any}
          loading={tableLoading}
        />
      </div>
    </PageContainer>
  );

  async function getFinalScoreList() {
    setTableLoading(true);
    const res = await scoreManagement.finalScoreList();
    if (res && res.code === 200) {
      setTableDataVal(res.data);
      setTableLoading(false);
    }
  }
};

export default EndScoreManagement;
