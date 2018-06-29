import React, { Component } from 'react'
import './item-list.scss'

export class Item extends Component {
  render(){
    return (
      <div className='item'>
        <h2>{this.props.title}</h2>
        <div className='actions'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export class ItemList extends Component {
  render(props){
    return (
      <div className='items'>
        {this.props.children}
      </div>
    )
  }
}
