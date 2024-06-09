import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import Menu from '../Home/Menu';
import Background_shop from './Background_shop';
import Sort from './Sort';
import Footer from '../Home/Footer';
import Category from '../Home/Category'
export default function Shop() {
  return (
    <div className='py-lg-1 py-3'>
      <Menu />
      <Background_shop />
     
      
      <Sort />
      <Footer />
    </div>
  )
}
