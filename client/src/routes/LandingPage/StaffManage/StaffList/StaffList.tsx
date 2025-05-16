import {get} from '../../../../server';
import {useAuth} from '../../../../context';

export const StaffList = () => {
  const {jwt} = useAuth();

  if (jwt) {
    get('/staffs/all', jwt).then(resp => resp.json());
  }

  return <div></div>;
};
