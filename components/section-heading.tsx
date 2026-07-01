export function SectionHeading({
  eyebrow,
  title,
  body
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-sm font-black uppercase text-primary">{eyebrow}</p>}
        <h2 className="text-2xl font-black tracking-normal md:text-3xl">{title}</h2>
      </div>
      {body && <p className="max-w-2xl text-sm text-muted-foreground">{body}</p>}
    </div>
  );
}
