import { Ticket } from "../../../../components/Tickets"
import ReactDOMServer from "react-dom/server"
import React from "react"

function getCss() {
  return `
    body {
        background-color: #141414;
        color: rgb(249 250 251);
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }`
}

export function getHtml(parsedReq: any) {
  var ticketElement = React.createElement(Ticket, {
    user: {
      name: parsedReq['amp;name'] || parsedReq.name,
      username: parsedReq['amp;username'] || parsedReq.username,
      image: parsedReq['amp;image'] || parsedReq.image,
    }
  })
  const htmlString = ReactDOMServer.renderToStaticMarkup(ticketElement)

  /*html*/
  return `
  <!DOCTYPE html>
<html>
  <script src="https://cdn.tailwindcss.com"></script>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://rsms.me" crossorigin="true" />
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
  <style>
    ${getCss()}
  </style>
 <script>
 tailwind.config = {
   theme: {
     extend: {
      colors: {
        devs: {
          black: "#141414",
          yellow: "#febb00",
          blue: "#057aff",
          cyan: "#0ad6a1",
          red600: "#ff0075",
          gray500: "#1C1C1C",
          gray400: "#1B1A1A",
          gray300: "#232121",
          gray200: "#2E2D2D",
          gray100: "#7F7F7F",
          gray50: "#454343",
        },
      },
      fontFamily: {
        sans: ["Inter var"],
      },
     }
   }
 }
</script>
  <body>
      <div style="transform: scale(3.1)">
      ${htmlString}
      </div>
  </body>
</html>
`
}
