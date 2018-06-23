import _ from 'lodash';
import dateFormat from 'dateformat';
import {hostUrl} from '../../config';
import React, {Component} from 'react';

import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchDetailCourse} from '../actions/course';
import centerComponent from 'react-center-component';
import CircularProgress from 'material-ui/CircularProgress';
import {Row, Col} from 'reactstrap';

import Header from './header';
import Footer from './footer';
import CourseBanner from './course-banner';
import Curriculum from './curriculum';
import Comment from './comment';
import Slider from "react-slick";


import '../../styles/detail.css';

const numberWithCommas = (x) => {
  let parts = parseInt(x).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

@centerComponent
class DetailCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muiTheme: getMuiTheme(),
      dialogStyle: {display: 'none'}
    };
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  };

  getChildContext() {
    return {muiTheme: this.state.muiTheme};
  }

  static propTypes = {
    topOffset: PropTypes.number,
    leftOffset: PropTypes.number
  };

  componentDidMount() {
    this.setState({
      dialogStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 100,
        width: '100%',
        height: '100%',
        top: this.props.topOffset,
        left: this.props.leftOffset
      }
    });

    window.scrollTo(0, 0);

    this.props.fetchDetailCourse(this.props.match.params.id);
  }

  renderState = () => {
    if (this.props.hasError) {
      return (
          <div className="alert alert-danger">
            <div style={{textAlign: 'center'}}>
              <strong>There was a loading error</strong>
            </div>
          </div>
      );
    }

    if (this.props.isLoading) {
      return (
          <div style={this.state.dialogStyle}>
            <CircularProgress size={60} thickness={7}/>
          </div>);
    }
  };

  authorNames = (authors) => {
    return _.map(authors, (author, i) => {
      let decorator = ', ';
      if (i === authors.length - 1) {
        decorator = '';
      }

      return (
          <span key={i}>
                    <a className="text-emphasis-first">{author.name}</a><a className="text-white">{decorator}</a>
                </span>
      );
    });
  };

  renderAuthor = (authors) => {
    return _.map(authors, (author, i) => {
      let decorator = '<br/>';
      if (i === authors.length - 1) {
        decorator = '';
      }

      return (
          <Col key={i}>
            <Row>
              <Col>
                <div><img className='author-image' src={`${hostUrl}/images/${author.avatar}`}/></div>
                <br/>
                <div className="text-size-fifth text-emphasis-fourth text-bold">{author.name}</div>
                <div><span className="text-size-third text-bold">{numberWithCommas(author.students)}</span> <span
                    className="text-size-fourth">Students</span></div>
                <div><span className="text-size-third text-bold">{numberWithCommas(author.courses)}</span> <span
                    className="text-size-fourth">Courses</span></div>
                <br/>
              </Col>
            </Row>
            <Row>
              <div className="text-white">{decorator}</div>
            </Row>
          </Col>
      );
    });
  };

  renderWiki() {
    return (
        <Col className='wiki'>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Database from skratch </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Data Warehousing and Business Intelligence </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Data Warehousing Tutorial </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>SQL Basics for Beginners </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Design and Implement Dimensions and Fact Tables </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Implementing a Data Warehouse with SQL Server </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Star and Snowflake schema explained </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Data Warehousing Concepts  </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Data Warehouse Tutorial For Beginners </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>Data Warehouse Tutorial For Beginners </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>ETL Tutorial </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''> ETL Architecture In-Depth - Dimensional Modelling </a></div>
          <div className='wiki-item'><i className="fa fa-link"></i><a href=''>What is Dimension and Fact in Data Warehouse </a></div>
        </Col>
    )
  }

  renderCourse = () => {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      arrows: false,
      autoplay: true,
    };

    const {course} = this.props;

    if (!course) return (<div>&nbsp;</div>);

    return (
        <div className="container-fluid">
          <div className="row header-top">
            <div className="col-sm-12">
              <div className="container">
                <div className="row body-content">
                  <div className="col-sm-8">
                    <br/>
                    <br/>
                    <div className="text-white text-size-first">{course.title}</div>
                    <br/>
                    <div className="text-white text-size-second">{course.subtitle}</div>
                    <div className="text-white text-size-third text"><span
                        className="text-emphasis-third">{numberWithCommas(course.enrolled)}</span> students enrolled
                    </div>
                    <div className="text-white text-size-third text">Created
                      by {this.authorNames(course._authors)}</div>
                    <div className="text-white text-size-third text">Last updated <span
                        className="text-emphasis-third">{dateFormat(course.updated, "m/yyyy")}</span>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div style={{marginTop: 30}} className="hidden-xs">
                    </div>
                    <br/>
                    <CourseBanner course={course}/>
                  </div>
                </div>
                <div className="row body-content hidden-xs">
                  <div className="col-sm-12">
                    <br/>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
            <br/>
          </div>
          <Col className="container">
            <Row className="body-content">
              <Col md="8" sm="12" xs="12">
                <br/>
                <br/>
                <div className="text-size-second text-bold">Description</div>
                <br/>
                <br/>
                <Curriculum/>
              </Col>
              <Col md="4" sm="12" xs="12">
                <br/>
                <br/>
                <div className="text-size-second text-bold text-center">Wiki</div>
                <br/>
                {this.renderWiki()}
                <br/>
              </Col>
            </Row>
          </Col>

          <div className="container">
          <Row>
            <Col md="12" sm="12" xs="12">
              <br/>
              <br/>
              <div className="text-size-second text-bold text-center">About the Teacher</div>
              <br/>
              <Slider {...settings}>
                {this.renderAuthor(course._authors)}
              </Slider>
              <br/>
            </Col>
          </Row>
          </div>
          <br/>
          <div className="container">
            <Comment/>
          </div>
        </div>
    );
  };

  render() {
    return (
        <div>
          <Header {...this.props}/>
          <div>
            {this.renderState()}
          </div>
          <div style={{
            marginTop: 20,
            marginBottom: 20
          }}>
            {this.renderCourse()}
          </div>
          <Footer {...this.props}/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    course: state.fetchDetailCourseDone,
    hasError: state.fetchCourseFailure,
    isLoading: state.fetchCourseLoading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDetailCourse: (course_no) => dispatch(fetchDetailCourse(course_no))
  }
};

export default DetailCourse = withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCourse));
