import { useDispatch } from 'react-redux';

const useDispatchedActions = actions => {
  const dispatch = useDispatch();
  return Object.entries(actions).reduce(
    (acc, [key, action]) => ({
      ...acc,
      [key]: (...args) => dispatch(action(...args)),
    }),
    {}
  );
};

export default useDispatchedActions;
