import React, {Component} from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from 'react-redux';
import {strings} from "../localization";

import {fetchMessage} from '../actions';
import NewsItem from './news-item';

import Header from './header';
import Footer from './footer';

const items = [
  {
    id: 1,
    src: '../../images/feaa-b.png',
    caption: strings.slide1caption,
    captionText: strings.captionText
  },
  {
    id: 2,
    src: '../../images/main1.png',
    caption: strings.slide2caption,
    captionText: strings.captionText
  },
  {
    id: 3,
    src: '../../images/slide0.png',
    altText: 'licitatie',
    caption: strings.slide2caption,
    captionText: strings.captionText
  }
];

const news = [
  {
    id: 1,
    imageSrc: '../../images/Portal3.jpg',
    title: 'Biblioteca organizeaza concurs destinat studentilor ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum.',
  },
  {
    id: 2,
    imageSrc: '../../images/Autentificare.jpg',
    title: 'Bun venit la UAIC!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    id: 3,
    imageSrc: '../../images/Portal3.jpg',
    title: 'Biblioteca organizeaza concurs destinat studentilor',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    id: 4,
    imageSrc: '../../images/Autentificare.jpg',
    title: 'Bun venit la UAIC!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    id: 5,
    imageSrc: '../../images/Portal3.jpg',
    title: 'Biblioteca organizeaza concurs destinat studentilor',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    id: 6,
    imageSrc: '../../images/Autentificare.jpg',
    title: 'Bun venit la UAIC!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
];


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muiTheme: getMuiTheme(),
      activeIndex: 0,
    };

  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  };

  getChildContext() {
    return {muiTheme: this.state.muiTheme};
  }

  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    const {activeIndex} = this.state;
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      arrows: true,
      autoplay: true,
    };

    return (
        <div className='welcome'>
          <Header/>
          <Slider {...settings}>
            {
              items.map(item => (
                  <div className="slide" key={item.id}>
                    <img src={item.src}/>
                    <div className='info'>
                        <h3>{item.caption}</h3>
                        <p>{item.captionText}</p>
                    </div>
                  </div>
              ))
            }
          </Slider>

          <div className="news">
            {
              news.map(newsItem => (
                  <NewsItem key={newsItem.id} title={newsItem.title} body={newsItem.body} imageSrc={newsItem.imageSrc}></NewsItem>
              ))
            }
          </div>
          <Footer/>
        </div>

    );
  }
}

function mapStateToProps(state) {
  return {message: state.auth.message};
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessage: () => dispatch(fetchMessage())
  }
};

export default Welcome = connect(mapStateToProps, mapDispatchToProps)(Welcome);
