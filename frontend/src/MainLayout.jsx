import { Outlet } from 'react-router-dom';
import QuizHeader from './QuizHeader';
import QuizNums from './QuizNums';

const MainLayout = () => {
  return (
    <div className="length-container">
        <div className="quiz-header">
            <QuizHeader />
        </div>
        <div className="contents">
            <Outlet />
        </div>
    </div>
  );
};

export default MainLayout;