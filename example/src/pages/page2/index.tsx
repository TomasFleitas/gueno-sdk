import { memo } from 'react';
import style from './index.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routers/routeData';

export const Page2 = memo(() => {
  const navigate = useNavigate();
  return (
    <div className={style.page2}>
      <h1>PAGE 2</h1>
      <div>
        <Button onClick={() => navigate(-1)}>BACK</Button>
        <Button onClick={() => navigate(ROUTE.page3)}>NEXT</Button>
      </div>
    </div>
  );
});
