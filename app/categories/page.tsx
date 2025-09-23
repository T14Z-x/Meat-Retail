import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import CategoryMenu from '../../components/composite/CategoryMenu';

export default function CategoriesPage() {
  return (
    <Container>
      <SectionHeading title="Categories" subtitle="Explore by type" />
      <CategoryMenu />
    </Container>
  );
}
