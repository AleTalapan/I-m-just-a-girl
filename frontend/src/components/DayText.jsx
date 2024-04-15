// DayText.js
import { useParams } from 'react-router-dom';

const DayText = () => {
  const { day } = useParams();

  return (
    <div>
      {/* textul din calendar pt ziua respectiva */}
    </div>
  );
};

export default DayText;
