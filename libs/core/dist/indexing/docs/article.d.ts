import { Chunk } from "../../";
import { type PageData } from "./crawlers/DocsCrawler";
export type ArticleComponent = {
    title: string;
    body: string;
};
export type Article = {
    url: string;
    subpath: string;
    title: string;
    article_components: ArticleComponent[];
};
export type ArticleWithChunks = {
    article: Article;
    chunks: Chunk[];
};
export declare function htmlPageToArticleWithChunks(page: PageData, maxChunkSize: number): Promise<ArticleWithChunks | undefined>;
export declare function markdownPageToArticleWithChunks(page: PageData, maxChunkSize: number): Promise<ArticleWithChunks | undefined>;
//# sourceMappingURL=article.d.ts.map