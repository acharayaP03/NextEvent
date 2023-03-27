import Document, { Html, Head, Main, NextScript } from "next/document";


/**
 * this _document will override the default behaviour of the the generated document.
 * eg: if you wanted to add the lang attribute in html, then this will become much helpful
 * or if we wanted to add an element that generates a over for modal, we can do so here
 */
class MyDocument extends Document {
    render() {
        return(
            <Html lang='en'>
                <Head/>
                <body>
                    <div  id="overlay"/>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}