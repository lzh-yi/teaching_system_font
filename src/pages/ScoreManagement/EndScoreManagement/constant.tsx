type columnConfigType = {
  id: number;
  name: string;
  work_score: number;
  examination_score: number;
  end_score: number;
};

export const columnConfig = [
  {
    title: 'id',
    align: 'center',
    width: 50,
    dataIndex: 'id',
  },
  {
    title: '学生姓名',
    align: 'center',
    width: 50,
    dataIndex: 'name',
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

export const tableDataVal: columnConfigType[] = [
  {
    id: 1,
    name: '张三',
    work_score: 90,
    examination_score: 80,
    end_score: 94,
  },
  {
    id: 2,
    name: '张三',
    work_score: 90,
    examination_score: 80,
    end_score: 84,
  },
  {
    id: 3,
    name: '张三',
    work_score: 90,
    examination_score: 80,
    end_score: 84,
  },
  {
    id: 4,
    name: '张三',
    work_score: 90,
    examination_score: 80,
    end_score: 74,
  },
  {
    id: 5,
    name: '张三',
    work_score: 50,
    examination_score: 60,
    end_score: 44,
  },
];
