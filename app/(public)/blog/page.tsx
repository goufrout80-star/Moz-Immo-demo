import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Badge, Card, CardImage, CardContent, Button } from '@/components/ui'
import { getBlogPosts } from '@/lib/data'
import { formatDate, truncate } from '@/lib/utils'

export const metadata = {
  title: 'Blog',
  description: 'Discover luxury lifestyle insights, Marrakech travel tips, and property management advice from Moz Immo.',
}

export default function BlogPage() {
  const posts = getBlogPosts()
  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[calc(5rem+var(--banner-height)+3rem)] pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-luxury-charcoal" />
        <div className="relative container-luxury">
          <div className="max-w-3xl">
            <Badge variant="gold" className="mb-4">Blog</Badge>
            <h1 className="heading-display mb-6">
              Insights & Inspiration
            </h1>
            <p className="text-body text-xl">
              Expert advice, travel tips, and lifestyle insights from the heart of Marrakech.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container-luxury pb-16">
        <Link href={`/blog/${featuredPost.slug}`}>
          <Card hover className="grid md:grid-cols-2 overflow-hidden group">
            <CardImage className="aspect-[4/3] md:aspect-auto">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Badge variant="gold" className="absolute top-4 left-4">Featured</Badge>
            </CardImage>
            <CardContent className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(featuredPost.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-luxury-gold transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {truncate(featuredPost.excerpt, 200)}
              </p>
              <div className="inline-flex items-center text-luxury-gold font-medium group-hover:gap-2 transition-all">
                Read Article <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card hover className="h-full group">
                  <CardImage className="aspect-[16/10]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </CardImage>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-luxury-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
