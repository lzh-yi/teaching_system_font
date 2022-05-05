import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import tableStyles from '@/assets/styles/table.less';
import { columnConfig } from './constant';
import { Button, Col, Modal, Row, Table, Input, Space, Select } from 'antd';
import UploadSchedule from '@/pages/schedule/components/UploadSchedule';
import { useAccess, Access } from 'umi';
import { PlusCircleOutlined } from '@ant-design/icons';
import * as teachingSchedule from '@/api/service/teachingSchedule';

const { Search } = Input;
const { Option } = Select;

const Schedule: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({
    page: 1,
    pageSize: 20,
    title: '',
    id: -1,
  });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<{}>({});
  const [tableDataVal, setTableDataVal] = useState<any[]>([]);
  const [updateVisible, setUpdateVisible] = useState<boolean>(false);

  const access = useAccess();
  let colConfig = [].concat(columnConfig, [
    {
      title: '操作',
      align: 'center',
      width: 150,
      dataIndex: 'id',
      render(value: number, record: any) {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() =>
                (window.location.href = `http://localhost:8889/api/file/download?file_path=${record.filePath}&file_name=${record.fileName}`)
              }
            >
              下载
            </Button>
            {/* 学生端不能下载，只能在线查看 */}
            {/* {access.canUser && (
              <Button style={{ backgroundColor: '#66AF77', border: 'none' }} type="primary">
                查看
              </Button>
            )} */}
            {access.canAdmin && (
              <Button
                type="primary"
                onClick={() => updateSchedule(value)}
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
    onChange: (page: any, pageSize: number) => {
      setSearchCondition({
        ...searchCondition,
        page,
        pageSize,
      });
    },
  };

  useEffect(() => {
    getTeachingScheduleList();
  }, [searchCondition]);

  return (
    <PageContainer>
      <Row justify="space-between">
        <Col span={4}>
          <Access accessible={access.canAdmin as any}>
            <Button icon={<PlusCircleOutlined />} type="primary" onClick={() => setVisible(true)}>
              上传进度
            </Button>
          </Access>
        </Col>
        <Col>
          {/* <Search placeholder="请输入教学进度" enterButton /> */}
          <Space>
            <span>教学进度检索：</span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择教学教学进度标题"
              optionFilterProp="children"
              onChange={(value: string) => {
                setSearchCondition({
                  ...searchCondition,
                  title: value,
                  id: -1,
                });
              }}
            >
              {selectData.map((item) => (
                <Option id={item.id} value={item.title}>
                  {item.title}
                </Option>
              ))}
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
        title="上传教学进度"
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <UploadSchedule
          getTeachingScheduleList={getTeachingScheduleList}
          closeUploadModal={() => setVisible(false)}
        />
      </Modal>

      <Modal
        visible={updateVisible}
        maskClosable={false}
        title="更新教学进度"
        onCancel={() => setUpdateVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <UploadSchedule
          isUpdate={true}
          initialValues={initialValues}
          closeUploadModal={() => setUpdateVisible(false)}
          getTeachingScheduleList={getTeachingScheduleList}
        />
      </Modal>
    </PageContainer>
  );

  async function updateSchedule(outLineId?: number) {
    // 获取指定 id 的教学进度
    const res = await teachingSchedule.getTeachingScheduleList({
      ...searchCondition,
      title: '',
      id: outLineId,
    });
    if (res && res.code === 200) {
      setInitialValues(res.data[0]);
    }
    setUpdateVisible(true);
  }

  async function getTeachingScheduleList() {
    const res = await teachingSchedule.getTeachingScheduleList({
      ...searchCondition,
    });
    if (res && res.code === 200) {
      setTableDataVal(res.data);
      setTotalData(res.total);
      // 构造出下拉列表需要的数据
      if (selectData.length !== 0) return;
      let outlineTitle: string[] = [];
      let result: { id: number; title: string }[] = [];
      res.data.forEach((item: any, index: number) => {
        if (index === 0) {
          outlineTitle.push(item.title);
          return result.push({
            id: item.id,
            title: item.title,
          });
        }
        if (!outlineTitle.includes(item.title)) {
          outlineTitle.push(item.title);
          result.push({
            id: item.id,
            title: item.title,
          });
        }
      });
      setSelectData(result);
    }
  }
};

export default Schedule;
