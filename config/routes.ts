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
  { path: '/examination', name: '考试管理', icon: 'icon-kaoshi', component: './Examination' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/syllabus' },
  { component: './404' },
];
