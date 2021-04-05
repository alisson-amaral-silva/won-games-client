import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Banner from '.'

import Ribbon from '../Ribbon'

const props = {
  img: 'https://source.unsplash.com/user/willianjusten/1042x580',
  title: 'Defy death',
  subtitle: '<p>Play the new <strong>CrashLands</strong> season',
  buttonLabel: 'Buy now',
  buttonLink: '/games/defy-death',
  ribbon: 'My Ribbon',
  ribbonSize:'normal',
  ribbonColor:'secondary'
}

describe('<Banner  />', () => {
  it('should render the correctly', () => {
    renderWithTheme(<Banner {...props}  ribbonSize='small' ribbonColor='secondary'/>)

    expect(
      screen.getByRole('heading', { name: /Defy death/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /Play the new CrashLands season/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('img', { name: /Defy death/i })).toBeInTheDocument()
  })

  it('should render a Ribbon', () => {
    renderWithTheme(<Banner {...props} ribbon='My Ribbon' ribbonSize='small' ribbonColor='secondary' />);
    const ribbon = screen.getByText(/My ribbon/i);

    expect(ribbon).toBeInTheDocument();
    expect(ribbon).toHaveStyle({backgroundColor:'#3cd3c1'});
    expect(ribbon).toHaveStyle({height:'2.6rem', fontSize:'1.2rem'});
  })
})
