import { useParams } from 'react-router';
import { useGetUserByIdQuery } from '../../api/app';
import { NavLink } from 'react-router-dom';
import BasicButton from '~/components/button/BasicButton';

export default function UserMain() {
  const { userId } = useParams();

  const { data, isLoading } = useGetUserByIdQuery({ userId });

  if (isLoading) {
    return <div>Loadingt the user information</div>;
  }

  const { familyHost } = data.result;

  return (
    <div>
      <div>Hello, this is user {userId}</div>
      <div>
        Here should be the flow of information like the Linkedin. Gather all
        information from different families.
      </div>
      <div className="mm-text-red">
        {!familyHost ? (
          <NavLink to={`/family/${familyHost.id}`}>
            <div>You own this family {familyHost.name}</div>
          </NavLink>
        ) : (
          <div>
            <BasicButton className="mm-font-bold">
              Create New Family
            </BasicButton>
          </div>
        )}
      </div>
      <div>Here are the families you belong to</div>
    </div>
  );
}
