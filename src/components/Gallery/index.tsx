import { ArrowBackIos as ArrowLeft } from '@styled-icons/material-outlined/ArrowBackIos'
import { ArrowForwardIos as ArrowRight } from '@styled-icons/material-outlined/ArrowForwardIos'
import { useState } from 'react'
import Slider, { SliderSettings } from '../Slider'
import * as S from './styles'

const settings: SliderSettings = {
  arrows: true,
  slidesToShow: 4,
  infinite: false,
  lazyLoad: 'ondemand',
  responsive: [
    {
      breakpoint: 1375,
      settings: {
        arrows: false,
        slidesToShow: 3.2,
        draggable: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 2.2,
        draggable: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 2.2,
        draggable: true
      }
    }
  ],
  nextArrow: <ArrowRight aria-label="next image" />,
  prevArrow: <ArrowLeft aria-label="previous image" />
}

export type GalleryImageProps = {
  src: string
  label: string
}

export type GallerySliderProps = {
  items: GalleryImageProps[]
}

const Gallery = ({ items }: GallerySliderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <S.Wrapper>
      <h1>Gallery</h1>
      <Slider settings={settings}>
        {items.map((item, index) => (
          <img
            src={item.src}
            key={index}
            role="button"
            alt={item.label}
            onClick={() => {
              setIsOpen(true)
            }}
          />
        ))}
      </Slider>

      <S.Modal
        isOpen={isOpen}
        aria-label="modal"
        aria-hidden={!isOpen}
      ></S.Modal>
    </S.Wrapper>
  )
}

export default Gallery
