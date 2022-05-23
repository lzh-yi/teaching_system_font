import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import tableStyles from '@/assets/styles/table.less';
import { columnConfig } from './constant';
import { Col, Row, Select, Space, Table } from 'antd';
import { scoreManagement, teachingOutline } from '@/api/service';

const EndScoreManagement: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [tableDataVal, setTableDataVal] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<any[]>([]);
  const [teachingOutlineId, setTeachingOutlineId] = useState<number>(-1);

  useEffect(() => {
    getTeachingOutlineList();
  }, []);

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
    const res = await scoreManagement.finalScoreList({
      teachingOutlineId,
    });
    if (res && res.code === 200) {
      setTableDataVal(res.data);
      setTableLoading(false);
    }
  }

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
};

export default EndScoreManagement;
