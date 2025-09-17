import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import ProductGrid from '../../components/composite/ProductGrid';

export default function HeatEatPage() {
  return (
    <Container>
      <SectionHeading title="Heat &amp; Eat" subtitle="Ready in minutes" />
      <ProductGrid />
    </Container>
  );
}
