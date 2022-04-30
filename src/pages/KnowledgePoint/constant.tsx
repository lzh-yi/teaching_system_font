export type KnowledgePointColType = {
  id: number;
  // number: string;
  name: string;
  content: string;
  // teaching_id: number;
  // teaching_goal_name: string;
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
    title: '知识点名称',
    align: 'center',
    width: 100,
    dataIndex: 'name',
  },
  {
    title: '知识点内容',
    align: 'center',
    width: 100,
    dataIndex: 'content',
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
    // number: '1.1',
    name: '知识点一',
    content: '知识点内容',
    support_strength: '高',
  },
  {
    id: 2,
    // number: '1.2',
    name: '知识点二',
    content: '知识点内容',
    support_strength: '中',
  },
  {
    id: 4,
    // number: '1.5',
    name: '知识点五',
    content: '知识点内容',
    support_strength: '低',
  },
];
