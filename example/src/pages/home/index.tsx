import { memo } from 'react';
import style from './index.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routers/routeData';

export const Home = memo(() => {
  const navigate = useNavigate();
  return (
    <div className={style.home}>
      <h1>HOME</h1>
      <div>
        <Button onClick={() => navigate(ROUTE.page1)}>NEXT</Button>
      </div>
    </div>
  );
});
