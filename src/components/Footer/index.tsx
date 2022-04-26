import { RadarChartOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = '毕设项目';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Java',
          title: 'Java教学练',
          href: '',
          blankTarget: true,
        },
        {
          key: 'platform',
          title: <RadarChartOutlined />,
          href: '',
          blankTarget: true,
        },
        {
          key: 'teaching_platform',
          title: '教学平台',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
