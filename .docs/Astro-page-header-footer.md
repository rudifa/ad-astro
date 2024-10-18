# Astro page structure

Exported on 02/10/2024 at 09:02:48 [from Perplexity.ai](https://www.perplexity.ai/search/astro-page-structure-i-want-to-uRKSjM_zRoyzeFYTz0OX1g) - with [SaveMyChatbot](https://save.hugocollin.com)


## User
astro page structure: I want to put the same header and footer on each page; any preferred pattern here: just insert into each page header + page components + footer, or a wrapper containig header + slot + footer into which the page components are inserted, or...

## AI answer
For creating a consistent structure with the same header and footer on each page in Astro, the recommended pattern is to use a layout component. This approach is more maintainable and efficient than inserting the header and footer into each page individually. Here's how you can implement this:

### Creating a Base Layout
----------------------

1.  Create a new file called `BaseLayout.astro` in the `src/layouts/` directory:

```text
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const { title } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

2.  Create separate `Header.astro` and `Footer.astro` components in the `src/components/` directory.

### Using the Layout
----------------

Now, you can use this layout in your pages:

```text
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home Page">
  <h1>Welcome to my site!</h1>
  <p>This is the home page content.</p>
</BaseLayout>
```

### Key Benefits
------------

This pattern offers several advantages:

1.  **Reusability**: The header and footer are defined once and reused across all pages.
2.  **Maintainability**: Changes to the layout structure only need to be made in one place.
3.  **Flexibility**: The `<slot />` element allows you to insert unique content for each page.
4.  **Consistency**: Ensures a uniform structure across your site.
5.  **Prop Passing**: You can pass page-specific information (like titles) to the layout.

By using this layout-based approach, you create a more organized and efficient structure for your Astro project, making it easier to manage and scale your site as it grows [1](https://cloudcannon.com/tutorials/astro-beginners-tutorial-series/astro-layouts/) [4](https://docs.astro.build/en/basics/layouts/).

---

**Sources:**

- [(1) Astro Layouts: Shared Headers, Footers and Meta | CloudCannon](https://cloudcannon.com/tutorials/astro-beginners-tutorial-series/astro-layouts/)
- [(2) Create a social media footer - Astro Docs](https://docs.astro.build/en/tutorial/3-components/2/)
- [(3) Manage your Astro Site like a Pro – Aftab Alam - aalam](https://aalam.in/blog/astro-and-site-strcuture)
- [(4) Layouts - Astro Docs](https://docs.astro.build/en/basics/layouts/)
- [(5) Build your first layout - Astro Docs](https://docs.astro.build/en/tutorial/4-layouts/1/)
- [(6) Create and Apply a Layout to Astro Pages | egghead.io](https://egghead.io/lessons/astro-create-and-apply-a-layout-to-astro-pages)
- [(7) Build it yourself - Header - Astro Docs](https://docs.astro.build/en/tutorial/3-components/3/)
- [(8) Components - Astro Docs](https://docs.astro.build/en/basics/astro-components/)



## User
How do I nest layouts in Astro

## AI answer
To nest layouts in Astro, you can create multiple layout components and use them together. Here's how to implement nested layouts:

### Use a Base Layout
------------------

1.  Use a `BaseLayout.astro` file in the `src/layouts/` directory (see above)

### Create Specific Layout
----------------------

2.  Create a more specific layout, e.g., `BlogPostLayout.astro`:

```text
---
import BaseLayout from './BaseLayout.astro';
const { frontmatter } = Astro.props;
---

<BaseLayout title={frontmatter.title}>
  <article>
    <h1>{frontmatter.title}</h1>
    <p>Published on: {frontmatter.pubDate.slice(0,10)}</p>
    <p><em>{frontmatter.description}</em></p>
    <slot />
  </article>
</BaseLayout>
```

### Use Nested Layouts
------------------

3.  Use the nested layouts in your pages or Markdown files:

```text
---
layout: ../layouts/BlogPostLayout.astro
title: My Blog Post
pubDate: 2022-07-01
description: This is my first blog post
---

This is the content of my blog post.
```

### Key Benefits
------------

This nested layout approach offers several advantages:

1.  **Modularity**: You can create reusable layout components for different parts of your site [1](https://docs.astro.build/en/basics/layouts/).
2.  **Flexibility**: Specific layouts (like `BlogPostLayout`) can add structure while still leveraging the common elements from `BaseLayout` [1](https://docs.astro.build/en/basics/layouts/).
3.  **Consistency**: Ensures a uniform structure across your site while allowing for page-specific customizations [1](https://docs.astro.build/en/basics/layouts/).
4.  **Prop Passing**: You can pass props through multiple levels of layouts as needed [2](https://docs.astro.build/en/tutorial/4-layouts/3/).

By nesting layouts, you create a more organized and efficient structure for your Astro project, making it easier to manage and scale your site as it grows [3](https://docs.astro.build/en/tutorial/4-layouts/1/).

---

**Sources:**

- [(1) Astro Layouts: Shared Headers, Footers and Meta | CloudCannon](https://cloudcannon.com/tutorials/astro-beginners-tutorial-series/astro-layouts/)
- [(2) Create a social media footer - Astro Docs](https://docs.astro.build/en/tutorial/3-components/2/)
- [(3) Manage your Astro Site like a Pro – Aftab Alam - aalam](https://aalam.in/blog/astro-and-site-strcuture)
- [(4) Layouts - Astro Docs](https://docs.astro.build/en/basics/layouts/)
- [(5) Build your first layout - Astro Docs](https://docs.astro.build/en/tutorial/4-layouts/1/)
- [(6) Create and Apply a Layout to Astro Pages | egghead.io](https://egghead.io/lessons/astro-create-and-apply-a-layout-to-astro-pages)
- [(7) Build it yourself - Header - Astro Docs](https://docs.astro.build/en/tutorial/3-components/3/)
- [(8) Components - Astro Docs](https://docs.astro.build/en/basics/astro-components/)


