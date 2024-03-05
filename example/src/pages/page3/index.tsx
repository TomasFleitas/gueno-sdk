import { memo } from 'react';
import style from './index.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Page3 = memo(() => {
  const navigate = useNavigate();
  return (
    <div className={style.page3}>
      <h1>PAGE 3</h1>
      <div>
        <Button onClick={() => navigate(-1)}>BACK</Button>
      </div>
    </div>
  );
});
