import { BannerProps } from 'components/Banner'
import Slider, { SliderSettings } from '../Slider'
import Banner from '../Banner'
import * as S from './styles'

export type BannerSliderProps = {
  items: BannerProps[]
}

const settings: SliderSettings = {
  dots: true,
  arrows: false,
  vertical: true,
  verticalSwiping: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1170,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }
  ]
}

const BannerSlider = ({ items }: BannerSliderProps) => (
  <S.Wrapper>
    <Slider settings={settings}>
      {items.map((item, index) => (
        <Banner key={index} {...item} />
      ))}
    </Slider>
  </S.Wrapper>
)

export default BannerSlider
