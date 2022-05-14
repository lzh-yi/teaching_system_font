import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { workCompleteCol } from './constant';
import { history } from 'umi';
import tableStyles from '@/assets/styles/table.less';
import { workStatistics as workStatisticsUtils } from '@/api/service';

const WorkCompleteList: React.FC = (props: any) => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [workstatisticsList, setWorkStatisticsList] = useState<any[]>([]);

  const { workId } = props;

  let colConfig = [].concat(workCompleteCol, [
    {
      title: '操作',
      align: 'center',
      width: 150,
      dataIndex: 'is_correct',
      render(text: boolean, record: any) {
        return (
          <Space>
            <Button type="primary" onClick={handleCorrectWork}>
              批改
            </Button>
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

  useEffect(() => {
    getWorkStatisticsList();
  }, []);

  return (
    <div>
      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 1000 }}
          // className={tableStyles['log-tab']}
          columns={colConfig as any}
          dataSource={workstatisticsList}
          pagination={pagination as any}
          loading={tableLoading}
        />
      </div>
    </div>
  );

  // 批改作业
  function handleCorrectWork() {
    history.push('/group_work/correct');
  }
  function handleReviewWork() {
    history.push('/group_work/review');
  }

  async function getWorkStatisticsList() {
    const res = await workStatisticsUtils.completeList({
      page: 1,
      pageSize: 10000,
      category: '0',
      userId: '-1',
      workId,
    });

    if (res && res.code === 200) {
      console.log(res.data);
      setWorkStatisticsList(res.data);
    }
  }
};

export default WorkCompleteList;
