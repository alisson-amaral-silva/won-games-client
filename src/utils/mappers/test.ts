import {
  GetHome_banners,
  GetHome_sections_newGames_highlight
} from './../../graphql/generated/GetHome'
import { GetGames_games } from './../../graphql/generated/GetGames'
import {
  bannerMapper,
  cartMapper,
  gamesMapper,
  highlightMapper,
  ordersMapper
} from '.'
import { GetOrders_orders } from 'graphql/generated/GetOrders'

describe('bannerMapper()', () => {
  it('should return the right format when mapped', () => {
    const banner = {
      image: {
        url: '/image.jpg'
      },
      title: 'Banner title',
      subtitle: 'Banner subtitle',
      button: {
        label: 'button label',
        link: 'button link'
      },
      ribbon: {
        text: 'ribbon text',
        color: 'primary',
        size: 'small'
      }
    } as GetHome_banners

    expect(bannerMapper([banner])).toStrictEqual([
      {
        img: '/image.jpg',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'button label',
        buttonLink: 'button link',
        ribbon: 'ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'small'
      }
    ])
  })
})

describe('gamesMapper()', () => {
  it('should return an empty array if there are no games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })

  it('should return the correct format when mapped', () => {
    const game = {
      id: '1',
      name: 'game',
      developers: [
        {
          name: 'developer'
        }
      ],
      slug: 'game',
      cover: {
        url: '/image.jpg'
      },
      price: 10
    } as GetGames_games

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'game',
        slug: 'game',
        developer: 'developer',
        img: '/image.jpg',
        price: 10
      }
    ])
  })
})

describe('highlightMapper()', () => {
  it('should return empty object if no highlight', () => {
    expect(highlightMapper(null)).toStrictEqual({})
  })

  it('should return mapped highlight', () => {
    const highlight = {
      title: 'title',
      subtitle: 'subtitle',
      background: {
        url: '/image.jpg'
      },
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right',
      floatImage: {
        url: '/image.jpg'
      }
    } as GetHome_sections_newGames_highlight

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'title',
      subtitle: 'subtitle',
      backgroundImage: '/image.jpg',
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right',
      floatImage: '/image.jpg'
    })
  })
})

describe('cartMapper()', () => {
  it('should return empty array if no games', () => {
    expect(cartMapper(undefined)).toStrictEqual([])
  })

  it('should return mapped items', () => {
    const game = {
      id: '1',
      cover: {
        url: '/image.jpg'
      },
      name: 'game',
      price: 10
    } as GetGames_games

    expect(cartMapper([game])).toStrictEqual([
      {
        id: '1',
        img: '/image.jpg',
        title: 'game',
        price: '$10.00'
      }
    ])
  })
})

describe('ordersMapper()', () => {
  it('should return empty array if no games', () => {
    expect(ordersMapper(undefined)).toStrictEqual([])
  })

  it('should return mapped items', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: 'visa',
        card_last4: '4242',
        created_at: '2021-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 10
          }
        ]
      }
    ] as GetOrders_orders[]

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: 'visa',
          img: '/img/visa.png',
          number: '**** **** **** 4242',
          purchaseDate: 'Purchase made on Apr 14, 2021'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink:
              'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
            img: '/image.jpg',
            price: '$10.00'
          }
        ]
      }
    ])
  })

  it('should return free game when its free', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: null,
        card_last4: null,
        created_at: '2021-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 0
          }
        ]
      }
    ] as GetOrders_orders[]

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: null,
          img: null,
          number: 'Free Game',
          purchaseDate: 'Purchase made on Apr 14, 2021'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink:
              'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
            img: '/image.jpg',
            price: '$0.00'
          }
        ]
      }
    ])
  })
})
