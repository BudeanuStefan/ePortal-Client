import React from 'react';
import { Media } from 'reactstrap';

const NewsItem = (props) => {
  const { title, body, imageSrc } = props;
  return (
      <Media>
        <Media left href="#">
          <Media object data-src="holder.js/64x64" src={imageSrc} alt="Generic placeholder image" />
        </Media>
        <Media body>
          <Media heading>
            {title}
          </Media>
          {body}
        </Media>
      </Media>
  );
};

export default NewsItem;
