import Head from "next/head"
import { useRouter } from "next/router"
import { name, url } from "../utils/constants"

const description =
  "A Free Online Event Celebrating Databases, Serverless, and Modern Developer Tools"

export const SEO = () => {
  const router = useRouter()
  const isTicketPage = router.pathname === "/tickets/[username]"
  const banner = `${url}/banner.png`

  return (
    <Head>
      <meta name="theme-color" content="#000000" />
      {/* @todo REMOVE when we actually want SEO */}
      <meta name="robots" content="noindex,nofollow" />
      {/* COMMON TAGS */}
      <meta charSet="utf-8" />
      <title>{`${name}: ${description}`}</title>
      {/* Search Engine */}
      <meta name="description" content={description} />
      {!isTicketPage && <meta name="image" content={banner}></meta>}
      {/* Schema.org for Google */}
      <meta itemProp="name" content={name} />
      <meta itemProp="description" content={description} />
      {!isTicketPage && <meta itemProp="image" content={banner}></meta>}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />
      {!isTicketPage && <meta name="twitter:image" content={banner}></meta>}
      {/* Open Graph general (Facebook, Pinterest & Google+) */}
      <meta name="og:title" content={name} />
      <meta
        name="og:description"
        content="A Free Online Event Celebrating Databases, Serverless, and Modern Developer Tools"
      />
      <meta name="og:url" content={url} />
      <meta name="og:site_name" content={name} />
      <meta name="og:type" content="website" />
      {!isTicketPage && <meta name="og:image" content={banner}></meta>}
      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
    </Head>
  )
}
