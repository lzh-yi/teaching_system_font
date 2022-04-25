import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Row, Table, Modal, Space, Input } from 'antd';
import tableStyles from '@/assets/styles/table.less';
import { columnConfig, tableDataVal } from './constant';
import UploadSyllabus from '@/pages/syllabus/components/UploadSyllabus';

const { Search } = Input;

const Syllabus: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  let colConfig = [].concat(columnConfig, [
    {
      title: '操作',
      align: 'center',
      width: 150,
      dataIndex: 'id',
      render(text: string) {
        return (
          <Space>
            <Button type="primary">下载</Button>
            <Button
              type="primary"
              onClick={updateOutLin}
              style={{ backgroundColor: '#66AF77', border: 'none' }}
            >
              更新
            </Button>
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
    <PageContainer>
      <Row>
        <Col span={12}>
          <Button type="primary" onClick={() => setVisible(true)}>
            上传大纲
          </Button>
        </Col>
        <Col span={6} push={6}>
          <Search placeholder="请输入教学大纲" enterButton />
        </Col>
      </Row>

      <div className={tableStyles['table-wrap']}>
        <Table
          scroll={{ x: 900 }}
          // className={tableStyles['log-tab']}
          columns={colConfig as any}
          dataSource={tableDataVal}
          pagination={pagination as any}
          loading={tableLoading}
        />
      </div>

      <Modal
        visible={visible}
        maskClosable={false}
        title="上传教学大纲"
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UploadSyllabus closeUploadModal={() => setVisible(false)} />
      </Modal>
    </PageContainer>
  );

  function updateOutLin(outLineId?: number) {
    setVisible(true);
  }
};

export default Syllabus;
