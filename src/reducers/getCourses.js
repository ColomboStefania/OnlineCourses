import { GET_COURSES } from '../actions/fetchCourses';

export default (state = [], { type, payload }) => {
  switch (type) {
    case GET_COURSES:
      return payload;
    default:
      return state;
  }
};
