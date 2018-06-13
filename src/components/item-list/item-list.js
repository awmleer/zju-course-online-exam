import React, { Component } from 'react'
import './item-list.scss'

export class Item extends Component {
  render(){
    return (
      <div className='item'>
        {this.props.children}
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
