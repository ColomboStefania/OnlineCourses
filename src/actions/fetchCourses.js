import request from 'superagent';
import { baseUrl } from '../constants';


export const GET_COURSES = 'GET_COURSES';
export const GET_DETAIL = 'GET_DETAIL';

export const getCourses = () => dispatch => {
  request.get(`https://careerfoundry.com/en/api/courses`).then(response => {
    dispatch({
      type: GET_COURSES,
      payload: response.body.courses
    });
  });
};

export const getDetail = (course) => dispatch => {
  request.get(`https://careerfoundry.com/en/api/courses/${course}`).then(response => {
    dispatch({
      type: GET_DETAIL,
      payload: response.body
    });
  });
};


