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

/** 知识点 */
const KnowledgePoint = {
  // 下拉列表数据
  knowledgePointSelectData: '/api/knowledge_point/select_data',
  // 添加知识点
  addKnowledgePoint: '/api/knowledge_point/add',
  // 获取知识点列表
  knowledgePointList: '/api/knowledge_point/list',
  // 更新知识点
  updateKnowledgePoint: '/api/knowledge_point/update',
};

/** 题组 */
const GroupWork = {
  // 添加题组
  addGroupWork: '/api/group_work/add',
  // 题组列表
  groupWorkList: '/api/group_work/list',
  // 更新题组
  updateGroupWork: '/api/group_work/update',
  // 下拉列表数据
  knowledgePointSelectDataByGroup: '/api/group_work/select_data',
};

/** 习题 */
const exercise = {
  // 添加习题
  addExercise: '/api/exercise/add',
  // 习题列表
  exerciseList: '/api/exercise/list',
};

export default {
  ...teachingOutline,
  ...teachingSchedule,
  ...teachingGoal,
  ...KnowledgePoint,
  ...GroupWork,
  ...exercise,
};
