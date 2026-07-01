import { Instagram, Play } from 'lucide-react';

const POSTS = [
  {
    img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/bf9d7b812_generated_image.png',
    caption: 'Day 3. Prokletije.',
    type: 'video',
    views: '24.3K',
  },
  {
    img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/3d41f21b9_generated_image.png',
    caption: 'The lake that stopped us all.',
    type: 'video',
    views: '41.8K',
  },
  {
    img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/f9b2caf1b_generated_image.png',
    caption: 'Dinner was unreal.',
    type: 'reel',
    views: '18.2K',
  },
  {
    img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c57a4140f_generated_image.png',
    caption: 'Roads that don\'t exist on maps.',
    type: 'video',
    views: '55.1K',
  },
  {
    img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/404e10428_generated_image.png',
    caption: 'Standing at the edge of the world.',
    type: 'reel',
    views: '33.7K',
  },
];

export default function SocialFeed() {
  return (
    <section className="py-20 px-4" style={{ background: 'hsl(158 45% 8%)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2">Follow the Journey</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">@summerinmontenegro</h2>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/summerinmontenegro_com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white text-sm font-medium"
            >
              <Instagram size={16} />
              Instagram
            </a>
          </div>
        </div>

        {/* Vertical grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {POSTS.map((post, i) => (
            <a
              key={i}
              href="https://www.instagram.com/summerinmontenegro_com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden cursor-pointer block"
              style={{ aspectRatio: '9/16' }}
            >
              <img
                src={post.img}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Play icon */}
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                <Play size={12} className="text-white fill-white" />
              </div>

              {/* Views */}
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                <span className="text-white text-xs font-medium">{post.views}</span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-medium leading-tight">{post.caption}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-8 tracking-wider">
          New content every week · Follow to travel with us
        </p>
      </div>
    </section>
  );
}