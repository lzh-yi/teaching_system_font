export type KnowledgePointColType = {
  id: number;
  number: string;
  name: string;
  teaching_id: number;
  teaching_goal_name: string;
  support_strength: string;
};

export const columnConfig = [
  {
    title: 'id',
    align: 'center',
    width: 100,
    dataIndex: 'id',
  },
  {
    title: '编号',
    align: 'center',
    width: 100,
    dataIndex: 'number',
  },
  {
    title: '知识点名称',
    align: 'center',
    width: 100,
    dataIndex: 'name',
  },
  {
    title: '教学目标Id',
    align: 'center',
    width: 100,
    dataIndex: 'teaching_id',
  },
  {
    title: '教学目标',
    align: 'center',
    width: 100,
    dataIndex: 'teaching_goal_name',
  },
  {
    title: '支撑强度',
    align: 'center',
    width: 100,
    dataIndex: 'support_strength',
  },
];

export const tableDataVal: KnowledgePointColType[] = [
  {
    id: 1,
    number: '1.1',
    name: '知识点一',
    teaching_id: 4,
    teaching_goal_name: '教学目标一',
    support_strength: '高',
  },
  {
    id: 2,
    number: '1.2',
    name: '知识点二',
    teaching_id: 4,
    teaching_goal_name: '教学目标二',
    support_strength: '中',
  },
  {
    id: 4,
    number: '1.5',
    name: '知识点五',
    teaching_id: 1,
    teaching_goal_name: '教学目标一',
    support_strength: '低',
  },
];
