import stylesHero from '../styles/hero.module.css';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import BlurText from '../components/ui/BlurText';
import CategoryGrid from '../components/composite/CategoryGrid';
import ProductGrid from '../components/composite/ProductGrid';
import ValueProps from '../components/composite/ValueProps';
import OffersCarousel from '../components/composite/OffersCarousel';

export default function HomePage() {
  return (
    <>
      <section className={stylesHero.hero} aria-label="Hero">
        <Container>
          <div className={stylesHero.heroInner}>
            <BlurText
              as="h1"
              className={stylesHero.title}
              text="Quality meats, delivered chilled"
              animateBy="words"
              direction="top"
              delay={140}
              stepDuration={0.4}
            />
            <BlurText
              as="p"
              className={stylesHero.subhead}
              text="Fresh cuts, convenient options, and reliable delivery."
              animateBy="words"
              direction="bottom"
              delay={120}
              stepDuration={0.32}
            />
            <div className={stylesHero.ctaRow}>
              <Button href="#featured-products" variant="primary">
                <BlurText
                  as="span"
                  className={stylesHero.ctaText}
                  text="Shop Now"
                  animateBy="letters"
                  direction="top"
                  delay={70}
                  stepDuration={0.28}
                />
              </Button>
              <Button href="#categories" variant="secondary">
                <BlurText
                  as="span"
                  className={stylesHero.ctaText}
                  text="Explore Categories"
                  animateBy="words"
                  direction="top"
                  delay={90}
                  stepDuration={0.3}
                />
              </Button>
            </div>
            <ul className={stylesHero.badges} aria-label="Trust badges">
              <li>
                <BlurText
                  as="span"
                  className={stylesHero.badgeText}
                  text="Halal Certified"
                  animateBy="letters"
                  direction="bottom"
                  delay={60}
                  stepDuration={0.26}
                />
              </li>
              <li>
                <BlurText
                  as="span"
                  className={stylesHero.badgeText}
                  text="Chilled Delivery"
                  animateBy="letters"
                  direction="bottom"
                  delay={70}
                  stepDuration={0.26}
                />
              </li>
              <li>
                <BlurText
                  as="span"
                  className={stylesHero.badgeText}
                  text="Secure Payments"
                  animateBy="letters"
                  direction="bottom"
                  delay={80}
                  stepDuration={0.26}
                />
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <section id="categories" aria-labelledby="categories-heading">
        <Container>
          <SectionHeading id="categories-heading" title="Featured Categories" subtitle="Explore a variety of fresh options" />
          <CategoryGrid />
          <div style={{ marginTop: '24px' }}>
            <SectionHeading title="Current Offers" subtitle="Limited-time deals and bundles" />
            <OffersCarousel />
          </div>
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
