export type TeachingGoalColType = {
  id: number;
  title: string;
  content: string;
};

export const columnConfig = [
  // {
  //   title: 'id',
  //   align: 'center',
  //   width: 100,
  //   dataIndex: 'id',
  // },
  {
    title: '教学目标',
    align: 'center',
    width: 100,
    dataIndex: 'title',
  },
  {
    title: '内容',
    align: 'center',
    width: 150,
    dataIndex: 'content',
  },
];

// export const tableDataVal: TeachingGoalColType[] = [
//   {
//     id: 1,
//     name: '教学目标一',
//     content: '教学内容',
//   },
//   {
//     id: 2,
//     name: '教学目标二',
//     content: '教学内容',
//   },
//   {
//     id: 3,
//     name: '教学目标三',
//     content: '教学内容',
//   },
//   {
//     id: 4,
//     name: '教学目标十',
//     content: '教学内容',
//   },
// ];
