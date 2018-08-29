import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import compose from 'recompose/compose';
import './OnlineCourses.css'
import blue from '@material-ui/core/colors/blue';

import { getCourses , getDetail } from '../actions/fetchCourses';




function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'asc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
 
  {
    id: 'Course',
    numeric: false,
    disablePadding: false,
    label: 'Course',
  },
  { id: 'author', numeric: false, disablePadding: false, label: 'Author' },
  { id: 'next_start_formatted', numeric: false, disablePadding: false, label: 'Starting date' },
  { id: 'detail', numeric: false, disablePadding: false, label: 'Details' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    // active={orderBy === row.id}
                    // direction={order}
                    // onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: blue
  }
});

class OnlineCourses extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'next_start_formatted',
    Courses: null,
    page: 0,
    rowsPerPage: 7,
  };

  UNSAFE_componentWillMount() {
    
    this.props.getCourses();

  }



  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({ Courses: newProps.Courses });
  }

  getFormattedData(data) {
    return Object.keys(data).map(course => {
      return {
        title: data[course].title,
        url: data[course].url, 
        author: data[course].author,
        Price: data[course].price,
        next_start_formatted: data[course].next_start_formatted
      }

    })

  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const {
      Courses,
      order,
      orderBy,
      rowsPerPage,
      page,
    } = this.state;

    if (!Courses) return null
    

    const formattedData = this.getFormattedData(Courses)

    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        Object.keys(Courses).length - page * rowsPerPage,
      );



    return (
  
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              
              onRequestSort={this.handleRequestSort}
              rowCount={Object.keys(Courses).length}
            />
            <TableBody>
              {formattedData
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(course => {
                  return (
                    <TableRow hover tabIndex={-1} key={course.name}>
                      <TableCell component="th" scope="row" padding="dense" >
                        {course.title}
                      </TableCell>
               
                      <TableCell >
                        {course.author}
                      </TableCell>
                      <TableCell >
                        {course.next_start_formatted}
                      </TableCell>
                      <Button onClick={() => { this.props.getDetail(course.title.replace(/ /g,"-").toLowerCase()); }}>Click for more details</Button>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <br/>
        <br/>
        <br/>
        {this.props.detail && this.props.detail.slug &&
        <div className="detailContainer">

        <div>
    
          <div className= "title">
          <h1>{this.props.detail.slug.toUpperCase().replace(/-/g, ' ')}</h1>
          </div>

          </div>
         
            <div className= "price">
              <h2>{this.props.detail.price.EU.all_upfront} upfront - save {this.props.detail.price.EU.upfront_savings}</h2>
              <p>{this.props.detail.price.EU.upfront} upfront - save {this.props.detail.price.EU.installment}</p>
</div>
<div className= "date">
          <ul className="DateList"> 
          <h2>Next starting dates</h2>
          {this.props.detail.start_dates.map(function(date) {
            return <li key={date}>{date}</li>
          })}
            </ul>
            </div>
<button className="differentCoursePlan">Get Course Plan</button>
<button className="buttonEnroll">Enroll</button>
<div className= "footerCard"></div>
      </div>
     
      }
      </Paper>

  
    );
 
  }
}
const mapStateToProps = function(state) {
  return {
    Courses: state.getCourses,
    detail: state.getDetail
  };
};

OnlineCourses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCourses, getDetail },
  ),
)(OnlineCourses);
