import { GetGames_games } from 'graphql/generated/GetGames'
import {
  GetHome_banners,
  GetHome_sections_freeGames_highlight
} from 'graphql/generated/GetHome'
import { GetOrders_orders } from 'graphql/generated/GetOrders'
import { GetWishlist_wishlists_games } from 'graphql/generated/GetWishlist'
import formatPrice from 'utils/format-price'

export const bannerMapper = (banners: GetHome_banners[]) => {
  return banners.map((banner) => ({
    img: banner.image?.url,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLabel: banner.button?.label,
    buttonLink: banner.button?.link,
    ...(banner.ribbon && {
      ribbon: banner.ribbon.text,
      ribbonColor: banner.ribbon.color,
      ribbonSize: banner.ribbon.size
    })
  }))
}

export const gamesMapper = (
  games: GetGames_games[] | GetWishlist_wishlists_games[] | null | undefined
) => {
  return games
    ? games.map((game) => ({
        id: game.id,
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url as string,
        price: game.price
      }))
    : []
}

export const highlightMapper = (
  highlight: GetHome_sections_freeGames_highlight | null | undefined
) => {
  return highlight
    ? {
        title: highlight.title,
        subtitle: highlight.subtitle,
        backgroundImage: highlight.background?.url,
        floatImage: highlight.floatImage?.url,
        buttonLabel: highlight.buttonLabel,
        buttonLink: highlight.buttonLink,
        alignment: highlight.alignment
      }
    : {}
}

export const cartMapper = (games: GetGames_games[] | undefined) => {
  return games
    ? games.map((game) => ({
        id: game.id,
        img: game.cover?.url as string,
        title: game.name,
        price: formatPrice(game.price)
      }))
    : []
}

export const ordersMapper = (orders: GetOrders_orders[] | undefined) => {
  return orders
    ? orders.map((order) => {
        return {
          id: order.id,
          paymentInfo: {
            flag: order.card_brand ? order.card_brand : null,
            img: order.card_brand ? `/img/${order.card_brand}.png` : null,
            number: order.card_last4
              ? `**** **** **** ${order.card_last4}`
              : 'Free Game',
            purchaseDate: `Purchase made on ${new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }).format(new Date(order.created_at))}`
          },
          games: order.games.map((game) => ({
            id: game.id,
            title: game.name,
            downloadLink:
              'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
            img: game.cover?.url,
            price: formatPrice(game.price)
          }))
        }
      })
    : []
}
