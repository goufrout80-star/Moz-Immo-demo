import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { Badge, Button, Card, CardImage, CardContent } from '@/components/ui'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getBlogPosts()
    .filter(p => p.id !== post.id && p.tags.some(t => post.tags.includes(t)))
    .slice(0, 3)

  return (
    <>
      {/* Back Button */}
      <div className="pt-32 pb-4 container-luxury">
        <Link href="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-luxury-gold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      <section className="container-luxury mb-8">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Content */}
      <article className="container-luxury pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="default" className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Content */}
          <div className="prose dark:prose-invert prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
          <div className="container-luxury">
            <h2 className="text-2xl font-serif font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card hover className="h-full group">
                    <CardImage className="aspect-[16/10]">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </CardImage>
                    <CardContent>
                      <h3 className="text-lg font-semibold group-hover:text-luxury-gold transition-colors">
                        {relatedPost.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
