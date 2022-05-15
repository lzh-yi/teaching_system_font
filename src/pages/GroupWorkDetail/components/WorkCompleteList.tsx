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
      dataIndex: 'correctStatus',
      render(value: string, record: any) {
        return (
          <Space>
            {record.submitStatus === '1' && (
              <Button type="primary" onClick={() => handleCorrectWork(record)}>
                批改
              </Button>
            )}
            {Number(value) === 1 && (
              <Button
                onClick={() => handleReviewWork(record)}
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
          scroll={{ x: 900 }}
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
  function handleCorrectWork(record: any) {
    history.push(
      `/group_work/correct?work_id=${record.workId}&statics_id=${record.id}&user_id=${record.userId}`,
    );
  }
  function handleReviewWork(record: any) {
    history.push(
      `/group_work/review?work_id=${record.workId}&statics_id=${record.id}&user_id=${record.userId}`,
    );
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
