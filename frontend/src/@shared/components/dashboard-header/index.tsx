import React from 'react';

import DashboardHeaderComponent, {
  DashboardHeaderComponentProps
} from '@shared/components/dashboard-header/dashboard-header';

const defaultProps: DashboardHeaderComponentProps = {
  companyName: 'Kaizen404'
};

const DashboardHeader = () => {
  return <DashboardHeaderComponent companyName={defaultProps.companyName} />;
};

export default DashboardHeader;
