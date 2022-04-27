export type DegreeAnalysesColType = {
  id: number;
  name: string;
  degree_1: number;
  degree_2: number;
  degree_3: number;
  average: number;
};

export const columnConfig = [
  {
    title: 'id',
    align: 'center',
    width: 100,
    dataIndex: 'id',
  },
  {
    title: '学生',
    align: 'center',
    width: 100,
    dataIndex: 'name',
  },
  {
    title: '目标一达成度',
    align: 'center',
    width: 100,
    dataIndex: 'degree_1',
  },
  {
    title: '目标二达成度',
    align: 'center',
    width: 100,
    dataIndex: 'degree_2',
  },
  {
    title: '目标三达成度',
    align: 'center',
    width: 100,
    dataIndex: 'degree_3',
  },
  {
    title: '平均达成度',
    align: 'center',
    width: 100,
    dataIndex: 'average',
  },
];
export const tableDataVal = [
  {
    id: 1,
    name: '张三',
    degree_1: 79,
    degree_2: 89,
    degree_3: 90,
    average: 86,
  },
  {
    id: 2,
    name: '李四',
    degree_1: 79,
    degree_2: 89,
    degree_3: 90,
    average: 86,
  },
  {
    id: 3,
    name: '王二',
    degree_1: 79,
    degree_2: 89,
    degree_3: 90,
    average: 86,
  },
];
