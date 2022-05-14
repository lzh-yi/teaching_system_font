import { Button, Col, Empty, Input, Row, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import dayjs from 'dayjs';

const { Search } = Input;

const WorkTabPane: React.FC = (props: any) => {
  const { workTabArr = [] } = props;

  const bgColor = {
    '0': {
      color: '#0253D9',
      label: '进行中',
    },
    '1': {
      color: '#65AF76',
      label: '已提交',
    },
  };

  if (Array.isArray(workTabArr) && workTabArr.length > 0) {
    const workList = workTabArr.map((item) => {
      return (
        <div key={item?.workstatistics?.id} className={styles['item-wrap']}>
          <Row>
            <Col
              span={18}
              onClick={() => {
                if (item?.workstatistics?.submitStatus === '1')
                  history.push(
                    `/student/group_work/detail?work_status=${item?.workstatistics?.submitStatus}&work_group=${item?.workGroup?.id}&work_statistics=${item?.workstatistics?.id}`,
                  );
                if (item?.workstatistics?.submitStatus === '0')
                  history.push(
                    `/student/group_work/doing?work_status=${item?.workstatistics?.submitStatus}&work_group=${item?.workGroup?.id}&work_statistics=${item?.workstatistics?.id}`,
                  );
              }}
            >
              <div className={styles['status-name']}>
                <div>
                  <Space>
                    <Button
                      shape="round"
                      size="small"
                      style={{
                        backgroundColor: bgColor[item?.workstatistics?.submitStatus]?.color,
                        color: 'white',
                      }}
                    >
                      {bgColor[item?.workstatistics?.submitStatus]?.label}
                    </Button>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                      {item?.workGroup?.name}
                    </span>
                  </Space>
                </div>
                <div>
                  <Space align="center">
                    {/* <p style={{ fontSize: '13px' }}>{item.author}</p> */}
                    <p style={{ color: '#BBBBBB' }}>
                      <span>
                        发布时间 {dayjs(item?.workGroup?.publishTime).format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        截止时间{' '}
                        {dayjs(item?.workGroup?.deadlineTime).format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </p>
                  </Space>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      );
    });
    return (
      <div>
        {/* <Row style={{ marginBottom: '15px' }}>
          <Col push={18} span={6}>
            <Search placeholder="请输入习题分组名称" enterButton />
          </Col>
        </Row> */}
        <Space direction="vertical" size={15} style={{ width: '100%', paddingBottom: '20px' }}>
          {workList}
        </Space>
      </div>
    );
  }

  return <Empty />;
};

export default WorkTabPane;
