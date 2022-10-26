import { SessionProvider } from "next-auth/react"
import { wrapper } from "../store/store";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />

    </SessionProvider>
  )
}
export default wrapper.withRedux(MyApp);
//export default MyApp