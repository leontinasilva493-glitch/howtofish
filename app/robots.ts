import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

const aiAgents = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'Claude-Web', 'Anthropic-AI', 'ClaudeBot', 'PerplexityBot', 'DeepseekBot', 'cohere-ai', 'YouBot', 'GoogleOther', 'DuckAssistBot', 'Bytespider'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...aiAgents.map((userAgent) => ({ userAgent, disallow: '/', allow: ['/llms.txt', '/llms-full.txt'] })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
