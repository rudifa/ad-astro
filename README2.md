# Yet another astro project

> cloned from [gongfudev new-astro-repo](https://github.com/gongfudev/new-astro-repo)

> ffdc721 (HEAD -> main, origin/main, origin/HEAD)(2024-01-10 22:48:22 +0100)(Olivier Lange)Updates title of the template repo to ‹new-astro-repo›

## Astro project layout structure

> Consider alternative layout structures

### Project structure inherited from gongfudev/new-astro-repo

```
BaseLayout.astro:
  <html>
    <head>
      ...
    </head>
    <body>
        <slot />
    </body>
  </html>
```

```
ShoelaceLayout.astro:
  <BaseLayout title={title}>
    <ThemeSelector/>
    <slot />
  </BaseLayout>
```

```
Index.astro:
  <ShoelaceLayout title="...">
    <header><h1>ad-astro</h1></header>
    <main>
      ...
    </main>
  </ShoelaceLayout>
```

```
WebApp.astro:
  <ShoelaceLayout title="...">
  </ShoelacaLayout>
```

```
FamilyTree1.astro:
  <ShoelaceLayout title='...'>
    <header>
      ...
    </header>
    <main>
    ...
    </main>
  </ShoelaceLayout>
```

### Project structure proposed

```
Header.astro:
  <header>
    <h1>..</h1>
    <!-- navigation buttons>
    <ThemeSelector>
  </header>
```

```
Footer.astro:
  <footer>
    <p>...</p>
    <!-- links >
  </footer>
```

```
BaseLayout.astro:
  <html>
    <head>
      ...
    </head>
    <body>
      <Header/>
      <slot />
      <Footer/>
    </body>
  </html>
```

```
ShoelaceLayout.astro:
  <BaseLayout title={title}>
    <slot />
  </BaseLayout>
```

```
Index.astro:
WebApp.astro:
FamilyTree1.astro:
...
  <ShoelaceLayout title="...">
    <main>
    ...
    </main>
  </ShoelaceLayout>
```
