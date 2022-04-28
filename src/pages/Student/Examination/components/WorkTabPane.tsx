import React, { useState } from 'react';
import { Button, Col, Empty, Input, Row, Space } from 'antd';
import { history } from 'umi';
import styles from './index.less';

const { Search } = Input;

const WorkTabPane: React.FC = (props: any) => {
  const { workTabArr } = props;

  const bgColor = {
    '0': {
      color: '#C6CED6',
      label: '未发布',
    },
    '1': {
      color: '#0253D9',
      label: '进行中',
    },
    '2': {
      color: '#E53434',
      label: '已截止',
    },
  };

  if (Array.isArray(workTabArr) && workTabArr.length > 0) {
    const workList = workTabArr.map((item) => {
      return (
        <div key={item.id} className={styles['item-wrap']}>
          <Row>
            <Col
              span={18}
              onClick={() => {
                if (item.status === 2)
                  history.push(`/student/examination/detail?work_status=${item.status}`);
                if (item.status === 1)
                  history.push(`/student/examination/doing?work_status=${item.status}`);
              }}
            >
              <div className={styles['status-name']}>
                <div>
                  <Space>
                    <Button
                      shape="round"
                      size="small"
                      style={{ backgroundColor: bgColor[item.status].color, color: 'white' }}
                    >
                      {bgColor[item.status].label}
                    </Button>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</span>
                  </Space>
                </div>
                <div>
                  <Space align="center">
                    {/* <p style={{ fontSize: '13px' }}>{item.author}</p> */}
                    <p style={{ color: '#BBBBBB' }}>
                      <span>发布时间 2022-04-24 14:50</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>截止时间 2022-04-28 14:50</span>
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
        <Row style={{ marginBottom: '15px' }}>
          <Col push={18} span={6}>
            <Search placeholder="请输入考试名称" enterButton />
          </Col>
        </Row>
        <Space direction="vertical" size={15} style={{ width: '100%', paddingBottom: '20px' }}>
          {workList}
        </Space>
      </div>
    );
  }

  return <Empty />;
};

export default WorkTabPane;
