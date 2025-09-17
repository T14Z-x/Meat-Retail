import stylesHero from '../styles/hero.module.css';
import gridStyles from '../styles/grids.module.css';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import CategoryGrid from '../components/composite/CategoryGrid';
import ProductGrid from '../components/composite/ProductGrid';
import ValueProps from '../components/composite/ValueProps';

export default function HomePage() {
  return (
    <>
      <section className={stylesHero.hero} aria-label="Hero">
        <Container>
          <div className={stylesHero.heroInner}>
            <h1 className={stylesHero.title}>Quality meats, delivered chilled</h1>
            <p className={stylesHero.subhead}>Fresh cuts, convenient options, and reliable delivery.</p>
            <div className={stylesHero.ctaRow}>
              <Button href="#featured-products" variant="primary">Shop Now</Button>
              <Button href="#categories" variant="secondary">Explore Categories</Button>
            </div>
            <ul className={stylesHero.badges} aria-label="Trust badges">
              <li>Halal Certified</li>
              <li>Chilled Delivery</li>
              <li>Secure Payments</li>
            </ul>
          </div>
        </Container>
      </section>

      <section id="categories" aria-labelledby="categories-heading">
        <Container>
          <SectionHeading id="categories-heading" title="Featured Categories" subtitle="Explore a variety of fresh options" />
          <CategoryGrid />
        </Container>
      </section>

      <section id="featured-products" aria-labelledby="products-heading">
        <Container>
          <SectionHeading id="products-heading" title="Featured Products" subtitle="A curated selection for you" />
          <ProductGrid />
        </Container>
      </section>

      <section aria-labelledby="value-props-heading">
        <Container>
          <SectionHeading id="value-props-heading" title="Why Shop With Us" />
          <ValueProps />
        </Container>
      </section>

      {null}
    </>
  );
}
