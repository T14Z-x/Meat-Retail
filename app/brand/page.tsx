import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';

export default function BrandPage() {
  return (
    <Container>
      <SectionHeading title="Brand" subtitle="Story, values, and guidelines" />
      <section>
        <h3>Our Story</h3>
        <p>
          This is placeholder content about the brand’s beginnings, mission, and customer promise. Replace with
          authentic text later.
        </p>
      </section>
      <section>
        <h3>Visual Identity</h3>
        <p>
          Include logo usage, colors, and typography guidance here. Downloadable assets can be provided in the future.
        </p>
      </section>
      <section>
        <h3>Voice & Tone</h3>
        <p>
          Describe how the brand communicates: friendly, clear, and focused on product quality and reliability.
        </p>
      </section>
    </Container>
  );
}

