import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import tableStyles from '@/assets/styles/table.less';
import { Button, Col, Modal, Row, Select, Space, Table } from 'antd';
import { workColumnConfig, workDetailColumnConfig } from './constant';
import styles from './index.less';
import './index.less';
import * as echarts from 'echarts';
import { scoreManagement, teachingOutline } from '@/api/service';

const WorkManagement: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [tableLoading1, setTableLoading1] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [rateOption, setRateOption] = useState<{}>({});
  const [averageOption, setAverageOption] = useState<{}>({});
  const [tableDataVal, setTableDataVal] = useState<[]>([]);
  const [tableDataVal1, setTableDataVal1] = useState<[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectData, setSelectData] = useState<any[]>([]);
  const [teachingOutlineId, setTeachingOutlineId] = useState<number>(-1);

  useEffect(() => {
    getTeachingOutlineList();
  }, []);

  useEffect(() => {
    getScoreDetail();
  }, [teachingOutlineId]);

  useEffect(() => {
    const chartDom: HTMLElement | null = document.getElementById('chart-work-rate-result');
    const myChart = echarts.init(chartDom as HTMLElement);
    rateOption && myChart.setOption(rateOption, true);
  }, [rateOption]);

  useEffect(() => {
    const chartDom: HTMLElement | null = document.getElementById('chart-work-average-result');
    const myChart = echarts.init(chartDom as HTMLElement);
    averageOption && myChart.setOption(averageOption, true);
  }, [averageOption]);

  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    current: searchCondition?.page,
    pageSize: searchCondition?.pageSize,
    total: totalData,
    showTotal: (total: number) => `???${total}?????????`,
    onChange: (page: any, size: number) => {
      // setSearchCondition({
      //   page,
      //   page_size: size
      // })
    },
  };

  let colConfig = [].concat(workColumnConfig, [
    {
      title: '??????',
      align: 'center',
      width: 100,
      dataIndex: 'id',
      render(value: number, record: any) {
        return (
          <Button
            onClick={() => {
              setSelectedTitle(record.name);
              setIsModalVisible(true);
              getScoreByWorkId(value);
            }}
            type="link"
            style={{ color: '#43BCFF' }}
          >
            ????????????
          </Button>
        );
      },
    },
  ]);

  return (
    <PageContainer>
      <Row justify="end" style={{ marginBottom: '15px' }}>
        <Col span={9}>
          <Space>
            <span>?????????????????????</span>
            <Select
              showSearch
              style={{ width: 250 }}
              placeholder="?????????????????????"
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
      <h3>??????????????????</h3>
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
      <h3 style={{ marginTop: '20px' }}>??????????????????</h3>
      <hr />
      <Row>
        <Col span={12}>
          <div id="chart-work-rate-result"></div>
        </Col>
        <Col span={12}>
          <div id="chart-work-average-result"></div>
        </Col>
      </Row>
      <Modal
        title="??????????????????"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        maskClosable={false}
        footer={null}
        width={850}
      >
        <p style={{ fontWeight: 'bold' }}>{selectedTitle}</p>
        <div className={(tableStyles['table-wrap'], styles['modal-table'])}>
          <Table
            // className={tableStyles['log-tab']}
            columns={workDetailColumnConfig as any}
            dataSource={tableDataVal1}
            pagination={pagination as any}
            loading={tableLoading1}
            scroll={{ y: 240 }}
          />
        </div>
      </Modal>
    </PageContainer>
  );

  async function getScoreDetail() {
    setTableLoading(true);
    setTableLoading;
    const res = await scoreManagement.scoreDetail({
      type: '0',
      teachingOutlineId,
    });
    if (res && res.code === 200) {
      setTableLoading(false);
      setTableDataVal(res.data);
      console.log(res.data);
      const nameLists: string[] = [];
      const submitRateLists: number[] = [];
      const lowestScoreLists: number[] = [];
      const highestScoreLists: number[] = [];
      const averageScoreLists: number[] = [];
      for (const value of res.data) {
        nameLists.push(value.name);
        submitRateLists.push(value.submitRate);
        lowestScoreLists.push(value.lowestScore);
        highestScoreLists.push(value.highestScore);
        averageScoreLists.push(value.averageScore);
      }
      setRateOption({
        title: {
          text: '????????????????????????',
          subtext: '??????????????????????????????',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          //   left: '3%',
          //   right: '4%',
          top: 80,
          //   bottom: '3%',
          //   containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: nameLists,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: 0,
              rotate: -30, //???????????????
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '?????????(%)',
            axisLine: {
              show: true,
              lineStyle: {
                // color: '#CCCED0',
              },
            },
          },
        ],
        series: [
          {
            name: '?????????',
            type: 'bar',
            barWidth: '60%',
            data: submitRateLists,
          },
        ],
      });

      setAverageOption({
        title: {
          text: '???????????????',
          subtext: '???????????????????????????',
        },
        legend: {
          data: ['?????????', '?????????', '?????????'],
          left: '38%',
        },
        grid: {
          left: '3%',
          right: '4%',
          top: 80,
          bottom: '3%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: nameLists,
          // ????????????
          // axisLabel: {
          //   interval: 0,
          //   formatter: function (value) {
          //     return value.split('').join('\n');
          //   },
          // },
          axisLabel: {
            interval: 0,
            rotate: -30, //???????????????
          },
        },
        yAxis: {
          type: 'value',
          name: '?????????',
          axisLine: {
            show: true,
            lineStyle: {
              // color: '#CCCED0',
            },
          },
        },
        series: [
          {
            name: '?????????',
            data: highestScoreLists,
            type: 'line',
          },
          {
            name: '?????????',
            data: averageScoreLists,
            type: 'line',
          },
          {
            name: '?????????',
            data: lowestScoreLists,
            type: 'line',
          },
        ],
      });
    }
  }

  async function getScoreByWorkId(workId: number) {
    setTableLoading1(true);
    const res = await scoreManagement.scoreDetailByWorkId({
      type: '0',
      workId,
    });
    if (res && res.code === 200) {
      setTableLoading1(false);
      setTableDataVal1(res.data);
    }
  }

  async function getTeachingOutlineList() {
    const res = await teachingOutline.getTeachingOutlineList({
      page: 1,
      pageSize: 1000,
      id: -1,
    });
    if (res && res.code === 200) {
      // ????????????????????????????????????
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

export default WorkManagement;
