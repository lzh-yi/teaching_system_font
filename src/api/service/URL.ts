/** 教学大纲 */
const teachingOutline = {
  // 教学大纲列表
  teachingOutlineList: '/api/teaching_outline/list',
  // 下载教学大纲
  downloadOutline: '/api/teaching_outline/download',
  // 上传教学大纲
  uploadOutline: '/api/teaching_outline/upload',
  // 更新教学大纲
  updateOutline: '/api/teaching_outline/update',
};

/** 教学进度 */
const teachingSchedule = {
  // 教学进度列表
  teachingScheduleList: '/api/teaching_schedule/list',
  // 上传教学进度
  uploadSchedule: '/api/teaching_schedule/upload',
  // 更新教学进度
  updateSchedule: '/api/teaching_schedule/update',
};

/** 教学目标 */
const teachingGoal = {
  // 教学目标列表
  teachingGoalList: '/api/teaching_goal/list',
  // 添加教学目标
  addTeachingGoal: '/api/teaching_goal/add',
  // 修改教学目标
  updateTeachingGoal: '/api/teaching_goal/update',
};

export default {
  ...teachingOutline,
  ...teachingSchedule,
  ...teachingGoal,
};
