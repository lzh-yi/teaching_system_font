import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import tableStyles from '@/assets/styles/table.less';
import { Button, Modal, Table } from 'antd';
import { workColumnConfig, tableDataVal, workDetailColumnConfig, tableDataVal1 } from './constant';
import styles from './index.less';

const WorkManagement: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  let colConfig = [].concat(workColumnConfig, [
    {
      title: '详情',
      align: 'center',
      width: 100,
      dataIndex: 'id',
      render(value: number) {
        return (
          <Button onClick={() => setIsModalVisible(true)} type="link" style={{ color: '#43BCFF' }}>
            查看详情
          </Button>
        );
      },
    },
  ]);

  return (
    <PageContainer>
      <h3>习题完成情况</h3>
      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 1500 }}
          // className={tableStyles['log-tab']}
          columns={colConfig as any}
          dataSource={tableDataVal}
          pagination={pagination as any}
          loading={tableLoading}
        />
      </div>
      <Modal
        title="习题完成详情"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        maskClosable={false}
        footer={null}
        width={850}
      >
        <div className={(tableStyles['table-wrap'], styles['modal-table'])}>
          <Table
            // className={tableStyles['log-tab']}
            columns={workDetailColumnConfig as any}
            dataSource={tableDataVal1}
            pagination={pagination as any}
            loading={tableLoading}
            scroll={{ y: 240 }}
          />
        </div>
      </Modal>
    </PageContainer>
  );
};

export default WorkManagement;
