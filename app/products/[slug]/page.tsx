import { notFound } from 'next/navigation';
import Container from '../../../components/ui/Container';
import SectionHeading from '../../../components/ui/SectionHeading';
import Button from '../../../components/ui/Button';
import Image from 'next/image';
import stylesDetail from '../../../styles/product-detail.module.css';
import gridStyles from '../../../styles/grids.module.css';
import ProductCard from '../../../components/cards/ProductCard';
import { allProducts, findProduct, getSuggestions } from '../../../lib/products';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: Params) {
  const product = findProduct(params.slug);
  if (!product) return notFound();
  const suggestions = getSuggestions(product.slug, 3);
  return (
    <>
      <section aria-label="Product detail" className={stylesDetail.wrap}>
        <Container>
          <div className={stylesDetail.grid}>
            <div className={stylesDetail.media}>
              <div className={stylesDetail.ratio}>
                <Image src={product.src} alt={product.name} fill sizes="(min-width: 1024px) 40vw, 80vw" />
              </div>
            </div>
            <div className={stylesDetail.info}>
              <SectionHeading title={product.name} subtitle={product.blurb} />
              <div className={stylesDetail.priceRow}>
                <span className={stylesDetail.price}>{product.price}</span>
                <Button variant="primary">Add to Cart</Button>
              </div>
              <div className={stylesDetail.block}>
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
              <div className={stylesDetail.block}>
                <h3>Additional Information</h3>
                <dl className={stylesDetail.dl}>
                  {product.additional.map((row) => (
                    <div key={row.label} className={stylesDetail.dlRow}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="You may also like">
        <Container>
          <SectionHeading title="You may also like" subtitle="Customers also viewed" />
          <div className={gridStyles.gridFour}>
            {suggestions.map((p) => (
              <ProductCard key={p.slug} slug={p.slug} name={p.name} blurb={p.blurb} price={p.price} src={p.src} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

