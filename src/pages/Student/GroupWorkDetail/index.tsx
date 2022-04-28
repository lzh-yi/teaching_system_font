import React from 'react';
import WorkCompleteList from '@/pages/Student/GroupWorkDetail/components/WorkCompleteList';
import WorkDoing from '@/pages/Student/GroupWorkDetail/components/WorkDoing';

import { useLocation } from 'umi';

const GroupWorkDetail: React.FC = () => {
  // 标记当前习题组是否是未发布状态
  const workGroupStatus = useLocation().query?.work_status;

  return (
    <div>
      {workGroupStatus === '0' && <WorkDoing />}
      {workGroupStatus === '1' && <WorkCompleteList />}
    </div>
  );
};

export default GroupWorkDetail;
