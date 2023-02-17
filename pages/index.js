import Head from 'next/head'
import { useState } from 'react';
import defaultStyles from '../styles/Home.module.css'
import yellowStyles from '../styles/Yellow.module.css'
import blueStyles from '../styles/Blue.module.css'

const mergeThemes = (defaultStyles, themeStyles) => {
  const allStyleKeys = [...new Set([...Object.keys(defaultStyles), ...Object.keys(themeStyles)])]
  return allStyleKeys.reduce((combinedStyles, key) => ({
    ...combinedStyles,
    [key]: `${defaultStyles[key]} ${themeStyles[key] || ''}`
  }), {});
}

const theme = {
  default: defaultStyles,
  yellow: mergeThemes(defaultStyles, yellowStyles),
  blue: mergeThemes(defaultStyles, blueStyles),
}

export default function Home() {
  const [styles, setStyles] = useState(defaultStyles);

  return (
    <div className={styles.container}>
      <Head>
        <title>Luke Schlangen | Learning follows Excitement</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={()=>setStyles(theme.default)}>Default</button>
        <button onClick={()=>setStyles(theme.yellow)}>Yellow</button>
        <button onClick={()=>setStyles(theme.blue)}>Blue</button>
        <h1 className={styles.title}>
          Luke Schlangen
        </h1>

        <pre>
          {JSON.stringify(styles, null, 2)}
        </pre>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
