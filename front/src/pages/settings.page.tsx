import type { CustomNextPage } from 'next';
import { AppLayout } from 'src/layout';

const Settings: CustomNextPage = () => {
  return <div>Categories</div>;
};

Settings.getLayout = AppLayout;
Settings.requireAuth = true;
export default Settings;
