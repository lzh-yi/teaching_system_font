export type TeachingGoalColType = {
  id: number;
  name: string;
  outline_id: number;
  outline_name: string;
};

export const columnConfig = [
  {
    title: 'id',
    align: 'center',
    width: 100,
    dataIndex: 'id',
  },
  {
    title: '教学目标',
    align: 'center',
    width: 150,
    dataIndex: 'name',
  },
  {
    title: '大纲id',
    align: 'center',
    width: 100,
    dataIndex: 'outline_id',
  },
  {
    title: '大纲',
    align: 'center',
    width: 100,
    dataIndex: 'outline_name',
  },
];

export const tableDataVal: TeachingGoalColType[] = [
  {
    id: 1,
    name: '教学目标一',
    outline_id: 1,
    outline_name: '教学大纲一',
  },
  {
    id: 2,
    name: '教学目标二',
    outline_id: 1,
    outline_name: '教学大纲一',
  },
  {
    id: 3,
    name: '教学目标三',
    outline_id: 2,
    outline_name: '教学大纲二',
  },
  {
    id: 4,
    name: '教学目标十',
    outline_id: 3,
    outline_name: '教学大纲三',
  },
];
