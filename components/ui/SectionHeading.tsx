type Props = {
  id?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ id, title, subtitle }: Props) {
  return (
    <header id={id}>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  );
}

