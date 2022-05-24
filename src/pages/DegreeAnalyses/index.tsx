import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row, Select, Space, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import tableStyles from '@/assets/styles/table.less';
import { teachingOutline, degreeAnalyses } from '@/api/service';
import { isNaN, isNumber } from 'lodash';

const DegreeAnalyses: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<any[]>([]);
  const [teachingOutlineId, setTeachingOutlineId] = useState<number>(-1);
  const [tableDataVal, setTableDataVal] = useState<any[]>([]);
  const [columnConfig, setColumnConfig] = useState<any[]>([]);

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
    getTeachingOutlineList();
  }, []);

  useEffect(() => {
    getDetail();
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
                // searchGroupWorkByName(groupWorkName, value);
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
          scroll={{ x: 900 }}
          // className={tableStyles['log-tab']}
          columns={columnConfig as any}
          dataSource={tableDataVal}
          pagination={pagination as any}
          loading={tableLoading}
        />
      </div>
    </PageContainer>
  );

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

  async function getDetail() {
    if (teachingOutlineId === -1) return;
    const res = await degreeAnalyses.degreeAnalyses({
      teachingOutlineId,
    });
    if (res && res.code === 200) {
      // 生成列配置
      const columns: any[] = [];
      const tableDataConfig: {} = {};
      if (res.data.length !== 0) {
        for (const value of res.data) {
          columns.push({
            title: value.title,
            align: 'center',
            width: 100,
            dataIndex: `degree${value.teachingGoalId}`,
          });
          if (isNumber(value?.rate)) {
            tableDataConfig[`degree${value.teachingGoalId}`] = value.rate.toFixed(2);
          } else {
            tableDataConfig[`degree${value.teachingGoalId}`] = 0;
          }
        }
        setColumnConfig(columns);
        setTableDataVal([
          {
            ...tableDataConfig,
          },
        ]);
      }
    }
  }
};

export default DegreeAnalyses;
