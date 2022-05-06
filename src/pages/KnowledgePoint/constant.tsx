export type KnowledgePointColType = {
  id: number;
  // number: string;
  name: string;
  content: string;
  // teaching_id: number;
  // teaching_goal_name: string;
  support_strength: string;
  chapter: string;
};

export const columnConfig = [
  // {
  //   title: 'id',
  //   align: 'center',
  //   width: 100,
  //   dataIndex: 'id',
  // },
  {
    title: '知识点名称',
    align: 'center',
    width: 100,
    dataIndex: 'title',
  },
  {
    title: '知识点内容',
    align: 'center',
    width: 200,
    dataIndex: 'content',
  },
  {
    title: '支撑强度',
    align: 'center',
    width: 100,
    dataIndex: 'supportStrength',
    render(value: string) {
      let result = null;
      switch (value) {
        case 'high':
          result = <p>高</p>;
          break;
        case 'middle':
          result = <p>中</p>;
          break;
        case 'low':
          result = <p>低</p>;
          break;
        default:
          break;
      }
      return result;
    },
  },
  {
    title: '所属章节',
    align: 'center',
    width: 100,
    dataIndex: 'chapter',
  },
];
