export type workColType = {
  id: number;
  name: string;
  submit_time: string;
  correct_time: string;
  score: number;
};

type endColumnConfigType = {
  id: number;
  work_score: number;
  examination_score: number;
  end_score: number;
};

export const endColumnConfig = [
  {
    title: 'id',
    align: 'center',
    width: 50,
    dataIndex: 'id',
  },
  {
    title: '习题成绩',
    align: 'center',
    width: 50,
    dataIndex: 'work_score',
  },
  {
    title: '考试成绩',
    align: 'center',
    width: 50,
    dataIndex: 'examination_score',
  },
  {
    title: '最终成绩',
    align: 'center',
    width: 50,
    dataIndex: 'end_score',
  },
  {
    title: '等级',
    align: 'center',
    width: 50,
    dataIndex: 'end_score',
    render(value: number) {
      let result = null;
      if (value > 90) return (result = <p style={{ color: 'green' }}>优秀</p>);
      if (value > 80) return (result = <p style={{ color: '#3066FA' }}>良好</p>);
      if (value > 60) return (result = <p style={{ color: '#ED8E34' }}>及格</p>);
      if (value <= 60) return (result = <p style={{ color: 'red' }}>不及格</p>);
    },
  },
];

export const workColumnConfig = [
  {
    title: 'id',
    align: 'center',
    width: 50,
    dataIndex: 'id',
  },
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
    title: '提交时间',
    align: 'center',
    width: 150,
    dataIndex: 'submit_time',
  },
  {
    title: '批改时间',
    align: 'center',
    width: 150,
    dataIndex: 'correct_time',
  },
  {
    title: '分数',
    align: 'center',
    width: 150,
    dataIndex: 'score',
  },
];

export const examColumnConfig = [
  {
    title: 'id',
    align: 'center',
    width: 50,
    dataIndex: 'id',
  },
  {
    title: '考试名称',
    align: 'center',
    width: 200,
    dataIndex: 'name',
    render(value: string) {
      return <p style={{ fontWeight: 'bold' }}>{value}</p>;
    },
  },
  {
    title: '提交时间',
    align: 'center',
    width: 150,
    dataIndex: 'submit_time',
  },
  {
    title: '批改时间',
    align: 'center',
    width: 150,
    dataIndex: 'correct_time',
  },
  {
    title: '分数',
    align: 'center',
    width: 150,
    dataIndex: 'score',
  },
];

export const tableDataVal: workColType[] = [
  {
    id: 1,
    name: 'Java对象练习',
    submit_time: '2022-04-19',
    correct_time: '2022-04-25',
    score: 90,
  },
  {
    id: 2,
    name: 'Java对象练习',
    submit_time: '2022-04-19',
    correct_time: '2022-04-25',
    score: 90,
  },
  {
    id: 3,
    name: 'Java对象练习',
    submit_time: '2022-04-19',
    correct_time: '2022-04-25',
    score: 90,
  },
  {
    id: 4,
    name: 'Java对象练习',
    submit_time: '2022-04-19',
    correct_time: '2022-04-25',
    score: 90,
  },
];
export const tableDataVal1: workColType[] = [
  {
    id: 1,
    name: 'Java对象练习',
    submit_time: '2022-04-19',
    correct_time: '2022-04-25',
    score: 90,
  },
  {
    id: 2,
    name: 'Java对象练习',
    submit_time: '2022-04-19',
    correct_time: '2022-04-25',
    score: 90,
  },
  {
    id: 3,
    name: 'Java对象练习',
    submit_time: '2022-04-19',
    correct_time: '2022-04-25',
    score: 90,
  },
  {
    id: 4,
    name: 'Java对象练习',
    submit_time: '2022-04-19',
    correct_time: '2022-04-25',
    score: 90,
  },
];

export const tableDataVal2: endColumnConfigType[] = [
  {
    id: 1,
    work_score: 90,
    examination_score: 80,
    end_score: 94,
  },
  {
    id: 2,
    work_score: 90,
    examination_score: 80,
    end_score: 84,
  },
  {
    id: 3,
    work_score: 90,
    examination_score: 80,
    end_score: 84,
  },
  {
    id: 4,
    work_score: 90,
    examination_score: 80,
    end_score: 74,
  },
  {
    id: 5,
    work_score: 50,
    examination_score: 60,
    end_score: 44,
  },
];
