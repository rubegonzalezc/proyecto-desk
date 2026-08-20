import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getKnowledgeArticleById } from '@/shared/mock/knowledge'
import KnowledgeArticleView from '@/components/conocimiento/KnowledgeArticleView'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const article = getKnowledgeArticleById(id)
  return {
    title: article ? article.title : 'Artículo',
  }
}

export default async function KnowledgeArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getKnowledgeArticleById(id)
  if (!article) notFound()

  return <KnowledgeArticleView article={article} />
}
