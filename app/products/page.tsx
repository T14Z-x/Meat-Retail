import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import ProductGrid from '../../components/composite/ProductGrid';

export default function ProductsPage() {
  return (
    <Container>
      <SectionHeading title="Products" subtitle="Browse our selection" />
      <ProductGrid />
    </Container>
  );
}
