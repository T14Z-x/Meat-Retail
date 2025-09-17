import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import OutletsTeaser from '../../components/composite/OutletsTeaser';

export default function OurOutletsPage() {
  return (
    <Container>
      <SectionHeading title="Our Outlets" subtitle="Find a store near you" />
      <OutletsTeaser />
    </Container>
  );
}
