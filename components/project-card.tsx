import Link from 'next/link'

type ProjectCardProps = {
  name: string
  type: string
  image: string
  slug: string
}

export function ProjectCard({ name, type, image, slug }: ProjectCardProps) {
  return (
    <article className="min-w-0">
      <Link href={`/work/${slug}`} className="group block" aria-label={`View ${name} project details`}>
        <div className="project-image-reveal aspect-[1.72] overflow-hidden rounded-[9px] max-w-[90%] mx-auto">
          <img
            src={image}
            alt={`${name} project placeholder`}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-6 flex items-start justify-between gap-4 max-w-[90%] mx-auto">
          <div>
            <h3 className="text-[22px] font-bold leading-none tracking-[-0.06em]">{name}</h3>
            <p className="mt-3 text-[18px] leading-none tracking-[-0.025em] text-muted-foreground">{type}</p>
          </div>
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-primary text-xl leading-none text-primary-foreground transition-transform group-hover:scale-105" aria-hidden="true">
            ↗
          </span>
        </div>
      </Link>
    </article>
  )
}
