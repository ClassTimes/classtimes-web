// config.js
enum RENDER_MODE {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

export const renderMode =
  typeof window !== "undefined" ? RENDER_MODE.CLIENT : RENDER_MODE.SERVER
export const isServer = renderMode === RENDER_MODE.SERVER
export const isClient = renderMode === RENDER_MODE.CLIENT

//   typeof window !== "undefined"
//     ? {
//         // client
//         myThing: window.env.myThing,
//         anotherThing: window.env.anotherThing,
//       }
//     : {
//         // server
//         myThing: process.env.MY_THING,
//         anotherThing: process.env.ANOTHER_THING,
//       }
