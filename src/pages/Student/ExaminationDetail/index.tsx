import React from 'react';
import WorkCompleteList from '@/pages/Student/ExaminationDetail/components/WorkCompleteList';
import WorkDoing from '@/pages/Student/ExaminationDetail/components/WorkDoing';

import { useLocation } from 'umi';

const GroupWorkDetail: React.FC = () => {
  // 标记当前习题组是否是未发布状态
  const workGroupStatus = useLocation().query?.work_status;
  const workGroup = useLocation().query?.work_group;
  const workStatisticsId = useLocation().query?.work_statistics;

  return (
    <div>
      {workGroupStatus === '0' && (
        <WorkDoing workGroup={workGroup} workStatisticsId={workStatisticsId} />
      )}
      {workGroupStatus === '1' && (
        <WorkCompleteList workGroupId={workGroup} staticsId={workStatisticsId} />
      )}
    </div>
  );
};

export default GroupWorkDetail;
