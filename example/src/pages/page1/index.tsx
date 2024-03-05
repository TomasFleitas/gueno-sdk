import { memo } from 'react';
import style from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routers/routeData';
import { Button } from 'antd';

export const Page1 = memo(() => {
  const navigate = useNavigate();

  return (
    <div className={style.page1}>
      <h1>PAGE 1</h1>
      <div>
        <Button onClick={() => navigate(-1)}>BACK</Button>
        <Button onClick={() => navigate(ROUTE.page2)}>NEXT</Button>
      </div>
    </div>
  );
});
