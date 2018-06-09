import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownList extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  render() {
    const { options, value, label } = this.props;
    return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <label htmlFor="level">{label}</label>
          <DropdownToggle caret color='light' className='btn-outline' block>
            {value}
          </DropdownToggle>
          <DropdownMenu>
            {
              options.map(option => (
                  <DropdownItem className='text-center'
                                active={value === option}
                                key={option}
                                onClick={() => this.props.onSelect(option)}
                  >
                    {option}
                  </DropdownItem>
              ))
            }
          </DropdownMenu>
        </Dropdown>
    );
  }
}


export default DropdownList;
