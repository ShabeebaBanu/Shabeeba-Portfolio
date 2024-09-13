import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import "./Gallery.css";

import bcc1 from "../../components/Images/Gallery/bcc1.jpg";
import uom2 from "../../components/Images/Gallery/uom2.jpg";
import uom4 from "../../components/Images/Gallery/uom4.jpg";
import uom5 from "../../components/Images/Gallery/uom5.jpg";
import uom6 from "../../components/Images/Gallery/uom6.jpg";
import uom7 from "../../components/Images/Gallery/uom7.jpg";
import uom8 from "../../components/Images/Gallery/uom8.jpg";
import sltc1 from "../../components/Images/Gallery/sltc1.jpg";
import aat1 from "../../components/Images/Gallery/aat1.jpg";
import aat2 from "../../components/Images/Gallery/aat2.jpg";

export default function Gallery() {
  return (
    <div className='gallery'>
      <ImageList cols={3} gap={8} className='images'>
        {itemData.map((item) => (
          <ImageListItem key={item.img} className="imageItem">
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              className="imageTitle"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

const itemData = [
  { img: uom2, title: 'End of 1 year' },
  { img: uom4, title: 'Industrial engagement with Basha Lanka' },
  { img: aat2, title: 'AAT Sri Lanka Passed Finalist Awarding' },
  { img: uom7, title: 'FIT Future Careers 2024'},
  { img: uom8, title: 'Faculty of IT, University of Moratuwa' },
  { img: aat1, title: 'AAT Sri Lanka Passed Finalist Awarding' },
  { img: uom5, title: 'First Year Microcontroller-based project' },
  { img: sltc1, title: 'Young Techno Entraprenure Competition SLTC' },
  { img: uom6, title: 'End of 2 years' },
  { img: bcc1, title: 'Baduriya Central College' },
];
