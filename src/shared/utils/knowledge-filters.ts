import type { KnowledgeArticle } from '@/shared/types/knowledge'
import { knowledgeArticles } from '@/shared/mock/knowledge'

export type KnowledgeCategoryFilter = 'Todas' | string

export function getKnowledgeCategories(articles: KnowledgeArticle[] = knowledgeArticles): string[] {
  return [...new Set(articles.map((article) => article.category))].sort((left, right) =>
    left.localeCompare(right, 'es'),
  )
}

export function filterKnowledgeArticles(
  articles: KnowledgeArticle[],
  query: string,
  category: KnowledgeCategoryFilter,
): KnowledgeArticle[] {
  const normalizedQuery = query.trim().toLowerCase()

  return articles.filter((article) => {
    const matchesCategory = category === 'Todas' || article.category === category
    const haystack = `${article.title} ${article.excerpt}`.toLowerCase()
    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery)
    return matchesCategory && matchesQuery
  })
}

export function hasActiveKnowledgeFilters(query: string, category: KnowledgeCategoryFilter): boolean {
  return Boolean(query.trim()) || category !== 'Todas'
}
