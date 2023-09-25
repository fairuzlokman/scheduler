import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  	return (
		<div className='inter-font'>
			<Component {...pageProps} />
		</div>
	)
}
