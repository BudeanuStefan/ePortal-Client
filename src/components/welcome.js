import React, {Component} from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from 'react-redux';
import {fetchMessage} from '../actions';
import NewsItem from './news-item';

import Header from './header';
import Footer from './footer';

const items = [
  {
    src: '../../images/feaa-b.png',
    altText: 'FEAA ',
    caption: 'Biblioteca organizeaza concurs destinat studentilor',
    captionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    src: '../../images/main1.png',
    caption: 'Bun venit la UAIC!',
    captionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan odio aliquet ex pretium, non elementum risus vestibulum. '
  },
  {
    src: '../../images/slide0.png',
    altText: 'licitatie',
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

    const slides = items.map((item) => {
      return (
          <CarouselItem
              onExiting={this.onExiting}
              onExited={this.onExited}
              key={item.src}
          >
            <img src={item.src} alt={item.altText}/>
            <CarouselCaption captionText={item.captionText} captionHeader={item.caption}/>
          </CarouselItem>
      );
    });

    return (
        <div>
          <Header/>
          <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}/>
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
          </Carousel>
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
