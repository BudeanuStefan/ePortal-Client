import React, {Component} from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from 'react-redux';
import {fetchMessage} from '../actions';
import NewsItem from './news-item';

import Header from './header';
import Footer from './footer';

const items = [
  {
    id: 1,
    src: '../../images/feaa-b.png',
    altText: 'FEAA ',
    caption: 'Biblioteca organizeaza concurs destinat studentilor',
    captionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    id: 2,
    src: '../../images/main1.png',
    caption: 'Bun venit la UAIC!',
    captionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    id: 3,
    src: '../../images/slide0.png',
    altText: 'licitatie',
    caption: 'Bun venit la UAIC!',
    captionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  }
];

const news = [
  {
    imageSrc: '../../images/Portal3.jpg',
    title: 'Biblioteca organizeaza concurs destinat studentilor ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum.',
  },
  {
    imageSrc: '../../images/Autentificare.jpg',
    title: 'Bun venit la UAIC!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    imageSrc: '../../images/Portal3.jpg',
    title: 'Biblioteca organizeaza concurs destinat studentilor',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    imageSrc: '../../images/Autentificare.jpg',
    title: 'Bun venit la UAIC!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    imageSrc: '../../images/Portal3.jpg',
    title: 'Biblioteca organizeaza concurs destinat studentilor',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
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

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
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

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({activeIndex: nextIndex});
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({activeIndex: nextIndex});
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({activeIndex: newIndex});
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
        <div>
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
                  <NewsItem title={newsItem.title} body={newsItem.body} imageSrc={newsItem.imageSrc}></NewsItem>
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
