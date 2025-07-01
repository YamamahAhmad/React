import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Layout.module.css';

export default function Layout() {

  const location = useLocation();

  let pageTitle = '';

  if (location.pathname === '/') {
    pageTitle = 'HomePage';
  } else if (location.pathname === '/add') {
    pageTitle = 'Add New Blog';
  }

  return (
    <div className={styles.contant}>

      <Header />

      <div className={styles.mainBody}>
        <div className={styles.title}>{pageTitle}</div>
        <Outlet />
      </div>

      <Footer />
    </div>

  );
};




