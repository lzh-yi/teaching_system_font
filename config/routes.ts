export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './404' },
    ],
  },
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/syllabus', name: '教学大纲', icon: 'icon-kechengdagang', component: './Syllabus' },
  { path: '/schedule', name: '进度管理', icon: 'icon-jindu', component: './Schedule' },
  { path: '/group_work', name: '分组作业', icon: 'icon-zuoye', component: './GroupWork' },
  { path: '/examination', name: '考试管理', icon: 'icon-kaoshimoshi-', component: './Examination' },
  {
    path: '/group_work/detail',
    name: '习题分组详情',
    component: './GroupWorkDetail',
    hideInMenu: true,
  },
  {
    path: '/examination/detail',
    name: '考试详情',
    component: './ExaminationDetail',
    hideInMenu: true,
  },
  {
    path: '/group_work/correct',
    name: '习题批改',
    component: './CorrectWork',
    hideInMenu: true,
  },
  {
    path: '/group_work/review',
    name: '完成情况查看',
    component: './ReviewWork',
    hideInMenu: true,
  },
  {
    path: '/examination/correct',
    name: '考试批改',
    component: './CorrectExamination',
    hideInMenu: true,
  },
  {
    path: '/examination/review',
    name: '完成情况查看',
    component: './ReviewExamination',
    hideInMenu: true,
  },
  {
    path: '/score_manage',
    name: '成绩管理',
    icon: 'icon-chengjitongji',
    routes: [
      {
        path: '/score_manage/work',
        name: '习题成绩',
        icon: 'bars',
        component: './ScoreManagement/WorkManagement',
      },
      {
        path: '/score_manage/examination',
        name: '考试成绩',  
        icon: 'calculator',
        component: './ScoreManagement/ExaminationManagement',
      },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/syllabus' },
  { component: './404' },
];
