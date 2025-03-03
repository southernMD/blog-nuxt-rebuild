import type { ResOptions } from "~/composables/types";

export default defineSitemapEventHandler(async () => {
    try {
        const config = useRuntimeConfig();
        const res: ResOptions<number[]> = await $fetch("/show/article_index", {
            baseURL: config.public.baseUrl,
            method: "GET"
        });

        const routeList = res.result!.map((id) => {
            return { loc: `/articles/${id}`,lastmod: new Date().toISOString() };
        });

        return routeList ?? [];
    } catch (error) {
        console.error("获取sitemap失败", error);
        return [];
    }
});