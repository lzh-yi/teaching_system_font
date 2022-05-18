import dayjs from 'dayjs';
import { GroupWork as GroupWorkUtils, examination as examinationUtils } from '@/api/service';
let groupWorkList: any[] = [];
let examination: any[] = [];

(async () => {
  let res = null;
  res = (await GroupWorkUtils.groupWorkList({})) as any;
  if (res && res.code === 200) {
    groupWorkList = res.data;
  }
  res = (await examinationUtils.groupWorkList({})) as any;
  if (res && res.code === 200) {
    examination = res.data;
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
    title: '题组名称',
    align: 'center',
    width: 200,
    dataIndex: 'workId',
    render(value: number) {
      return <p style={{ fontWeight: 'bold' }}>{getGroupWorkName(value)}</p>;
    },
  },
  {
    title: '提交时间',
    align: 'center',
    width: 150,
    dataIndex: 'submitTime',
    render(value: string) {
      return <p>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</p>;
    },
  },
  {
    title: '分数',
    align: 'center',
    width: 150,
    dataIndex: 'score',
  },
];

export const examColumnConfig = [
  // {
  //   title: 'id',
  //   align: 'center',
  //   width: 50,
  //   dataIndex: 'id',
  // },
  {
    title: '考试名称',
    align: 'center',
    width: 200,
    dataIndex: 'workId',
    render(value: number) {
      return <p style={{ fontWeight: 'bold' }}>{getExaminationName(value)}</p>;
    },
  },
  {
    title: '提交时间',
    align: 'center',
    width: 150,
    dataIndex: 'submitTime',
    render(value: string) {
      return <p>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</p>;
    },
  },
  {
    title: '分数',
    align: 'center',
    width: 150,
    dataIndex: 'score',
  },
];

export const endColumnConfig = [
  // {
  //   title: 'id',
  //   align: 'center',
  //   width: 50,
  //   dataIndex: 'id',
  // },
  // {
  //   title: '学生姓名',
  //   align: 'center',
  //   width: 50,
  //   dataIndex: 'userName',
  // },
  {
    title: '习题成绩',
    align: 'center',
    width: 50,
    dataIndex: 'workScore',
    render(value: number) {
      return <p>{value.toFixed(2)}</p>;
    },
  },
  {
    title: '考试成绩',
    align: 'center',
    width: 50,
    dataIndex: 'examinationScore',
    render(value: number) {
      return <p>{value.toFixed(2)}</p>;
    },
  },
  {
    title: '最终成绩',
    align: 'center',
    width: 50,
    dataIndex: 'finalScore',
    render(value: number) {
      return <p>{value.toFixed(2)}</p>;
    },
  },
  {
    title: '等级',
    align: 'center',
    width: 50,
    dataIndex: 'finalScore',
    render(value: number) {
      if (value > 90) return <p style={{ color: 'green' }}>优秀</p>;
      if (value > 80) return <p style={{ color: '#3066FA' }}>良好</p>;
      if (value > 60) return <p style={{ color: '#ED8E34' }}>及格</p>;
      if (value <= 60) return <p style={{ color: 'red' }}>不及格</p>;
      return null;
    },
  },
];

function getGroupWorkName(workId: number) {
  for (const value of groupWorkList) {
    if (value.id === workId) return value.name;
  }
}

function getExaminationName(workId: number) {
  for (const value of examination) {
    if (value.id === workId) return value.name;
  }
}
