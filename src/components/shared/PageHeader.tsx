interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accentWord?: string;
}

export function PageHeader({ title, subtitle, accentWord }: PageHeaderProps) {
  const words = title.split(" ");
  const firstWord = accentWord || words[0];
  const restWords = accentWord ? title.replace(accentWord, "").trim() : words.slice(1).join(" ");

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16 text-center relative">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-display font-black uppercase mb-4">
          <span className="text-primary neon-text-blue">{firstWord}</span>
          {restWords && <span className="text-foreground"> {restWords}</span>}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
