import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import CategoryGrid from '../../components/composite/CategoryGrid';

export default function CategoriesPage() {
  return (
    <Container>
      <SectionHeading title="Categories" subtitle="Explore by type" />
      <CategoryGrid />
    </Container>
  );
}
