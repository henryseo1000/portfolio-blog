import createMDX from '@next/mdx';
import { visit } from "unist-util-visit";
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeMermaid from 'rehype-mermaid';
import { toHtml } from 'hast-util-to-html';
import { toHast } from 'mdast-util-to-hast';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    output: 'export',
    basePath: process.env.NODE_ENV === "production" ? "/henryseo1000.github.io" : "",
    assetPrefix : process.env.NODE_ENV === "production" ? "https://henryseo1000.github.io" : "",
    webpack: (config) => {
      // Add rule for SVG files
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      });

      return config;
    },
    reactStrictMode: true
};

/**
 * Analyzes local markdown/MDX images & videos and rewrites their `src`.
 * Supports both markdown-style images, MDX <Image /> components, and `source`
 * elements. Can be easily adapted to support other sources too.
 * @param {string} options.root - The root path when reading the image file.
 */
const remarkSourceRedirect = (options) => {
  return (tree, file) => {
    // You need to grab a reference of your post's slug.
    // I'm using Contentlayer (https://www.contentlayer.dev/), which makes it
    // available under `file.data`.But if you're using something different, you
    // should be able to access it under `file.path`, or pass it as a parameter
    // the the plugin `options`.
    const slug = file.path;
    // This matches all images that use the markdown standard format ![label](path).
    visit(tree, "paragraph", (node) => {
      const image = node.children.find((child) => child.type === "image");
      if (image) {
        image.url = `${process.env.NODE_ENV === "production" ? "https://henryseo1000.github.io" : ""}/${decodeURIComponent(image.url.split('/')[0])}/${image.url.split('/')[1]}`;
      }
    });
  }
}

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
      remarkPlugins: [remarkSourceRedirect, ["remark-gfm", { strict: true, throwOnError: true }]],
      rehypePlugins: [rehypeMermaid, rehypeCodeTitles, rehypePrism]
    },
});

export default withMDX(nextConfig);
