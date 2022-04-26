import { Button, Space, Table } from 'antd';
import React, { useState } from 'react';
import { workCompleteCol, tableDataVal, workCompleteColType } from './constant';
import { history } from 'umi';
import tableStyles from '@/assets/styles/table.less';

const ExaminationCompleteList: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  let colConfig = [].concat(workCompleteCol, [
    {
      title: '操作',
      align: 'center',
      width: 150,
      dataIndex: 'is_correct',
      render(text: boolean, record: workCompleteColType) {
        return (
          <Space>
            {record.work_status === 1 && !text && (
              <Button type="primary" onClick={handleCorrectWork}>
                批改
              </Button>
            )}
            {record.work_status === 1 && text && (
              <Button
                onClick={handleReviewWork}
                type="primary"
                style={{ backgroundColor: '#66AF77', border: 'none' }}
              >
                查看
              </Button>
            )}
          </Space>
        );
      },
    },
  ]);

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
  return (
    <div>
      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 1000 }}
          // className={tableStyles['log-tab']}
          columns={colConfig as any}
          dataSource={tableDataVal}
          pagination={pagination as any}
          loading={tableLoading}
        />
      </div>
    </div>
  );

  // 批改考试
  function handleCorrectWork() {
    history.push('/examination/correct');
  }
  function handleReviewWork() {
    history.push('/examination/review');
  }
};

export default ExaminationCompleteList;
