type Testimonial = { quote: string; name: string; role: string };

export default function SocialProof({ testimonial }: { testimonial?: Testimonial }) {
  if (!testimonial) return null;
  return (
    <figure className="mt-5 border-r-2 border-[#008774] pr-4">
      <blockquote className="text-sm leading-7 text-slate-700">{testimonial.quote}</blockquote>
      <figcaption className="mt-2 text-xs text-slate-600">{testimonial.name} · {testimonial.role}</figcaption>
    </figure>
  );
}
