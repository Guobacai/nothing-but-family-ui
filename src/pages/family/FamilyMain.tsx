import { useGetTagsByFamilyIdQuery } from '../../api/app';
import { useParams } from 'react-router';

export default function FamilyMain() {
  const { familyId } = useParams();

  console.log('family Id', familyId);

  const { data, isSuccess } = useGetTagsByFamilyIdQuery({
    familyId,
  });

  console.log('data', data);

  return (
    <div>
      <h1>Family Main Page</h1>
    </div>
  );
}
