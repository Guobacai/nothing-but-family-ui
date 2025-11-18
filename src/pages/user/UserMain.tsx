import { useParams } from 'react-router';
import { useGetUserByIdQuery } from '../../api/app';
import { NavLink } from 'react-router-dom';
import { Button } from 'simpleact-ui';

export default function UserMain() {
  const { userId } = useParams();

  const { data, isLoading } = useGetUserByIdQuery({ userId });

  if (isLoading) {
    return <div>Loadingt the user information</div>;
  }

  const { familyHost } = data.result;

  console.log('family host', familyHost);

  return (
    <div>
      <div>Hello, this is user {userId}</div>
      <div>
        Here should be the flow of information like the Linkedin. Gather all
        information from different families.
      </div>
      <div>
        <Button>Create New Family</Button>
      </div>
      <div className="mm-text-red">
        {familyHost ? (
          <NavLink to={`/family/${familyHost.id}`}>
            <div>You own this family {familyHost.name}</div>
          </NavLink>
        ) : (
          <div>
            <Button>Create New Family</Button>
          </div>
        )}
      </div>
      <div>Here are the families you belong to</div>
    </div>
  );
}
