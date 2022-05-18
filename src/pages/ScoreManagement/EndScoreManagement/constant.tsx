export const columnConfig = [
  // {
  //   title: 'id',
  //   align: 'center',
  //   width: 50,
  //   dataIndex: 'id',
  // },
  {
    title: '学生姓名',
    align: 'center',
    width: 50,
    dataIndex: 'userName',
  },
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

