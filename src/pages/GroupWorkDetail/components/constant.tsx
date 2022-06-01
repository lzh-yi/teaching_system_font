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

export const workCompleteCol = [
  // {
  //   title: 'id',
  //   align: 'center',
  //   width: 100,
  //   dataIndex: 'id',
  // },
  {
    title: '姓名',
    align: 'center',
    width: 100,
    dataIndex: 'userId',
    render(userId: number) {
      return getUserName(userId);
    },
  },
  {
    title: '作业状态',
    align: 'center',
    width: 100,
    dataIndex: 'submitStatus',
    render(value: String) {
      if (Number(value) === 0) {
        return <p style={{ color: 'red' }}>未提交</p>;
      }
      if (Number(value) === 1) {
        return <p style={{ color: '#65AD77' }}>已提交</p>;
      }
      return '';
    },
  },
  {
    title: '提交时间',
    align: 'center',
    width: 150,
    dataIndex: 'submitTime',
    render(value: any) {
      if (value) {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      }
      return null;
    },
  },
  {
    title: '批改状态',
    align: 'center',
    width: 150,
    dataIndex: 'correctStatus',
    render(value: string) {
      if (!Number(value)) {
        return <p style={{ color: 'red' }}>未批改</p>;
      }
      if (Number(value)) {
        return <p style={{ color: '#65AD77' }}>已批改</p>;
      }
      return '';
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
    if (userId == value.id) return value.userName;
  }
}
