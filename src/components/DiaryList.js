import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';
import DiaryItem from './DiaryItem';

const sortOptiononList = [
  { value: 'latest', name: "최신순" },
  { value: 'oldest', name: "오래된 순" }
];

const filterOptiononList = [
  { value: 'all', name: "모든 감정" },
  { value: 'good', name: "좋은 감정만" },
  { value: 'bad', name: "안 좋은 감정만" }
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className='ControlMenu' value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => <option key={idx} value={it.value}>
        {it.name}
      </option>)}
    </select>
  )
}

const DiaryList = ({ diaryList }) => {

  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {

    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };


    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));


    const sortedList = filteredList.sort(compare);
    return sortedList;
  };


  return (
    <div className='DiaryList'>

      <div className='menu_wrapper'>
        <div className='left_col'>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptiononList}
          />   <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptiononList}
          />
        </div>
        <div className='left_col'>
          <MyButton type={'positive'} text={'오늘의 할 일'}
            onClick={() => navigate("/Todo")}
          />
        </div>
        <div className='right_col'>
          <MyButton type={'positive'} text={'새 일기쓰기'}
            onClick={() => navigate("/New")}
          />
        </div>
      </div>




      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id}{...it} />
      ))}
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;