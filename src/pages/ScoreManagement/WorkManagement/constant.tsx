export type workColType = {
  id: number;
  name: string;
  publish_time: string;
  end_time: string;
  submit_total: number;
  submit_reality: number;
  submit_rate: number;
  lowest_score: number;
  highest_score: number;
  average_score: number;
};

export type workDetailColType = {
  id: number;
  user_name: string;
  submit_time: string;
  correct_time: string;
  score: number;
};

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
    title: '发布时间',
    align: 'center',
    width: 150,
    dataIndex: 'publish_time',
  },
  {
    title: '截止时间',
    align: 'center',
    width: 150,
    dataIndex: 'end_time',
  },
  {
    title: '应交份数',
    align: 'center',
    width: 100,
    dataIndex: 'submit_total',
  },
  {
    title: '实交份数',
    align: 'center',
    width: 100,
    dataIndex: 'submit_reality',
  },
  {
    title: '提交率',
    align: 'center',
    width: 100,
    dataIndex: 'submit_rate',
    render(value: number) {
      return <p style={{ color: '#65AF76' }}>{`${value * 100}%`}</p>;
    },
  },
  {
    title: '最低分',
    align: 'center',
    width: 100,
    dataIndex: 'lowest_score',
  },
  {
    title: '最高分',
    align: 'center',
    width: 100,
    dataIndex: 'highest_score',
  },
  {
    title: '平均分',
    align: 'center',
    width: 100,
    dataIndex: 'average_score',
  },
];

export const workDetailColumnConfig = [
  {
    title: 'id',
    align: 'center',
    width: 50,
    dataIndex: 'id',
  },
  {
    title: '学生姓名',
    align: 'center',
    width: 100,
    dataIndex: 'user_name',
  },
  {
    title: '提交时间',
    align: 'center',
    width: 100,
    dataIndex: 'submit_time',
    render(value: string) {
      if (!value) return <p style={{ color: 'red' }}>未提交</p>;
      return <p>{value}</p>;
    },
  },
  {
    title: '批改时间',
    align: 'center',
    width: 100,
    dataIndex: 'correct_time',
    render(value: string) {
      if (!value) return <p style={{ color: 'red' }}>未批改</p>;
      return <p>{value}</p>;
    },
  },
  {
    title: '分数',
    align: 'center',
    width: 100,
    dataIndex: 'score',
  },
];

export const tableDataVal: workColType[] = [
  {
    id: 1,
    name: 'Java对象练习',
    publish_time: '2022-04-19 12:00:00',
    end_time: '2022-04-28 12:00:00',
    submit_total: 50,
    submit_reality: 45,
    submit_rate: 0.9,
    lowest_score: 50,
    highest_score: 90,
    average_score: 85,
  },
  {
    id: 2,
    name: '数据结构练习',
    publish_time: '2022-04-19 12:00:00',
    end_time: '2022-04-28 12:00:00',
    submit_total: 50,
    submit_reality: 45,
    submit_rate: 0.9,
    lowest_score: 50,
    highest_score: 90,
    average_score: 85,
  },
  {
    id: 3,
    name: '类的创建和销毁',
    publish_time: '2022-04-19 12:00:00',
    end_time: '2022-04-28 12:00:00',
    submit_total: 50,
    submit_reality: 45,
    submit_rate: 0.9,
    lowest_score: 50,
    highest_score: 90,
    average_score: 85,
  },
  {
    id: 4,
    name: '类修饰符',
    publish_time: '2022-04-19 12:00:00',
    end_time: '2022-04-28 12:00:00',
    submit_total: 50,
    submit_reality: 45,
    submit_rate: 0.9,
    lowest_score: 50,
    highest_score: 90,
    average_score: 85,
  },
  {
    id: 5,
    name: '二叉树练习',
    publish_time: '2022-04-19 12:00:00',
    end_time: '2022-04-28 12:00:00',
    submit_total: 50,
    submit_reality: 45,
    submit_rate: 0.9,
    lowest_score: 50,
    highest_score: 90,
    average_score: 85,
  },
];

export const tableDataVal1: workDetailColType[] = [
  {
    id: 1,
    user_name: '张三',
    submit_time: '2022-04-24 12:00:00',
    correct_time: '2022-04-26 12:00:00',
    score: 80,
  },
  {
    id: 2,
    user_name: '张三',
    submit_time: '2022-04-24 12:00:00',
    correct_time: '',
    score: 0,
  },
  {
    id: 3,
    user_name: '张三',
    submit_time: '2022-04-24 12:00:00',
    correct_time: '2022-04-26 12:00:00',
    score: 80,
  },
  {
    id: 4,
    user_name: '张三',
    submit_time: '',
    correct_time: '',
    score: 0,
  },
  {
    id: 5,
    user_name: '张三',
    submit_time: '2022-04-24 12:00:00',
    correct_time: '2022-04-26 12:00:00',
    score: 80,
  },
  {
    id: 6,
    user_name: '张三',
    submit_time: '',
    correct_time: '',
    score: 0,
  },
  {
    id: 7,
    user_name: '张三',
    submit_time: '2022-04-24 12:00:00',
    correct_time: '2022-04-26 12:00:00',
    score: 80,
  },
  {
    id: 8,
    user_name: '张三',
    submit_time: '',
    correct_time: '',
    score: 0,
  },
  {
    id: 9,
    user_name: '张三',
    submit_time: '2022-04-24 12:00:00',
    correct_time: '',
    score: 0,
  },
];
