import { GET_DETAIL } from '../actions/fetchCourses'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_DETAIL:
      return payload
    default:
      return state
  }
}
