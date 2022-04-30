import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Row, Table, Modal, Space, Input, Select } from 'antd';
import tableStyles from '@/assets/styles/table.less';
import { columnConfig, tableDataVal } from './constant';
import UploadSyllabus from '@/pages/syllabus/components/UploadSyllabus';
import { useAccess, Access } from 'umi';
import { PlusCircleOutlined } from '@ant-design/icons';
import { teachingOutline } from '@/api/service';

const { Search } = Input;
const { Option } = Select;

const Syllabus: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const access = useAccess();
  let colConfig = [].concat(columnConfig, [
    {
      title: '操作',
      align: 'center',
      width: 150,
      dataIndex: 'id',
      render(text: string) {
        return (
          <Space>
            {access.canAdmin && <Button type="primary">下载</Button>}
            {/* 学生端不能下载，只能在线查看 */}
            {access.canUser && (
              <Button style={{ backgroundColor: '#66AF77', border: 'none' }} type="primary">
                查看
              </Button>
            )}
            {access.canAdmin && (
              <Button
                type="primary"
                onClick={updateOutLin}
                style={{ backgroundColor: '#66AF77', border: 'none' }}
              >
                更新
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

  // useEffect(async () => {
  //   const res = await teachingOutline.getTeachingOutlineList();
  //   console.log('res..............', res);
  // }, []);

  return (
    <PageContainer>
      <Row justify="space-between">
        <Col span={4}>
          <Access accessible={access.canAdmin as any}>
            <Button icon={<PlusCircleOutlined />} type="primary" onClick={() => setVisible(true)}>
              上传大纲
            </Button>
          </Access>
        </Col>
        <Col>
          {/* <Search placeholder="请输入教学大纲" enterButton /> */}
          <Space>
            <span>大纲检索：</span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择教学大纲"
              optionFilterProp="children"
            >
              <Option value={1}>教学大纲一</Option>
              <Option value={2}>教学大纲二</Option>
              <Option value={3}>教学大纲三</Option>
              <Option value={4}>教学大纲四</Option>
              <Option value={5}>教学大纲五</Option>
              <Option value={6}>教学大纲六</Option>
            </Select>
          </Space>
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
        title="上传/更新教学大纲"
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
