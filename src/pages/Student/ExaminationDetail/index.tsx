import React from 'react';
import WorkCompleteList from '@/pages/Student/ExaminationDetail/components/WorkCompleteList';
import WorkDoing from '@/pages/Student/ExaminationDetail/components/WorkDoing';

import { useLocation } from 'umi';

const GroupWorkDetail: React.FC = () => {
  // 标记当前习题组是否是未发布状态
  const workGroupStatus = useLocation().query?.work_status;

  return (
    <div>
      {workGroupStatus === '1' && <WorkDoing />}
      {workGroupStatus === '2' && <WorkCompleteList />}
    </div>
  );
};

export default GroupWorkDetail;
