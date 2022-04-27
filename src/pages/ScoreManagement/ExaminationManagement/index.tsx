import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import tableStyles from '@/assets/styles/table.less';
import { Button, Col, Modal, Row, Table } from 'antd';
import { workColumnConfig, tableDataVal, workDetailColumnConfig, tableDataVal1 } from './constant';
import styles from './index.less';
import './index.less';
import * as echarts from 'echarts';

const ExaminationManagement: React.FC = () => {
  const [searchCondition, setSearchCondition] = useState({ page: 1, pageSize: 20 });
  const [totalData, setTotalData] = useState<number>(0);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [rateOption, setRateOption] = useState<{}>({});
  const [averageOption, setAverageOption] = useState<{}>({});

  useEffect(() => {
    setRateOption({
      title: {
        text: '考试提交率统计表',
        subtext: '记录每场考试的提交率',
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
          data: ['期末考试一', '期末考试二', '期末考试三', '期末考试四'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            rotate: -30, //倾斜的程度
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '提交率(%)',
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
          name: '提交率',
          type: 'bar',
          barWidth: '60%',
          data: [90, 89, 76, 92],
        },
      ],
    });

    setAverageOption({
      title: {
        text: '成绩统计表',
        subtext: '记录每场考试的成绩',
      },
      legend: {
        data: ['最高分', '平均分', '最低分'],
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
        data: ['期末考试一', '期末考试二', '期末考试三', '期末考试四'],
        // 垂直显示
        // axisLabel: {
        //   interval: 0,
        //   formatter: function (value) {
        //     return value.split('').join('\n');
        //   },
        // },
        axisLabel: {
          interval: 0,
          rotate: -30, //倾斜的程度
        },
      },
      yAxis: {
        type: 'value',
        name: '平均分',
        axisLine: {
          show: true,
          lineStyle: {
            // color: '#CCCED0',
          },
        },
      },
      series: [
        {
          name: '最高分',
          data: [97, 94, 90, 98],
          type: 'line',
        },
        {
          name: '平均分',
          data: [88, 80, 82, 91],
          type: 'line',
        },
        {
          name: '最低分',
          data: [70, 67, 58, 7],
          type: 'line',
        },
      ],
    });
  }, []);

  useEffect(() => {
    const chartDom: HTMLElement | null = document.getElementById('chart-examination-rate-result');
    const myChart = echarts.init(chartDom as HTMLElement);
    rateOption && myChart.setOption(rateOption, true);
  }, [rateOption]);

  useEffect(() => {
    const chartDom: HTMLElement | null = document.getElementById(
      'chart-examination-average-result',
    );
    const myChart = echarts.init(chartDom as HTMLElement);
    averageOption && myChart.setOption(averageOption, true);
  }, [averageOption]);

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
      <h3>考试完成情况</h3>
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
      <h3 style={{ marginTop: '20px' }}>考试完成详情</h3>
      <hr />
      <Row>
        <Col span={12}>
          <div id="chart-examination-rate-result"></div>
        </Col>
        <Col span={12}>
          <div id="chart-examination-average-result"></div>
        </Col>
      </Row>
      <Modal
        title="考试完成详情"
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

export default ExaminationManagement;
