import dayjs from 'dayjs';
import { UserUtils } from '@/api/service';

let userList: any[] = [];
(async () => {
  const res = (await UserUtils.userList({
    type: 'student',
  })) as any;
  if (res && res.code === 200) {
    userList = res.data;
  }
})();

export const workColumnConfig = [
  // {
  //   title: 'id',
  //   align: 'center',
  //   width: 50,
  //   dataIndex: 'id',
  // },
  {
    title: '习题组',
    align: 'center',
    width: 200,
    dataIndex: 'name',
    render(value: string) {
      return <p style={{ fontWeight: 'bold' }}>{value}</p>;
    },
  },
  {
    title: '发布时间',
    align: 'center',
    width: 150,
    dataIndex: 'publishTime',
    render(value: any) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '截止时间',
    align: 'center',
    width: 150,
    dataIndex: 'deadlineTime',
    render(value: any) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '应交份数',
    align: 'center',
    width: 100,
    dataIndex: 'totalNum',
  },
  {
    title: '实交份数',
    align: 'center',
    width: 100,
    dataIndex: 'realityNum',
  },
  {
    title: '提交率',
    align: 'center',
    width: 100,
    dataIndex: 'submitRate',
    render(value: number) {
      return <p style={{ color: '#65AF76' }}>{`${value * 100}%`}</p>;
    },
  },
  {
    title: '最低分',
    align: 'center',
    width: 100,
    dataIndex: 'lowestScore',
  },
  {
    title: '最高分',
    align: 'center',
    width: 100,
    dataIndex: 'highestScore',
  },
  {
    title: '平均分',
    align: 'center',
    width: 100,
    dataIndex: 'averageScore',
  },
  {
    title: '占比',
    align: 'center',
    width: 100,
    dataIndex: 'proportion',
  },
];

export const workDetailColumnConfig = [
  // {
  //   title: 'id',
  //   align: 'center',
  //   width: 50,
  //   dataIndex: 'id',
  // },
  {
    title: '学生姓名',
    align: 'center',
    width: 100,
    dataIndex: 'userId',
    render(userId: number) {
      return getUserName(userId);
    },
  },
  {
    title: '提交时间',
    align: 'center',
    width: 100,
    dataIndex: 'submitTime',
    render(value: string) {
      if (!value) return <p style={{ color: 'red' }}>未提交</p>;
      return <p>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</p>;
    },
  },
  {
    title: '批改状态',
    align: 'center',
    width: 100,
    dataIndex: 'correctStatus',
    render(value: string) {
      if (value === '0') return <p style={{ color: 'red' }}>未批改</p>;
      return <p style={{ color: '#65AD77' }}>已批改</p>;
    },
  },
  {
    title: '分数',
    align: 'center',
    width: 100,
    dataIndex: 'score',
  },
];

function getUserName(userId: number) {
  for (const value of userList) {
    if (userId === value.id) return value.userName;
  }
}
